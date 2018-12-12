//AT&T: number@mms.att.net
//Verizon: number@vzwpix.com
//T-Mobile: number@tmomail.net

/**
 * @argument nodemailer xauth2 imgURL
 * @description to send the  visitor's image to owner's cell phone
 */

require('dotenv').config();

module.exports = {
  sendMessage: function (nodemailer, xoauth2, imgURL) {
    let transporter = nodemailer.createTransport(
      {
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: 'true',
        port: '465',
        auth: {
          type: 'OAuth2',
          user: `${process.env.emailAdd}`,
          clientId: `${process.env.clientId}`,
          clientSecret: `${process.env.clientSecret}`,
          refreshToken: `${process.env.refreshToken}`
        }
      }
    );

    let mailOptions = {
      from: `${process.env.emailAdd}`,
      to: `${process.env.phoneNum}`,
      subject: 'Facebell: You have a visitor!!',
      text: "Replay to the message if you approve the visitor.",

      attachments: [{
        filename: 'visitor',
        path: `${imgURL}`
      }]
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
      transporter.close();
    });

  }
}