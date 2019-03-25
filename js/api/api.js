import { Observable } from "./observable";
import fetch from "node-fetch";
import "regenerator-runtime/runtime";

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
        let result = null;
        if (response.headers.get("content-type").toLowerCase() === "application/json") {
            result = await response.json();
        } else {
            result = await response.blob();
        }
        return result;
    }
}

export default API;
