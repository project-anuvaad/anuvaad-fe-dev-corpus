import React from "react";
import ContentEditable from "react-contenteditable";
import Checkbox from "@material-ui/core/Checkbox";
import { Textfit } from "react-textfit";
import TextField from "@material-ui/core/TextField";
import ScaleText from "react-scale-text";
import AutoComplete from "../../../components/web/common/AutoComplete"
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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

  handleSentenceUpdate = (value, sentence) => {
    return (
      <div
        onBlur={event => this.props.handleBlur(event)}
        id={value.block_id + "_" + this.props.page_no + "_" + this.props.paperType}
        ref={value.block_id + "_" + this.props.page_no}
        onDoubleClick={event => {
          this.props.tokenized && this.handleDoubleClick(event, value.block_id + "_" + this.props.page_no, value);
        }}
        onMouseLeave={() => {
          this.props.value !== true && this.props.handleOnMouseLeave();
        }}
        onMouseEnter={() => {
          this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType);
        }}
        style={{
          top: value.text_top + "px",
          position: "absolute",
          textAlign: "justify",
          fontSize: value.font_size + "px",
          fontFamily: sentence.font_family,
          fontWeight: sentence.font_family && sentence.font_family.includes("Bold") && "bold",
          outline: "0px solid transparent",
          zIndex: 1,
          padding: "5px",
          height: value.text_height + "px",
          lineHeight: sentence.children ? parseInt(sentence.text_height / sentence.children.length) + "px" : "20px",
          backgroundColor: this.props.selectedSentence === value.block_id + "_" + this.props.page_no + "_source" && this.props.value ? "#F4FDFF" : "",
          border:
            this.props.selectedSentence === value.block_id + "_" + this.props.page_no + "_source" && this.props.value ? "1px solid #1C9AB7" : "",
          left: value.text_left + "px",
          textAlignLast: sentence.children.length > 1 && "justify",
          width: value.text_width + "px"
        }}
      >
        <Textfit mode="single" style={{ width: parseInt(value.text_width) }} forceSingleModeWidth={true} min={1} max={parseInt(value.font_size)}>
          {this.props.selectedSentence === value.block_id + "_" + this.props.page_no ? (
            <textarea
              autoFocus={true}
              style={{
                width: value.text_width + "px",
                resize: "none",
                fontSize: value.font_size + "px",
                height: value.text_height + 10 + "px",
                fontFamily: value.font_family,
                zIndex: 1111,
                borderRadius: "4px",
                backgroundColor: "#F4FDFF",
                borderColor: "#1C9AB7",
                color: "#000000"
              }}
              // className="noter-text-area"

              value={this.props.selectedSourceText.text}
              onChange={event => {
                this.handleChangeEvent(event);
              }}
            />
          ) : (
              value.text
            )}
        </Textfit>
      </div>
    );
  };

  handleClickAway = () => {
    if (!this.props.showSuggestions) {
      this.props.handleBlur();
    }
  };

  handleTargetUpdate = (sentence, styles) => {
    return (
      <div
        id={sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType}
        style={styles}
        key={sentence.block_id}
        // onBlur={event => this.props.handleBlur(event)}
        // onInput={event => this.handleChangeEvent(event, sentence.block_id + "_" + this.props.page_no)}
        onMouseLeave={() => {
          this.props.value !== true && this.props.handleOnMouseLeave();
        }}
        onMouseEnter={() => {
          this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType);
        }}
        ref={textarea => {
          this.textInput = textarea;
        }}
      >
        <Textfit
          mode={sentence.children.length == 1 ? "single" : "multiple"}
          style={{ height: parseInt(sentence.text_height), width: parseInt(sentence.text_width) }}
          min={1}
          max={parseInt(sentence.font_size)}
        >
          {sentence.hasOwnProperty("tokenized_sentences") &&
            sentence.tokenized_sentences.map((text, tokenIndex) => {
              if (this.props.targetSelected === text.sentence_id + "_" + this.props.page_no) {
                return (
                  <ClickAwayListener id={tokenIndex} onClickAway={this.handleClickAway}>

                    <div
                    // onBlur={event => {
                    //   this.props.handleBlur(event);
                    // }}
                    >
                      <span
                        onDoubleClick={event => {
                          this.handleDoubleClickTarget(event, text.sentence_id + "_" + this.props.page_no, text, "target");
                        }}
                      >
                        <span
                          ref={text.sentence_id + "_" + this.props.page_no}
                          style={{
                            outline: "none"
                          }}
                        >
                          <AutoComplete
                            aId={text.sentence_id + "_" + this.props.page_no}
                            refId={text.sentence_id + "_" + this.props.page_no}
                            style={{
                              width: sentence.text_width + "px",
                              height: sentence.text_height + 5 + "px",
                              resize: "none",
                              fontSize: sentence.font_size + "px",
                              fontFamily: sentence.font_family,
                              zIndex: 1111,
                              borderRadius: "4px",
                              backgroundColor: "#F4FDFF",
                              border: '1px solid #1C9AB7',
                            }}
                            value={this.props.targetText.tgt}
                            sourceText={text.src}
                            handleChangeEvent={this.handleChangeEvent.bind(this)}
                            fetchSuggestions={this.props.fetchSuggestions}
                            autoCompleteText={this.props.autoCompleteText}
                            handleSuggestion={this.props.handleSuggestion}
                            heightToBeIncreased={sentence.font_size}
                            handleBlur={this.props.handleBlur}
                            showSuggestions={this.props.showSuggestions}
                            handleSuggestionClose={this.props.handleSuggestionClose}
                            tokenObject={text}
                          />
                        </span>
                        <span> </span>
                      </span>
                    </div>
                  </ClickAwayListener>
                );
              } else {
                return (
                  <span>
                    <span>
                      <span
                        ref={text.sentence_id + "_" + this.props.page_no}
                        contentEditableId={true}
                        style={{
                          outline: "none"
                        }}
                        onDoubleClick={event => {
                          this.handleDoubleClickTarget(event, text.sentence_id + "_" + this.props.page_no, text, "target");
                        }}
                      >
                        {text.tgt ? text.tgt : text.tagged_tgt}
                      </span>
                      <span> </span>
                    </span>
                  </span>
                );
              }
            })}
        </Textfit>
      </div>
    );
  };

  handleDoubleClickTarget = (evnt, id, text, pageDetails) => {
    this.props.handleDoubleClickTarget(evnt, id, text, pageDetails);
  };
  handleChange = name => event => {
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

  handleDoubleClick = (event, val, text, pageDetail) => {
    event.preventDefault();
    this.props.handleDoubleClick(val, text, pageDetail);
  };

  handleChangeEvent = event => {
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
      border:
        this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType &&
          !this.props.selectedBlock &&
          !this.props.targetSelected &&
          this.props.value !== true
          ? "2px dotted grey"
          : ""
    };

    return this.props.paperType === "source" ? (
      <div>
        {this.props.tokenized && this.props.mergeButton === "save" ? (
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
          onMouseLeave={() => {
            this.props.value !== true && this.props.handleOnMouseLeave();
          }}
          onMouseEnter={() => {
            this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType);
          }}
          ref={sentence.block_id + "_" + this.props.page_no}
        ></div>
        {Array.isArray(sentence.children) &&
          sentence.children &&
          sentence.children.map((textValue, tokenIndex) => {
            return (
              <div>
                {textValue.children
                  ? textValue.children.map((value, i) => {
                    return this.handleSentenceUpdate(value, sentence);
                  })
                  : this.handleSentenceUpdate(textValue, sentence)}
              </div>
            );
          })}
        ( )
      </div>
    ) : (
        <div>{this.handleTargetUpdate(sentence, styles)}</div>
      );
  }
}

export default Preview;
