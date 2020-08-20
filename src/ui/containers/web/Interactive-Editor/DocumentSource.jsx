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

import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";

import Toolbar from "@material-ui/core/Toolbar";
import EditorTable from "./EditorTable"
import Image from "./Image"

class Preview extends React.Component {
  constructor(props) {
    super(props);
  }

  fetchTableContent(sentences) {

    let tableRow = [];
    let index = 0;

    // for (let row in sentences) {
    let col = [];

    if (sentences && sentences.children && Array.isArray(sentences.children) && sentences.children.length > 0) {
      sentences.children.map((tableData, i) => {
        console.log(tableData)
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
          page_no={sourceSentence.blocks.page_no}

        />
      )
    })
  }

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

            <BlockView key={index+ "_" +sentence.block_id}
              sentence={sentence}
              yAxis={yAxis}
              page_no={sourceSentence.text_blocks.page_no}
            />
          )
        })
        }

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
