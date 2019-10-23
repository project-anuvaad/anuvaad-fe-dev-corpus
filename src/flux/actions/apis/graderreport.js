import API from "./api";
import C from "../constants";

export default class GraderReport extends API {
    constructor(from_date,to_date, timeout = 200000) {
        super("GET", timeout, false);
        this.from_date = from_date;
        this.to_date = to_date;
        this.report = null;
        this.type = C.FETCH_GRADER_REPORT;
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        if (res) {
            this.report = res
        }
    }

    apiEndPoint() {
        console.log(this.from_date,this.to_date)
        return `${super.apiEndPointAuto()}/app/fetch-benchmark-reports?from_date=${this.from_date}&to_date=${this.to_date}`
    }

    getBody() {
        return {}
    }

    getHeaders() {
        this.headers = {
            headers:{

                'Authorization': 'Bearer '+decodeURI(localStorage.getItem('token'))
            }
        };
        return this.headers;
    }

    getPayload() {
        return this.report
    }

}