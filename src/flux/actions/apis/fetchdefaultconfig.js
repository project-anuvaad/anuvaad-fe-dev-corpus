import API from "./api";
import C from "../constants";

export default class FetchBenchmarkModel extends API {
  constructor(basename, model, pagesize, pageno, status, timeout = 200000) {
    super("GET", timeout, false);
    this.config =[]
    this.type = C.FETCH_DEFAULT_CONFIG;
  }

  toString() {
    return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.config = res;
    }
  }

  apiEndPoint() {
    return `${super.apiEndPointAuto()}/fetch-default-config`;
  }

  getBody() {
    return {};
  }

  getHeaders() {
    this.headers = {
      headers: {
        Authorization: "Bearer " + decodeURI(localStorage.getItem("token"))
      }
    };
    return this.headers;
  }

  getPayload() {
    return this.config;
  }
}