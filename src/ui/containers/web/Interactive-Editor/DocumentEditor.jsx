import React from "react";
import { withRouter } from "react-router-dom";
import FetchDoc from "../../../../flux/actions/apis/fetchdocsentence";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import Paper from "@material-ui/core/Paper";
import SourceView from "./DocumentSource";
import MenuItems from "./PopUp";
import Typography from "@material-ui/core/Typography";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import fileUpload from "material-ui/svg-icons/file/file-upload";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";
import FileUpload from "../../../../flux/actions/apis/fileupload";
import Toolbar from "@material-ui/core/Toolbar";
  // import Data from "./json/File1506.json";
// import Data from "./json/File3002.json";
// import Data from "./json/Judgement.json";
// import Data from "./json/DelhiHC.json";
import Data from "./JudgementNew.json";

class PdfFileEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentences: Data.result,
      sourceSupScripts: "",
      targetSupScripts: "",
      header: "",
      
      backgroundImage: "",
      pageArr: [],
      hoveredSentence: "",
      
    };
  }

    // componentDidMount() {

    //   console.log
    //   const apiObj = new FileUpload(this.props.match.params.fileid);
    //   this.props.APITransport(apiObj);
    // }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.fileUpload !== this.props.fileUpload) {
    //         console.log(this.props.fileUpload)
    //     const temp = this.props.fileUpload.result;

    //     this.setState({
    //       sentences: temp
    //     });
    //   }
    // }

    handleOnMouseEnter(sentenceId, parent, pageNo) {
      this.setState({ hoveredSentence: sentenceId });
    }
  
    handleOnMouseLeave() {
      this.setState({ hoveredSentence: "" });
    }

    handleDialogSave(selection, operation_type, pageDetails) {

      if (operation_type === "merge" ) {
        
        var sentenceObj = pageDetails.text_blocks;
        sentenceObj.map((sentence, i)=>{
          
          if(sentence.block_id==selection.startNode){
            
            if(sentence.text_width<sentenceObj[i+1].text_width){
              sentenceObj[i+1].text_top=  sentence.text_top
              sentenceObj[i+1].text = sentence.text+(sentenceObj[i+1].block_id==selection.endNode && sentenceObj[i+1].text)
              delete sentenceObj[i]
            }
            else{
              sentence.text = sentence.text+(sentenceObj[i+1].block_id==selection.endNode && sentenceObj[i+1].text)
              delete sentenceObj[i+1]
            }
            
            
            
          }
        })
      
      
    }
    var sen = this.state.sentences
    
    pageDetails && sen.map(sentence =>{
      
      if(sentence.page_no === pageDetails.page_no){
        sentence.text_blocks = sentenceObj;
      }
    })
    
    this.setState({sentences:sen})
    this.indexCorrection()
    }
  

 indexCorrection=()=>{
   var sentenceObj = this.state.sentences;
   sentenceObj.map(sentence=>{
     
     sentence.text_blocks.map((value,index)=>{
      sentence.text_blocks[index].block_id = index
     })
   })
   console.log(sentenceObj)
   this.setState({sentences:sentenceObj})
 }
 

  render() {
    let yAxis = 0;
    let leftPaddingValue = 0;
    let rightPaddingValue = 0;
    this.state.sentences&& this.state.sentences.map(sentence => {
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
              <div>
              <SourceView 
                key={sentence.page_no + "_" + index}
                sourceSentence={sentence}
                handleOnMouseEnter={this.handleOnMouseEnter.bind(this)}
                hoveredSentence={this.state.hoveredSentence}
                pageNo={sentence.page_no}
                handleDialogSave = {this.handleDialogSave.bind(this)}
              />
             
              </div>
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
