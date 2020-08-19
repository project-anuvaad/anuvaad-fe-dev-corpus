import React from "react";
import { withRouter } from "react-router-dom";
import FetchDoc from "../../../../flux/actions/apis/fetchdocsentence";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import Paper from "@material-ui/core/Paper";
import SourceView from "./DocumentSource";
import Data from "./JudgementNew.json";
import Typography from "@material-ui/core/Typography";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import fileUpload from "material-ui/svg-icons/file/file-upload";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";
import FileUpload from "../../../../flux/actions/apis/fileupload";
import Toolbar from "@material-ui/core/Toolbar";
// import Data from "./PPT.json";
//  import Data from "./Judgement.json"

class PdfFileEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentences: "",
      sourceSupScripts: "",
      targetSupScripts: "",
      header: "",
      sentences: Data.data,
      backgroundImage: "",
      pageArr: [],
      hoveredSentence: ""
    };
  }

    componentDidMount() {

      console.log("sajish---",this.props.match)

      console.log(this.props.match.params.fileid)
      const apiObj = new FileUpload(this.props.match.params.fileid);
      this.props.APITransport(apiObj);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fileUpload !== this.props.fileUpload) {
            console.log(this.props.fileUpload)
        const temp = this.props.fileUpload.result;

        this.setState({
          sentences: temp
        });
      }
    }


  render() {
    let yAxis = 0;
    let leftPaddingValue = 0;
    let rightPaddingValue = 0;
    this.state.sentences && this.state.sentences.map(sentence => {
      if (leftPaddingValue > parseInt(sentence.x) || leftPaddingValue == 0) {
        leftPaddingValue = parseInt(sentence.x);
      }
      if ((sentence.width && rightPaddingValue < parseInt(sentence.width) + parseInt(sentence.x)) || (sentence.width && rightPaddingValue == 0)) {
        rightPaddingValue = parseInt(sentence.width) + parseInt(sentence.x);
      }
    });
    // width: this.state.sentences && rightPaddingValue-leftPaddingValue+20+ "px",
    let paperWidth = this.state.sentences && this.state.sentences[0].page_width - leftPaddingValue - 78 + "px";

    let style = {
      maxWidth: this.state.sentences && rightPaddingValue - leftPaddingValue + 20 + "px",
      // width: this.state.sentences && rightPaddingValue-leftPaddingValue+20+ "px",
      maxHeight: this.state.collapseToken ? window.innerHeight - 100 : window.innerHeight - 100,
      position: "relative",
      overflowY: "scroll",
      height: this.state.sentences && this.state.sentences[0].page_height + "px",

      overflowX: this.props.match.path == "/pdf-file-editor" && "hidden",
      backgroundColor: "white",

      backgroundImage: this.state.backgroundImage && "url(" + this.state.backgroundImage + ")",
      backgroundRepeat: "no-repeat",
      backgroundSize: this.state.backgroundSize + "px"
    };

    let pageDividerHeight = "0";
    return (
      
        <div>
        {this.state.sentences &&
          this.state.sentences.map((sentence, index) => {
            yAxis = parseInt(sentence.y) + (parseInt(sentence.page_no) - 1) * parseInt(sentence.page_height);
            pageDividerHeight =
              (this.state.pageArr && this.state.pageArr.length > 0 && parseInt(this.state.pageArr[sentence.page_no])) +
              (parseInt(sentence.page_no) - 1) * parseInt(sentence.page_height);
            let printPageNo = false;
            let pageNo = sentence.page_no;
            let isFirstPage = false;

            if (index === 0) {
              printPageNo = true;
              isFirstPage = true;
            } else if (this.state.sentences[index - 1] && sentence.page_no !== this.state.sentences[index - 1].page_no) {
              printPageNo = true;
            }

            return (
              <SourceView 
                key={sentence.page_no + "_" + index}
                sourceSentence={sentence}
                
              />
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetchPdfSentence: state.fetchPdfSentence,
  fileUpload: state.fileUpload,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PdfFileEditor));
