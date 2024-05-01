const nodemailer = require('nodemailer')
// const SMPT_HOST="smtp.gmail.com";
// const SMPT_PORT="";
// const SMPT_SERVICE = "gmail";
// const SMPT_MAIL = "anilgehlot003@gmail.com";
// const SMPT_PASS = "xkpr fdjx skii lwwq";
// const SMPT_PASS = "gehlot/583";
// gehlot/583
// gehlotanil583@gmail.com

// "email":"akshaygehlot003@gmail.com",
    // "password":"akshay003" 00000000

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
        }
      });

  const mailOptions = {
    from: `${process.env.SMTP_FROM_NAME}<${process.env.SMTP_FROM_EMAI}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions)
//   await transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
};


module.exports = sendEmail;
