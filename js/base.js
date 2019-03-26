import { OAuth2API, mix, urlEncode, verifyMany } from "yonius";
import { AccountAPI } from "./account";
import { HTTPBinAPI } from "./httpbin";

const RIPEID_BASE_URL = "https://id.platforme.com/api/";
const RIPEID_LOGIN_URL = "https://id.platforme.com/";
const RIPEID_SCOPE = ["account.me", "account.acl"];

export class API extends mix(OAuth2API).with(HTTPBinAPI, AccountAPI) {
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

    async build(
        method,
        url,
        data = null,
        dataJ = null,
        dataM = null,
        headers = null,
        params = null,
        mime = null,
        kwargs = null
    ) {
        super.build(
            method,
            url,
            data,
            dataJ,
            dataM,
            headers,
            params,
            mime,
            kwargs
        );
        const auth = kwargs.auth === undefined ? true : kwargs.auth;
        if (auth) params.sid = await self.getSessionId();
    }

    async getSessionId() {
        if (this.sessionId) return this.sessionId;
        return this.oauthLogin();
    }

    async authCallback(params, headers) {
        if (this.refresh_token) {
            this.oauthRefresh();
            params.access_token = this.getAccessToken();
        }

        if (this.sessionId) {
            this.sessionId = null;
            const sessionId = self.getSessionId();
            params.sid = sessionId;
        }
    }

    async oauthAuthorize(state = null) {
        let url = this.loginUrl + "oauth2/auth";
        verifyMany((
            this.clientId,
            this.redirectUrl,
            this.scope
        ));
        const values = {
            client_id: this.clientId,
            redirect_uri: this.redirectUrl,
            response_type: "code",
            scope: this.scope.join(" ")
        };
        if (state) values.state = state;
        const data = urlEncode(values);
        url = url + "?" + data;
        return url;
    }
}

export default API;
