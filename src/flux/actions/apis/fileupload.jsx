import API from "./api";
import C from "../constants";
import ENDPOINTS from "../../../configs/apiendpoints";

export default class RunExperiment extends API {
  constructor(file, timeout = 2000) {
    console.log();
    super("POST", timeout, false);
    this.type = C.FILEUPLOAD;
    this.file = file;
    this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.fileupload}`
  }

  toString() {
    return `${super.toString()} , type: ${this.type}`;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.sentences = res.response;
    }
  }

  apiEndPoint() {
    return this.endpoint;
  }

  getBody() {
    return {
      filename: this.file
    };
  }

  getHeaders() {
    this.headers = {
      headers: {
        Authorization: `Bearer ${decodeURI(localStorage.getItem("token"))}`,
        "Content-Type": "application/json"
      }
    };
    return this.headers;
  }

  getPayload() {
    return this.sentences;
  }
}