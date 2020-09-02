import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import SourceView from "./DocumentSource";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Fab";
import { translate } from "../../../../assets/localisation";
import history from "../../../../web.history";
import FileDetails from "../../../../flux/actions/apis/fetch_filedetails";
import Data from "./json/File1506.json";
import htmlToText from "html-to-text";
// import Data from "./json/File3002.json";
// import Data from "./json/Judgement.json";
// import Data from "./json/DelhiHC.json";
//  import Data from "./JudgementNew.json";

class PdfFileEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // sentences: Data.result,
      sourceSupScripts: "",
      targetSupScripts: "",
      header: "",

      backgroundImage: "",
      pageArr: [],
      hoveredSentence: "",
      sentences: '',
      selectedText: "",
      clear: false,
      // popOver: false,
      // hoveredTableId: "",
      height: 0
    };
  }

  componentDidMount() {
    const apiObj = new FileDetails(this.props.match.params.fileid);
    this.props.APITransport(apiObj);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.documentDetails !== this.props.documentDetails) {

      const temp = this.props.documentDetails.result;

      this.setState({
        sentences: temp
      });
    }
  }

  handleOnMouseEnter(sentenceId, parent, pageNo) {
    this.setState({ hoveredSentence: sentenceId });
    // this.setState({ hoveredSentence: sentenceId, hoveredTableId: ""});
  }

  handleOnMouseLeave() {
    this.setState({ hoveredSentence: "" });
  }

  handleDialog(title, dialogMessage) {
    this.setState({ openDialog: true, title, dialogMessage, openEl: false });
  }


  handleDuplicateBlock(block, blockText, page) {
    block = block.split("_")[0]

    var sen = this.state.sentences;
    var pageData = page;
    var value;
    var height ;
    pageData &&
      pageData.text_blocks &&
      pageData.text_blocks.map((blockData, i) => {
        if (parseInt(block) === blockData.block_id) {
          value = i;
          height = blockData.text_top;
        }
      });
    var a = JSON.parse(JSON.stringify(pageData.text_blocks[value]));
      
    pageData.text_blocks.splice(value + 1, 0, a);

    let arr = [];
    var extraHeight = 0;
    pageData &&
      pageData.text_blocks &&
      pageData.text_blocks.map((blockData, i) => {
        if (i > value || blockData.text_top>height) {
          extraHeight = pageData.text_blocks[value].text_height;
          blockData.text_top = blockData.text_top + extraHeight;
        }
      });
    pageData.page_height = pageData.page_height + extraHeight;
    pageData &&
      sen.map(sentence => {
        if (sentence.page_no === pageData.text_blocks.page_no) {
          sentence = pageData;
        }
      });

    this.setState({ sentences: sen });
    this.indexCorrection();
  }

  handleDeleteBlock(block, blockText, pageData) {
    block = block.split("_")[0]
    let blocks = [];
    let height,top;

    pageData &&
      pageData.text_blocks &&
      pageData.text_blocks.map(data => {
        if (data.block_id == block) {
          height = data.text_height;
          top = data.text_top;
        }
      });

    pageData &&
      pageData.text_blocks &&
      pageData.text_blocks.map((blockData, i) => {
        if (blockData.block_id == block) {
          // blockData.status = "deleted"
          // blocks.push(blockData)
         
          delete pageData.text_blocks[i];
        } else {
          
          if (blockData.block_id > block || blockData.text_top>top) {
            let blockTop = blockData.text_top - height;

            
            blockData.text_top = blockTop;

            blocks.push(blockData);
            
          } else {
            blocks.push(blockData);
            
            
          }
        }
      });
      
      pageData.page_height = pageData.page_height - height;
    this.indexCorrection();

    let res = [];
    if (this.state.sentences && Array.isArray(this.state.sentences) && this.state.sentences.length > 0) {
      this.state.sentences.map((sentence, index) => {
        if (sentence.page_no === pageData.page_no) {
          sentence.text_blocks = blocks;
          res.push(sentence);
        } else {
          res.push(sentence);
        }
      });
    }
    this.setState({ sentences: res });
  }

  handleCreateBlock(block, page) {
    let blockId = block.split("_")[0]
    let pageNO = block.split("_")[1]

    var sen = this.state.sentences;
    var pageData = page;
    var value, height;
    let selectedSourceText = ""
    let id = parseInt(blockId) + 1
    pageData &&
      pageData.text_blocks &&
      pageData.text_blocks.map((blockData, i) => {
        selectedSourceText = blockData.text
        if (parseInt(blockId) === blockData.block_id) {
          value = i;
          height = blockData.text_top;
        }
      });
    var a = JSON.parse(JSON.stringify(pageData.text_blocks[value]));
    a.text = null
    a.text_top = a.text_top + pageData.text_blocks[value].text_height
    a.text_height = 30;
    a.children = null;
    pageData.text_blocks.splice(value + 1, 0, a);
    console.log(a, pageData.text_blocks[value])
    let arr = [];

    var extraHeight = 0;
    pageData &&
      pageData.text_blocks &&
      pageData.text_blocks.map((blockData, i) => {
        if ((i > value || blockData.text_top>height )&& blockData.text) {
          extraHeight = pageData.text_blocks[value].text_height;
          blockData.text_top = blockData.text_top + 30;
        }
      });
    pageData.page_height = pageData.page_height + 30;
    pageData &&
      sen.map(sentence => {
        if (sentence.page_no === pageData.text_blocks.page_no) {
          sentence = pageData;
        }
      });
    this.setState({ sentences: sen, selectedSourceText: "", selectedBlockId: id + "_" + pageNO, isEditable: true, height: 30 });
    this.indexCorrection();
    
  }

  handleEditor(value) {
    console.log("editor----",this.state.selectedBlockId, value);
    ((this.state.selectedBlockId && value && this.state.selectedBlockId !== value)|| this.state.clear) && this.setState({selectedBlockId: null, clear: false})
  }

  handleDialogSave(selection, operation_type, pageDetails) {
    let startNodeId = selection.startNode.split("_")[0]
    let endNodeId = selection.endNode.split("_")[0]

    if (operation_type === "merge") {
      var sentenceObj = pageDetails.text_blocks;
      sentenceObj.map((sentence, i) => {
        if (sentence.block_id == startNodeId) {
          if (sentence.text_width < sentenceObj[i + 1].text_width) {
            sentenceObj[i + 1].text_top = sentence.text_top;
            // sentenceObj[i + 1].text_height = sentenceObj[i + 1].text_height + sentence.text_height;
            sentenceObj[i + 1].text = sentence.text + (sentenceObj[i + 1].block_id == endNodeId && sentenceObj[i + 1].text);
            delete sentenceObj[i];
          } else {
            sentence.text = sentence.text + (sentenceObj[i + 1].block_id == endNodeId && sentenceObj[i + 1].text);
            // sentence.text_height = sentence.text_height + sentenceObj[i + 1].text_height;
            delete sentenceObj[i + 1];
          }
        }
      });
    }
    var sen = this.state.sentences;

    pageDetails &&
      sen.map(sentence => {
        if (sentence.page_no === pageDetails.page_no) {
          sentence.text_blocks = sentenceObj;
        }
      });

    this.setState({ sentences: sen });
    this.indexCorrection();
    this.handleEditor()
  }

  indexCorrection = () => {
    var sentenceObj = [...this.state.sentences];
    sentenceObj.map(sentence => {
      var sen = sentence.text_blocks.filter(val => val)
      sen.map((value, index) => {
        
        sen[index].block_id = index;
        
      });
      sentence.text_blocks= sen;
    });
    this.setState({ sentences: sentenceObj });
  };

  handleOnClose() {
    history.push(`${process.env.PUBLIC_URL}/view-document`);
  }
  handleSource(selectedBlock){
    this.setState({selectedSourceText: selectedBlock.text})
  }

  handleSourceChange = (block, evt) => {


    console.log(block, this.state.height, evt.currentTarget.offsetHeight)
    this.setState({ selectedSourceText: evt.target.value,height:evt.currentTarget.offsetHeight  });
    console.log(this.state.height)
    if(this.state.height !== 0 &&  this.state.height !== evt.currentTarget.offsetHeight){
      this.handleCheck(block, evt, true)
    }
  };
  handleCheck(block, evt, checkValue) {
    
    let blockId = block.split("_")[0]
    let pageNo = block.split("_")[1]
    let blockTop,blockHeight;
    let docPage = this.state.sentences;
    let strText = htmlToText.fromString(this.state.selectedSourceText);

    if (docPage && Array.isArray(docPage) && docPage.length > 0) {
      docPage.map((page, index) => {
        if (page.page_no == pageNo) {
          if (page.text_blocks && Array.isArray(page.text_blocks) && page.text_blocks.length > 0) {
            

            page.text_blocks.map((block, i) => {
              
              
              
              if (block.block_id == blockId) {
                blockTop = block.text_top;
                blockHeight = block.text_height;
                block.text =  strText;
              } 
            })

            page.text_blocks.map((block, i) => {
              
              if(block.text_top>blockTop){
                if(this.state.height !== 0 && this.state.height !== evt.currentTarget.offsetHeight){
                  block.text_top = block.text_top - this.state.height + evt.currentTarget.offsetHeight
                }
                if(this.state.height ===0 && evt.currentTarget.offsetHeight - block.text_height> 5){
                  block.text_height=  block.text_height + evt.currentTarget.offsetHeight - block.text_height - 3
                  
                }
              }
            })
            

          }
        } 
      })
    }
    console.log(checkValue, this.state.height)
    !checkValue && this.setState({selectedBlockId: null, clear: false})

    this.setState({sentences:docPage,height: checkValue ? evt.currentTarget.offsetHeight: 0,clear: true})

    

  };

  // handleTableHover(id) {
  //   this.setState({ hoveredTableId: id, hoveredSentence: "" })
  // }

  // handlePopUp() {
  //   this.setState({ popOver: true })
  // }

  render() {
    let yAxis = 0;
    let leftPaddingValue = 0;
    let rightPaddingValue = 0;

    this.state.sentences &&
      this.state.sentences.map(sentence => {
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
      <div style={{ dislay: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "right", marginRight: "25px", marginBottom: "15px" }}>
          <Button variant="extended" color="primary" style={{position:'fixed', fontSize: '90%', fontWeight: 'bold', height: "40px" }} onClick={() => this.handleOnClose()}>
            <CloseIcon size="large" />{" "}&nbsp;&nbsp;{translate('common.page.label.close')}
          </Button>
        </div>

        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
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
                    handleDialogSave={this.handleDialogSave.bind(this)}
                    handleDuplicateBlock={this.handleDuplicateBlock.bind(this)}
                    handleDeleteBlock={this.handleDeleteBlock.bind(this)}
                    handleCreateBlock={this.handleCreateBlock.bind(this)}
                    selectedSourceText={this.state.selectedSourceText}
                    createBlockId={this.state.selectedBlockId}
                    isEditable={this.state.isEditable}
                    handleSourceChange={this.handleSourceChange.bind(this)}
                    handleEditor={this.handleEditor.bind(this)}
                    clear = {this.state.clear}
                    handleCheck = {this.handleCheck.bind(this)}
                    handleSource = {this.handleSource.bind(this)}
                    heightValue = {this.state.height}
                    // hoveredTableId={this.state.hoveredTableId}
                    // popOver={this.state.popOver}
                    // handleTableHover={this.handleTableHover.bind(this)}
                    // handlePopUp={this.handlePopUp.bind(this)}
                  />
                </div>
              );

            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetchPdfSentence: state.fetchPdfSentence,
  fileUpload: state.fileUpload,
  documentDetails: state.documentDetails
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PdfFileEditor));
