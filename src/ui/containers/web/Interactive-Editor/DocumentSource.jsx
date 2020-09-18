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

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openEl: false,
      value : false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scrollToPage !== this.props.scrollToPage || this.props.scrollToTop) {
      if (this.refs[this.props.scrollToPage]) {
        this.refs[this.props.scrollToPage].scrollIntoView({
          behavior: "smooth"

        })
      }
      
    }
    if (this.props.createBlockId && prevProps.createBlockId !== this.props.createBlockId) {
      console.log("CDU-----", this.props.createBlockId)
      this.setState({selectedSentence : this.props.createBlockId, value: true})
    }
    
  }
  handleRightClick(event){
    event.preventDefault();
    this.popUp("merge", event);
  }
  handleCheckbox(){
    console.log()
    this.setState({checkbox:true, openDialog: false})
  }
  handleDialog() {

    if (this.state.title === "Merge") {

      this.props.handleDialogSave(this.state.selection, this.state.operation_type, this.props.sourceSentence);
    } else if (this.state.title === "Delete") {
      this.props.handleDeleteBlock(window.getSelection().anchorNode.parentNode.parentNode.parentElement.id, '', this.props.sourceSentence)
    } else if (this.state.title === "Duplicate") {
      this.props.handleDuplicateBlock(window.getSelection().anchorNode.parentNode.parentNode.parentElement.id, '', this.props.sourceSentence)
    } else if (this.state.title === "Create") {
      this.props.handleCreateBlock(window.getSelection().anchorNode.parentNode.parentNode.parentElement.id, this.props.sourceSentence)
      this.setState({ openDialog: false });
    }
    else if(this.state.title === "Split sentence" ||this.state.title === "Merge sentence"){
      this.props.handleSentenceOperation(window.getSelection().anchorNode.parentNode.id,window.getSelection().focusNode.parentNode.id, this.props.sourceSentence, this.state.title)
      
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
    
    if(sentenceStart[0] === sentenceEnd[0] && sentenceStart[1] === sentenceEnd[1]){
      if(sentenceStart[2] === sentenceEnd[2]){
        senOp = "split";
      }else{
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

  handleDialogMessage(title, dialogMessage) {
    this.setState({ openDialog: true, title, dialogMessage, openEl: false });
  }

  popUp = (operation_type, event, opType) => {
    this.setState({ operation_type, openEl: true, topValue: event.clientY - 4, leftValue: event.clientX - 2, selectedBlock: null, sentenceOp: opType });
  };
  handleBlur = ()=>{
    this.setState({ value : false, selectedSentence : ''})
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
    
    this.props.hoveredSentence && this.setState({ hoveredSentence: null, selectedSentence: selectedBlock, value : true })
    
  }

  handleDoubleClick(selectedBlock, event, sentence) {
    
    this.props.handleSource(sentence)
    this.setState({  selectedBlock: selectedBlock, openEl: false, value : true })
    
  }

  handleCheck(block, evt, val){
   
    this.props.handleCheck(block, evt, val)
    this.setState({ selectedBlock: null })
  }

  handleBlockClick(clear, selectedSentence) {


    ((selectedSentence && this.state.selectedBlock !== selectedSentence) || clear) && this.setState({ selectedBlock: null, clear: false })
    this.props.handleEditor(selectedSentence)
  }

  getContent() {
    let yAxis = 0;
    let sourceSentence = this.props.sourceSentence
    return (
      <div>
        {sourceSentence.tables &&
          Array.isArray(sourceSentence.tables) &&
          sourceSentence.tables.map((table, i) => {
            return <EditorTable
              key={i} table={table}
              tableId={i}
              pageNo={sourceSentence.page_no}
              hoveredTableId={this.props.hoveredTableId}
              popOver={this.props.popOver}
              currentPage = {this.props.sourceSentence}
              handleTableHover={this.props.handleTableHover}
              handlePopUp={this.props.handlePopUp}
              handleDeleteTable={this.props.handleDeleteTable}
              handleDeleteBlock={this.props.handleDeleteBlock}
            ></EditorTable>;
          })}

        {sourceSentence.text_blocks &&
          sourceSentence.text_blocks.map((sentence, index) => {
            yAxis = sentence.text_top + sourceSentence.page_no * sourceSentence.page_height;
            
            return (
              <div onMouseUp={ !this.props.tokenized&& this.getSelectionText.bind(this)} onKeyUp={ !this.props.tokenized && this.getSelectionText.bind(this)} ref={sourceSentence.page_no}>
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
                  handleCheck = {this.handleCheck.bind(this)}
                  selectedSourceText = {this.props.selectedSourceText}
                  heightValue  = {this.props.heightValue}
                  value = {this.state.value}
                  handleBlur = {this.handleBlur.bind(this)}
                  handleEditClick = {this.handleEditClick.bind(this)}
                  selectedSentence = {this.state.selectedSentence}
                  handleOnMouseLeave = {this.props.handleOnMouseLeave}
                  handleRightClick = {this.handleRightClick.bind(this)}
                  checkbox = {this.state.checkbox}
                />: <TokenizedView
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
                handleCheck = {this.handleCheck.bind(this)}
                selectedSourceText = {this.props.selectedSourceText}
                heightValue  = {this.props.heightValue}
                value = {this.state.value}
                handleBlur = {this.handleBlur.bind(this)}
                handleEditClick = {this.handleEditClick.bind(this)}
                selectedSentence = {this.state.selectedSentence}
                handleOnMouseLeave = {this.props.handleOnMouseLeave}
              />}
              </div>
            );
          })}

        {/* {this.state.openDialog && (
          <Dialog
            message={"Please select checkbox to merge blocks"}
            handleSubmit={this.handleDialog.bind(this)}
            handleClose={this.handleClose.bind(this)}
            open
            title={this.state.title}
          />
        )} */}
{this.state.openDialog && (
<Dialog
            message={"Please select checkbox to merge blocks"}
            handleSubmit={this.handleCheckbox.bind(this)}
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
            sentenceOp = {this.state.sentenceOp}
          />
        )}

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
      // width: this.state.sentences && rightPaddingValue-leftPaddingValue+20+ "px",
      position: "relative",
      height: sourceSentence.page_height + "px",
      backgroundColor: "white",
      marginLeft: "auto",
      marginRight: "auto",
      borderTop: sourceSentence.page_no !== 1 ? "1px black solid" : "",
      borderBottom: this.props.pageCount  !== sourceSentence ? "1px black solid" : ""
      // backgroundImage: this.state.backgroundImage && "url(" + this.state.backgroundImage + ")",
      // backgroundRepeat: "no-repeat",
      // backgroundSize: this.state.backgroundSize + "px"
    };

    return (
      <div>
        {
          !this.props.isPreview ?
            <Paper style={style} key = {sourceSentence.page_no}
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

export default Preview;
