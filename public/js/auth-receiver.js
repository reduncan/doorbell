//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const Imap = require('imap');
const inspect = require('util').inspect;

module.exports = function (servo) {

    var state = {
        rightnow: new Date(),
        mailTick: 0
    }

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
        console.log('--------------> MAIL EVENT WAS FIRED <------------');
        let authKey;
        openInbox(function (err, box) {
            if (err) throw err;
            var f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)', 'TEXT'] });
            f.on('message', function (msg, seqno) {
                console.log('Message #%d', seqno);
                var prefix = '(#' + seqno + ') ';
                msg.on('body', function (stream, info) {

                    if (info.which === 'TEXT')
                        console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
                    var buffer = '', count = 0;
                    stream.on('data', function (chunk) {
                        count += chunk.length;
                        buffer += chunk.toString('utf8');

                        //heres our from tag comes as nested arrays then gets sorted
                        authKey = Object.values(Imap.parseHeader(buffer))[0]
                        if (authKey !== undefined) {
                            authKey = authKey[0];
                            console.log(authKey);
                        }

                        if (authKey === `${process.env.phoneNum}` && state.mailTick <= 1) {
                            state.mailTick++;
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


    //more boilerplate, searches mail on start and ive changed code to not disconnect after fetch to keep listener on and not write txt files to root
    imap.once('ready', function () {
        openInbox(function (err, box) {
            if (err) throw err;
            imap.search(['UNSEEN', ['SENTSINCE', state.rightnow.getTime()]], function (err, results) {
                if (err) throw err;
                imap.on('message', function (msg, seqno) {
                    msg.on('body', function (stream, info) {
                        console.log(prefix + 'Body');
                    });
                    msg.once('attributes', function (attrs) {
                        console.log(prefix + 'Attributes: % s', inspect(attrs, false, 8));
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
