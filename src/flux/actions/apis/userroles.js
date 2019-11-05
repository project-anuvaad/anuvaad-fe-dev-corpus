import C from "../constants";
import API from "./api";

export default class UserRoles extends API {
    constructor( timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.USER_ROLES;
        

        this.userRoles = []

    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        console.log("res",res.data)
        if (res.data) {
            this.userRoles = res.data;
        }
    }

    apiEndPoint() {

        return `${super.apiEndPointAuto()}/app/list-roles`;
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
        return this.userRoles
    }

}