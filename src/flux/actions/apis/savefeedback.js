import API from "./api";
import C from "../constants";


export default class RunExperiment extends API {
  constructor(questionList,basename, timeout = 2000) {
    console.log();
    super("POST", timeout, false);
    this.type = C.CREATEWORKSPACE;
    this.questionList = questionList;
    this.basename = basename;
    
    
  }

  toString() {
    return `${super.toString()} , type: ${this.type}`;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.workspace = res;
    }
  }

  apiEndPoint() {
    return `${super.apiEndPointAuto()}/save-captured-feedback`;
  }

  getBody() {
    return {
        captured_feedback:{
            basename: this.basename,
            questions: this.questionList
        }
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
    return this.workspace;
  }
}