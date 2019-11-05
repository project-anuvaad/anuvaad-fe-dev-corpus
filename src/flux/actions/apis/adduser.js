/**
 * Corpus API
 */

import API from "./api";
import C from "../constants";

export default class AddUser extends API {
    constructor(username, firstname, lastname, password,email, roles, timeout = 2000) {
        super('POST', timeout, false);
        this.type = C.ADD_USER;
       
        this.username = username
        this.firstname = firstname
        this.lastname = lastname
        this.password = password
        this.email = email
        this.roles = roles

        this.usercreate = {}

    }

    toString() {
        
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        
        
        super.processResponse(res)
        if (res) {
            this.usercreate = res;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/app/create-user`;
    }

    getBody() {
        return {
            username: this.username,
       firstname:this.firstname,
        lastname: this.lastname,
       password:  this.password,
        email: this.email,
        roles: this.roles
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
        return this.usercreate;
    }

}




    

   

    


   
