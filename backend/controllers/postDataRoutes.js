import koneksiDB from "../src/config/db.js";

/** 
 * Post Data To database :
 * @module postData
 * @alias module:postData
 * @author Firman Andrian
 * @property {string} karyawan - karyawan
 * @property {string} insentif - insentif
 * @property {number} jumlah - jumlah
*/
// function for add new data into database
export const postData = (req, res) => {
    /* fungsi body pada dibawah adalah untuk mengakses data yang dikirim dalam body
    dalam permintaan HTTP.
    */
    const karyawan    = req.body.karyawan;
    const insentif    = req.body.insentif;
    const jumlah      = req.body.jumlah;
  
    //cek apakah data kosong
    if (!karyawan || !insentif || !jumlah) {
      return res.status(400).json({ message: "Data tidak boleh kosong" });
    }
    koneksiDB.query(
      `CALL PostData(?, ?, ?)`,
      [karyawan, insentif, jumlah],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err });
        } else {
          // console.log(result);
          res.status(200).json({
            message: "Post all user succes",
            data: req.body,
          });
        }
      }
    );
  };


/** 
* Logout
 * @param {object} req - Objek permintaan HTTP.
 * @param {object} res - Objek respons HTTP.
 * @returns {void}
*/
//fungsi untuk logout
export const logout = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(200).json({ success: true, message: "Logout berhasil" });
    }
  
    // Panggil stored procedure logout
    koneksiDB.query("CALL logout(?)", [token], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Error logout" });
      }
  
      res.clearCookie("token", { path: "/" });
      return res.status(200).json({ success: true, message: "Logout berhasil" });
    });
  };