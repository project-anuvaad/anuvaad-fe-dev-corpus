/**
 * Corpus API
 */

import API from "./api";
import C from "../constants";

export default class AddUser extends API {
    constructor(username, status, timeout = 2000) {
        super('POST', timeout, false);
        this.type = C.DELETE_USER;
       
        this.username = username
        this.status = status

        this.deleteuser = {}

    }

    toString() {
        
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        
        
        super.processResponse(res)
        if (res) {
            this.deleteuser = res;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/app/update-user-status`;
    }

    getBody() {
        return {
            username: this.username,
       status: this.status
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
        return this.deleteuser;
    }

}




    

   

    


   
