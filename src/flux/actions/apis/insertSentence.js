import API from "./api";
import C from "../constants";

export default class InsertSentence extends API {
    constructor(sentences, table_cell, operationType, timeout = 2000) {
        super('POST', timeout, false);
        this.type = C.INSERT_SENTENCE;

        this.sentence = sentences
        this.table_cell = table_cell
        this.operationType = operationType

        this.insertSentence = {}

    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        if (res) {
            this.insertSentence = res;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/add-sentence-node`;
    }

    getBody() {
        return {
            sentence: this.sentence,
            table_cell: this.table_cell,
            operation_type: this.operationType
    };
}

getHeaders() {
    this.headers = {
        headers: {
            'Authorization': 'Bearer ' + decodeURI(localStorage.getItem('token')),
            "Content-Type": "application/json"
        }
    };
    return this.headers;
}

getPayload() {
    return this.insertSentence;
}

}












