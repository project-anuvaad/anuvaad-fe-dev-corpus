/**
 * Corpus API
 */
import API from "./api";
import C from "../constants";

export default class ConfigUpload extends API {
    constructor(configFile,name, timeout = 2000) {
        super('POST', timeout, false, 'MULTIPART');
        this.type = C.CONFIGUPLOAD;
        this.file = configFile
        this.name = name
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        
        
        console.log("resp",res.data)
        if (res.data) {
            this.config = {'data':res.data, 'name':this.name};
            
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/upload`;
    }

    getFormData() {
        const formData = new FormData();

            formData.append('file', this.file);
            formData.append('name', this.name);
            
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
