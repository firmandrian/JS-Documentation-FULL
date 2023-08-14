import koneksiDB from "../src/config/db.js";

/** 
* Mendapatkan data :
 * @module getData
 * @alias module:getData
 * @author Firman Andrian
 * @type {object}
 * @param {object} req - objek permintaan HTTP request
 * @param {object} res - objek response HTTP
 * @returns {void} 
*/

//function to display data from database to web browser page / client side
export const getData = (req, res) => {
  //get data from database
  koneksiDB.query("CALL GetData()", (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Data eror saat diambil dari DB",
        error: err,
      });
    //error response
    } else {
      res.status(200).json({
        message: "Data berhasil diambil dari DB",
        data: result,
      });
    }
  });
};

// for menu home
export const home = (req, res) => {
    res.status(200).json({ success: true, message: "Halaman Home" });
};

/** 
* Mencari data
 * @param {object} req - Objek permintaan HTTP.
 * @param {object} res - Objek respons HTTP.
 * @returns {void}
*/
//function for search data in database
export const search = (req, res) => {
    const search = req.query.karyawan;
  
    // search data employee into database 
    koneksiDB.query("CALL searchKaryawan(?)", [search], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Terjadi kesalahan saat melakukan pencarian",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Data berhasil ditemukan",
          data: result[0],
        });
      }
    });
  };
  
  /** 
  * Pagination
   * @param {object} req - Objek permintaan HTTP.
   * @param {object} res - Objek respons HTTP.
   * @returns {void}
  */
  //function for pagination
  export const pagination = (req, res) => {
    const halaman = parseInt(req.query.halaman) || 1;
    const batas = 10;
  
    koneksiDB.query(
      "CALL GetKaryawanByPage(?, ?, @totalPages)",
      [halaman, batas],
      (err, results) => {
        // error response
        if (err) {
          console.error(`error saat menggambil data ${err.stack}`);
          return res.status(500).json({ error: "gagal menggambil data" });
        }
  
        koneksiDB.query(
          "SELECT @totalPages AS total",
          (err, totalPagesResult) => {
            // error response
            if (err) {
              console.error(`error saat menggambil data ${err.stack}`);
              return res.status(500).json({ error: "gagal menggambil data" });
            }
  
            const totalHalaman = totalPagesResult[0].total;
  
            /* 
             * success response.
             * send result data quary and pagination information to the client.
            */
            res.json({
              data: results[0],
              halaman: halaman,
              total_halaman: totalHalaman,
            });
          }
        );
      }
    );
  };

