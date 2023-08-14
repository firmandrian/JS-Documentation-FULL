import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

/**
 * create connection to mysql database
 */
const koneksiDB = mysql.createConnection({
  host:         process.env.database_host,
  user:         process.env.database_user,
  password:     process.env.database_password,
  database:     process.env.database_database,
});

koneksiDB.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database");
});

export default koneksiDB;
