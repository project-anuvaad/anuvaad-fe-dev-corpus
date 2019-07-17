/**
 * Benchmark API
 */
import API from "./api";
import C from "../constants";

export default class Benchmark extends API {
    constructor(file, corpus_type, timeout = 2000) {
        super('POST', timeout, false, 'MULTIPART');
        this.type = C.BENCHMARK;
        this.file = file
        this.corpus_type = corpus_type
        this.corpus_data = {}
        this.bleu_for_uploaded_file = 0
        this.google = 0
        this.custom = 0
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        console.log(res)
        if (res.response_body) {
            this.bleu_for_uploaded_file = res.response_body.bleu_for_uploaded_file
            if (res.response_body.google_api)
                this.google = res.response_body.google_api[this.corpus_type]
            if (res.response_body.openNMT_custom)
                this.custom = res.response_body.openNMT_custom[this.corpus_type]
        }
    }

    apiEndPoint() {
        return `http://52.40.71.62:3003/translator/upload-tgt`;
    }

    getFormData() {
        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('type', this.corpus_type);
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
        return { bleu: this.bleu_for_uploaded_file, google: this.google, custom: this.custom }
    }

}