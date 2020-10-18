const nock = require("nock");
const userGateway = require("../../src/user_gateway");

const API_PORT = 9999;
const API_HOST = "https://jsonplaceholder.cypress.io";

describe("Call service", () => {
    it("Check response from /users from success", async () => {
        // Mock server
        nock(API_HOST)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get("/users").
        reply(200, [{}, {}]);

        // Verify
        const response = await userGateway.getAllUser();
        expect(response.data.length).toEqual(2);
    });

    it("Check response from /users from error", async () => {
        // Mock server
        nock(API_HOST)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get("/users").
        reply(500); 
        
        // Verify
        const response = await userGateway.getAllUser();
        expect(response.code).toEqual(500);
        expect(response.data.length).toEqual(0);
        });

    });