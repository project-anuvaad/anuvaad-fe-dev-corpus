/**
 * ForgotPassword API
 */
import API from "./api";
import C from "../constants";

export default class ForgotPassword extends API {
    constructor(email, timeout = 2000) {
        super("POST", timeout, false);
        this.type = C.FORGOTPASSWORD;
        this.email = email;
        this.res = null
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`;
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/forgot-user-password`;
    }

    getBody() {
        return {
            email: this.email
        };
    }

    getHeaders() {
        this.headers = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        return this.headers;
    }

    processResponse(res) {
        super.processResponse(res);
        if (res) {
            this.res = res;
        }
    }

    getPayload() {
        return this.res;
    }
}
