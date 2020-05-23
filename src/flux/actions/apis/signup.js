/**
 * Signup API
 */
import API from "./api";
import C from "../constants";

export default class Signup extends API {
    constructor(email, firstName, lastName, password, timeout = 2000) {
        super("POST", timeout, false);
        this.type = C.SIGNUP;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.signupres = null
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        if (res) {
            this.signupres = res;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/signup-user`;
    }

    getBody() {
        return {
            firstname: this.firstName,
            lastname: this.lastName,
            email: this.email,
            password: this.password
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

    getPayload() {
        return this.signupres;
    }
}
