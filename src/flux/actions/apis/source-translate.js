import API from "./api";
import C from "../constants";
import { CommunicationStayCurrentLandscape } from "material-ui/svg-icons";


export default class SourceTranslate extends API {
    constructor(source, timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.SOURCE_TRANSLATE;
        this.source = source;
        this.sentences=[]
        
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        console.log("response-----",res)
        
        super.processResponse(res)
        if (res.data) {
            this.sentences = res;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/corpus/translate-source?source=${this.source}`;
    }

    getBody() {
        
        return {
         
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
        return this.sentences;
    }

}
