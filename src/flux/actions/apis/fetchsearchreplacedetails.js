import API from "./api";
import C from "../constants";

export default class FetchWorkspaceDetails extends API {
  constructor(session, timeout = 200000) {
    super("GET", timeout, false);
    this.session_id = session;
    
    this.workspace = null;
    this.type = C.FETCH_WORKSPACE_DETAILS;
  }

  toString() {
    return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.workspace = res;
    }
  }

  apiEndPoint() {
    return `${super.apiEndPointAuto()}/fetch-search-replace-workspace-detail?session_id=${this.session_id}`;
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
    return this.workspace;
  }
}