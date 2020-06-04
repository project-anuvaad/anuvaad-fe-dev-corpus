import API from "./api";
import C from "../constants";


export default class RunExperiment extends API {
  constructor(sentences,updateSentence, timeout = 2000) {
    console.log();
    super("POST", timeout, false);
    this.type = C.UPDATESOURCESENTENCE;
    this.sentences = sentences;
    this.updateSentence = updateSentence;
    
    
    
    
  }

  toString() {
    return `${super.toString()} , type: ${this.type}`;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.sentences = res;
    }
  }

  apiEndPoint() {
    return `${super.apiEndPointAuto()}/update-pdf-source-sentences`;
  }

  getBody() {
    
    return {
        "sentence": this.sentences,
        "update_sentence" : this.updateSentence,
        
    };
  }

  getHeaders() {
    this.headers = {
      headers: {
        Authorization: `Bearer ${  decodeURI(localStorage.getItem("token"))}`,
        "Content-Type": "application/json"
      }
    };
    return this.headers;
  }

  getPayload() {
    return this.sentences;
  }
}