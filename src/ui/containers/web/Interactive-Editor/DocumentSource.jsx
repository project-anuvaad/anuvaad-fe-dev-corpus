import React from "react";
import BlockView from "./DocumentBlock";
import TokenizedView from "./DocumentTokenized";
import FetchDoc from "../../../../flux/actions/apis/fetchdocsentence";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import Paper from "@material-ui/core/Paper";
import SourceView from "./DocumentSource";
import Data from "./JudgementNew.json";
import Typography from "@material-ui/core/Typography";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import MenuItems from "./PopUp";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";
import Dialog from "../../../components/web/common/SimpleDialog";
import Toolbar from "@material-ui/core/Toolbar";
import EditorTable from "./EditorTable";
import Image from "./Image";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IntractiveApi from "../../../../flux/actions/apis/intractive_translate";
import { withRouter } from "react-router-dom";
import Popover from 'react-text-selection-popover';
import placeBelow from './placeBelow'
import placeRight from './placeRight'
import CircularProgress from '@material-ui/core/CircularProgress';
import Popover1 from "./Menu"

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
          behavior: "smooth", inline: "end"

        })
      }

    }
    if (this.props.createBlockId && prevProps.createBlockId !== this.props.createBlockId) {
      this.setState({ selectedSentence: this.props.createBlockId, value: true })
    }

    if (prevProps.intractiveTrans !== this.props.intractiveTrans) {
      console.log(this.props.intractiveTrans[0].tgt)
      this.setState({
        showLoader: false,
        autoCompleteText: this.props.intractiveTrans[0].tgt,
        openContextMenu: true
      })
    }

    if (this.state.callApi) {
      this.fecthNextSuggestion()
    }
  }
  handleRightClick(event) {
    event.preventDefault();
    this.popUp("merge", event);
  }
  handleCheckbox() {
    this.setState({ checkbox: true, openDialog: false })
  }
  handleDialog() {

    // if (this.state.title === "Merge") {

    //   this.props.handleDialogSave(this.state.selection, this.state.operation_type, this.props.sourceSentence);
    // } else if (this.state.title === "Delete") {
    //   this.props.handleDeleteBlock(window.getSelection().anchorNode.parentNode.parentNode.parentElement.id, '', this.props.sourceSentence)
    // } else if (this.state.title === "Duplicate") {
    //   this.props.handleDuplicateBlock(window.getSelection().anchorNode.parentNode.parentNode.parentElement.id, '', this.props.sourceSentence)
    // } else if (this.state.title === "Create") {
    //   this.props.handleCreateBlock(window.getSelection().anchorNode.parentNode.parentNode.parentElement.id, this.props.sourceSentence)
    //   this.setState({ openDialog: false });
    // }
    if (this.state.title === "Split sentence" || this.state.title === "Merge sentence") {
      this.props.handleSentenceOperation(window.getSelection().anchorNode.parentNode.id, window.getSelection().focusNode.parentNode.id, this.props.sourceSentence, this.state.title)
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
    let sentenceStart = window.getSelection().anchorNode.parentNode.id.split('_');
    let sentenceEnd = window.getSelection().focusNode.parentNode.id.split('_');
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

        startNode = window.getSelection().anchorNode.parentNode.parentNode.parentElement.id;
        endNode = window.getSelection().focusNode.parentNode.parentNode.parentElement.id;
        let parent = startNode ? startNode.split("_")[2] : null

        if (parent === "source") {
          selection.startNode = startNode;
          selection.endNode = endNode;
          if (startNode && endNode && window.getSelection().anchorNode.parentNode.parentNode && startNode === endNode) {
            this.setState({ operation_type: "split" });
            window.getSelection().toString() && this.popUp("split", event, senOp);
            selection.startNode = startNode;
          } else if (startNode && endNode && parseInt(startNode) !== parseInt(endNode)) {
            this.setState({ operation_type: "merge" });
            window.getSelection().toString() && this.popUp("merge", event);
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
    this.setState({ operation_type, openEl: true, topValue: event.clientY - 4, leftValue: event.clientX - 2, selectedBlock: null, sentenceOp: opType });
  };
  handleBlur = () => {
    this.setState({ value: false, selectedSentence: '' })
    this.props.handleOnMouseLeave()
  }
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

  handleEditClick(selectedBlock, event) {
    this.props.handleSource()
    this.props.hoveredSentence && this.setState({ hoveredSentence: null, selectedSentence: selectedBlock, value: true })

  }

  handleDoubleClick(selectedBlock, event, sentence) {

    this.props.handleSource(sentence)
    this.setState({ selectedBlock: selectedBlock, openEl: false, value: true })

  }

  handleCheck(block, evt, val) {

    this.props.handleCheck(block, evt, val)
    this.setState({ selectedBlock: null })
  }

  handleBlockClick(clear, selectedSentence) {
    ((selectedSentence && this.state.selectedBlock !== selectedSentence) || clear) && this.setState({ selectedBlock: null, clear: false })
    this.props.handleEditor(selectedSentence)
  }

  fecthNextSuggestion() {
    const apiObj = new IntractiveApi(this.state.suggestionSrc, this.state.suggestionText, this.state.suggestionId, true, true);
    this.props.APITransport(apiObj);
    this.setState({ callApi: false, showLoader: true })
  }

  handleTargetChange(refId, event, sentence, tokenText, tokenIndex, senIndex) {
    console.log('**********************************')
    var selObj = window.getSelection();
    var range = selObj.getRangeAt(0)
    var boundary = range.getBoundingClientRect();
    if (boundary) {
      this.setState({
        topValue: boundary.y + 15,
        leftValue: boundary.x + 5
      })
    }
    if (event.key === 'Escape') {
      this.props.handleEditor(null, this.props.paperType)
      this.setState({
        contentEditableId: null,
        selectedIndex: 0,
        editable: false
      })
    }
    else if (event.key === 'Tab') {
      event.preventDefault()
    }

    if (((event.key === ' ' || event.key === 'Spacebar') && this.state.previousKeyPressed === 'Shift')) {
      let editableDiv = this.refs[refId]
      console.log(editableDiv)
      debugger
      var caretPos = 0,
        sel, range;
      if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          if (range.commonAncestorContainer.parentNode == editableDiv) {
            caretPos = range.endOffset;
          }
        }
      } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (range.parentElement() == editableDiv) {
          var tempEl = document.createElement("span");
          editableDiv.insertBefore(tempEl, editableDiv.firstChild);
          var tempRange = range.duplicate();
          tempRange.moveToElementText(tempEl);
          tempRange.setEndPoint("EndToEnd", range);
          caretPos = tempRange.text.length;
        }
      }
      let targetVal = this.handleCalc(editableDiv.textContent.substring(0, 5), tokenText)
      // this.props.fecthNextSuggestion()
      const apiObj = new IntractiveApi(tokenText.src, tokenText.tgt, this.props.modelId, true, true);
      this.props.APITransport(apiObj);
      this.setState({
        anchorEl: event.currentTarget,
        // caretPos: caretPos,
        targetVal: tokenText.tgt,
        // targetVal: editableDiv.textContent.substring(0, caretPos),
        // tokenIndex,
        showLoader: true,
        // senIndex,
        // suggestionSrc: tokenText.src,
        // suggestionId: this.props.modelDetails
      })
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter') {
      if (event.key === 'Enter') {
        if (this.state.open) {
          this.handleUpdateSentenceWithPrediction()
        }
      }
      event.preventDefault()
    }
    else {
      this.setState({
        open: false,
        // showLoader: false
      })
    }
    this.setState({
      previousKeyPressed: event.key,
      previousPressedKeyCode: event.keyCode
    })
  }

  handleOnDoubleClickTarget(e, id, pageNo, ref) {
    this.props.handleEditor(id, this.props.paperType)
    this.setState({
        open: false,
        showLoader: false,
        editable: true,
        contentEditableId: id
    })
    // setTimeout(() => { this.refs[ref].focus() }, 100)
}

