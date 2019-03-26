import { OAuth2API, mix } from "yonius";
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
        //appier.verifyMany((
        //    self.client_id,
        //   self.redirect_url,
        //     self.scope
        //)) // @todo implement this on the yonius
        const values = {
            client_id: this.clientId,
            redirect_uri: this.redirectUrl,
            response_type: "code",
            scope: this.scope.join(" ")
        };
        if (state) values.state = state;
        const data = this._urlEncode(values); //@todo use yonius
        url = url + "?" + data;
        return url;
    }

    _urlEncode(values) {
        // constructs the parts array that is going to
        // store the multiple and values
        const parts = [];

        // in case the provided value is not an array
        // then assumes it's an object and retrieve entries
        if (!Array.isArray(values)) {
            values = Object.entries(values);
        }

        // iterates over the complete set of pairs available
        // from the key value pairs to be able to encode them
        // properly, notice that the values themselves can be
        // sequences allowing multiple repetition of key
        values.forEach(([key, value]) => {
            if (!Array.isArray(value)) {
                value = [value];
            }
            const keyEncoded = encodeURIComponent(key);
            value.forEach(_value => {
                if (_value === undefined || _value === null) {
                    return;
                }
                const valueEncoded = encodeURIComponent(_value);
                parts.push(`${keyEncoded}=${valueEncoded}`);
            });
        });

        // joins the complete set of parts with the and
        // separator and then returns the final string value
        return parts.join("&");
    }
}

export default API;
