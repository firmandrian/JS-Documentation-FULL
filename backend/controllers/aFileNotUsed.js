import koneksiDB from "../src/config/db.js";

// /** 
// * Mendapatkan data
//  * @module Controllers
//  * @alias module:Controllers
//  * @author Firman Andrian
//  * @type {object}
//  * @param {object} req - objek permintaan HTTP request
//  * @param {object} res - objek response HTTP
//  * @returns {void} 
// */

// //fungsi untuk menampilkan data dari database ke halaman web browser
// export const getData = (req, res) => {
//   koneksiDB.query("CALL GetData()", (err, result) => {
//     if (err) {
//       res.status(500).json({
//         message: "Data eror saat diambil dari DB",
//         error: err,
//       });
//     } else {
//       res.status(200).json({
//         message: "Data berhasil diambil dari DB",
//         data: result,
//       });
//     }
//   });
// };

// /** 
// * Mengirimkan data
//  * @property {string} karyawan - karyawan
//  * @property {string} insentif - insentif
//  * @property {number} jumlah - jumlah
// */
// //fungsi untuk menambahkan data baru kedalam database
// export const postData = (req, res) => {
//   /* fungsi body pada dibawah adalah untuk mengakses data yang dikirim dalam body
//   dalam permintaan HTTP.
//   */
//   const karyawan = req.body.karyawan;
//   const insentif = req.body.insentif;
//   const jumlah = req.body.jumlah;

//   //cek apakah data kosong
//   if (!karyawan || !insentif || !jumlah) {
//     return res.status(400).json({ message: "Data tidak boleh kosong" });
//   }
//   koneksiDB.query(
//     `CALL PostData(?, ?, ?)`,
//     [karyawan, insentif, jumlah],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(500).json({ error: err });
//       } else {
//         // console.log(result);
//         res.status(200).json({
//           message: "Post all user succes",
//           data: req.body,
//         });
//       }
//     }
//   );
// };

// /** 
// * Menghapus data
//  * @param {object} req - Objek permintaan HTTP.
//  * @param {object} res - Objek respons HTTP.
//  * @returns {void}
// */
// //fungsi untuk menghapus data dari database
// export const deleteData = (req, res) => {
//   /*params atau biasa disebut parameter, biasanya dipakai untuk mengambil
//   suatu parameter contohnya ID pada dibawah ini, karna fungsi tersebut 
//   untuk mengakses parameter yang akan digunakan sesuai kebutuhan (untuk menghapus data berdasarkan ID)
//   */
//   const id = req.params.id;
//   koneksiDB.query("CALL DeleteData(?)", [id], (err, result) => {
//     if (err) {
//       console.log(err);
//       res.status(500).json({ error: err });
//     } else {
//       res.status(200).json({
//         message: `data dengan ID ${id} berhasil dihapus`,
//         data: result,
//       });
//     }
//   });
// };

// /** 
// * Mengubah data
//  * @param {object} req - Objek permintaan HTTP.
//  * @param {object} res - Objek respons HTTP.
//  * @returns {void}
// */
// //fungsi untuk mengedit data dari database
// export const editData = (req, res) => {
//   const id = req.params.id;
//   const karyawan = req.body.karyawan;
//   const insentif = req.body.insentif;
//   const jumlah = req.body.jumlah;
//   /*
//   lakukan validasi jika user tidak menginput form, maka tidak masuk ke DB
//   */
//   if (!karyawan || !insentif || !jumlah) {
//     return res.status(400).json({ message: "Data tidak boleh kosong" });
//   }
//   //jika tidak, maka simpan ke DB
//   koneksiDB.query(
//     "CALL EditData(?, ?, ?, ?)",
//     [id, karyawan, insentif, jumlah],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(500).json({ error: err });
//       } else {
//         console.log(result);
//         res.status(200).json({
//           message: `Data dengan ID ${id} berhasil di ubah`,
//           data: req.body,
//         });
//       }
//     }
//   );
// };

// untuk menu home
// export const home = (req, res) => {
//   res.status(200).json({ success: true, message: "Halaman Home" });
// };

// /** 
// * Logout
//  * @param {object} req - Objek permintaan HTTP.
//  * @param {object} res - Objek respons HTTP.
//  * @returns {void}
// */
// //fungsi untuk logout
// export const logout = (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(200).json({ success: true, message: "Logout berhasil" });
//   }

//   // Panggil stored procedure logout
//   koneksiDB.query("CALL logout(?)", [token], (err) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ success: false, message: "Error logout" });
//     }

//     res.clearCookie("token", { path: "/" });
//     return res.status(200).json({ success: true, message: "Logout berhasil" });
//   });
// };

// /** 
// * Mencari data
//  * @param {object} req - Objek permintaan HTTP.
//  * @param {object} res - Objek respons HTTP.
//  * @returns {void}
// */
// //fungsi untuk mencari data di database
// export const search = (req, res) => {
//   const search = req.query.karyawan;

//   // Panggil stored procedure searchKaryawan
//   koneksiDB.query("CALL searchKaryawan(?)", [search], (err, result) => {
//     if (err) {
//       res.status(500).json({
//         message: "Terjadi kesalahan saat melakukan pencarian",
//         error: err,
//       });
//     } else {
//       res.status(200).json({
//         message: "Data berhasil ditemukan",
//         data: result[0],
//       });
//     }
//   });
// };

// /** 
// * Pagination
//  * @param {object} req - Objek permintaan HTTP.
//  * @param {object} res - Objek respons HTTP.
//  * @returns {void}
// */
// //fungsi untuk pagination
// export const pagination = (req, res) => {
//   const halaman = parseInt(req.query.halaman) || 1;
//   const batas = 10;

//   koneksiDB.query(
//     "CALL GetKaryawanByPage(?, ?, @totalPages)",
//     [halaman, batas],
//     (err, results) => {
//       if (err) {
//         console.error(`error saat menggambil data ${err.stack}`);
//         return res.status(500).json({ error: "gagal menggambil data" });
//       }

//       koneksiDB.query(
//         "SELECT @totalPages AS total",
//         (err, totalPagesResult) => {
//           if (err) {
//             console.error(`error saat menggambil data ${err.stack}`);
//             return res.status(500).json({ error: "gagal menggambil data" });
//           }

//           const totalHalaman = totalPagesResult[0].total;

//           // Mengirimkan data hasil query dan informasi pagination ke klien
//           res.json({
//             data: results[0],
//             halaman: halaman,
//             total_halaman: totalHalaman,
//           });
//         }
//       );
//     }
//   );
// };
