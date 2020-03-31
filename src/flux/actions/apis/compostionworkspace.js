/**
 * Corpus API
 */
import API from "./api";
import C from "../constants";

export default class RunExperiment extends API {
  constructor(selectedworkspace, workspaceName, language, filepath, timeout = 2000) {
    super("POST", timeout, false);
    this.type = C.CREATEWORKSPACE;
    this.title = workspaceName;
    this.target_lang = language;
    this.configFilePath = filepath;
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
    return `${super.apiEndPointAuto()}/save-composition-workspace`;
  }

  getBody() {
    return {
      composition_workspace: {
        title: this.title,
        target_language: this.target_lang,
        search_replace_workspaces: this.selected_workspaces,
        config_file_location: this.configFilePath
      }
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
    return this.workspace;
  }
}
