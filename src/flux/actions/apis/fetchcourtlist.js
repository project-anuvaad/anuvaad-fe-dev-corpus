import C from "../constants";
import API from "./api";

export default class CourtList extends API {
    constructor( timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.COURT_LIST;
        

        this.courtList = []

    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        if (res.data) {
            this.courtList = res.data;
        }
    }

    apiEndPoint() {

        return `${super.apiEndPointAuto()}/fetch-high-courts`;
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
        return this.courtList
    }

}