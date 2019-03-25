const ripe = require("..");

async function run() {
    const api = new ripe.API();
    console.info(await api.ping());
    console.info(await api.hello());
    console.info(await api.ip());
}

run();
