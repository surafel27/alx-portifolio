const mysql = require('mysql');
//const config = require("./config.js");

// Database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '8520@surafel',
  database: 'shipmatesystem',
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Export the pool to be used in other modules
module.exports = pool;