import { getData } from "../controllers/getDataRoutes";

describe("getData", () => {
  it("Uji coba getData dengan status 200", async () => {
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    await getData({}, res);

    setTimeout(() => {
      expect(res.status).toEqual(200);
    }, 200);
  });
});