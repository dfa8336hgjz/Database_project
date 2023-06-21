const mysql = require("mysql2/promise.js");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "09102003",
    database: "menu",
});

module.exports = pool;