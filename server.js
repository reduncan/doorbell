const express = require("express");
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const PORT = process.env.PORT || 3000;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './images')));
app.use(express.static(path.join(__dirname, './weights')));
app.use(express.static(path.join(__dirname, './dist')));


// require('./sockets/auth-sockets')(io);
<<<<<<< HEAD
 require('./routes/api-routes.js')(app);
// require('./routes/html-routes.js')(app);
 require('./public/js/auth-receiver.js');
 require('./public/js/motor-turn.js');

db.sequelize.sync({ force: false }).then(function() {
    server.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
}).catch(function(err){
  console.log("An error occurred")
=======
//require('./nodemailer/sendMessage.js')(nodemailer,xoauth2);
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
>>>>>>> aff0a02709443f62f153d56069b95f7fce83aee6
})

