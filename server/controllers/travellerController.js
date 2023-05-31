const dbConn = require('../config/dbcon.config');

const loginTraveller = (travellerLoginData, callback) => {
    const {email, password} = travellerLoginData; 
    
    dbConn.query(
        'SELECT * FROM user_traveller WHERE email = ?', [email], async (error, result) => {
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
            return callback(null, result);
          } else {
            console.log("Invalid username or password");
            return res.status(401).json({ error: 'Invalid username or password' });
          }
      });
}
module.exports = {
    loginTraveller
  };