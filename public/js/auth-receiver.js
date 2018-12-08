//remove this line when pushing to full version
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/////////////receiving Email
var five = require("johnny-five");
var board = new five.Board();

const Imap = require('imap');
const inspect = require('util').inspect;
const fs = require('fs');
//const fileStream;

board.on("ready", function() {
    var servo = new five.Servo(10);

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

//lock shift
let turnServo = function() {
    servo.max();
    setTimeout(() => {
        servo.center();
    }, 1500);
}

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
    let authKey;
    openInbox(function(err, box) {
        if (err) throw err;
        var f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
        f.on('message', function(msg, seqno) {
          console.log('Message #%d', seqno);
          var prefix = '(#' + seqno + ') ';
          msg.on('body', function(stream, info) {

            //check for body content
            //console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + stream.);

            if (info.which === 'TEXT')
              console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
            var buffer = '', count = 0;
            stream.on('data', function(chunk) {
              count += chunk.length;
              buffer += chunk.toString('utf8');

              //heres our from tag comes as nested arrays then gets sorted
              authKey = Object.values(Imap.parseHeader(buffer))[0]
              if(authKey !== undefined){
                authKey = authKey[0];
                console.log(authKey);
              }

              if(authKey === '4048634232@txt.att.net') {
                turnServo();
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
            //var f = imap.fetch(results, { bodies: '' });
            imap.on('message', function (msg, seqno) { //imap made from f
            //     console.log('Message #% d', seqno);
            //     var prefix = '(#' + seqno + ')';
                msg.on('body', function (stream, info) {
                    console.log(prefix + 'Body');
                    //do not make a file for each message
                    //stream.pipe(fs.createWriteStream('msg -' + seqno + '-body.txt')); //file name: msg-number-body.txt
                    //console.log(stream);
                });
                msg.once('attributes', function (attrs) {
                    console.log(prefix + 'Attributes: % s', inspect(attrs, false, 8));
                });
                // msg.once('end', function () {
                //     console.log(prefix + 'Finished');
                // });
            //});
            //f.once('error', function (err) {
                //console.log('Fetch error: ' + err);
            //});
            //f.once('end', function () {
                  //console.log('Done fetching all messages!');
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
})