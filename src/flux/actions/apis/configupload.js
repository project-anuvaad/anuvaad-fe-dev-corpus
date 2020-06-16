/**
 * Corpus API
 */
import API from "./api";
import C from "../constants";
import ENDPOINTS from "../../../configs/apiendpoints";

export default class ConfigUpload extends API {
  constructor(configFile, name, timeout = 2000) {
    super("POST", timeout, false, "MULTIPART");
    this.type = C.CONFIGUPLOAD;
    this.file = configFile;
    this.name = name;
    this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.configupload}`;
  }

  toString() {
    return `${super.toString()} , type: ${this.type}`;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res.data) {
      this.config = { data: res.data, name: this.name };
    }
  }

  apiEndPoint() {
    return this.endpoint;
  }

  getFormData() {
    return this.file;
  }

  getHeaders() {
    return {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
  }

  getPayload() {
    return this.config;
  }
}
