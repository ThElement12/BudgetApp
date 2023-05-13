    const mysql = require("mysql2");
require('dotenv').config();

//Se obtiene la configuración de la base de datos desde el archivo .env
const mysqlConnection = mysql.createPool({
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

mysqlConnection.query('SELECT 1', (error,results)=>{
    if(error) throw error;
    else console.log('Conectado a la base de datos!');
})

module.exports = mysqlConnection;