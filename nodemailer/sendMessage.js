///////////////////Ming/////////////////////////
//AT&T: number@mms.att.net
//Verizon: number@vzwpix.com
require('dotenv').config();

module.exports = function (nodemailer, xoauth2) {
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
    to: `${process.env.emailAdd},${process.env.phoneNum}`,
    subject: 'Facebell: You got a visitor!!',
    text: "Please check your email and replay in the text message if approve the visitor",
    //html only works for web page
    html: 'Embedded image: <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2d7b1bd980752bb3ea0a259f528eae78&w=1000&q=80"/>',

    //attachments
    // attachments:[{
    //   filename:'DSC_0111.JPG',
    //   path:'Users/Sandy/Desktop/code_farmer/boot_camp/bc/activities/project2/image'
    // }]
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