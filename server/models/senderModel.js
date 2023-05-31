const dbConn = require('../config/dbcon.config');
const phoneVerfication = require("../utils/phoneVerification");
// Function to create a new sender
const createSender = (senderData, callback) => {
    const {fullName, email, phoneNumber, hashedPassword, verificationCode, isVerifyed } = senderData;

  // Insert the new sender into the database
     dbConn.query(
        "SELECT * FROM user_sender WHERE email = ? OR phoneNumber = ?", [email, phoneNumber], (error, result) => {
            if (error)
            {
                console.log("error executing sql");
               // return callback('An error occurred while creating the sender');
            }
            if (result.length === 0) {
                dbConn.query("INSERT INTO user_sender (fullName, email, phoneNumber, password, verificationCode, isVerifyed) VALUES (?,?,?,?,?,?)", 
                [fullName, email, phoneNumber, hashedPassword, verificationCode, isVerifyed], (error, data) => {
                    if (error) {
                        console.log('Error inserting Sender')
                        //return callback('An error occurred while creating the sender');
                       //return res.status(500).json({ error: 'Error inserting sender' });
                    } 
                    phoneVerfication.sendVerificationCode(phoneNumber, verificationCode);
                    return callback(null, data);
            });
        } else {
            console.log("User already exists");
            //return callback('User already exists');
          }
        });
        // Pass the newly created traveller ID to the callback
      //return callback(null, result.insertId);
};
module.exports = {
    createSender
};