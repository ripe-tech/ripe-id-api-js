export const AccountAPI = superclass =>
    class extends superclass {
        async selfAccount() {
            const url = this.baseUrl + "accounts/me";
            const contents = await this.get(url);
            return contents;
        }

        async updateSelfAccount(account) {
            const url = this.baseUrl + "accounts/me";
            account = Object.assign({}, account);
            if (account.meta_extra) {
                account.meta_extra = JSON.stringify(account.meta_extra);
            }
            const contents = await this.put(url, {
                dataM: account
            });
            return contents;
        }

        async aclAccount() {
            const url = this.baseUrl + "accounts/acl";
            const contents = await this.get(url);
            return contents;
        }

        async listAccounts(options = {}) {
            const url = this.baseUrl + "accounts";
            const contents = await this.get(url, options);
            return contents;
        }

        async createAccount(account, sendEmail = false) {
            const url = this.baseUrl + "accounts";
            const contents = await this.post(url, {
                params: { send_email: sendEmail },
                dataJ: account
            });
            return contents;
        }

        async getAccount(username) {
            const url = this.baseUrl + `accounts/${username}`;
            const contents = await this.get(url);
            return contents;
        }

        async notifyAccount(username, engine, payload) {
            payload =
                typeof payload === "string"
                    ? { subject: payload, title: payload, contents: payload }
                    : payload;
            const url = this.baseUrl + `accounts/${username}/notify`;
            const contents = await this.put(url, {
                dataJ: Object.apply({}, payload, { engine: engine })
            });
            return contents;
        }

        async recoverAccount(username) {
            const url = this.baseUrl + `accounts/${username}/recover`;
            const contents = await this.post(url, {
                kwargs: {
                    auth: false
                }
            });
            return contents;
        }

        showUrlAccount(username) {
            return this.loginUrl + `accounts/${username}`;
        }

        avatarUrlAccount(username) {
            return this.loginUrl + `accounts/${username}/avatar`;
        }
    };

export default AccountAPI;
