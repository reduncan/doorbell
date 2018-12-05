const express = require("express");
const app = express();
const path = require('path');
<<<<<<< HEAD
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
=======
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
>>>>>>> 227ba569ee65149fee76a4f0cee4910a251c2105

const PORT = process.env.PORT || 3000;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

<<<<<<< HEAD
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, '../images')));
app.use(express.static(path.join(__dirname, '../media')));
app.use(express.static(path.join(__dirname, './weights')));
app.use(express.static(path.join(__dirname, './dist')));
app.use('/uploads', express.static('uploads'));
=======
//require('./sockets/auth-sockets')(io);
require('./routes/api-routes.js')(app);
//require('./routes/html-routes.js')(app);
//require('./nodemailer/sendMessage.js')(nodemailer,xoauth2);
>>>>>>> 227ba569ee65149fee76a4f0cee4910a251c2105


// require('./sockets/auth-sockets')(io);
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
})