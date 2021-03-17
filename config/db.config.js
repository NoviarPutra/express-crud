const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "system_management",
});

dbConnection.connect((error) => {
  if (error) throw error;
  console.log(`Connected To Database Successfully`);
});

module.exports = dbConnection;
