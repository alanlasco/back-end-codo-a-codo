const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "ac_db",
});

connection.connect((error) => {
  if (error) {
    console.error(error);
  }
  console.log("Se ha conectado exitosamente");
});
module.exports = connection;
