process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/////////////receiving Email
const Imap = require('imap');
const inspect = require('util').inspect;
const fs = require('fs');
//const fileStream;

//dont know which of these to use
var today;

//dont know which of these to use
var rightnow = new Date().getTime()

//sets date to be proper notation for search query
function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ', ' + year;
}

today = formatDate(new Date());


//links app to email and detects events
let imap = new Imap({
    user: 'gtbc2018facebell@gmail.com',
    password: '!2018facebell',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
});

//boilerplate
function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}

//event fire on new mail, sends status to servo function
imap.on('mail', function(mail) {
    console.log('--------------> MAIL EVENT WAS FIRED <------------');  
});


//more boilerplate, searches mail on start and ive changed code to not disconnect after fetch to keep listener on
imap.once('ready', function () {
    openInbox(function (err, box) {
        if (err) throw err;
        imap.search(['UNSEEN', ['SENTSINCE', rightnow]], function (err, results) {
            if (err) throw err;
            var f = imap.fetch(results, { bodies: '' });
            f.on('message', function (msg, seqno) {
                console.log('Message #% d', seqno);
                var prefix = '(#' + seqno + ')';
                msg.on('body', function (stream, info) {
                    console.log(prefix + 'Body');
                    stream.pipe(fs.createWriteStream('msg -' + seqno + '-body.txt')); //file name: msg-number-body.txt
                    //console.log(stream);
                });
                msg.once('attributes', function (attrs) {
                    console.log(prefix + 'Attributes: % s', inspect(attrs, false, 8));
                });
                // msg.once('end', function () {
                //     console.log(prefix + 'Finished');
                // });
            });
            f.once('error', function (err) {
                console.log('Fetch error: ' + err);
            });
            f.once('end', function () {
                console.log('Done fetching all messages!');
                //imap.end();
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