handleOnClickTarget(e, id, pageNo, ref) {
  this.setState({
    open: false,
    showLoader: false,
    topValue: e.clientY + 15,
    leftValue: e.clientX + 5
  })

  this.refs[ref].focus()
}

  handlePopOverClose() {
    this.setState({ openContextMenu: false })
  }

  handleUpdateSentenceWithPrediction(selectedText) {
    this.setState({
      open: false,
      showLoader: false,
      openContextMenu: false
    })

    var self = this
    setTimeout(() => {
      var sentences = Object.assign([], this.state.sentences ? this.state.sentences : this.props.sentences)
      // sentences[this.state.senIndex]['tokenized_sentences'][this.state.tokenIndex].target = this.state.targetVal + this.state.autoCompleteText[index].substring(this.state.caretPos)
      sentences[this.state.senIndex]['tokenized_sentences'][this.state.tokenIndex].target = this.state.targetVal + selectedText
      self.setState({
        sentences: sentences,
        selectedIndex: 0,
        suggestionText: this.state.targetVal + selectedText,

        callApi: true,
        targetVal: this.state.targetVal + selectedText,
        // caretPos: this.state.caretPos + selectedText.length
      })
      document.activeElement.blur()
    }, 50)

    setTimeout(() => {
      this.setCaretPosition(selectedText)

    }, 100)

    setTimeout(() => {
      this.setState({ showLoader: true })
      this.fetchCursorPosition()
    }, 250)
  }

  getContent() {
    let yAxis = 0;
    let sourceSentence = this.props.sourceSentence
    return (
      <div ref={sourceSentence.page_no}>
        {sourceSentence.tables &&
          Array.isArray(sourceSentence.tables) &&
          sourceSentence.tables.map((table, i) => {
            return <EditorTable
              key={i} table={table}
              tableId={i}
              pageNo={sourceSentence.page_no}
              hoveredTableId={this.props.hoveredTableId}
              popOver={this.props.popOver}
              currentPage={this.props.sourceSentence}
              handleTableHover={this.props.handleTableHover}
              handlePopUp={this.props.handlePopUp}
              handleDeleteTable={this.props.handleDeleteTable}
              handleDeleteBlock={this.props.handleDeleteBlock}
            ></EditorTable>;
          })}

        {sourceSentence.text_blocks &&
          sourceSentence.text_blocks.map((sentence, index) => {
            yAxis = sentence.text_top + sourceSentence.page_no * sourceSentence.page_height;
            const block_id = sentence.block_id
            return (
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
                      contentEditableId= {this.state.contentEditableId}
                      editable={this.state.editable}
                    /></div>}

              </div>
            );
          })}
        <Popover isOpen={this.state.showLoader} containerNode={this.state.anchorEl} placementStrategy={placeRight} >
          <CircularProgress
            // disableShrink
            size={18}
            thickness={8}
            style={{ marginLeft: "15px" }}
          />
        </Popover>
        {this.state.openDialog && (
          <Dialog
            message={"Please select checkbox to merge blocks"}
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
        {this.state.openContextMenu && this.props.paperType === "target" && this.state.autoCompleteText &&
          <Popover1
            isOpen={this.state.openContextMenu}
            topValue={this.state.topValue}
            leftValue={this.state.leftValue}
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
          >

          </Popover1>}

        {sourceSentence.images &&
          Array.isArray(sourceSentence.images) &&
          sourceSentence.images.length > 0 &&
          sourceSentence.images.map((images, imgIndex) => {
            return <Image imgObj={images}></Image>;
          })}

      </div>
    )
  }

  render() {
    const { sourceSentence } = this.props;

    let style = {
      maxWidth: sourceSentence.page_width + "px",
      overflowX: 'scroll',
      overflowY: 'hidden',
      // width: this.state.sentences && rightPaddingValue-leftPaddingValue+20+ "px",
      position: "relative",
      minHeight: sourceSentence.page_height + "px",
      backgroundColor: "white",
      marginLeft: "auto",
      marginRight: "auto",
      borderTop: sourceSentence.page_no !== 1 ? "1px black solid" : "",
      borderBottom: this.props.pageCount !== sourceSentence ? "1px black solid" : ""
      // backgroundImage: this.state.backgroundImage && "url(" + this.state.backgroundImage + ")",
      // backgroundRepeat: "no-repeat",
      // backgroundSize: this.state.backgroundSize + "px"
    };

    return (
      <div ref={(el) => (this.container = el)}>
        {
          !this.props.isPreview ?
            <Paper style={style} key={sourceSentence.page_no}
              onMouseEnter={() => { this.props.handlePreviewPageChange(sourceSentence.page_no, 1) }}
            >{this.getContent()}</Paper> :
            <div style={style}
              onMouseEnter={() => { this.props.handlePreviewPageChange(sourceSentence.page_no, 1) }}
            >{this.getContent()}</div>
        }
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

