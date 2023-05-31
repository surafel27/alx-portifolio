const dbConn = require('../config/dbcon.config');
// Function to create a new package
const createPackage = (packageData, callback) => {
    const {from, to, history, weight, packageDate, packagePrice } = packageData;

  // Insert the new sender into the database
  dbConn.query("INSERT INTO tbl_package (from, to, history, weight, packageDate, packagePrice) VALUES (?,?,?,?,?,?)", 
  [from, to, history, weight, packageDate, packagePrice], (error, data) => {
      if (error) {
          console.log('Error inserting Sender')
          //return callback('An error occurred while creating the package');
         //return res.status(500).json({ error: 'Error inserting ' });
      } 
      return callback(null, data);
});
        // Pass the newly created traveller ID to the callback
      //return callback(null, result.insertId);
};


const getRequest = () => {
    dbConn.query(
        "SELECT * FROM package", [from, to, history, weight, packageDate, packagePrice], (error, result) => {
            if (error) {
                console.log(error);
            }
            return callback(null, result);
        }
    );}
module.exports = {
    createPackage,
    getRequest
};