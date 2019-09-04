/**
 * Sentences API
 */
import API from "./api";
import C from "../constants";


export default class FetchSentences extends API {
    constructor(basename,pageCount,pageno,status="",accuracy, timeout = 200000) {
        super("GET", timeout, false);
        this.basename = basename;
        this.sentences = null;
        this.type = C.FETCH_SENTENCES;
        this.pagesize=pageCount;
        this.pageno=pageno;
        this.status=status;
        this.accuracy= accuracy;

    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }

    processResponse(res) {
        console.log("res",res)
        super.processResponse(res);
        if (res) {
            this.sentences = res
        }
    }

    apiEndPoint() {
        console.log(this.status)
        if(this.status.item==="ALL" || this.status==="" || this.status==="ALL" )
        return `${super.apiEndPointAuto()}/app/fetch-sentences?basename=${this.basename}&pagesize=${this.pagesize}&pageno=${this.pageno}`
        else{
            return `${super.apiEndPointAuto()}/app/fetch-sentences?basename=${this.basename}&pagesize=${this.pagesize}&pageno=${this.pageno}&status=${this.status.item}`
        }
    }

    getBody() {
        return {}
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
        return this.sentences
    }

}
