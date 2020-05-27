/**
 * Corpus API
 */
import API from "./api";
import C from "../constants";

export default class RunExperiment extends API {
  constructor(selectedworkspace, workspaceName, useLatest, language, timeout = 2000) {
    console.log();
    super("POST", timeout, false);
    this.type = C.CREATEWORKSPACE;
    this.title = workspaceName;
    this.target_lang = language;
    this.useLatest = useLatest;
    this.selected_workspaces = selectedworkspace;
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
    return `${super.apiEndPointAuto()}/save-mt-workspace`;
  }

  getBody() {
    return {
      mt_workspace: {
        title: this.title,
        use_latest: this.useLatest,
        target_language: this.target_lang,
        selected_workspaces: this.selected_workspaces
      }
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
