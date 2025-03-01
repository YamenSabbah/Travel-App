// Import dependencies
const request = require("supertest");
const { app } = require("../server/server"); // Import your Express app

// Test for POST /getGeo
describe("POST /getGeo", () => {
    it("should return city data", async () => {
        const city = "London"; // Example city
        const response = await request(app).post("/getGeo").send({ city });
        expect(response.body).toHaveProperty("geonames"); // Check if 'geonames' property is in response
    });
});
