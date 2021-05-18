const mysql = require('mysql2');  //npm i mysql2

require('dotenv').config;  // npm i dotenv

const connection = mysql.createConnection({
    /* host : process.env.DB_HOSTNAME,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME   */
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'myfirstdb' 
})

module.exports = connection;