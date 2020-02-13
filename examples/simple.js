const ripeId = require("..");

async function run() {
    await ripeId.API.load();
    const api = new ripeId.API();
    console.info(await api.oauthAuthorize());
}

run();
