const ripe = require("..");

async function run() {
    const api = new ripe.API();
    console.info(await api.oauthAuthorize());
    /*console.info(await api.ip());
    console.info(await api.headers());
    console.info(await api.headers(...[undefined]));*/
}

run();
