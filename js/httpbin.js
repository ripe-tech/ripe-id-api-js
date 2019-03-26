export const HTTPBinAPI = {
    httpbinUrl: "https://httpbin.stage.hive.pt/",
    ip: async function() {
        const url = this.httpbinUrl + "ip";
        const result = await this.get(url);
        return result;
    },
    headers: async function(headers = null) {
        const url = this.httpbinUrl + "headers";
        const result = await this.get(url, headers || { hello: "world" });
        return result;
    }
};

export default HTTPBinAPI;
