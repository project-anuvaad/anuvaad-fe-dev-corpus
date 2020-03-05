import API from "./api";
import C from "../constants";


export default class RunExperiment extends API {
  constructor(name, file, timeout = 2000) {
    super("POST", timeout, false, "MULTIPART");
    this.type = C.UPLOADPDF;
    this.name = name;
    this.file = file;
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

  getFormData() {
    const formData = new FormData();
    formData.append('pdf_data', this.file);
    formData.append('process_name', this.name);
    return formData;
  }

  getHeaders() {
    this.headers = {
      headers: {
        Authorization: `Bearer ${decodeURI(localStorage.getItem("token"))}`,
        "Content-Type": "multipart/form-data"
      }
    };
    return this.headers;
  }

  getPayload() {
    return this.workspace;
  }
}