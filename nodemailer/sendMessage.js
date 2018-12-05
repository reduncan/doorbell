///////////////////Ming/////////////////////////
//AT&T: number@mms.att.net
//Verizon: number@vzwpix.com
module.exports = function (nodemailer, xoauth2) {
  let transporter = nodemailer.createTransport(
    {
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: 'true',
      port: '465',
      auth: {
        type: 'OAuth2',
        user: 'owner@gmail.com',
        clientId: '901024267878-8v486lman8s1s4kmpvqc5pmllerc5he9.apps.googleusercontent.com',
        clientSecret: 'NsDGIXKmGqeGV9WzhSco7W2u',
        refreshToken: '1/le76d2xvW9U1N6lWI5Xs0LIU4x25Qo6Bl65dxAxgNHqKXvZgI89SOIvMrd_NIsYP'
      }
    }
  );

  let mailOptions = {
    from: 'owner@gmail.com',
    to: 'your_phone_number@vzwpix.com, owner@gmail.com',
    subject: 'Facebell: You got a visitor!!',
    text: "Please check your email and replay to the text message if approve the visitor",
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