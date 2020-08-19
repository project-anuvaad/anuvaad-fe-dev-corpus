import React from "react";
import BlockView from "./DocumentBlock";

class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        const { sentence} = this.props;

       
        
        return (
            <div key={key}>
                {sentence &&
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
              // <SourceView getSelectionText={this.getSelectionText.bind(this)} paperWidth={paperWidth} key={index} printPageNo={printPageNo} pageDividerHeight={pageDividerHeight} leftPaddingValue={leftPaddingValue} isFirstPage={isFirstPage} pageNo={pageNo} sentence={sentence} yAxis={yAxis} widthValue={parseInt(sentence.width) ? parseInt(sentence.width) : 286} />
              <BlockView
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
            </div >
        );
    }
}

export default Preview;
