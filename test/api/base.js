const assert = require("assert");
const ripe = require("../..");

describe("AccountAPI", function() {
    describe("#constructor()", function() {
        it("should be able to contruct a new Acocunt API instance", () => {
            const api = new ripe.API();
            assert.notStrictEqual(api.selfAccount, null);
        });
    });
});
