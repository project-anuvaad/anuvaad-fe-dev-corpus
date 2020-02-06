/**
 * Corpus API
 */
import API from "./api";
import C from "../constants";

export default class AcceptAllSentence extends API {
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
      this.result = res;
    }
  }

  apiEndPoint() {
    return `${super.apiEndPointAuto()}/accept-all-search-replace-sentence`;
  }

  getBody() {
    
    return {
        processId: this.workspace.processId,
        source_search: this.workspace.changes[0].source_search

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
    return this.result;
  }
}
