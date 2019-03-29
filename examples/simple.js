const yonius = require("yonius");
const ripe = require("..");

async function run() {
    await yonius.load();
    const api = new ripe.API();
    console.info(await api.oauthAuthorize());
    /*console.info(await api.ip());
    console.info(await api.headers());
    console.info(await api.headers(...[undefined]));*/
}

run();
