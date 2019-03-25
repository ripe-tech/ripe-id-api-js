const ripe = require("..");

async function tobias() {
    const api = new ripe.API();
    const result = await api.ping();
    console.info(result);
}

tobias();
