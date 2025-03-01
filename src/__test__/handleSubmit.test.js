
const { handleSubmit } = require("../client/js/app");
describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    test("handleSubmit should be defined", () => {
        expect(handleSubmit).toBeDefined();
    });
});
