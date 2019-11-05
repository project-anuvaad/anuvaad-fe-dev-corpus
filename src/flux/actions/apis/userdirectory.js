import C from "../constants";
import API from "./api";

export default class UserDirectory extends API {
    constructor( timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.USER_DIRECTORY;
        

        this.userDetails = []

    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        console.log("res",res.data)
        if (res.data) {
            this.userDetails = res.data;
        }
    }

    apiEndPoint() {

        return `${super.apiEndPointAuto()}/app/list-users`;
    }

    getBody() {
        return {}
    }

    getHeaders() {
        return {
            headers: {
                'Authorization': 'Bearer ' + decodeURI(localStorage.getItem('token')),
                "Content-Type": "application/json",
            }
        }
    }

    getPayload() {
        return this.userDetails
    }

}