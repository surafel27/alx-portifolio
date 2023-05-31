const express = require("express");
const app = express();
const cors = require('cors');
const config = require("./config/config.js");
const session = require('express-session');
const senderRoutes = require('./routes/senderRoutes.js');
const verificationRoutes = require('./routes/verificationRoutes.js')

//const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');

// Middleware
app.use(express.json());
app.use(cors());

/*app.use(cors({
    origin: ["http://localhost:3000/"],
    method: ["GET", "POST"],
    credentials: true
  })); */
  app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true
  }));

const serverPort = config.server.port;

//Routes for package sender
//app.use('/api/createSender', require('./routes/senderRoutes.js'));
//app.use('/api/senderLogin', require('./routes/senderRoutes.js'));
//app.use('/api/identitySender', require('./routes/verificationRoutes.js'));
app.use('/api/createSender', senderRoutes);
app.use('/api/senderLogin', senderRoutes);
app.use ('/api/identitySender', verificationRoutes);

//Route for traveller
app.use('/api/createTraveller', require('./routes/travellerRoutes.js'));
app.use('/api/travellerLogin', require('./routes/travellerRoutes.js'));
app.use('/api/identityTraveller', require('./routes/verificationRoutes.js'));

//Route for package request
app.use('/api/createPackage', require('./routes/shipmentRoutes.js'));


// Start the server
app.listen(serverPort, () =>{
    console.log(`server is running on port: ${ serverPort }`);
});