/**
 * Login API
 */
import API from "./api";
import C from "../constants";

export default class FetchLanguage extends API {
  constructor(timeout = 200000) {
    super("GET", timeout, false);
    this.type = C.FETCH_LANGUAGE;
    this.fetch_language = null;
  }

  toString() {
    return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
  }

  processResponse(res) {
    super.processResponse(res);
    this.fetch_language = res.data;
  }

  apiEndPoint() {
    return `${super.apiEndPointAuto()}/fetch-languages`;
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
    return this.fetch_language;
  }
}
