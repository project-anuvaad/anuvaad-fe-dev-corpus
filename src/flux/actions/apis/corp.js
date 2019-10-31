/**
 * Corpus API
 */
import API from "./api";
import C from "../constants";

export default class FetchCorpus extends API {
    constructor(timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.FETCH_CORP;
        this.fetch_corpus_data = {}
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        if (res.data) {
            this.fetch_corpus_data = res.data;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/app/fetch-corpus`
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
        return this.fetch_corpus_data
    }

}
