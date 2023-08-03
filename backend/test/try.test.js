import request from "supertest";
import {
  postData,
  getData,
  logout,
  deleteData,
  editData,
  search,
  home,
} from "../controllers/users.js";
import { login } from "../controllers/login.js";
import { register } from "../controllers/regis.js";
import router from "../routes/dataRoutes.js";

// fungsi describe adalah untuk mengelompokan serangkaian tes terkait
describe("postData", () => {
  /*dan fungsi test || it adalah untuk mendefinisikan tes ketika sedang dijalankan. 
  Dan diatas menggunakan async await karna postData melibatkan pemanggilan ke DB yang memerlukan waktu.
  */
  test("Uji coba postData dengan status 200", async () => {
    const res = {
      /* fungsi status dan json adalah metode yang di mock (objek palsu),
      dan jest.fn() adalah fungsi simulasi yang digunakan untuk menggantikan fungsi asli.
       dan mockReturnThis fungsi simulasi untuk mengatur nilai balik dari fungsi menjadi this
      */
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    /* dan fungsi req digunakan untuk membuat objek palsu dalam pengujian, 
    dan ini didapat dari properti body yang di ibaratkan data yang dikirim.
    */
    const req = {
      body: {
        karyawan: "durjana",
        insentif: "123455",
        jumlah: "500",
      },
    };

    /* lalu setelah itu lakukan pemanggilan fungsi postData dari objek
     palsu yang sudah dibuat. dengan melakukan pemanggilan, req sebagai input
    seolah olah dari client, dan res untuk melihat response yang dihasilkan dari postData.
    */
    await postData(req, res);

    setTimeout(() => {
      /* dibawah adalah pernyataan pengujian yang memastikan objek respon palsu dipanggil dengan metode yang sama dari 
      fungsi di code beckend dengan memanggil '.status' dengan argumen 200 (menyesuaikan code dari beckend)
       */
      expect(res.status).toHaveBeenCalledWith(200);
      /* dibawah fungsi nya hampir sama dengan sebelumnya, yang membedakan pemanggilan '.json' demgan argumen yang 
      sesuai dari beckend. dan argumen yang diharapkan dari BE adalah 'message' dan 'data'
       */
      expect(res.json).toHaveBeenCalledWith({
        message: "Post all user succes",
        data: req.body,
      });
    }, 200);
  });
});

// describe("postData", () => {
//   test("Uji coba postData dengan status 400", (done) => {
//     const mockRequest = {
//       body: {},
//     };
//     const mockResponse = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     postData(mockRequest, mockResponse);

//     expect(mockResponse.status).toHaveBeenCalledWith(400);
//     expect(mockResponse.json).toHaveBeenCalledWith({
//       message: "Data tidak boleh kosong",
//     });
//     done();
//   });
// });

// describe("getData", () => {
//   test("Uji coba getData dengan status 200", async () => {
//     const res = {
//       status: jest.fn(() => res),
//       json: jest.fn(),
//     };

//     await getData({}, res);

//     setTimeout(() => {
//       expect(res.status).toHaveBeenCalledWith(200);
//     }, 200);
//   });
// });

// describe("logout", () => {
//   test("Uji coba logout dengan status 200", (done) => {
//     const mockResponse = {
//       status: jest.fn(() => mockResponse),
//       json: jest.fn(),
//       clearCookie: jest.fn(),
//     };
//     const mockRequest = {
//       cookies: {
//         token:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInVzZXJuYW1lIjoic2xoa3VuIiwiZW1haWwiOiJzb2xlaEBnbWFpbC5jb20iLCJpYXQiOjE2ODg5NzY1MDksImV4cCI6MTY4OTA2MjkwOX0.T9QBXEwY_sPKV-IGBinhwaxAG_tveK1964tgQyD8Ac8",
//       },
//     };

//     logout(mockRequest, mockResponse);

//     setTimeout(() => {
//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       expect(mockResponse.json).toHaveBeenCalledWith({
//         message: "Logout berhasil",
//         success: true,
//       });
//       done();
//     }, 200);
//   });
// });

// describe("login", () => {
//   test("Uji coba login dengan status 200", (done) => {
//     const mockResponse = {
//       status: jest.fn(() => mockResponse),
//       json: jest.fn(),
//       cookie: jest.fn(),
//     };
//     const mockRequest = {
//       body: {
//         usernameOrEmail: "slhkun",
//         password: "12345",
//         token:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInVzZXJuYW1lIjoic2xoa3VuIiwiZW1haWwiOiJzb2xlaEBnbWFpbC5jb20iLCJpYXQiOjE2ODg5NzY0MTcsImV4cCI6MTY4OTA2MjgxN30.bHJBAr0HkJVBRSyKp_yM1uR_IXduHc0oIs7OISanBXE",
//       },
//     };

//     login(mockRequest, mockResponse);

//     setTimeout(() => {
//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       expect(mockResponse.json).toHaveBeenCalledWith({
//         message: "Login berhasil.",
//         success: true,
//         token: mockRequest.body.token,
//       });
//       done();
//     }, 200);
//   });
// });

// describe("register", () => {
//   test("should respond with status 200 and registration status message", async () => {
//     const res = {
//       status: jest.fn(() => res),
//       send: jest.fn(),
//     };
//     const req = {
//       body: {
//         nama: "SOLEHCHAN",
//         username: "M SOLEHCHAN",
//         email: "solehchan@gmail.com",
//         password: "12345678",
//       },
//     };

//     // Menjalankan register secara asinkron
//     await register(req, res, async () => {
//       // Pengecekan dalam callback harus juga dilakukan secara asinkron
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.send).toHaveBeenCalledWith("user register success");
//     });
//   }, 5000);
// });

