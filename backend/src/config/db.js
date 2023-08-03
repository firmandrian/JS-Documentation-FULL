import mysql from "mysql";

const koneksiDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_hrms",
});

koneksiDB.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database");
});

export default koneksiDB;