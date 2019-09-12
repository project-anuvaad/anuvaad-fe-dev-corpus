/**
 * Login API
 */
import API from "./api";
import C from "../constants";

export default class NMT extends API {
    constructor(par, model, reverse,target, timeout = 200000) {
        super("POST", timeout, false);
        this.par = par;
        this.model = 2;
        this.reverse = reverse;
        this.target = target;;
        this.answers = null;
        this.type = C.NMT;
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        if (res.response_body) {
            this.answers = [res.response_body[0].tgt]
        }
        // if (res.token) {
        //     this.token = res.token;
        //     this.expires = res.expires;
        //     this.role = res.role;
        //     this.userid = res.userid;
        //     this.name = res.name;
        //     // sessionStorage.setItem('user', JSON.stringify(res.user))
        // }
    }

    apiEndPoint() {
        return this.target==='English' ?  `http://52.40.71.62:3003/translator/translation_hi`: `http://52.40.71.62:3003/translator/translation_en`;
    }

    getBody() {
        if (this.target==='Tamil')
    {
        this.model=7
      
    }
    else if(this.target==='Hindi'){
        this.model=1
    }
    else if(this.target==='Gujarati'){
        this.model=10
    }
    else{
      this.model=2
    }
        return [{
            "src": this.par, "id": this.model
        }]
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
