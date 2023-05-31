const express = require("express");
const router = express.Router();
const cors = require('cors');
const session = require('express-session')

// Configure session middleware
router.use(
    session({
      secret: 'surafelfekaduisaMASTERmind@alxSWE2022', // Specify a secret key to sign the session ID cookie
      resave: false, // Disable session resaving
      saveUninitialized: false, // Prevent saving uninitialized sessions
    })
  );

router.use(cors());
// Middleware function
const myMiddleware = (req, res, next) => {
  // Middleware logi
  next();  //Call the next middleware
};
// Use the middleware function
router.use(myMiddleware);

module.exports = router;