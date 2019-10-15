import API from "./api";
import C from "../constants";


export default class UpdateSentences extends API {
    constructor(updateSentence,modelid, timeout = 2000) {
        super('POST', timeout, false);
        this.type = C.UPDATE_SENTENCE_GRADE;
        this.updateSentence = updateSentence;
        this.modelid = modelid;
        this.sentences=[]
        
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        if (res) {
            this.sentences = res;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/app/update-sentences-grade`;
    }

    getBody() {
        return {
          sentences:[this.updateSentence],
          modelid:this.modelid
        };
      }
      getHeaders() {
    this.headers = {
      headers: {
        'Authorization': 'Bearer '+decodeURI(localStorage.getItem('token')),
        "Content-Type": "application/json"
      }
    };
    return this.headers;
  }

    getPayload() {
        return this.sentences;
    }

}