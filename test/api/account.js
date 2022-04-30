const assert = require("assert");
const ripe = require("../..");

describe("AccountAPI", function() {
    describe("#avatarUrlAccount()", function() {
        it("should be able to generate simple avatar URLs", () => {
            const api = new ripe.API();
            const result = api.avatarUrlAccount("dummy");
            assert.strictEqual(result, "https://id.platforme.com/accounts/dummy/avatar");
        });

        it("should be able to generate cached avatar URLs", () => {
            const api = new ripe.API();
            const result = api.avatarUrlAccount("dummy", { cache: true });
            assert.strictEqual(result, "https://id.platforme.com/accounts/dummy/avatar?cache=1");
        });
    });
});
