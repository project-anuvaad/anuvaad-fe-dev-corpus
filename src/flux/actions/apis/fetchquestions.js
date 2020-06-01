import C from "../constants";
import API from "./api";

export default class FetchQuestions extends API {
    constructor( timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.FEEDBACK_QUESTIONS;
        

        this.feedbackQuestions = []

    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        if (res.data) {
            this.feedbackQuestions = res.data;
        }
    }

    apiEndPoint() {

        return `${super.apiEndPointAuto()}/fetch-feedback-questions`;
    }

    getBody() {
        return {}
    }

    getHeaders() {
        return {
            headers: {
                'Authorization': 'Bearer ' + decodeURI(localStorage.getItem('token')),
                "Content-Type": "application/json",
            }
        }
    }

    getPayload() {
        return this.feedbackQuestions
    }

}