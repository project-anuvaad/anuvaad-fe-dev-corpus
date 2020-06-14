import API from "./api";
import C from "../constants";

export default class InsertSentence extends API {
    constructor(sentences, sentenceType, nodeType, timeout = 2000) {
        super('POST', timeout, false);
        this.type = C.INSERT_SENTENCE;

        this.sentence = sentences
        this.sentenceType = sentenceType
        this.nodeType = nodeType

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
        let req = {}
        req.type = this.sentenceType

        if (this.nodeType === "previous") {
            return {
                previous_node: this.sentence,
                sen_node: req
            }
        } else if (this.nodeType === "next") {
            return {
                next_node: this.sentence,
                sen_node: req
            }
        }

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












