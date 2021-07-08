export const RoleAPI = superclass =>
    class extends superclass {
        async listRoles() {
            const url = this.baseUrl + "roles";
            const contents = await this.get(url);
            return contents;
        }
    };

export default RoleAPI;
