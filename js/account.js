export const AccountAPI = {
    selfAccount: async function() {
        const url = this.baseUrl + "accounts/me";
        const contents = await this.get(url);
        return contents;
    },
    aclAccount: async function() {
        const url = this.baseUrl + "accounts/acl";
        const contents = await this.get(url);
        return contents;
    }
};

export default AccountAPI;
