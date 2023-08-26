import koneksiDB from "../connection/db.js";

/**
 * Menghapus data :
 * @module deleteData
 * @alias module:deleteData
 * @author Firman Andrian
 * @param {object} req - Objek permintaan HTTP.
 * @param {object} res - Objek respons HTTP.
 * @returns {void}
 */

// create function for delete data from database
export const deleteData = (req, res) => {
  /*params atau biasa disebut parameter, biasanya dipakai untuk mengambil
    suatu parameter contohnya ID pada dibawah ini, karna fungsi tersebut 
    untuk mengakses parameter yang akan digunakan sesuai kebutuhan (untuk menghapus data berdasarkan ID)
    */
  const id = req.params.id;
  koneksiDB.query("CALL DeleteData(?)", [id], (err, result) => {
    // error response
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    } else {
      // response success
      res.status(200).json({
        message: `data with Id ${id} successfully deleted`,
        data: result,
      });
    }
  });
};
