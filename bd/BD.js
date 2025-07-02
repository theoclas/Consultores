
const mysql = require ('mysql2/promise');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });



console.log(process.env.DB_HOST);       // correcto
console.log(process.env.DB_USER);       // ✅ corregido
console.log(process.env.DB_PASSWORD);   // ✅ corregido
console.log(process.env.DB_NAME);       // ✅ corregido

const Pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0.
});


module.exports = Pool;