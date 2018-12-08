const db = require('../models');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const sendNodeMailer =  require('../nodemailer/sendMessage.js');
module.exports = function(app) {

  app.get('/api/visitors', function(req, res) {
    db.Visitor.findAll({}).then(function(dbVisitors) {
        console.log("get visitor");
        res.json(dbVisitors);
    });
  });

  app.get('/api/owner', function(req, res) {
    db.Owner.findAll({}).then(function(dbOwner) {
        console.log("get owner");
      res.json(dbOwner);
    });
  });
  app.put('/api/sendNodeMailer',function(req,res){
    sendNodeMailer.sendMessage(nodemailer,xoauth2,req.body.imgSrc);
    res.end();
  });
};