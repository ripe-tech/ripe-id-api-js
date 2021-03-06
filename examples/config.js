const yonius = require("yonius");

async function run() {
    await yonius.load();
    const api = new yonius.API();
    api.bind("example", value => console.info(value));
    api.trigger("example", "hello");
    console.info(await yonius.confP("RIPEID_ID"));
}

run();
