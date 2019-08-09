/**
 * Sentences API
 */
import API from "./api";
import C from "../constants";


export default class FetchSentences extends API {
    constructor(basename,pageCount,pageno,status="", timeout = 200000) {
        super("GET", timeout, false);
        this.basename = basename;
        this.sentences = null;
        this.type = C.FETCH_SENTENCES;
        this.pagesize=pageCount;
        this.pageno=pageno;
        this.status=status;

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
        if(this.status.item==="ALL" || this.status==="" )
        return `${super.apiEndPointAuto()}/corpus/fetch-sentences?basename=${this.basename}&pagesize=${this.pagesize}&pageno=${this.pageno}`
        else{
            return `${super.apiEndPointAuto()}/corpus/fetch-sentences?basename=${this.basename}&pagesize=${this.pagesize}&pageno=${this.pageno}&status=${this.status.item}`
        }
    }

    getBody() {
        return {}
    }

    getHeaders() {
        this.headers = {
            headers:{}
        };
        return this.headers;
    }

    getPayload() {
        return this.sentences
    }

}
