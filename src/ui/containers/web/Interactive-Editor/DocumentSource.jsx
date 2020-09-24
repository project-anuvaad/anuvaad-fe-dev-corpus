import React from "react";
import BlockView from "./DocumentBlock";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import Paper from "@material-ui/core/Paper";
import MenuItems from "./PopUp";
import Dialog from "../../../components/web/common/SimpleDialog";
import Image from "./Image";
import { withRouter } from "react-router-dom";
import IntractiveApi from "../../../../flux/actions/apis/intractive_translate";

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openEl: false,
      value: false,
      showLoader: false,
      autoCompleteText: null,
      openContextMenu: false,
      targetVal: "",
      showSuggestions: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scrollToPage !== this.props.scrollToPage || this.props.scrollToTop) {
      if (this.refs[this.props.scrollToPage]) {
        this.refs[this.props.scrollToPage].scrollIntoView({
          behavior: "smooth",
          inline: "end"
        });
      }
    }
    if (this.props.createBlockId && prevProps.createBlockId !== this.props.createBlockId) {
      this.setState({ selectedSentence: this.props.createBlockId, value: true });
    }

    if (prevProps.intractiveTrans !== this.props.intractiveTrans) {
      this.setState({
        autoCompleteText: this.props.intractiveTrans && this.props.intractiveTrans.length > 0 && this.props.intractiveTrans[0].tgt,
      });
    }

  }


  updateContent(value){
    this.setState({openDialog:true,selectedArray:value, title: "Merge Blocks",dialogMessage:"Do you want to merge the selected sentences ?"})
  }

  handleRightClick(event) {
    event.preventDefault();
    this.popUp("merge", event);
  }
  handleCheckbox() {
    this.setState({ checkbox: true, openDialog: false });
  }
  handleDialog() {
    debugger
    if (this.state.title === "Split sentence" || this.state.title === "Merge sentence") {
      this.props.handleSentenceOperation(
        window.getSelection().anchorNode.parentNode.id,
        window.getSelection().focusNode.parentNode.id,
        this.props.sourceSentence,
        this.state.title
      );
    }
    
    else if(this.state.title === "Merge Blocks"){

      this.props.updateContent(this.state.selectedArray)
    }
    this.setState({ openDialog: false });
  }

  fetchSentence(sourceSentence) {
    let yAxis = 0;

    sourceSentence.blocks.map((sentence, index) => {
      yAxis = sentence.text_top + sourceSentence.page_no * sourceSentence.page_height;

      return sentence.status !== "Deleted" && <BlockView sentence={sentence} yAxis={yAxis} page_no={this.props.pageNo} />;
    });
  }

  getSelectionText(event, id) {
    let sentenceStart = window.getSelection().anchorNode && window.getSelection().anchorNode.parentNode ?  window.getSelection().anchorNode.parentNode.id.split("_") : 0; 
    let sentenceEnd = window.getSelection().focusNode && window.getSelection().focusNode.parentNode ? window.getSelection().focusNode.parentNode.id.split("_") : 0;
    let senOp;
    if (sentenceStart[0] === sentenceEnd[0] && sentenceStart[1] === sentenceEnd[1]) {
      if (sentenceStart[2] === sentenceEnd[2]) {
        senOp = "split";
      } else {
        senOp = "merge";
      }
    }

    window.getSelection().focusNode.parentNode.id;
    if (!this.state.selectedSentence && !this.props.tokenized) {
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
        sentences = window.getSelection().toString();
      }

      if (sentences) {
        startNode = window.getSelection().anchorNode.parentNode.id;
        endNode = window.getSelection().focusNode.parentNode.id;
        // let parent = startNode ? startNode.split("_")[2] : null

        if (this.props.paperType === "source") {
          selection.startNode = startNode;
          selection.endNode = endNode;
          if (startNode && endNode && window.getSelection().anchorNode.parentNode.parentNode && startNode === endNode) {
            this.setState({ operation_type: "split" });
            window.getSelection().toString() && this.popUp("split", event, senOp);
            selection.startNode = startNode;
          } else if (startNode && endNode && parseInt(startNode.split("_")[2]) !== parseInt(endNode.split("_")[2])) {
            this.setState({ operation_type: "merge" });
            window.getSelection().toString() && this.popUp("Merge Sentence", event);
          }

          this.setState({ selection, value: false });
          return true;
        }
      }
    }
  }

  handleDialogMessage(title, dialogMessage) {
    this.setState({ openDialog: true, title, dialogMessage, openEl: false });
  }

  popUp = (operation_type, event, opType) => {
    this.setState({
      operation_type,
      openEl: true,
      topValue: event.clientY - 4,
      leftValue: event.clientX - 2,
      selectedBlock: null,
      sentenceOp: opType
    });
  };
  handleBlur = (id, workflowcode) => {
    this.setState({ hoveredSentence: null, value: false, selectedSentence: "" });
    this.props.handleBlur(id, workflowcode);
  };
  handleClose = () => {
    
    this.setState({
      openDialog: false,

      operation_type: "",
      arrayClear: true,
      selectedArray:[],
      endSentence: "",
      startSentence: "",
      addSentence: false,
      selectedMergeSentence: [],
      openEl: false
    });
  };

  handleDoubleClick(selectedBlock, value, pageDetail) {
    this.props.handleSource(selectedBlock, value, pageDetail);
    this.setState({ hoveredSentence: null, selectedSentence: selectedBlock, value: true });
  }

  handleCheck(block, evt, val) {
    this.props.handleCheck(block, evt, val);
    this.setState({ selectedBlock: null });
  }

  handleCalc(value, tokenText) {
    const temp = value.split(" ");
    const tagged_tgt = tokenText.tagged_tgt.split(" ");
    const tagged_src = tokenText.tagged_src.split(" ");
    const tgt = tokenText.tgt && tokenText.tgt.split(" ");
    const src = tokenText.src && tokenText.src.split(" ");
    const resultArray = [];
    let index;
    temp.map(item => {
      if (item !== " ") {
        const ind = tgt.indexOf(item, resultArray.length);
        const arr = [item, `${item},`, `${item}.`];
        let src_ind = -1;
        arr.map((el, i) => {
          if (src_ind === -1) {
            src_ind = src.indexOf(el);
            index = i;
          }
          return true;
        });
        if (ind !== -1) {
          resultArray.push(tagged_tgt[ind]);
        } else if (src_ind !== -1) {
          if (index > 0) {
            if (src_ind > tagged_src.length - 1) {
              src_ind = tagged_src.length - 1
            }
            const tem = tagged_src[src_ind];
            resultArray.push(tem.slice(0, tem.length - 1));
          } else {
            resultArray.push(tagged_src[src_ind]);
          }
        } else {
          resultArray.push(item);
        }
      } else {
        resultArray.push(item);
      }
      return true;
    });
    return resultArray.join(" ");
  }
  
  fetchSuggestions(srcText, targetTxt, tokenObject) {
    let targetVal = targetTxt

    this.setState({ showSuggestions: true, autoCompleteText:null })
    const apiObj = new IntractiveApi(srcText, targetVal, { model_id: this.props.modelId }, true, true);
    this.props.APITransport(apiObj);
  }

  handleSuggestionClose() {
    this.setState({ showSuggestions: false })
  }

  handleSuggestion(suggestion, value, src, tokenObject) {
    this.setState({showSuggestions: false})
    this.props.handleSuggestion(suggestion, value)
    this.setState({ autoCompleteText: null, tokenObject })

    let targetVal = value + suggestion
    setTimeout(()=>{
      this.setState({ showSuggestions: true })

    }, 50)

    const apiObj = new IntractiveApi(src, targetVal, { model_id: this.props.modelId }, true, true);
    this.props.APITransport(apiObj);
  }

  handleDoubleClickTarget(event, id, text, pageDetails) {
    this.setState({autoCompleteText: null})
    this.props.handleDoubleClickTarget(event, id, text, pageDetails)
  }

  getContent() {
    let yAxis = 0;
    let sourceSentence = this.props.sourceSentence;
    return (
      <div ref={sourceSentence.page_no}>
        {sourceSentence.text_blocks &&
          sourceSentence.text_blocks.map((sentence, index) => {
            yAxis = sentence.text_top + sourceSentence.page_no * sourceSentence.page_height;
            const block_id = sentence.block_id;
            return (
              <div
                onMouseUp={!this.props.tokenized && this.getSelectionText.bind(this)}
                onKeyUp={!this.props.tokenized && this.getSelectionText.bind(this)}
              >
                {/* {this.props.tokenized ? */}

                <BlockView
                  block_identifier={this.props.block_identifier}
                  sentences={this.props.sentences}
                  has_sibling={this.props.has_sibling}
                  key={index + "_" + sentence.block_id}
                  pageDetail={this.props.pageDetail}
                  sentence={sentence}
                  yAxis={yAxis}
                  page_no={sourceSentence.page_no}
                  handleOnMouseEnter={this.props.handleOnMouseEnter}
                  hoveredSentence={this.props.hoveredSentence}
                  handleDoubleClick={this.handleDoubleClick.bind(this)}
                  selectedBlock={this.state.selectedBlock}
                  handleSourceChange={this.props.handleSourceChange}
                  tokenized={this.props.tokenized}
                  isEditable={this.props.isEditable}
                  handleCheck={this.handleCheck.bind(this)}
                  selectedSourceText={this.props.selectedSourceText}
                  heightValue={this.props.heightValue}
                  value={this.state.value}
                  handleBlur={this.handleBlur.bind(this)}
                  selectedSentence={this.state.selectedSentence}
                  handleOnMouseLeave={this.props.handleOnMouseLeave}
                  handleRightClick={this.handleRightClick.bind(this)}
                  checkbox={this.state.checkbox}
                  handleTextChange={this.props.handleTextChange}
                  paperType={this.props.paperType}
                  mergeButton={this.props.mergeButton}
                  updateContent={this.updateContent.bind(this)}
                  handleDoubleClickTarget={this.handleDoubleClickTarget.bind(this)}
                  targetSelected={this.props.targetSelected}
                  targetText={this.props.targetText}
                  autoCompleteText={this.state.autoCompleteText}
                  fetchSuggestions={this.fetchSuggestions.bind(this)}
                  handleSuggestionClose={this.handleSuggestionClose.bind(this)}
                  handleSuggestion={this.handleSuggestion.bind(this)}
                  showSuggestions={this.state.showSuggestions}
                />
              </div>
            );
          })}

        {this.state.openDialog && (
          <Dialog
            message={this.state.dialogMessage}
            handleSubmit={this.handleDialog.bind(this)}
            handleClose={this.handleClose.bind(this)}
            open
            title={this.state.title}
          />
        )}

        {this.state.openEl && !this.state.selectedSentence && (
          <MenuItems
            isOpen={this.state.openEl}
            topValue={this.state.topValue}
            leftValue={this.state.leftValue}
            anchorEl={this.state.anchorEl}
            operation_type={this.state.operation_type}
            handleClose={this.handleClose.bind(this)}
            handleDialog={this.handleDialogMessage.bind(this)}
            handleDuplicateBlock={this.props.handleDuplicateBlock}
            handleDeleteBlock={this.props.handleDeleteBlock}
            pageData={this.props.sourceSentence}
            handleCheck={this.handleCheck.bind(this)}
            sentenceOp={this.state.sentenceOp}
          />
        )}

        {sourceSentence.images &&
          Array.isArray(sourceSentence.images) &&
          sourceSentence.images.length > 0 &&
          sourceSentence.images.map((images, imgIndex) => {
            return <Image imgObj={images}></Image>;
          })}
      </div>
    );
  }

  handlePaperClick() {
    if (this.state.contentEditableId) {
      this.props.handleAutoCompleteEditor("", "");
      this.setState({
        contentEditableId: null
      });
    }
  }

  render() {
    const { sourceSentence } = this.props;

    let style = {
      maxWidth: sourceSentence.page_width + "px",
      overflowX: "scroll",
      overflowY: "hidden",
      position: "relative",
      minHeight: sourceSentence.page_height + "px",
      backgroundColor: "white",
      marginLeft: "auto",
      marginRight: "auto",
      borderTop: sourceSentence.page_no !== 1 ? "1px black solid" : "",
      borderBottom: this.props.pageCount !== sourceSentence ? "1px black solid" : ""
    };

    return (
      <div ref={el => (this.container = el)}>
        {!this.props.isPreview ? (
          <Paper
            style={style}
            key={sourceSentence.page_no}
            onMouseEnter={() => {
              this.props.handlePreviewPageChange(sourceSentence.page_no, 1);
            }}
          >
            {this.getContent()}
          </Paper>
        ) : (
            <div
              style={style}
              onMouseEnter={() => {
                this.props.handlePreviewPageChange(sourceSentence.page_no, 1);
              }}
            >
              {this.getContent()}
            </div>
          )}
        {/* {this.state.openContextMenu && this.props.paperType === "target" && this.state.autoCompleteText && this.state.targetVal && (
          <Popover1
            isOpen={this.state.openContextMenu}
            topValue={this.props.menuTopValue}
            leftValue={this.props.menuLeftValue}
            anchorEl={this.state.anchorEl}
            handleOnClick={this.handleUpdateSentenceWithPrediction.bind(this)}
            handlePopOverClose={this.handlePopOverClose.bind(this)}
            tableItems={this.state.tableItems}
            tableValues={this.state.tableTitles}
            handlePopUp={this.props.handlePopUp}
            caretPos={this.state.caretPos}
            options={this.state.autoCompleteText}
            paperType={this.props.paperType}
            targetVal={this.state.targetVal}
          ></Popover1>
        )} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apistatus: state.apistatus,
  intractiveTrans: state.intractiveTrans
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      NMTApi: APITransport,
      NMTSPApi: APITransport,
      MODELApi: APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Preview));
