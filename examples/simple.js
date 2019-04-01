const yonius = require("yonius");
const ripe = require("..");

async function run() {
    await yonius.load();
    const api = new ripe.API();
    console.info(await api.oauthAuthorize());
}

run();
