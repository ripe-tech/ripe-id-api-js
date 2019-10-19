const assert = require("assert");
const ripe = require("../..");

describe("AccountAPI", function() {
    describe("#constructor()", function() {
        it("should be able to contruct a new Acocunt API instance", () => {
            const api = new ripe.API();
            assert.notStrictEqual(api.selfAccount, null);
            assert.notStrictEqual(api.selfAccount, undefined);
        });
    });

    describe("#oauthAuthorize()", function() {
        it("should be able to generate a simple authorize URL", async () => {
            const api = new ripe.API({
                clientId: "dummy",
                clientKey: "dummy",
                redirectUrl: "http://dummy.com/redirect"
            });
            const result = await api.oauthAuthorize("data");
            assert.strictEqual(
                result,
                "https://id.platforme.com/oauth2/auth?client_id=dummy&redirect_uri=http%3A%2F%2Fdummy.com%2Fredirect&response_type=code&scope=account.me%20account.acl&state=data"
            );
        });
    });
});
