/**
 * Corpus API
 */
import API from "./api";
import C from "../constants";

export default class Translation extends API {
    constructor(deleteFile, timeout = 2000) {
        super('POST', timeout, false, 'MULTIPART');
        this.type = C.DELETE;
        this.deleteFile = deleteFile

        this.pdf_translate = {}

    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        if (res.data) {
            this.pdf_translate = res.data;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/corpus/remove-process`;
    }

    getFormData() {
        const formData = new FormData();
        formData.append('processname', this.deleteFile);
        return formData;
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    }

    getPayload() {
        return this.pdf_translate
    }

}
