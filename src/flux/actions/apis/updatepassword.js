import API from "./api";
import C from "../constants";
import { CommunicationStayCurrentLandscape } from "material-ui/svg-icons";


export default class UpdatePassword extends API {
    
    constructor(id,user_name,old_password,new_password, timeout = 2000) {
        super('POST', timeout, false);
        this.type = C.UPDATE_PASSWORD;
        this.user_id = id;
        this.old_password = old_password;
        this.user_name = user_name;
        this.new_password = new_password;
        this.updatePassword=""
        console.log("update password",this.user_id,this.old_password,this.user_name, this.new_password)
        
    }

    toString() {
        
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        
        
        super.processResponse(res)
        if (res) {
            console.log("--777--",res)
            this.updatePassword = res;
        }
        console.log("update-----",this.updatePassword)
    }

    apiEndPoint() {
        console.log(this.user_id,this.old_password,this.user_name, this.new_password)
        return `${super.apiEndPointAuto()}/corpus/update-password`;
    }

    getBody() {
        return {
            user_id : this.user_id,
            user_name : this.user_name,
            old_password : this.old_password,
            new_password : this.new_password
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
        return this.updatePassword;
    }

}