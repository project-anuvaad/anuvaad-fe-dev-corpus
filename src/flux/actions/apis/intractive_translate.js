/**
 * NMT Sentence Piece API
 */
import API from "./api";
import C from "../constants";

export default class NMTSP extends API {
    constructor(source,target, model, timeout = 200000) {
        super("POST", timeout, false);
        this.src = source;
        this.target = target;
        this.model = model;
        this.answers = null;
        this.type = C.INTRACTIVE_TRANSLATE;
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        this.answers = res
    }

    apiEndPoint() {
        return `http://52.40.71.62:5001/interactive-translation`;
    }

    getBody() {

        var modelArray = [];
    this.model.map(item => {
      modelArray.push({
        src: this.src,
        target_prefix: this.target,
        id: parseInt(item.model_id,10),
       
    });return true;})

        return modelArray;
        
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