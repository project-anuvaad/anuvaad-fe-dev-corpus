import API from "./api";
import C from "../constants";
import { CommunicationStayCurrentLandscape } from "material-ui/svg-icons";


export default class UpdateSentencesStatus extends API {
    constructor(updateSentence, timeout = 2000) {
        super('POST', timeout, false);
        this.type = C.UPDATE_SENTENCE_STATUS;
        this.updateSentence = updateSentence;
        this.sentences=[]
        
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`
    }

    processResponse(res) {
        console.log(res)
        CommunicationStayCurrentLandscape.log(res)
        super.processResponse(res)
        if (res.data) {
            this.sentences = res.data;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/corpus/update-sentences-status`;
    }

    getBody() {
        return {
          sentences:[this.updateSentence]
        };
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
        return this.sentences;
    }

}