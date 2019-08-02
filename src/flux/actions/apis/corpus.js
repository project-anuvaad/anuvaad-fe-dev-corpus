/**
 * Corpus API
 */
import API from "./api";
import C from "../constants";

export default class CreateCorpus extends API {
    constructor(file,hindiFile, englishFile, corpus_type,name,domain,comment, timeout = 2000) {
        super('POST', timeout, false, 'MULTIPART');
        this.type = C.CREATE_CORPUS;
        this.file = file
        this.hindiFile = hindiFile
        this.englishFile = englishFile
        this.corpus_type = corpus_type
        this.corpus_data = {}
        this.add_name = name
        this.domain = domain
        this.comment = comment
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        console.log("sdsfs",res)
        if (res.data) {
            this.corpus_data = res.data;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/corpus/multiple`;
    }

    getFormData() {
        const formData = new FormData();
        console.log('hindi', this.hindiFile,'english', this.englishFile);
        console.log(this.comment);

            formData.append('hindi', this.hindiFile);
            formData.append('english', this.englishFile);
            formData.append('name',this.add_name);
            formData.append('domain',this.domain);
            formData.append('comment',this.comment);
        return formData;
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
    }

    getPayload() {
        return this.corpus_data
    }

}
