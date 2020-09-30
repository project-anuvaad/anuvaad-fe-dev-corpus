/**
 * SetPassword API
 */
import API from "./api";
import C from "../constants";
import ENDPOINTS from "../../../configs/apiendpoints";
export default class SetPassword extends API {
  constructor(uid, rid, password, timeout = 2000) {
    super("POST", timeout, false);
    this.type = C.SET_PASSWORD;
    this.uid = uid;
    this.rid = rid;
    this.password = password;
    this.res = null;
    this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.setpassword}`;
  }

  toString() {
    return `${super.toString()} , type: ${this.type}`;
  }

  apiEndPoint() {
    return this.endpoint;
  }

  getBody() {
    return {
      u_id: this.uid,
      r_id: this.rid,
      password: this.password
    };
  }

  getHeaders() {
    this.headers = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    return this.headers;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.res = res;
    }
  }

  getPayload() {
    return this.res;
  }
}
