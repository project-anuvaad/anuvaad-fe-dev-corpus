import API from "./api";
import C from "../constants";

export default class FetchProfile extends API {
    constructor(timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.USER_AUTH;
        this.userDetails={}
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        console.log(res)
        super.processResponse(res)
        if (res.data) {
            this.userDetails = res.data;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/get-profile`;
    }

    getBody() {
        return {}
    }

    getHeaders() {
        return {
            headers: {
                'Authorization': 'Bearer '+decodeURI(localStorage.getItem('token')),
                "Content-Type": "application/json",
            }
        }
    }

    getPayload() {
        return this.userDetails
    }

}