/**
 * Login API
 */
import API from "./api";
import C from "../constants";

export default class NMT extends API {
    constructor(par, model, reverse, timeout = 200000) {
        super("POST", timeout, false);
        this.par = par;
        this.model = model;
        this.reverse = reverse
        this.answers = null;
        this.type = C.NMT;
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        if (res.response_body) {
            this.answers = [res.response_body[0].tgt]
        }
        // if (res.token) {
        //     this.token = res.token;
        //     this.expires = res.expires;
        //     this.role = res.role;
        //     this.userid = res.userid;
        //     this.name = res.name;
        //     // sessionStorage.setItem('user', JSON.stringify(res.user))
        // }
    }

    apiEndPoint() {
        return this.reverse ? `http://52.40.71.62:3003/translator/translation_en` : `http://52.40.71.62:3003/translator/translation_hi`;
    }

    getBody() {
        return [{
            "src": this.par, "id": this.model
        }]
    }

    getHeaders() {
        this.headers = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        return this.headers;
    }

    getPayload() {
        return this.answers
    }

}
