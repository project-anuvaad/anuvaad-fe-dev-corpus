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


class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openEl: false,
      value: false,
      showLoader: false,
      autoCompleteText: null,
      openContextMenu: false,
      targetVal: ""
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
        showLoader: false,
        autoCompleteText: this.props.intractiveTrans[0].tgt,
        openContextMenu: true
      });
    }

    if (this.state.callApi) {
      this.fecthNextSuggestion();
    }
  }

  handleRightClick(event) {
    event.preventDefault();
    this.popUp("merge", event);
  }
  handleCheckbox() {
    this.setState({ checkbox: true, openDialog: false });
  }
  handleDialog() {
    if (this.state.title === "Split sentence" || this.state.title === "Merge sentence") {
      this.props.handleSentenceOperation(
        window.getSelection().anchorNode.parentNode.id,
        window.getSelection().focusNode.parentNode.id,
        this.props.sourceSentence,
        this.state.title
      );
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
    let sentenceStart = window.getSelection().anchorNode.parentNode.id.split("_");
    let sentenceEnd = window.getSelection().focusNode.parentNode.id.split("_");
    let senOp;
    console.log("----", sentenceStart, sentenceEnd);
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
  handleBlur = () => {
    this.setState({ hoveredSentence: null,value: false, selectedSentence: ""});
    this.props.handleBlur();
  };
  handleClose = () => {
    this.setState({
      openDialog: false,

      operation_type: "",

      endSentence: "",
      startSentence: "",
      addSentence: false,
      selectedMergeSentence: [],
      openEl: false
    });
  };

  handleDoubleClick(selectedBlock, value, pageDetail) {
    // console.log("------",selectedBlock)
    this.props.handleSource(selectedBlock, value, pageDetail);
    this.setState({ hoveredSentence: null, selectedSentence: selectedBlock, value: true });
  }

  handleCheck(block, evt, val) {
    this.props.handleCheck(block, evt, val);
    this.setState({ selectedBlock: null });
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
<<<<<<< HEAD
              <div
                onMouseUp={!this.props.tokenized && this.getSelectionText.bind(this)}
                onKeyUp={!this.props.tokenized && this.getSelectionText.bind(this)}
              >
                {/* {this.props.tokenized ? */}

                <BlockView
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
                  updateContent={this.props.updateContent}
                  handleDoubleClickTarget={this.props.handleDoubleClickTarget}
                  targetSelected={this.props.targetSelected}
                  targetText={this.props.targetText}
                />
=======
              <div onMouseUp={!this.props.tokenized && this.getSelectionText.bind(this)} onKeyUp={!this.props.tokenized && this.getSelectionText.bind(this)}>
                {this.props.tokenized ?

                  <BlockView
                    key={index + "_" + sentence.block_id}
                    sentence={sentence}
                    yAxis={yAxis}
                    page_no={sourceSentence.page_no}
                    handleOnMouseEnter={this.props.handleOnMouseEnter}
                    hoveredSentence={this.props.hoveredSentence}
                    handleDoubleClick={this.handleDoubleClick.bind(this)}
                    selectedBlock={this.state.selectedBlock}
                    handleBlockClick={this.handleBlockClick.bind(this)}
                    handleSourceChange={this.props.handleSourceChange}

                    isEditable={this.props.isEditable}
                    handleEditor={this.props.handleEditor}
                    handleCheck={this.handleCheck.bind(this)}
                    selectedSourceText={this.props.selectedSourceText}
                    heightValue={this.props.heightValue}
                    value={this.state.value}
                    handleBlur={this.handleBlur.bind(this)}
                    handleEditClick={this.handleEditClick.bind(this)}
                    selectedSentence={this.state.selectedSentence}
                    handleOnMouseLeave={this.props.handleOnMouseLeave}
                    handleRightClick={this.handleRightClick.bind(this)}
                    checkbox={this.state.checkbox}
                    handleTextChange={this.props.handleTextChange}
                    paperType={this.props.paperType}
                    mergeButton={this.props.mergeButton}
                    updateContent={this.props.updateContent}
                  /> :
                  <div ref={block_id + "_" + sourceSentence.page_no + "_" + this.props.paperType}>
                    <TokenizedView
                      key={index + "_" + sentence.block_id}
                      sentence={sentence}
                      yAxis={yAxis}
                      page_no={sourceSentence.page_no}
                      handleOnMouseEnter={this.props.handleOnMouseEnter}
                      hoveredSentence={this.props.hoveredSentence}
                      handleDoubleClick={this.handleDoubleClick.bind(this)}
                      selectedBlock={this.state.selectedBlock}
                      handleBlockClick={this.handleBlockClick.bind(this)}
                      handleSourceChange={this.props.handleSourceChange}
                      scrollToId={this.props.scrollToId}
                      isEditable={this.props.isEditable}
                      handleEditor={this.props.handleEditor}
                      handleCheck={this.handleCheck.bind(this)}
                      selectedSourceText={this.props.selectedSourceText}
                      heightValue={this.props.heightValue}
                      value={this.state.value}
                      handleBlur={this.handleBlur.bind(this)}
                      handleEditClick={this.handleEditClick.bind(this)}
                      selectedSentence={this.state.selectedSentence}
                      handleOnMouseLeave={this.props.handleOnMouseLeave}
                      paperType={this.props.paperType}
                      fecthNextSuggestion={this.fecthNextSuggestion.bind(this)}
                      handleTargetChange={this.handleTargetChange.bind(this)}
                      handleOnClickTarget={this.handleOnClickTarget.bind(this)}
                      handleOnDoubleClickTarget={this.handleOnDoubleClickTarget.bind(this)}
                      contentEditableId={this.state.contentEditableId}
                      editable={this.state.editable}
                      showLoader={this.state.showLoader}
                      editableId={this.props.editableId}
                      handleAutoCompleteEditor={this.props.handleAutoCompleteEditor}
                      handleClearData={this.handleClearData.bind(this)}
                    /></div>}

>>>>>>> 2ceb81c19cddcac9cf1ce9c05ec23fb985acd398
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

<<<<<<< HEAD
  handlePaperClick() {
    if (this.state.contentEditableId) {
      this.props.handleAutoCompleteEditor("", "");
      this.setState({
        contentEditableId: null
      });
    }
=======
  handleClearData() {
    this.setState({ contentEditableId: null })
>>>>>>> 2ceb81c19cddcac9cf1ce9c05ec23fb985acd398
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
