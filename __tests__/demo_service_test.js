const demoService = require("../src/demo_service");

beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
})

afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
})

test("get number ",()=> {
    const expectedNumber = 5
    const result = demoService.getNumber(null);
    expect(result).toBe(expectedNumber);
})





test("should be call math random ",()=> {
    const spy = jest.spyOn(global.Math, "random");
    demoService.getNumber(null);
    expect(spy).toBeCalled();
    expect(spy).toBeCalledTimes(1);
})

