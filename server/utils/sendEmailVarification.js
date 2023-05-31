const nodemailer = require('nodemailer');

module.exports = async (email, subject, text) =>{
    try {
        const transport = nodemailer.createTransport({
            //host: process.env.HOST,
            host: 'smtp.gmail.com',
            service: 'gmail',
           // port: Number(print.env.EMAIL_PORT),
           // secure: Boolean(process.env.SECURE),
           port: 587,
           secure: true,
            auth: {
               // user: process.env.USER,
                //pass: process.env.PASSWORD
                user: 'surafel0117@gmail.com',
                pass: '8520@surafel'
            }
        })
        await transport.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        });
        console.log('Email sent'); 
    } catch (error)
    {
        console.log('Email not sent');
    }
}

  //generate random hexadecimal number
  const generateVerificationCode = () => {
    return crypto.randomBytes(3).toString('hex');
  };
  
  // Call generateVerificationCode() to get the code
  const verificationCode = generateVerificationCode();

const mailOptions = {
    from: 'surafel0117@gmail.com',
    to: `${email}`,
    subject: 'Email Verification',
    text: `Your verification code is: ${verificationCode}`,
  };
  //email verification creating transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'surafel0117@gmail.com',
      pass: '8520@surafel',
    },
  });
  
  

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

