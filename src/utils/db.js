// Load environment variables from .env file
require('dotenv').config();
const mysql = require('mysql2/promise');

// Create a connection pool to MySQL database using environment variables
const mySqlPool = mysql.createPool({
    host: process.env.DB_HOST,        // DB_HOST from .env file
    user: process.env.DB_USER,        // DB_USER from .env file
    password: process.env.DB_PASSWORD,// DB_PASSWORD from .env file
    database: process.env.DB_NAME,    // DB_NAME from .env file
    port: process.env.DB_PORT,        // DB_PORT from .env file
    charset: process.env.DB_CHARSET,  // DB_CHARSET from .env file
    waitForConnections: true,
    connectionLimit: 10,              // Max number of connections in the pool
    queueLimit: 0                     // No limit on query queue
});

// Function to test the connection
async function testConnection() {
    try {
        const connection = await mySqlPool.getConnection();
        console.log('Database connection successful');
        connection.release();
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

testConnection();

module.exports = mySqlPool;
