const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
});

connection.connect((error) => {
    if (error) {
        console.error("Error al conectar con la base de datos:", error);
    } else {
        console.log("Conectado a la base de datos.");
    }
});

module.exports = { connection };
