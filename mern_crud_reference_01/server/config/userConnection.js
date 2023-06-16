// ----- DB Connection ----- //
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "test",
});

connection.connect(function (err) {
  if (err) {
    console.log("error database connection");
    return;
  } else {
    console.log("successfull database connection");
  }
});

module.exports = connection;
// ----- DB Connection ----- //
