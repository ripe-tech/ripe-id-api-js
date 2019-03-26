import { OAuth2API } from "yonius";
import { AccountAPI } from "./account";

const RIPEID_BASE_URL = "https://id.platforme.com/api/";
const RIPEID_LOGIN_URL = "https://id.platforme.com/";
const RIPEID_SCOPE = ["account.me", "account.acl"];

export class API extends AccountAPI(OAuth2API) {
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

    async ping() {
        return "pong";
    }

    async hello() {
        const result = await this.get("https://www.hive.pt/");
        return result;
    }

    async ip() {
        const result = await this.get("https://httpbin.stage.hive.pt/ip");
        return result;
    }

    async headers(headers = null) {
        const result = await this.get(
            "https://httpbin.stage.hive.pt/headers",
            headers || { hello: "world" }
        );
        return result;
    }
}

export default API;
