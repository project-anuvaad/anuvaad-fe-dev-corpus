/**
 * NMT Sentence Piece API
 */
import API from "./api";
import C from "../constants";

export default class NMTSP extends API {
    constructor(source,target, model,dontshowloader, timeout = 200000) {
        super("POST", timeout, false);
        this.src = source;
        this.target = target;
        this.model = model.model_id;
        this.dontshowloader = dontshowloader;
        this.answers = null;
        this.type = C.INTRACTIVE_TRANSLATE;
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        this.answers = res.response_body
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/interactive-translation`;
    }

    dontShowApiLoader(){
        return this.dontshowloader
      }

    getBody() {

        var modelArray = [];
   
      modelArray.push({
        src: this.src,
        target_prefix: this.target,
        id: parseInt(this.model,10),
       
    });

        return modelArray;
        
    }

    getHeaders() {
        this.headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + decodeURI(localStorage.getItem("token"))
            }
        };
        return this.headers;
    }

    getPayload() {
        return this.answers
    }

}