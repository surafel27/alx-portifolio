const express = require("express");
const router = express.Router();
const cors = require('cors');
const verificationController = require("../controllers/verificationController");

// Middleware function
const myMiddleware = (req, res, next) => {
    // Middleware logi
    next();  //Call the next middleware
  };
  // Use the middleware function
  router.use(myMiddleware);
  router.use(cors());

router.post('/verifySender', async (req, res) => {
    try {
        const {phoneVerification} = req.body;
        if(!phoneVerification) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const user = req.session.user; // Access the stored user data
        const userPhone = user.phoneNumber;
        const tableName = 'user_sender'
        const verifyData = {
            tableName,
            userPhone,
            phoneVerification
        };
        verificationController.phoneVerificationChecker(verifyData, (error, result) => {
            if (error) {
                console.error(error);
                //return res.status(500).json({ error });
            }
        });
        console.log('Verifyed successfully');
    }
    catch (err) {
        console.error(err);
       //return res.status(500).json({ error: 'Error Verifying up' });
       console.log('Error Verifying!');
      }
 });


 router.post('/verifyTraveller', async (req, res) => {
    try {
        const {phoneVerification} = req.body;
        if(!phoneVerification) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const user = req.session.user; // Access the stored user data
        const userPhone = user.phoneNumber;
        const tableName = 'user_traveller';
        const verifyData = {
            tableName,
            userPhone,
            phoneVerification
        };
        verificationController.phoneVerificationChecker(verifyData, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error });
            }
        });
        console.log('Verifyed successfully');
    }
    catch (err) {
        console.error(err);
       //return res.status(500).json({ error: 'Error Verifying up' });
       console.log('Error Verifying!');
      }
 });





 router.post('/verifyTraveller', async (req, res) => {
    try {
        const {userPhone, phoneVerification} = req.body;
        if(!userPhone || !phoneVerification) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const tableName = 'user_traveller'
        const verifyData = {
            tableName,
            userPhone,
            phoneVerification
        };
        verificationController.phoneVerificationChecker(verifyData, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error });
            }
        });
        console.log('Verifyed successfully');
    }
    catch (err) {
        console.error(err);
       //return res.status(500).json({ error: 'Error Verifying up' });
       console.log('Error Verifying!');
      }
 });

 module.exports = router;