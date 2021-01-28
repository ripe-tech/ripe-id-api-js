export const AccountAPI = superclass =>
    class extends superclass {
        async selfAccount() {
            const url = this.baseUrl + "accounts/me";
            const contents = await this.get(url);
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

        avatarUrlAccount(username) {
            return this.baseUrl + `accounts/${username}/avatar`;
        }
    };

export default AccountAPI;
