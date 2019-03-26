export const HTTPBinAPI = superclass =>
    class extends superclass {
        constructor() {
            super();
            this.httpbinUrl = "https://httpbin.stage.hive.pt/";
        }

        async ip() {
            const url = this.httpbinUrl + "ip";
            const result = await this.get(url);
            return result;
        }

        async headers(headers = null) {
            const url = this.httpbinUrl + "headers";
            const result = await this.get(url, {
                headers: headers || { hello: "world" }
            });
            return result;
        }
    };

export default HTTPBinAPI;
