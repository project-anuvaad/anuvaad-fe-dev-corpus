import React from "react";
import ContentEditable from "react-contenteditable";

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      isEditable: false,
      value: false
    };
  }

  handleMouseHover(id) {
    if (!this.props.selectedSentence) {
      this.props.handleOnMouseEnter(id);
    }
  }
  handleBlur = () => {
    this.setState({ toc: false, value: false });
  };

  handleDoubleClick = (eve, val) => {
    this.props.handleEditClick(val);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.selectedSentence !== this.props.selectedSentence) {
        console.log("sajish-----",this.textInput, this.props.selectedSentence)
      this.textInput.focus();
    }
  }

  handleCheck = event => {
    this.props.handleCheck(this.props.sentence.block_id + "_" + this.props.page_no, event, false);
  };

  handleChangeEvent = (event, id) => {
    this.props.handleSourceChange(this.props.sentence.block_id + "_" + this.props.page_no, event, this.props.sentence);
  };

  render() {
    const { sentence } = this.props;

    var styles = {
      position: !sentence.children ? "absolute" : "relative",
      top: !sentence.children ? sentence.text_top + "px" : "auto",
      left: !sentence.children ? sentence.text_left + "px" : "auto",
      fontSize: sentence.font_size + "px",
      color: sentence.font_color,
      width: sentence.text_width + "px",
      fontFamily: sentence.font_family,
      fontWeight: sentence.font_family && sentence.font_family.includes("Bold") && "bold",
      fontFamily: sentence.font_family,
      textAlign: "justify",
      zIndex: 1,
      display: "block",
      outline: "0px solid transparent",
      cursor: !this.state.isEditable && "pointer",
      padding: "0px 5px 0px 5px",
      lineHeight: sentence.children ? parseInt(sentence.text_height / sentence.children.length) + "px" : "20px",
      // backgroundColor: this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no ? "yellow" : ""
      backgroundColor:
        !sentence.children &&
        (this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no && this.props.value
          ? "#F4FDFF"
          : this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock
          ? "#EAEAEA"
          : ""),
      border:
        !sentence.children &&
        (this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no && this.props.value
          ? "1px solid #1C9AB7"
          : this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock
          ? "1px dashed grey"
          : "")
    };
    return (
      <div
        id={sentence.block_id + "_" + this.props.page_no}
        style={styles}
        key={sentence.block_id}
        onBlur={event => this.props.handleBlur(event)}
        onInput={event => this.handleChangeEvent(event, sentence.block_id + "_" + this.props.page_no)}
        onDoubleClick={event => {
          !sentence.children && this.handleDoubleClick(event, sentence.block_id + "_" + this.props.page_no);
        }}
        onMouseLeave={() => {
          this.props.value !== true && this.props.handleOnMouseLeave();
        }}
        onMouseEnter={() => {
          this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no);
        }}
        // // contentEditable = {this.props.createBlockId === sentence.block_id + "_" + this.props.page_no ? true : false}
        // onClick={() => {
        //     if (sentence.block_id + "_" + this.props.page_no !== this.props.selectedBlock) {
        //         this.props.handleBlockClick(false, sentence.block_id + "_" + this.props.page_no)
        //     } else if (sentence.block_id + "_" + this.props.page_no !== this.props.createBlockId) {

        //         console.log(sentence.block_id + "_" + this.props.page_no)
        //         this.props.handleEditor(sentence.block_id + "_" + this.props.page_no)
        //     }
        // }}
        contentEditable={!sentence.children && this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no ? true : false}
        ref={textarea => {
            !sentence.children && (this.textInput = textarea);
        }}
      >
        {sentence.children ? (
          sentence.children.map((textValue, tokenIndex) => {
            return (
              <span>
                {textValue.children ? (
                  textValue.children.map(value => {
                    return (
                      <div
                      ref={textarea => {
                        this.textInput = textarea;
                      }}
                        onDoubleClick={event => {
                          this.handleDoubleClick(event, value.block_id + "_" + this.props.page_no);
                        }}
                        contentEditable={this.props.selectedSentence === value.block_id + "_" + this.props.page_no ? true : false}
                        style={{
                          top: value.text_top + "px",
                          position: "absolute",
                          textAlign: "justify",
                          fontSize: value.font_size + "px",
                          textJustify: "inter-word",

                          border:
                            this.props.selectedSentence === value.block_id + "_" + this.props.page_no && this.props.value
                              ? "1px solid #1C9AB7"
                              : this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock
                              ? "1px dashed grey"
                              : "",
                          // outline: "2px solid red",
                          left: value.text_left + "px",
                          textAlignLast: "justify",
                          // lineHeight: sentence.text_height + 'px',
                          width: value.text_width + "px"
                        }}
                      >
                        {value.text}
                      </div>
                    );
                  })
                ) : (
                  <div
                  ref={textarea => {
                    !textValue.children && (this.textInput = textarea);
                  }}
                    contentEditable={
                      !textValue.children && this.props.selectedSentence === textValue.block_id + "_" + this.props.page_no ? true : false
                    }
                    onDoubleClick={event => {
                      !textValue.children && this.handleDoubleClick(event, textValue.block_id + "_" + this.props.page_no);
                    }}
                    style={{
                      top: textValue.text_top + "px",
                      textAlign: "justify",
                      textAlignLast: "justify",
                      position: "absolute",
                      border:
                        !textValue.children && this.props.selectedSentence === textValue.block_id + "_" + this.props.page_no && this.props.value
                          ? "1px solid #1C9AB7"
                          : this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock
                          ? "1px dashed grey"
                          : "",

                      justifyContent: "space-between",
                      fontSize: textValue.font_size + "px",
                      display: "inline-block",
                      textJustify: "inter-word",
                      MozTextAlignLast: "justify",
                      left: textValue.text_left + "px",
                      // lineHeight: sentence.text_height + 'px',
                      width: textValue.text_width + "px"
                    }}
                  >
                    {textValue.text}
                  </div>
                )}
              </span>
            );
          })
        ) : (
          <span>
            {sentence.text}
            <span> </span>
          </span>
        )}
        {/* {console.log(this.props.hoveredSentence, this.props.sentence.block_id + "_" + this.props.page_no)} */}
        {/* {sentence.children && this.props.hoveredSentence !== this.props.sentence.block_id + "_" + this.props.page_no ? sentence.children.map((textValue, tokenIndex) => {
                        return <span style={{
                        top: textValue.text_top + "px",
                        textAlign: "justify",
                        display: 'inline-block',
                        textJustify: "inter-word",
                        left: textValue.text_left + "px",
                        // lineHeight: sentence.text_height + 'px',
                        width: "100%"}}>{textValue.text}</span>
                    }) : sentence.hasOwnProperty('tokenized_sentences') && sentence.tokenized_sentences.map((text, tokenIndex) => {
                        return <span><span  id = {text.sentence_id} key = {text.sentence_id} style={{ borderRadius: '6px',background:(this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock )? tokenIndex%2 ==0 ? '#92a8d1': "coral":'' }}
                            >{text.src?text.src:text.src_text}</span><span> </span></span>
                    })} */}
      </div>
    );
  }
}

export default Preview;
