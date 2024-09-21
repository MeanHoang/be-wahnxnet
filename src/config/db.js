const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'root',
    password: '123456',
    database: ''
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database!');
});

module.exports = db;
