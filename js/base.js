import { OAuth2API, mix, urlEncode, verifyMany, conf } from "yonius";
import { AccountAPI } from "./account";
import { HTTPBinAPI } from "./httpbin";

const RIPEID_BASE_URL = "https://id.platforme.com/api/";
const RIPEID_LOGIN_URL = "https://id.platforme.com/";
const RIPEID_SCOPE = ["account.me", "account.acl"];

export class API extends mix(OAuth2API).with(HTTPBinAPI, AccountAPI) {
    constructor(kwargs = {}) {
        super(kwargs);
        this.baseUrl = conf("RIPEID_BASE_URL", RIPEID_BASE_URL);
        this.loginUrl = conf("RIPEID_LOGIN_URL", RIPEID_LOGIN_URL);
        this.clientId = conf("RIPEID_ID", null);
        this.clientSecret = conf("RIPEID_SECRET", null);
        this.redirectUrl = conf("RIPEID_REDIRECT_URL", null);
        this.baseUrl = kwargs.baseUrl === undefined ? this.baseUrl : kwargs.baseUrl;
        this.loginUrl = kwargs.loginUrl === undefined ? this.loginUrl : kwargs.loginUrl;
        this.clientId = kwargs.clientId === undefined ? this.clientId : kwargs.clientId;
        this.clientSecret = kwargs.clientSecret === undefined ? this.clientSecret : kwargs.clientSecret;
        this.redirectUrl = kwargs.redirectUrl === undefined ? this.redirectUrl : kwargs.redirectUrl;
        this.scope = kwargs.scope === undefined ? RIPEID_SCOPE : kwargs.scope;
        this.accessToken = kwargs.accessToken === undefined ? null : kwargs.accessToken;
        this.refreshToken = kwargs.refreshToken === undefined ? null : kwargs.refreshToken;
        this.sessionId = kwargs.sessionId === undefined ? null : kwargs.sessionId;
    }

    async build(method, url, options = {}) {
        await super.build(method, url, options);
        let params = options.params !== undefined ? options.params : {};
        let kwargs = options.kwargs !== undefined ? options.kwargs : {};
        const auth = kwargs.auth === undefined ? true : kwargs.auth;
        if (auth) params.sid = await this.getSessionId();
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
            const sessionId = this.getSessionId();
            params.sid = sessionId;
        }
    }

    async oauthAuthorize(state = null) {
        let url = this.loginUrl + "oauth2/auth";
        verifyMany([this.clientId, this.redirectUrl, this.scope]);
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

    async oauthAccess(code) {
        const url = this.loginUrl + "oauth2/token";
        const contents = await this.post(url, {
            params: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: "authorization_code",
                redirect_uri: this.redirect_url,
                code: code
            },
            kwargs: {
                token: false,
                auth: false
            }
        });
        this.accessToken = contents.access_token;
        this.refreshToken = contents.refresh_token || null;
        this.trigger("access_token", this.accessToken);
        this.trigger("refresh_token", this.refreshToken);
        return this.accessToken;
    }

    async oauthRefresh() {
        const url = this.loginUrl + "oauth2/token";
        const contents = await this.post(url, {
            callback: false,
            params: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: "refresh_token",
                redirect_uri: this.redirectUrl,
                refresh_token: this.refreshToken
            },
            kwargs: {
                token: false,
                auth: false
            }
        });
        this.accessToken = contents.access_token;
        this.trigger("access_token", this.accessToken);
        return this.accessToken;
    }

    async oauthLogin() {
        const url = this.loginUrl + "oauth2/login";
        const contents = await this.post(url, {
            callback: false,
            kwargs: { token: true, auth: false }
        });
        this.sessionId = contents.session_id || null;
        this.tokens = contents.tokens || null;
        this.trigger("auth", contents);
        return this.sessionId;
    }
}

export default API;
