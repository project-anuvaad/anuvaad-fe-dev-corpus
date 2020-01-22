/**
 * Corpus API
 */
import API from "./api";
import C from "../constants";

export default class RunExperiment extends API {
  constructor( workspace, timeout = 2000) {
    console.log();
    super("POST", timeout, false);
    this.type = C.SENTENCEREPLACE;
    this.workspace = workspace;
    
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
    return `${super.apiEndPointAuto()}/update-search-replace-sentence`;
  }

  getBody() {
    
    return {
      sentence_pair: this.workspace
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
