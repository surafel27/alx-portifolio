const twilio = require('twilio');
const accountSid = 'AC53e34c9bebe01304246ea7d6550f9897';
const authToken = '1e160af6344daada5818ea7800b29164';
const client = twilio(accountSid, authToken);

 exports.sendVerificationCode =  function (phoneNumber, verificationCode) {
    client.messages
      .create({
        body: `Your verification code for signup in shipmate is: ${verificationCode}`,
        from: '+13157376849',
        to: phoneNumber,
      })
      .then((message) => console.log('Verification code sent:', message.sid))
      .catch((error) => console.error('Error sending verification code:', error));
  }