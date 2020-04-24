import API from "./api";
import C from "../constants";

export default class FetchDoc extends API {
    constructor(session, timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.FETCH_PDFSENTENCE;
        this.session_id = session;
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
        return `${super.apiEndPointAuto()}/fetch-pdf-sentences?session_id=${this.session_id}`
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
