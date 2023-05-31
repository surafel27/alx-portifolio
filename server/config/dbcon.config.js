const mysql = require('mysql');
const config = require("./config.js");

//DataBase connection
const databaseConfig = config.database;
const dbConn = mysql.createConnection({
    user: databaseConfig.user,
    host: databaseConfig.host,
    password: databaseConfig.password,
    database: databaseConfig.database,
    insecureAuth: true,
});

module.exports = dbConn;