import koneksiDB from "../src/config/db.js";

/** 
* Menghapus data :
 * @module deleteData
 * @alias module:deleteData
 * @author Firman Andrian
 * @param {object} req - Objek permintaan HTTP.
 * @param {object} res - Objek respons HTTP.
 * @returns {void}
*/
//fungsi untuk menghapus data dari database
export const deleteData = (req, res) => {
    /*params atau biasa disebut parameter, biasanya dipakai untuk mengambil
    suatu parameter contohnya ID pada dibawah ini, karna fungsi tersebut 
    untuk mengakses parameter yang akan digunakan sesuai kebutuhan (untuk menghapus data berdasarkan ID)
    */
    const id = req.params.id;
    koneksiDB.query("CALL DeleteData(?)", [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: `data dengan ID ${id} berhasil dihapus`,
          data: result,
        });
      }
    });
  };