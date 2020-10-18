const request = require("supertest");
const nock = require("nock");
const app = require("../../src/app");
const userService = require("../../src/user_service");

beforeEach(() => {
    nock("https://jsonplaceholder.cypress.io")
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get("/users").
    reply(200, [{}, {}]);

})

afterEach(() => {
    jest.clearAllMocks();
})


test("should return 2 users", async() => {
    await request(app)
    .get('/api/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
        expect(response.body.length).toBe(2)
    })
})

test("should return 404", (done) => {
    jest.spyOn(userService, "searchUser").mockResolvedValue({code : 200, data :[]});

  request(app)
    .get('/api/users')
    .expect('Content-Type', /json/)
    .expect(404)
    .end(function(err, res) {
        if (err) throw err;
        done();
      });
})

test("should return 500", (done) => {
    jest.spyOn(userService, "searchUser").mockRejectedValue({code : 500, data :[]});
    // jest.spyOn(userService, "searchUser").mockReturnValue(Promise.reject({code : 500, data :[]}));

  request(app)
    .get('/api/users')
    .expect('Content-Type', /json/)
    .expect(500)
    .end(function(err, res) {
        if (err) throw err;
        done();
      });
})





