import API from "./api";
import C from "../constants";

export default class FetchBenchmarkModel extends API {
    constructor(basename, model, pagesize, pageno,status, timeout = 200000) {
        super("GET", timeout, false);
        this.modelid = model;
        this.basename = basename;
        this.sentences = null;
        this.pagesize = pagesize;
        this.pageno = pageno;
        this.status = status;
        this.type = C.FETCH_BENCHMARK_MODEL;
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        if (res) {
            this.sentences = res
        }
    }

    apiEndPoint() {
        console.log('sajish')
        
        return `${super.apiEndPointAuto()}/app/fetch-benchmark-sentences?basename=${this.basename}&modelid=${this.modelid}&pagesize=${this.pagesize}&pageno=${this.pageno}&status=${this.status}`
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
        return this.sentences
    }

}