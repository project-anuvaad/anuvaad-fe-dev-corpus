/**
 * Translation API
 */
import API from "./api";
import C from "../constants";

export default class FetchTranslations extends API {
    constructor(timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.FETCH_TRANSLATIONS;
        this.translations = {}
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        if (res.data) {
            this.translations = res.data;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/corpus/fetch-translation-process`
    }

    getHeaders() {
        return {
            headers: {
                "Content-Type": "application/json"
            }
        }
    }


    getPayload() {
        return this.translations
    }

}
