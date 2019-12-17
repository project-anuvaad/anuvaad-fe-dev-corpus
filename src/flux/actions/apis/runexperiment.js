/**
 * Corpus API
 */
import API from "./api";
import C from "../constants";

export default class RunExperiment extends API {
    constructor(workspaceName, configFilepath, csvFilepath, timeout = 2000) {

        console.log()
        super('POST', timeout, false);
        this.type = C.RUNEXPERIMENT;
        this.title = workspaceName
        this.config_file_location = configFilepath
        this.csv_file_location = csvFilepath
    }


    toString() {
        
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        
        
        super.processResponse(res)
        if (res) {
            this.workspace = res;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/save-paragraph-workspace`;
    }

    getBody() {
        return {
            paragraph_workspace:{
        title: this.title,
       config_file_location: this.config_file_location,
       csv_file_location: this.csv_file_location}
              };
      }
      
      getHeaders() {
    this.headers = {
      headers: {
        'Authorization': 'Bearer '+decodeURI(localStorage.getItem('token')),
        "Content-Type": "application/json"
      }
    };
    return this.headers;
  }

    getPayload() {
        return this.workspace;
    }

}

   


