import API from "./api";
import C from "../constants";
import ENDPOINTS from "../../../configs/apiendpoints";

export default class RunExperiment extends API {
  constructor(file,fileName,source,target,path, model, timeout = 2000) {
    console.log();
    super("POST", timeout, false);
    this.type = C.WORKFLOW;
    this.file = file;
    this.fileName = fileName;
    this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.workflow}`
    this.source=source;
    this.target=target;
    this.path = path;
    this.model = model;
   
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
    return this.endpoint;
  }

  getBody() {
    return {
      
        "workflowCode":"DP_WFLOW_FB",
        "jobName": this.fileName,
        "files": [
          {
            "path":this.file ,
            "type":this.path,
            "locale":this.source,
            "model": this.model
          }
        ]
      
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