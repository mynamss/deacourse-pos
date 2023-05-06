const mysql = require("mysql");
const util = require("util");
const env = require("dotenv");
env.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
});

connection.query = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("DB Connected! Happy Coding..");
});

module.exports = connection;
