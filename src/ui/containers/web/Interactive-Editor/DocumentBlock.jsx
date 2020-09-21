import React from "react";
import ContentEditable from "react-contenteditable";
import Checkbox from "@material-ui/core/Checkbox";
import { Textfit } from "react-textfit";

import ScaleText from "react-scale-text";

var arr = [];
class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      isEditable: false,
      value: false,
      selectedValueArray: [],
      mergeButton: ""
    };
  }

  handleMouseHover(id) {
    if (!this.props.selectedSentence) {
      this.props.handleOnMouseEnter(id, this.props.parent);
    }
  }

  updateContent(val) {
    this.props.updateContent(val);
    arr = [];
  }

  handleChange = name => event => {
    //   let arr = this.state.selectedValueArray;

    if (this.state[name]) {
      arr = arr.filter(item => item !== name);
    } else {
      arr.push(name);
    }

    this.setState({ [name]: !this.state[name], selectedValueArray: arr });
  };
  handleBlur = () => {
    this.setState({ toc: false, value: false });
  };

  handleDoubleClick = (event, val, text, u) => {
    event.preventDefault();

    
    this.props.handleEditClick(val, text);
    setTimeout(() => {
      this.textInput&&this.textInput.current.focus()
    }, 500);
    
  };

  componentDidUpdate(prevProps) {
    if (prevProps.selectedSentence !== this.props.selectedSentence) {

      // this.refs[this.props.selectedSentence].focus();
    }
  }

  handleCheck = event => {
    // this.props.handleCheck(this.props.sentence.block_id + "_" + this.props.page_no, event, false);
  };

  handleChangeEvent = event => {
    // this.props.handleTextChange(event, id)
    this.props.handleSourceChange(event, this.props.sentence);
  };

  render() {
    const { sentence } = this.props;

    var styles = {
      position: "absolute",
      top: sentence.text_top + "px",
      left: sentence.text_left + "px",
      fontSize: sentence.font_size + "px",
      color: sentence.font_color,
      width: sentence.text_width + "px",
      height: sentence.text_height + "px",

      fontFamily: sentence.font_family,
      fontWeight: sentence.font_family && sentence.font_family.includes("Bold") && "bold",
      fontFamily: sentence.font_family,
      textAlign: "justify",
      zIndex: 1,
      display: "block",
      outline: "0px solid transparent",
      cursor: !this.state.isEditable && "pointer",
      padding: "5px",
      lineHeight: sentence.children ? parseInt(sentence.text_height / sentence.children.length) + "px" : "20px",
      //   backgroundColor:
      // !sentence.children && (this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no && this.props.value
      //     ? "#F4FDFF": ""),

      // backgroundColor: this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no ? "yellow" : ""
      //   backgroundColor:
      //   !sentence.children && (this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no && this.props.value
      //       ? "#F4FDFF"
      //       : this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock
      //       ? "#EAEAEA"
      //       : ""),
      border:
        this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no + "_source" &&
        !this.props.selectedBlock &&
        this.props.value !== true
          ? "2px dotted grey"
          : ""
    };

    return (
      <div>
        {this.props.mergeButton === "save" ? (
          <Checkbox
            style={{ top: sentence.text_top - 10 + "px", left: sentence.text_left - 50 + "px", position: "absolute", zIndex: 4 }}
            checked={this.state[sentence.block_id + "_" + this.props.page_no]}
            onChange={this.handleChange(sentence.block_id + "_" + this.props.page_no)}
            value={sentence.block_id + "_" + this.props.page_no}
            color="primary"
          />
        ) : this.props.mergeButton === "Merge" && arr.length > 0 ? (
          this.updateContent(arr)
        ) : (
          ""
        )}
        <div
          id={sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType}
          style={styles}
          key={sentence.block_id}
          onBlur={event => this.props.handleBlur(event)}
          // onInput={event => this.handleChangeEvent(event, sentence.block_id + "-" + this.props.page_no)}
          onDoubleClick={event => {
            !sentence.children && this.handleDoubleClick(event, sentence.block_id + "_" + this.props.page_no, sentence);
          }}
          // onContextMenu={event => !this.props.checkbox && this.props.handleRightClick(event)}
          onMouseLeave={() => {
            this.props.value !== true && this.props.handleOnMouseLeave();
          }}
          onMouseEnter={() => {
            this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType);
          }}
          // contentEditable={ this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no ? true : false}
          // contentEditable={this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no ?  true: false}
          ref={sentence.block_id + "_" + this.props.page_no}
        >
          {!sentence.children && (
            <Textfit
              mode="single"
              onReady={this.handleCheck.bind(this)}
              style={{ height :sentence.text_height + "px", width: parseInt(sentence.text_width) }}
              forceSingleModeWidth={true}
              min={1}
              max={parseInt(sentence.font_size)}
            >
              {this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no ? (
                <ContentEditable
                  innerRef={this.textInput}
                  html={this.props.selectedSourceText.text}
                  disabled={false}
                  onBlur={this.handleCheck}
                  onChange={this.handleChangeEvent}
                  style={{
                    border: "1px solid #1C9AB7",
                    padding: "5px",
                    cursor: "auto",
                    backgroundColor: "#F4FDFF",
                    outline: "0px solid transparent",
                    // width : value.text_width+1- + "px",
                    height :sentence.text_height + "px",
                    // height: !sentence.children && parseInt(sentence.text_height) + "px"
                  }}
                />
              ) : (
                sentence.text
              )}
            </Textfit>
          )}
        </div>
        {sentence.children &&
          sentence.children.map((textValue, tokenIndex) => {
            return (
              <div>
                {textValue.children ? (
                  textValue.children.map(value => {
                    let width = value.text_width;
                    return (
                      <div
                        //   onInput={event => this.handleChangeEvent(event, value.block_id + "-" + this.props.page_no, value.text_height)}
                        //   onContextMenu={event => !this.props.checkbox && this.props.handleRightClick(event)}
                        onBlur={event => this.props.handleBlur(event)}
                        id={value.block_id + "_" + this.props.page_no + "_" + this.props.paperType}
                        ref={value.block_id + "_" + this.props.page_no}
                        onDoubleClick={event => {
                          this.handleDoubleClick(event, value.block_id + "_" + this.props.page_no, value);
                        }}
                        onMouseLeave={() => {
                          this.props.value !== true && this.props.handleOnMouseLeave();
                        }}
                        onMouseEnter={() => {
                          this.props.value !== true &&
                            this.handleMouseHover(sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType);
                        }}
                        // contentEditable={this.props.selectedSentence === value.block_id + "_" + this.props.page_no ? true : false}
                        style={{
                          top: value.text_top + "px",
                          position: "absolute",
                          textAlign: "justify",
                          fontSize: value.font_size + "px",
                          textJustify: "inter-word",
                          outline: "0px solid transparent",
                          zIndex: 1,
                          padding: "5px",
                          height: value.text_height + "px",
                          //   maxHeight: value.text_height + "px",
                          backgroundColor:
                            this.props.selectedSentence === value.block_id + "_" + this.props.page_no + "_source" && this.props.value
                              ? "#F4FDFF"
                              : "",
                          border:
                            this.props.selectedSentence === value.block_id + "_" + this.props.page_no + "_source" && this.props.value
                              ? "1px solid #1C9AB7"
                              : "",
                          // outline: "2px solid red",
                          left: value.text_left + "px",
                          //   textAlignLast: this.props.selectedSentence !== textValue.block_id + "_" + this.props.page_no&& "justify",
                          // lineHeight: sentence.text_height + 'px',
                          textAlignLast: "justify",
                          width: value.text_width + "px"
                        }}
                      >

                        <Textfit
                          mode="single"
                          onReady={this.handleCheck.bind(this)}
                          style={{ width: parseInt(value.text_width), overflow: "hidden" }}
                          forceSingleModeWidth={true}
                          min={1}
                          max={parseInt(value.font_size)}
                        >
                          {this.props.selectedSentence === value.block_id + "_" + this.props.page_no ? (
                            <ContentEditable
                              innerRef={this.textInput}
                              html={this.props.selectedSourceText.text}
                              disabled={false}
                              onBlur={this.handleCheck}
                              onChange={this.handleChangeEvent}
                              style={{
                                border: "1px solid #1C9AB7",
                                padding: "5px",
                                cursor: "auto",
                                backgroundColor: "#F4FDFF"
                                // width : value.text_width+1- + "px",
                                // height :value.text_height + "px",
                                // height: !sentence.children && parseInt(sentence.text_height) + "px"
                              }}
                            />
                          ) : (
                            value.text
                          )}
                        </Textfit>

                        {/* <Textfit
        mode="single"
        style={{height : parseInt(value.text_height), width: parseInt(value.text_width) }}
        forceSingleModeWidth={false}>
        {value.text}
      </Textfit> */}
                      </div>
                    );
                  })
                ) : (
                  <div
                    // onInput={event => this.handleChangeEvent(event, textValue.block_id + "-" + this.props.page_no, textValue.text_height)}
                    //   onContextMenu={event => !this.props.checkbox && this.props.handleRightClick(event)}
                    onBlur={event => this.props.handleBlur(event)}
                    id={textValue.block_id + "_" + this.props.page_no + "_" + this.props.paperType}
                    ref={textValue.block_id + "_" + this.props.page_no}
                    //  contentEditable={
                    //   !textValue.children && this.props.selectedSentence === textValue.block_id + "_" + this.props.page_no ? true : false
                    // }
                    onDoubleClick={event => {
                      !textValue.children && this.handleDoubleClick(event, textValue.block_id + "_" + this.props.page_no, textValue,"sdf");
                    }}
                    onMouseLeave={() => {
                      this.props.value !== true && this.props.handleOnMouseLeave();
                    }}
                    onMouseEnter={() => {
                      this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType);
                    }}
                    style={{
                      top: textValue.text_top + "px",
                      textAlign: "justify",
                      //   textAlignLast:this.props.selectedSentence !== textValue.block_id + "_" + this.props.page_no&& "justify",
                      textAlignLast: "justify",
                      position: "absolute",
                      outline: "0px solid transparent",
                      zIndex: 1,
                      //   height:  textValue.text_height + "px",
                      //                 backgroundColor:
                      //  (this.props.selectedSentence === textValue.block_id + "_" + this.props.page_no+"_source" && this.props.value
                      //     ? "#F4FDFF": ""),
                      //               //   maxHeight: textValue.text_height + "px",
                      //                 border:
                      //                   !textValue.children && this.props.selectedSentence === textValue.block_id + "_" + this.props.page_no+"_source" && this.props.value
                      //                     ? "1px solid #1C9AB7"

                      //                     : "",
                      padding: "5px",
                      fontSize: textValue.font_size + "px",
                      display: "inline-block",

                      MozTextAlignLast: "justify",
                      left: textValue.text_left + "px"
                      // lineHeight: sentence.text_height + 'px',
                      //   width: textValue.text_width + "px"
                    }}
                  >
                    <Textfit
                      mode="single"
                      onReady={this.handleCheck.bind(this)}
                      style={{ width: parseInt(textValue.text_width), overflow: "hidden" }}
                      forceSingleModeWidth={true}
                      min={1}
                      max={parseInt(textValue.font_size)}
                    >
                      {this.props.selectedSentence === textValue.block_id + "_" + this.props.page_no ? (
                        <ContentEditable
                        innerRef={this.textInput}
                          html={this.props.selectedSourceText.text}
                          disabled={false}
                          onBlur={this.handleCheck}
                          onChange={this.handleChangeEvent}
                          style={{
                            border: "1px solid #1C9AB7",
                            padding: "5px",
                            cursor: "auto",
                            backgroundColor: "#F4FDFF"
                            // width : value.text_width+1- + "px",
                            // height :value.text_height + "px",
                            // height: !sentence.children && parseInt(sentence.text_height) + "px"
                          }}
                        />
                      ) : (
                        textValue.text
                      )}
                    </Textfit>
                  </div>
                )}
              </div>
            );
          })}
        ( )
      </div>
    );
  }
}

export default Preview;
