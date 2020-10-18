const userService = require("../../src/user_service");
const userGateway = require("../../src/user_gateway");

beforeEach(() => {
    // jest.spyOn(userService, "searchUser").mockResolvedValue({code : 200, data :[{},{}]});
    jest.spyOn(userGateway, "getAllUser").mockReturnValue(Promise.resolve({code : 200, data :[{},{}]}));
})

afterEach(() => {
    jest.spyOn(userGateway, "getAllUser").mockRestore();
})


test("should return 2 users",async () => {
    // jest.spyOn(userGateway, "getAllUser").mockReturnValue(Promise.resolve({code : 200, data :[{},{}]}));
    const result = await userService.searchUser();
    expect(result.data.length).toBe(2);
})


test("should return search user fail",async () => {
     jest.spyOn(userGateway, "getAllUser").mockReturnValue(Promise.reject({code : 500, data :[]}));
    await userService.searchUser().catch((results) => {
        expect(results.code).toBe(500);
        expect(results.data.length).toBe(0);
    }); 
})