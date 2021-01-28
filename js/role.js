export const RoleAPI = superclass =>
    class extends superclass {
        async listRoles(options = {}) {
            const url = this.baseUrl + "roles";
            const contents = await this.get(url, options);
            return contents;
        }

        async getRole(name) {
            const url = this.baseUrl + `roles/${name}`;
            const contents = await this.get(url);
            return contents;
        }
    };

export default RoleAPI;
