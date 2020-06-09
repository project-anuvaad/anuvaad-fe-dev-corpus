/**
 * Corpus API
 */
import API from "./api";
import C from "../constants";

export default class ConfigUpload extends API {
    constructor(configFile,name, timeout = 2000) {
        super('POST', timeout, false, 'MULTIPART');
        this.type = C.PDFCONFIGUPLOAD;
        this.file = configFile
        this.name = name
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        
        if (res.data) {
            this.config = res.data;
            
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/upload`;
    }

    getFormData() {
        return this.file;
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
    }

    getPayload() {
        return this.config
    }

}
