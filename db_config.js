const mysql = require("mysql2");
const dotenv = require("dotenv").config();
var cryptr = require("cryptr");
cryptr = new cryptr("a");
const conn = mysql.createConnection({
    host:cryptr.decrypt(process.env.db_host),
    user:cryptr.decrypt(process.env.db_user),
    password:cryptr.decrypt(process.env.db_password),
    database:cryptr.decrypt(process.env.databse)
 })
module.exports = conn;