import API from "./api";
import C from "../constants";

export default class UpdatePdfTable extends API {
    constructor(sentences, operation_type, lastname, password, email, roles, courtId, timeout = 2000) {
        super('POST', timeout, false);
        this.type = C.UPDATE_PDF_TABLE;

        this.sentences = sentences
        this.operation_type = operation_type

        this.usercreate = {}

    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        if (res) {
        debugger
            this.usercreate = res;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/update-pdf-source-table`;
    }

    getBody() {
        return {
            sentences: this.sentences,
            operation_type: this.operation_type,
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
    debugger
    return this.usercreate;
}

}












