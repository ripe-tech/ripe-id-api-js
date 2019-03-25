class API {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || "http://www.sapo.pt";
    }
}

if (typeof module !== "undefined") {
    module.exports = {
        API: API
    };
}
