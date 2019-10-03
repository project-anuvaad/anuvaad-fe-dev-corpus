/**
 * Login API
 */
import API from "./api";
import C from "../constants";

export default class NMT extends API {
    constructor(par, model, reverse,target, timeout = 200000) {
        super("POST", timeout, false);
        this.par = par;
        this.model = model;
        this.reverse = reverse;
        this.target = target;
        this.answers = [];
        this.url_end_point=model[0].url_end_point;
        this.type = C.NMT;
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }

    processResponse(res) {
        console.log("result-------",res.response_body)
        super.processResponse(res);
        if (res.response_body) {
            this.answers = res.response_body
        }
        
    }

    apiEndPoint() {
        return this.url_end_point ?  `http://52.40.71.62:3003/translator/${this.url_end_point}`: `http://52.40.71.62:3003/translator/translation_en`;
    }

    getBody() {
        
        var modelArray=[]

        this.model.map(item =>(
           modelArray.push( {
                "src": this.par, "id": parseInt(item.model_id), "s_id":item.model_name, "n_id":item.model_name
            })
        ))
        return modelArray
    }

    getHeaders() {
        this.headers = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        return this.headers;
    }

    getPayload() {
        return this.answers
    }

}
