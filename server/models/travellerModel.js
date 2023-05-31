const dbConn = require('../config/dbcon.config');
const phoneVerfication = require("../utils/phoneVerification");
// Function to create a new traveller
const createTraveller = (travellerData, callback) => {
    const {fullName, email, phoneNumber, hashedPassword, verificationCode, isVerifyed } = travellerData;

  // Insert the new traveller into the database
     dbConn.query(
        "SELECT * FROM user_traveller WHERE email = ? OR phoneNumber = ?", [email, phoneNumber], (error, result) => {
            if (error)
            {
                console.log("error executing sql");
               // return callback('An error occurred while creating the traveller');
            }
            if (result.length === 0) {
                dbConn.query("INSERT INTO user_traveller (fullName, email, phoneNumber, password, verificationCode, isVerifyed) VALUES (?,?,?,?,?,?)", 
                [fullName, email, phoneNumber, hashedPassword, verificationCode, isVerifyed], (error, data) => {
                    if (error) {
                        console.log('Error inserting Traveller')
                        //return callback('An error occurred while creating the traveller');
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
  createTraveller
};