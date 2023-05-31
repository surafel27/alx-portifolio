const express = require("express");
const router = express.Router();
const cors = require('cors');
const session = require('express-session');
const travellerModel = require("../models/travellerModel");
const travellerController = require("../controllers/travellerController");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const verificationCode = Math.floor(100000 + Math.random() * 900000);
const isVerifyed = true;

// Configure session middleware
router.use(
  session({
    secret: 'your-secret-key', // Specify a secret key to sign the session ID cookie
    resave: false, // Disable session resaving
    saveUninitialized: false, // Prevent saving uninitialized sessions
  })
);


// Middleware function
const myMiddleware = (req, res, next) => {
  next();  //Call the next middleware
};
// Use the middleware function
router.use(myMiddleware);
router.use(cors());

router.post('/signupTraveller', async (req, res) => {
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
    const travellerData = {
      fullName,
      email,
      phoneNumber,
      hashedPassword,
      verificationCode,
      isVerifyed
    };

  // Call the createTraveller function to create a new traveller
  travellerModel.createTraveller(travellerData, (error, data) => {
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
    //return res.json(data);
     });
  });
  // Return a success response
    console.log('Traveller created successfully')
} catch (err) {
  console.error(err);
 console.log('Error signing up');
}
});

router.post('/loginTraveller', async (req, res) => {
    try {
      const {email, password} = req.body; 
      if (!email || !password) {
        //return res.status(400).json({ error: 'Missing required fields' });
        console.log('Missing required fields');
      } 
      const travellerLoginData = {
        email, password
      }

      travellerController.loginTraveller(travellerLoginData, (error, data) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error });
        }
        req.session.user = data;
        return res.json(data);
      });
     
    } catch (err) {
      console.error(err);
      console.log("user does not exist!");
    }
  });

module.exports = router;