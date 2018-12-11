const db = require('../models');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
<<<<<<< HEAD
const sendNodeMailer = require('../nodemailer/sendMessage.js');
module.exports = function (app) {
=======
const sendNodeMailer =  require('../nodemailer/sendMessage.js');
module.exports = function(app, servo) {
>>>>>>> 773e382468460bedd6c5e14587236aa86049d3c0

  app.get('/api/visitors', function (req, res) {
    db.Visitor.findAll({}).then(function (dbVisitors) {
      console.log("get visitor");
      res.json(dbVisitors);
    });
  });

  app.get('/api/owner', function (req, res) {
    db.Owner.findAll({}).then(function (dbOwner) {
      console.log("get owner");
      res.json(dbOwner);
    });
  });

<<<<<<< HEAD
/**
 * @description to call the function exported in sendMessage.js 
 */
  app.put('/api/sendNodeMailer', function (req, res) {
    sendNodeMailer.sendMessage(nodemailer, xoauth2, req.body.imgSrc);
=======
  app.put('/api/sendNodeMailer',function(req,res){
    sendNodeMailer.sendMessage(nodemailer,xoauth2,req.body.imgSrc);
>>>>>>> 773e382468460bedd6c5e14587236aa86049d3c0
    res.end();
  });
  
  app.get('/api/servo', function(req,res){
    servo.max();
    setTimeout(() => {
        servo.center();
    }, 1500);
  });
};