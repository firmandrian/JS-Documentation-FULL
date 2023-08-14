import { postData } from "../controllers/postDataRoutes";

describe("postData", () => {
    /*dan fungsi test || it adalah untuk mendefinisikan tes ketika sedang dijalankan. 
    Dan diatas menggunakan async await karna postData melibatkan pemanggilan ke DB yang memerlukan waktu.
    */
    it("Uji coba postData dengan status 200", async () => {
      const res = {
        /* fungsi status dan json adalah metode yang di mock (objek palsu),
        dan jest.fn() adalah fungsi simulasi yang digunakan untuk menggantikan fungsi asli.
         dan mockReturnThis fungsi simulasi untuk mengatur nilai balik dari fungsi menjadi this
        */
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
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

    it("Uji coba postData dengan status 400", () => {
        const mockRequest = {
            body: {},
        };
        const mockResponse = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        
        postData(mockRequest, mockResponse);
        
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Data tidak boleh kosong",
        });
        });
      
  });
