/*const express = require("express");
const router = express.Router();
const cors = require('cors');
const session = require('express-session');*/
const router = require('../app.js');
const bcrypt = require("bcrypt");
const senderModel = require("../models/senderModel");
const senderController = require("../controllers/senderController");

const saltRounds = 10;
const verificationCode = Math.floor(100000 + Math.random() * 900000);
const isVerifyed = true;


router.post('/signup', async (req, res) => {
  try {
    const {fullName, email, phoneNumber, password} = req.body;
  // Validate the required fields
 if (!fullName || !phoneNumber || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  } 

  //lets encrypt the password using bcrypt
  bcrypt.hash(password, saltRounds, (error, hash)=>{
    if (error) {
      console.log("Error Hashing the password");
    }
    const hashedPassword = hash;
    const senderData = {
      fullName,
      email,
      phoneNumber,
      hashedPassword,
      verificationCode,
      isVerifyed
    };

  // Call the senderTraveller function to create a new traveller
  senderModel.createSender(senderData, (error, data) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
    req.session.user = {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      verificationCode: data.verificationCode
    }
     });
  });
  // Return a success response
  console.log('Traveller created successfully')
} catch (err) {
  console.error(err);
 console.log('Error signing up');
}
});

router.post('/loginSender', async (req, res) => {
  try {
    const {email, password} = req.body; 
    console.log(email);
    if (!email || !password) {
      //return res.status(400).json({ error: 'Missing required fields' });
      console.log('Missing required fields');
    } 
    const senderLoginData = {
      email, password
    };
    senderController.loginSender(senderLoginData, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error });
      }
      req.session.user = result;
      return res.json(result);
    });
  } catch (err) {
    console.error(err);
    console.log("user does not exist!");
  }
});

module.exports = router;