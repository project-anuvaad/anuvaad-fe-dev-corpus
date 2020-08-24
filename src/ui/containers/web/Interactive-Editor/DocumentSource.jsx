import React from "react";
import BlockView from "./DocumentBlock";
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

import Toolbar from "@material-ui/core/Toolbar";
import EditorTable from "./EditorTable"
import Image from "./Image"

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openEl:false}
  }

  fetchTableContent(sentences) {

    let tableRow = [];
    let index = 0;

    // for (let row in sentences) {
    let col = [];

    if (sentences && sentences.children && Array.isArray(sentences.children) && sentences.children.length > 0) {
      sentences.children.map((tableData, i) => {
       
        if (tableData.text && Array.isArray(tableData.text) && tableData.text.length > 0) {
          tableData.text.map((data, index) => {
            // console.log(data)
            // console.log(tableData.font_family )

            col.push(
              <td
                style={{
                  fontSize: data.font_size + "px",
                  color: data.font_color,
                  width: tableData.text_width + "px",
                  // width: data.text_width + "px",
                  left: data.text_left + "px",
                  top: data.text_top+ "px",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  lineHeight: parseInt(sentences.text_height / sentences.children.length) +'px',
                  fontWeight: data.font_family && data.font_family.includes("Bold") && 'bold',
                }}
              >{data.text}</td>
            )

          })
        }

      })
    }

    if (col && col.length > 0) {
      tableRow.push(<tr>{col}</tr>)
    }
    index++;

    return tableRow

  }



  fetchTable(table, i) {
    return (
      <div>
        <table style={{ border: "1px solid black", borderCollapse: "collapse", position: "absolute", top: table.text_top + "px", left: table.text_left + "px", width: table.text_width + "px" }}>
          <tbody>{this.fetchTableContent(table)}</tbody>
        </table>
      </div>
    )
  }

  fetchSentence(sourceSentence) {
    let yAxis = 0;

    sourceSentence.blocks.map((sentence, index) => {
      yAxis = sentence.text_top + (sourceSentence.page_no * sourceSentence.page_height);

      return (
        <BlockView

          sentence={sentence}
          yAxis={yAxis}
          page_no={this.props.pageNo}

        />
      )
    })
  }

  getSelectionText(event, id) {
    console.log(event,id);

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
    console.log(window.getSelection())
    if (sentences) {
      console.log("sel---",window.getSelection().anchorNode);
      startNode = window.getSelection().anchorNode.parentElement.id;
      endNode = window.getSelection().focusNode.parentElement.id;
      console.log("node---",startNode, endNode, this.props.sourceSentence.text_blocks);
      
        if (startNode===endNode) {
          this.setState({operation_type:"split"})
          this.popUp("split", event);
        }
        else if(parseInt(startNode)+1===parseInt(endNode)){
          
          this.setState({operation_type:"merge"})
          this.popUp("merge", event);
        }

       

        return true;
      
    }

    if (selection && selection.startNode && selection.endNode) {
      this.handleSelection(selection, event);
    }
  }

  handleDialog(title, dialogMessage) {
    this.setState({ openDialog: true, title, dialogMessage, openEl: false });
  }

  popUp = (operation_type, event, sentenceDetails, selectedText, balanceText) => {
    this.setState({ operation_type, openEl: true, topValue: event.clientY - 4, leftValue: event.clientX - 2 });
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

  render() {
    const { sourceSentence } = this.props;

    let yAxis = 0;

    let style = {
      maxWidth: sourceSentence.page_width + "px",
      // width: this.state.sentences && rightPaddingValue-leftPaddingValue+20+ "px",

      position: "relative",

      height: sourceSentence.page_height + "px",
      backgroundColor: "white",

      // backgroundImage: this.state.backgroundImage && "url(" + this.state.backgroundImage + ")",
      // backgroundRepeat: "no-repeat",
      // backgroundSize: this.state.backgroundSize + "px"
    };


    return (
      <Paper style={style}>

        {
          sourceSentence.tables && Array.isArray(sourceSentence.tables) && sourceSentence.tables.map((table, i) => {
            return (<EditorTable key={i} table={table}></EditorTable>)
          })
        }

        {sourceSentence.text_blocks && sourceSentence.text_blocks.map((sentence, index) => {
          yAxis = sentence.text_top + (sourceSentence.page_no * sourceSentence.page_height);

          return (
            <div onMouseUp={this.getSelectionText.bind(this)}
            onKeyUp={this.getSelectionText.bind(this)}>

            
            <BlockView key={index+ "_" +sentence.block_id}
              sentence={sentence}
              yAxis={yAxis}
              page_no={sourceSentence.page_no}
              handleOnMouseEnter={this.props.handleOnMouseEnter}
              hoveredSentence={this.props.hoveredSentence}
            />
            </div>
          )
        })
        }

{this.state.openEl && (
                <MenuItems
                  isOpen={this.state.openEl}
                  topValue={this.state.topValue}
                  leftValue={this.state.leftValue}
                  anchorEl={this.state.anchorEl}
                  operation_type={this.state.operation_type}
                  handleClose={this.handleClose.bind(this)}
                  handleDialog={this.handleDialog.bind(this)}
                />
              )}

        {
          sourceSentence.images && Array.isArray(sourceSentence.images) && sourceSentence.images.length>0 && sourceSentence.images.map((images, imgIndex) => {
            return (<Image imgObj={images}></Image>)
          })
        }


      </Paper >
    );
  }
}

export default Preview;
