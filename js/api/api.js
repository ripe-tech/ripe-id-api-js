import { Observable } from "./observable";
import fetch from "node-fetch";

export class API extends Observable {
    async get(
        url,
        headers = null,
        params = null,
        handle = null,
        silent = null,
        redirect = null,
        timeout = null,
        callback = null,
        extra = null
    ) {
        const response = await fetch(url, {
            method: "GET"
        });
        let result = await response.blob();
        if (response.headers.get("content-type").toLowerCase() === "application/json") {
            result = JSON.parse(result);
        }
        return result;
    }
}

export default API;
