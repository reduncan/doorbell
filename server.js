const express = require("express");
const app = express();
const path = require('path');
// const nodemailer = require('nodemailer');
// const xoauth2 = require('xoauth2');

const PORT = process.env.PORT || 3000;

const db = require("./models");

//const sendNodeMailer =  require('./nodemailer/sendMessage.js');
//sendNodeMailer.sendMessage(nodemailer,xoauth2);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './images')));
app.use(express.static(path.join(__dirname, './weights')));
app.use(express.static(path.join(__dirname, './dist')));
app.use(express.static(path.join(__dirname, './nodemailer')));

// require('./sockets/auth-sockets')(io);
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
})

