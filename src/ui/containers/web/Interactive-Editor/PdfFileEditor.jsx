import React from "react";
import { withRouter } from "react-router-dom";
import FetchDoc from "../../../../flux/actions/apis/fetchdocsentence";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import Paper from "@material-ui/core/Paper";
import SourceView from "./SourceView";
 import Data from "./Data.json";
import Typography from "@material-ui/core/Typography";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";

import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";

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
      hoveredSentence: "",
    };
  }

  //   componentDidMount() {
  //     const { APITransport } = this.props;
  //     const apiObj = new FetchDoc("d72923e7-5a92-4e9e-93bc-3d1d89e73b5d");
  //     APITransport(apiObj);
  //   }

  //   componentDidUpdate(prevProps) {
  //     if (prevProps.fetchPdfSentence !== this.props.fetchPdfSentence) {
  //       const temp = this.props.fetchPdfSentence.data;

  //       this.setState({
  //         sentences: temp
  //       });
  //     }
  //   }

  getSelectionText(event) {
       
    var text = "";
    let selection = {};
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;

    if (
      activeElTagName === "textarea" ||
      (activeElTagName === "input" && /^(?:text|search|password|tel|url)$/i.test(activeEl.type) && typeof activeEl.selectionStart === "number")
    ) {
      text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
      text = window.getSelection().toString();
    }

    let sentences = "";
    let startNode = "";
    let endNode = "";

    if (window.getSelection()) {
      sentences = window.getSelection();
    }
    if (
      sentences 
    ) {
       
      startNode = window.getSelection().anchorNode.wholeText;
      endNode = window.getSelection().focusNode.wholeText;
      this.state.sentences.map(paragraph => {
        paragraph.tokenized_sentences.map(sentence=>{
          if (sentence.text === startNode && !paragraph.is_table) {
            selection.startNode = startNode;
            selection.pageNo = paragraph.page_no;
            selection.startParagraph = paragraph;
            selection.startId = sentence.s_id
          }
          if (sentence.text === endNode && !paragraph.is_table) {
            selection.endNode = endNode;
            selection.pageNo = paragraph.page_no;
            selection.endParagraph = paragraph;
            selection.endId = sentence.s_id
          }

        })
        
        return true;
      });
    }

   
    if (selection && selection.startNode && selection.endNode) {
      this.handleSelection(selection, event);
    }

    
  }

  handleSelection(selectedSentence, event) {
    this.setState({ sText: window.getSelection().toString() })
    if (
      selectedSentence &&
      selectedSentence.startNode &&
      selectedSentence.endNode &&
      selectedSentence.pageNo &&
      window.getSelection().toString() &&
      selectedSentence.startParagraph &&
      selectedSentence.endParagraph
    ) {
      let initialIndex;
      let startSentence;
      let endIndex;
      let endSentence;
      let operation_type;
      let selectedSplitValue;
      const { pageNo } = selectedSentence;

      const startValue = selectedSentence.startId;
      const endValue = selectedSentence.endId;

      this.state.sentences.map((sentence, index) => {
        if (sentence._id === selectedSentence.startParagraph._id) {
          initialIndex = index;
          sentence.tokenized_sentences.map((value, index) => {
           
            if (value.sentence_index === Number(startValue)) {
              startSentence = value;
            }
            return true;
          });
        }
        if (sentence._id === endValue) {
          endIndex = index;

          sentence.tokenized_sentences.map((value, index) => {
            if (value.sentence_index === Number(endValue)) {
              endSentence = value;
            }
            return true;
          });
        }
        return true;
      });

      const mergeSentence = this.state.sentences.slice(initialIndex, endIndex + 1);
     
      if (startValue === endValue && selectedSentence.startParagraph._id=== selectedSentence.endParagraph._id) {
        const selectedSplitEndIndex = window.getSelection() && window.getSelection();
        operation_type = "split";
        selectedSplitValue = startSentence.src.substring(0, selectedSplitEndIndex);
      } else {
        operation_type = "merge";
        selectedSplitValue = window.getSelection().toString();
      }

      this.props.popUp(operation_type,event,selectedSentence,selectedSplitValue)
    }
  }

  componentDidMount() {
    let minPageHeight = this.state.sentences[0].y
    let pages = []
  
    this.state.sentences.map((sentence, index) => {
      if (sentence.is_bg_image) {
        this.setState({ backgroundImage: sentence.img, backgroundSize: sentence.width })
      }

      if (parseInt(minPageHeight) > parseInt(sentence.y)) {
        minPageHeight = sentence.y
      }

      if ((this.state.sentences[index + 1] && sentence.page_no != this.state.sentences[index + 1].page_no) || index === this.state.sentences.length - 1) {
        pages[sentence.page_no] = minPageHeight
      }

      this.setState({ pageArr: pages })
    })
  }

  handleOnMouseEnter(sentenceId, parent, pageNo) {
    this.setState({ hoveredSentence: sentenceId });
  }

  handleOnMouseLeave() {
    this.setState({ hoveredSentence: "" });
  }

  render() {
    let yAxis = 0;
    let leftPaddingValue=0;
    let rightPaddingValue=0;
    this.state.sentences.map(sentence=>{
        if(leftPaddingValue > parseInt(sentence.x) || leftPaddingValue==0){
            leftPaddingValue = parseInt(sentence.x)
            
        }
        if((sentence.width && rightPaddingValue<parseInt(sentence.width)+parseInt(sentence.x) )|| (sentence.width &&rightPaddingValue==0)){
            rightPaddingValue = parseInt(sentence.width)+parseInt(sentence.x)
            
            
        }
        
    })
    // width: this.state.sentences && rightPaddingValue-leftPaddingValue+20+ "px",
    let paperWidth = this.state.sentences && this.state.sentences[0].page_width - leftPaddingValue - 78 + "px"

    let style = {
      maxWidth: this.state.sentences && rightPaddingValue - leftPaddingValue + 20 + 'px',
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

    let pageDividerHeight = '0'
    return (

      <Paper style={style}>
        <Toolbar

          style={{ color: darkBlack, background: blueGrey50, width: paperWidth }}
        >
          <Typography value="" variant="h6" gutterBottom style={{ flex: 1 }}>
            {this.props.title}
          </Typography>
        </Toolbar>
        {this.state.sentences &&
          this.state.sentences.map((sentence, index) => {
            yAxis = parseInt(sentence.y) + (parseInt(sentence.page_no) - 1) * parseInt(sentence.page_height);
            pageDividerHeight = (this.state.pageArr && this.state.pageArr.length > 0 && parseInt(this.state.pageArr[sentence.page_no])) + (parseInt(sentence.page_no) - 1) * parseInt(sentence.page_height);
            let printPageNo = false
            let pageNo = sentence.page_no
            let isFirstPage = false


            if (index === 0) {
              printPageNo = true
              isFirstPage = true
            } else if (this.state.sentences[index - 1] && sentence.page_no !== this.state.sentences[index - 1].page_no) {
              printPageNo = true
            }

            return (
              // <SourceView getSelectionText={this.getSelectionText.bind(this)} paperWidth={paperWidth} key={index} printPageNo={printPageNo} pageDividerHeight={pageDividerHeight} leftPaddingValue={leftPaddingValue} isFirstPage={isFirstPage} pageNo={pageNo} sentence={sentence} yAxis={yAxis} widthValue={parseInt(sentence.width) ? parseInt(sentence.width) : 286} />
              <SourceView
                paperWidth={paperWidth}
                getSelectionText={this.getSelectionText.bind(this)}
                key={index}
                printPageNo={printPageNo}
                pageDividerHeight={pageDividerHeight}
                leftPaddingValue={leftPaddingValue}
                isFirstPage={isFirstPage}
                pageNo={pageNo}
                sentence={sentence}
                yAxis={yAxis}
                widthValue={parseInt(sentence.width) ? parseInt(sentence.width) : 286}
                hoveredSentence={this.state.hoveredSentence}
                handleOnMouseEnter={this.handleOnMouseEnter.bind(this)}
              />
            );
          })}
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  fetchPdfSentence: state.fetchPdfSentence
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PdfFileEditor));
