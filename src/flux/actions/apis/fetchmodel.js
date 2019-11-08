/**
 * Login API
 */
import API from "./api";
import C from "../constants";

export default class FetchModel extends API {
  constructor(timeout = 200000) {
    super("GET", timeout, false);
    this.type = C.FETCH_MODEL;
    this.fetch_model = null;
  }

  toString() {
    return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
  }

  processResponse(res) {
    super.processResponse(res);
    this.fetch_model = res.data;
  }

  apiEndPoint() {
    return `${super.apiEndPointAuto()}/fetch-models`;
  }

  getBody() {
    return {};
  }

  getHeaders() {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + decodeURI(localStorage.getItem("token"))
      }
    };
  }

  getPayload() {
    return this.fetch_model;
  }
}
