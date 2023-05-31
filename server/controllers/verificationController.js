const dbConn = require('../config/dbcon.config');

const phoneVerificationChecker = (verifyData) => {
    const {tableName, userPhone, phoneVerification} = verifyData;
    dbConn.query("SELECT verificationCode FROM ?? WHERE phoneNumber = ?", [tableName, userPhone], (error, result) =>{
       if (error) {
        console.log(error);
       } else {
        if (result.length > 0) {
            const StoredVerificationCode = result[0].verificationCode;
            if (phoneVerification === StoredVerificationCode) {
                console.log("Verification code is similar");
                dbConn.query("UPDATE ?? SET isVerifyed = true WHERE phoneNumber = ?", [tableName, userPhone], (updateError, updateResult) =>{
                    if(updateError) {
                        console.log("update error!", updateError);
                    } else {
                        console.log("User status updated to true!")
                    }
                });
            } else {
                console.log("Code is not similar!");
            }
       }  else {
        console.log('User not found');
        // User with the specified userId does not exist
      }
    }
    });
}

module.exports = { phoneVerificationChecker }
