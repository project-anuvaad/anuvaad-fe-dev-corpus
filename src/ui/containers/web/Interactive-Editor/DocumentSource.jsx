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

class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        const { sourceSentence} = this.props;
        console.log(sourceSentence)
        let yAxis = 0;

        let style = {
            maxWidth:sourceSentence.page_width + "px",
            // width: this.state.sentences && rightPaddingValue-leftPaddingValue+20+ "px",
            maxHeight:  window.innerHeight - 100,
            position: "relative",
            overflowY: "scroll",
            height: sourceSentence.page_height + "px",
            backgroundColor: "white",
      
            // backgroundImage: this.state.backgroundImage && "url(" + this.state.backgroundImage + ")",
            // backgroundRepeat: "no-repeat",
            // backgroundSize: this.state.backgroundSize + "px"
          };
        
        return (
            <Paper  style={style}>
        <Toolbar style={{ color: darkBlack, background: blueGrey50}}>
          <Typography value="" variant="h6" gutterBottom style={{ flex: 1 }}>
            {this.props.title}
          </Typography>
        </Toolbar>
          {sourceSentence.blocks.map((sentence, index) => {
             
            yAxis = sentence.text_top + (sourceSentence.page_no * sourceSentence.page_height);
            // pageDividerHeight =
            //   (this.state.pageArr && this.state.pageArr.length > 0 && parseInt(this.state.pageArr[sentence.page_no])) +
            //   (parseInt(sourceSentence.page_no) - 1) * parseInt(sentence.page_height);
            // let printPageNo = false;
            // let pageNo = sourceSentence.page_no;
            // let isFirstPage = false;

            // if (index === 0) {
            //   printPageNo = true;
            //   isFirstPage = true;
            // } else if (this.state.sentences[index - 1] && sentence.page_no !== this.state.sentences[index - 1].page_no) {
            //   printPageNo = true;
            // }

            return (
              // <SourceView getSelectionText={this.getSelectionText.bind(this)} paperWidth={paperWidth} key={index} printPageNo={printPageNo} pageDividerHeight={pageDividerHeight} leftPaddingValue={leftPaddingValue} isFirstPage={isFirstPage} pageNo={pageNo} sentence={sentence} yAxis={yAxis} widthValue={parseInt(sentence.width) ? parseInt(sentence.width) : 286} />
              <BlockView
                
                sentence={sentence}
                yAxis = {yAxis}
                page_no = {sourceSentence.blocks.page_no}
               
              />
            );
          })}
            </Paper >
        );
    }
}

export default Preview;
