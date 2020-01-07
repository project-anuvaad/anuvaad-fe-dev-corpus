/**
 * Corpus API
 */
import API from "./api";
import C from "../constants";

export default class FetchCorpus extends API {
    constructor(pagesize, pageno, timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.FETCH_WORKSPACE;
        this.pagesize = pagesize;
    this.pageno = pageno;
    
        this.fetch_workspace = {}
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        console.log(res)
        super.processResponse(res)
        if (res.data) {
            this.fetch_workspace =  {'data':res.data, 'count':res.count};
        }
    }

    apiEndPoint() {

        return `${super.apiEndPointAuto()}/fetch-mt-workspace?pagesize=${
   this.pagesize
 }&pageno=${this.pageno}`;
    }

    getHeaders() {
        return {
            headers: {
                'Authorization': 'Bearer '+decodeURI(localStorage.getItem('token')), 
                "Content-Type": "application/json"
            }
        }
    }


    getPayload() {
        return this.fetch_workspace
    }

}
