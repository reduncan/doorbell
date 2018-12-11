const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const sendNodeMailer =  require('../nodemailer/sendMessage.js');
module.exports = function(app, servo) {

  app.put('/api/sendNodeMailer',function(req,res){
    sendNodeMailer.sendMessage(nodemailer,xoauth2,req.body.imgSrc);
    res.end();
  });
};