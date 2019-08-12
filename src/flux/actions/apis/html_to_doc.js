/**
 * Login API
 */
import API from "./api";
import C from "../constants";

export default class HtmlToDoc extends API {
    constructor(html, timeout = 200000) {
        super("POST", timeout, false);
        this.html = html;
        this.type = C.HTML_TO_DOC;
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        // this.answers = res
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
        return `http://localhost:9090/html-to-doc`;
    }

    getBody() {
        return {
            html: this.html
        }
    }

    getHeaders() {

    }

    getPayload() {
        return this.answers
    }

}
