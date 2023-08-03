import koneksiDB from "../src/config/db.js";

/** 
* Mengubah data :
 * @module updateData
 * @alias module:updateData
 * @author Firman Andrian
 * @param {object} req - Objek permintaan HTTP.
 * @param {object} res - Objek respons HTTP.
 * @returns {void}
*/
//fungsi untuk mengedit data dari database
export const editData = (req, res) => {
    const id = req.params.id;
    const karyawan = req.body.karyawan;
    const insentif = req.body.insentif;
    const jumlah = req.body.jumlah;
    /*
    lakukan validasi jika user tidak menginput form, maka tidak masuk ke DB
    */
    if (!karyawan || !insentif || !jumlah) {
      return res.status(400).json({ message: "Data tidak boleh kosong" });
    }
    //jika tidak, maka simpan ke DB
    koneksiDB.query(
      "CALL EditData(?, ?, ?, ?)",
      [id, karyawan, insentif, jumlah],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err });
        } else {
          console.log(result);
          res.status(200).json({
            message: `Data dengan ID ${id} berhasil di ubah`,
            data: req.body,
          });
        }
      }
    );
  };