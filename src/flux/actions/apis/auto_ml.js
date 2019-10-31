/**
 * Login API
 */
import API from "./api";
import C from "../constants";


export default class AutoML extends API {
    constructor(text, source, target, timeout = 200000) {
        super("POST", timeout, false);
        this.text = text;
        this.source = source;
        this.target = target
        this.type = C.AUTO_ML;
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        this.answers = res
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/app/translate`;
    }

    getBody() {
        return {
            text: this.text,
            target_lang: this.target
        }
    }

    getHeaders() {
        this.headers = {
            headers: {
                'Authorization': 'Bearer '+decodeURI(localStorage.getItem('token')), 
                "Content-Type": "application/json"
            }
        };
        return this.headers;
    }

    getPayload() {
        return this.answers
    }

}
