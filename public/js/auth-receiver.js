<<<<<<< HEAD
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
    module.exports = {
    servo: new five.Servo(10),

        //lock shift
        turnServo: function() {
            servo.max();
            setTimeout(() => {
                servo.center();
            }, 1500);
        }
    }
});
=======
const Imap = require('imap');
const inspect = require('util').inspect;

module.exports = function(servo){
>>>>>>> 773e382468460bedd6c5e14587236aa86049d3c0

var rightnow = new Date().getTime()

<<<<<<< HEAD
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

//}
setTimeout(turnServo, 1000);
//turnServo();

// let turnServo = function() {
//     servo.max();
//     setTimeout(() => {
//         servo.center();
//     }, 1500);
// }

=======
>>>>>>> 773e382468460bedd6c5e14587236aa86049d3c0
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

              if(authKey === `${process.env.phoneNum}`) {
                turnServo();
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
        imap.search(['UNSEEN', ['SENTSINCE', rightnow]], function (err, results) {
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
<<<<<<< HEAD
imap.connect();
=======
imap.connect();
}
>>>>>>> 773e382468460bedd6c5e14587236aa86049d3c0