// describe("home", () => {
//   test("Uji coba home dengan status 200", (done) => {
//     const mockResponse = {
//       status: jest.fn(() => mockResponse),
//       json: jest.fn(),
//     };

//     home({}, mockResponse);

//     setTimeout(() => {
//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       done();
//     }, 200);
//   });
// });

// describe("deleteData", () => {
//   test("Uji coba deleteData dengan status 200", (done) => {
//     const mockResponse = {
//       status: jest.fn(() => mockResponse),
//       json: jest.fn(),
//     };
//     const mockRequest = {
//       params: {
//         id: "142",
//       },
//     };

//     const mockResult = {
//       affectedRows: 1,
//       changedRows: 0,
//       fieldCount: 0,
//       insertId: 0,
//       message: "",
//       protocol41: true,
//       serverStatus: 2,
//       warningCount: 0,
//     };

//     deleteData(mockRequest, mockResponse);
//     setTimeout(() => {
//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       expect(mockResponse.json).toHaveBeenCalledWith({
//         message: `data dengan ID ${mockRequest.params.id} berhasil dihapus`,
//         data: mockResult,
//       });
//       done();
//     }, 200);
//   });
// });

// describe("editData", () => {
//   test("Uji coba editData dengan status 200", (done) => {
//     const mockResponse = {
//       status: jest.fn(() => mockResponse),
//       json: jest.fn(),
//     };
//     const mockRequest = {
//       params: {
//         id: "44",
//       },
//       body: {
//         karyawan: "siti",
//         insentif: "3000",
//         jumlah: "550",
//       },
//     };
//     editData(mockRequest, mockResponse);
//     setTimeout(() => {
//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       expect(mockResponse.json).toHaveBeenCalledWith({
//         message: `Data dengan ID ${mockRequest.params.id} berhasil di ubah`,
//         data: mockRequest.body,
//       });
//       done();
//     }, 200);
//   });
// });

// describe("search", () => {
//   test("Uji coba search dengan status 200", (done) => {
//     const mockResponse = {
//       status: jest.fn(() => mockResponse),
//       json: jest.fn(),
//     };
//     const mockRequest = {
//       query: {
//         karyawan: ["adit"],
//       },
//     };

//     const mockRows = [
//       {
//         id: 46,
//         insentif: "Fullstack Developer",
//         jumlah: 4500,
//         karyawan: "adit",
//       },
//     ];

//     search(mockRequest, mockResponse);
//     setTimeout(() => {
//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       expect(mockResponse.json).toHaveBeenCalledWith({
//         message: `Data berhasil ditemukan`,
//         data: mockRows,
//       });
//       done();
//     }, 200);
//   });
// });
