const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Check connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Failed to connect to the MySQL database:', err.message);
  } else {
    console.log('✅ Successfully connected to the MySQL database.');
    connection.release();
  }
});

module.exports = db;
