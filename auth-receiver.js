const Imap = require('imap');
const inspect = require('util').inspect;
require('dotenv').config(); 

module.exports = function (servo) {

    var rightnow = new Date().getTime()

    //links app to email and detects events
    let imap = new Imap({
        user: `${process.env.emailAdd}`,
        password: `${process.env.emailPW}`,
        host: 'imap.gmail.com',
        port: 993,
        tls: true
    });

    //boilerplate
    function openInbox(cb) {
        imap.openBox('INBOX', true, cb);
    }

    //event fire on new mail, sends status to servo function
    imap.on('mail', function (mail) {
        let authKey;
        openInbox(function (err, box) {
            if (err) throw err;
            var f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)', 'TEXT'] });
            f.on('message', function (msg, seqno) {
                var prefix = '(#' + seqno + ') ';
                msg.on('body', function (stream, info) {

                    if (info.which === 'TEXT')
                    var buffer = '', count = 0;
                    stream.on('data', function (chunk) {
                        count += chunk.length;
                        buffer += chunk.toString('utf8');

                        //heres our from tag comes as nested arrays then gets sorted
                        authKey = Object.values(Imap.parseHeader(buffer))[0]
                        if (authKey !== undefined) {
                            authKey = authKey[0];
                        }

                        if (authKey === `${process.env.phoneNum}`) {
                            servo.max();
                            setTimeout(() => {
                                servo.center();
                            }, 1500);
                        }

                    });
                });
            });
        });
    });


    //more boilerplate, searches mail on start and ive changed code to not disconnect after fetch to keep listener on
    imap.once('ready', function () {
        openInbox(function (err, box) {
            if (err) throw err;
            imap.search(['UNSEEN', ['SENTSINCE', rightnow]], function (err, results) {
                if (err) throw err;
                imap.on('message', function (msg, seqno) {
                    msg.on('body', function (stream, info) {
                    });
                    msg.once('attributes', function (attrs) {
                    });
                });
            });
        });
    });
    imap.once('error', function (err) {
        console.log(err);
    });
    imap.once('end', function () {
        console.log('Connection ended');
    });
    imap.connect();
}