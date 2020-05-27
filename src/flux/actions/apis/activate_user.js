/**
 * ActivateUser API
 */
import API from "./api";
import C from "../constants";

export default class ActivateUser extends API {
    constructor(uid, rid, timeout = 2000) {
        super("POST", timeout, false);
        this.type = C.ACTIVATE;
        this.uid = uid;
        this.rid = rid;
        this.activateres = null
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        if (res) {
            this.activateres = res;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/activate-account`;
    }

    getBody() {
        return {
            u_id: this.uid,
            r_id: this.rid,
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
        return this.activateres;
    }
}
