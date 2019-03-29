const ripe = require("..");
const yonius = require("yonius");

async function run() {
    await yonius.load();
    const api = new ripe.API();
    console.info(await api.oauthAuthorize());
    /*console.info(await api.ip());
    console.info(await api.headers());
    console.info(await api.headers(...[undefined]));*/
}

run();
