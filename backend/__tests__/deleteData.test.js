import { deleteData } from "../controllers/deleteDataRoutes";

describe("deleteData", () => {
  test("Uji coba deleteData dengan status 200", (done) => {
    const mockResponse = {
      status: vi.fn(() => mockResponse),
      json: vi.fn(),
    };
    const mockRequest = {
      params: {
        id: "141",
      },
    };

    const mockResult = {
      affectedRows: 1,
      changedRows: 0,
      fieldCount: 0,
      insertId: 0,
      message: "",
      protocol41: true,
      serverStatus: 2,
      warningCount: 0,
    };

    deleteData(mockRequest, mockResponse);
    setTimeout(() => {
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: `data dengan ID ${mockRequest.params.id} berhasil dihapus`,
        data: mockResult,
      });
      done();
    }, 200);
  });
});