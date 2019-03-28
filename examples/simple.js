const yonius = require("yonius");
const ripe = require("..");

async function run() {
    const baseUrl = yonius.conf("RIPEID_BASE_URL");
    const loginUrl = yonius.conf("RIPEID_LOGIN_URL");
    const clientId = yonius.conf("RIPEID_CLIENT_ID");
    const clientSecret = yonius.conf("RIPEID_CLIENT_SECRET");
    const api = new ripe.API(baseUrl, loginUrl, clientId, clientSecret);
    console.info(await api.ip());
    console.info(await api.headers());
    console.info(await api.headers(...[undefined]));
}

run();
