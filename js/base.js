import { OAuth2 } from "./root";

const RIPEID_BASE_URL = "https://id.platforme.com/api/";
const RIPEID_LOGIN_URL = "https://id.platforme.com/";
const RIPEID_SCOPE = ["account.me", "account.acl"];

export class API extends OAuth2 {
    constructor(
        baseUrl = RIPEID_BASE_URL,
        loginUrl = RIPEID_LOGIN_URL,
        clientId = null,
        clientSecret = null,
        redirectUrl = null,
        scope = RIPEID_SCOPE,
        accessToken = null,
        refreshToken = null,
        sessionId = null
    ) {
        super();
        this.baseUrl = baseUrl;
        this.loginUrl = loginUrl;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUrl = redirectUrl;
        this.scope = scope;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.sessionId = sessionId;
    }
}

export default API;
