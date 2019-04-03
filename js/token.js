export const TokenAPI = superclass =>
    class extends superclass {
        async issueToken() {
            const url = this.baseUrl + "tokens/issue";
            const contents = await this.post(url);
            return contents;
        }

        async redeemToken(token) {
            const url = this.baseUrl + "accounts/redeem";
            const contents = await this.post(url, {
                params: {
                    token: token
                },
                kwargs: {
                    token: false,
                    auth: false
                }
            });
            return contents;
        }
    };

export default TokenAPI;
