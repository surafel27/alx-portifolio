const dbConn = require('../config/dbcon.config');

const loginSender = (travellerLoginData, callback) => {
    const {email, hashedPassword} = travellerLoginData; 
    
    dbConn.query(
        'SELECT * FROM user_sender WHERE email = ?', [email], async (error, result) => {
        if (error) {
          console.log("ERROR");
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        if (result.length === 0) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
       const match = await bcrypt.compare(password, result[0].password);
          if (match) {
            // Successful login
            console.log("Login successful")
            return res.status(200).json({ message: 'Login successful' });
          } else {
            console.log("Invalid username or password");
            return res.status(401).json({ error: 'Invalid username or password' });
          }
      });
}