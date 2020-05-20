import API from "./api";
import C from "../constants";


export default class RunExperiment extends API {
  constructor(sentences, timeout = 2000) {
    console.log();
    super("POST", timeout, false);
    this.type = C.UPDATEINTERACTIVESENTENCE;
    this.sentences = sentences;
    
    
    
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
    return `${super.apiEndPointAuto()}/merge-split-sentence`;
  }

  getBody() {
    return {
        sentences:this.sentences
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