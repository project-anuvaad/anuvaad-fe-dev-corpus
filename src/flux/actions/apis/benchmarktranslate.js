import API from "./api";
import C from "../constants";

export default class BenchmarkTranslate extends API {
    
    constructor(text,source,target, timeout = 2000) {
        super('POST', timeout, false);
        this.type = C.BENCHMARK_TRANSLATE;
        this.sentence = text;
        this.target = target;
        this.result=""   
    }

    toString() {
        
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        
        
        super.processResponse(res)
        if (res) {
            console.log(res)
            this.result = res;
        }
    }

    apiEndPoint() {
        console.log("test",this.sentence )
        return `${super.apiEndPointAuto()}/app/translate-with-hemat`;
    }

    getBody() {
        return {
            sentence : this.sentence,
            target : this.target
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
        return this.result;
    }

}