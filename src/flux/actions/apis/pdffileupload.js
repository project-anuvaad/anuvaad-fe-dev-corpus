import API from "./api";
import C from "../constants";


export default class RunExperiment extends API {
  constructor(name,filepath, timeout = 2000) {
    console.log();
    super("POST", timeout, false);
    this.type = C.UPLOADPDF;
    this.name = name;
    this.filepath = filepath;
    this.workspace = []
    
    
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
    return `${super.apiEndPointAuto()}/start-pdf-parse-process`;
  }

  getBody() {
    return {
        
            pdf_path: this.filepath,
            process_name: this.name
        
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