import { editData } from "../controllers/updateDataRoutes";

describe("editData", () => {
  it("Uji coba editData dengan status 200", (done) => {
    const mockResponse = {
      status: vi.fn(() => mockResponse),
      json: vi.fn(),
    };
    const mockRequest = {
      params: {
        id: "142",
      },
      body: {
        karyawan: "durian",
        insentif: "3000",
        jumlah: "550",
      },
    };
    editData(mockRequest, mockResponse);
    setTimeout(() => {
      expect(mockResponse.status).toEqual(200);
      expect(mockResponse.json).toEqual({
        message: `Data dengan ID ${mockRequest.params.id} berhasil di ubah`,
        data: mockRequest.body,
      });
      done();
    }, 200);
  });
});