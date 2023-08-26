import koneksiDB from "../connection/db.js";

/**
 * Mengubah data :
 * @module updateData
 * @alias module:updateData
 * @author Firman Andrian
 * @param {object} req - Objek permintaan HTTP.
 * @param {object} res - Objek respons HTTP.
 * @returns {void}
 */
//function for edit data from database
export const editData = (req, res) => {
  const id = req.params.id;
  const karyawan = req.body.karyawan;
  const insentif = req.body.insentif;
  const jumlah = req.body.jumlah;
  /*
   * validate if the user does not input the form,
   * then it will not entered the DB
   */
  if (!karyawan || !insentif || !jumlah) {
    return res.status(400).json({ message: "Data cannot be empty" });
  }
  // if not, then save to the DB
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
          message: `Data with ID ${id} successfully changed`,
          data: req.body,
        });
      }
    }
  );
};
