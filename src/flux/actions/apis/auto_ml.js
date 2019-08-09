/**
 * Login API
 */
import API from "./api";
import C from "../constants";


export default class AutoML extends API {
    constructor(text, source, target, timeout = 200000) {
        super("POST", timeout, false);
        this.text = text;
        this.source = source;
        this.target = target
        this.type = C.AUTO_ML;
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        this.answers = res
        console.log(res)
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
        console.log(this.target,this.source)
        return this.target==='Tamil' ? `${super.apiEndPointAuto()}/auto/tamil` : (this.target==='Hindi' ? `${super.apiEndPointAuto()}/auto/eng` :(this.target==='English'? `${super.apiEndPointAuto()}/auto/hin`:''));
    }

    getBody() {
        return {
            text: this.text
        }
    }

    getHeaders() {

    }

    getPayload() {
        return this.answers
    }

}
