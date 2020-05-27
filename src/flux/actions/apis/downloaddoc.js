import API from "./api";
import C from "../constants";

export default class DownloadDoc extends API {
    constructor(sessionID, timeout = 2000) {
        super('POST', timeout, false);
        this.type = C.DOWNLOAD_DOC;
        this.session_id = sessionID;
        this.result = ""
    }

    toString() {
        return `${super.toString()} , type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        if (res) {
            this.data = res;
        }
    }

    apiEndPoint() {
        return `${super.apiEndPointAuto()}/make-doc-from-sentences`;
    }

    getBody() {
        return {
            session_id: this.session_id
        };
    }

    getHeaders() {
        this.headers = {
            headers: {
                Authorization: `Bearer ${decodeURI(localStorage.getItem("token"))}`,
                "Content-Type": "application/json"
            }
        };
        return this.headers;
    }

    getPayload() {
        return this.data;
    }
}