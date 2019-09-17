/**
 * Login API
 */
import API from "./api";
import C from "../constants";


export default class FetchModel extends API {
    constructor( timeout = 200000) {
        super("GET", timeout, false);
        this.type = C.FETCH_MODEL;
        this.fetch_model = null;
        
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        this.fetch_model = res.data
        
       console.log("test-----",this.fetch_model)
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/auto/anuvaad/v1/fetch-models`;
    }

    getBody() {
        return {}
    }

    getHeaders() {
        return {
            headers: {
                "Content-Type": "application/json"
            }
        }
    }

    getPayload() {
        
        return this.fetch_model
    }

}
