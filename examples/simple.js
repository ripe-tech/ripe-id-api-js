const ripe = require("..");

async function run() {
    await ripe.API.load();
    const api = new ripe.API();
    console.info(await api.oauthAuthorize());
}

run();
