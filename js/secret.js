export const SecretAPI = superclass =>
    class extends superclass {
        async createSecret(secret) {
            const url = this.baseUrl + "secrets";
            const contents = await this.post(url, { dataJ: secret });
            return contents;
        }

        async getSecret(name) {
            const url = this.baseUrl + `secrets/${name}`;
            const contents = await this.get(url);
            return contents;
        }
    };

export default SecretAPI;
