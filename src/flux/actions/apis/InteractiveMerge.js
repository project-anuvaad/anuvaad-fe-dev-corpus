import API from "./api";
import C from "../constants";


export default class RunExperiment extends API {
  constructor(sentences,startSentence, endSentence, operation_type, timeout = 2000) {
    console.log();
    super("POST", timeout, false);
    this.type = C.MERGEINTERACTIVESENTENCE;
    this.sentences = sentences;
    this.start_sentence = startSentence;
    this.end_sentence = endSentence;
    this.operation_type = operation_type;
    
    
    
  }

  toString() {
    return `${super.toString()} , type: ${this.type}`;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {

      console.log("response", res)
      this.sentences = res;
    }
  }

  apiEndPoint() {
    return `${super.apiEndPointAuto()}/merge-split-sentence`;
  }

  getBody() {
    return {
        "sentences": this.sentences,
        "start_sentence" : this.start_sentence,
        "end_sentence" : this.end_sentence,
        "operation_type" : this.operation_type
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