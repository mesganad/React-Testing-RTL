import { getUser } from "./get-user";

describe("when everthing is ok", () => {
  test("should return a response", async () => {
    //In a real project, you would use axios and mock the get method
    const result = await getUser();
    expect(result).toEqual({ id: "1", name: "David" });
  });
});
