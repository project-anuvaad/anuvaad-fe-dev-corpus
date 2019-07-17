/**
 * Sentences API
 */
import API from "./api";
import C from "../constants";

export default class FetchSentences extends API {
    constructor(basename, timeout = 200000) {
        super("GET", timeout, false);
        this.basename = basename;
        this.sentences = null;
        this.type = C.FETCH_SENTENCES;
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        if (res.data) {
            this.sentences = res.data
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/corpus/fetch-sentences?basename=${this.basename}`
    }

    getBody() {
        return {}
    }

    getHeaders() {
        this.headers = {
            headers:{}
        };
        return this.headers;
    }

    getPayload() {
        return this.sentences
    }

}
