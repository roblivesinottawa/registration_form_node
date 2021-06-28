const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysqlpassmacrob",
  database: "app",
});
connection.connect((error) =>
  !!error ? console.log(error) : console.log("connected to mysql!")
);

// connection.connect((err) => {
//   err ? err : console.log("connected to mysql");
//   connection.query(
//     `CREATE TABLE IF NOT EXISTS users (
//     id int(11) NOT NULL,
//     name VARCHAR(50) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     email VARCHAR(100) NOT NULL,
//   );`,
//     (err, result) => (err ? err : console.log("Table created."))
//   );
//   connection.query(
//     `INSERT INTO users (id, name, password, email) VALUES (1, 'test', 'test', 'test@test.com');`,
//     (err, result) => (err ? err : console.log(`1 record inserted.`))
//   );
// });

module.exports = connection;
