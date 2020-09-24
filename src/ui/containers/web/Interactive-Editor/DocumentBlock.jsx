import React from "react";
import ContentEditable from "react-contenteditable";
import Checkbox from "@material-ui/core/Checkbox";
import { Textfit } from "react-textfit";
import TextField from "@material-ui/core/TextField";
import ScaleText from "react-scale-text";
import AutoComplete from "../../../components/web/common/AutoComplete"
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import wfcodes from '../../../../configs/workflowcodes'

var arr = [];
class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      isEditable: false,
      value: false,
      selectedValueArray: [],
      mergeButton: "",
      workflowcode: ""
    };
  }

  handleMouseHover(id, block_identifier, has_sibling) {
    if (!this.props.selectedSentence) {
      this.props.handleOnMouseEnter(id, this.props.parent, 0, block_identifier, has_sibling);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mergeButton !== this.props.mergeButton) {
      if(this.props.mergeButton == "Merge" && arr.length>0) {
        this.sentenceClear(arr)
      this.updateContent(arr)
      }
      else if(this.props.mergeButton == "Merge"){
        this.sentenceClear(arr)
      }
     
      
    }
    
    // if(this.props.arrayClear!== prevProps.arrayClear){
    //   this.sentenceClear(arr)
    // }
  }

  sentenceClear(){
    return arr.map(arrValue=>{
      this.setState({[arrValue]: false})
    })
  }
  updateContent(val) {
    
    
    this.props.updateContent(val);
    this.setState({ selectedValueArray: [] })
    arr = []
  }

  handleSentenceUpdate = (value, sentence) => {
    return (
      <div
        onBlur={event => this.props.handleBlur(this.props.sentence.block_identifier + "_" + this.props.page_no + "_" + this.props.paperType)}
        id={value.block_id + "_" + this.props.page_no + "_" + this.props.paperType}
        ref={value.block_id + "_" + this.props.page_no}
        onDoubleClick={event => {
          this.props.tokenized && this.handleDoubleClick(event, value.block_id + "_" + this.props.page_no, value);
        }}
        onMouseLeave={() => {
          this.props.value !== true && this.props.handleOnMouseLeave();
        }}
        onMouseEnter={() => {
          this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType, sentence.block_identifier, sentence.has_sibling);
        }}
        style={{
          textAlign: "justify",
          position: "absolute",
          top: value.text_top + "px",
          fontSize: value.font_size + "px",
          fontFamily: sentence.font_family,
          fontWeight: sentence.font_family && sentence.font_family.includes("Bold") && "bold",
          outline: "0px solid transparent",
          zIndex: 1,
          padding: "5px",
          lineHeight: sentence.children ? parseInt(sentence.text_height / sentence.children.length) + "px" : "20px",
          backgroundColor: this.props.selectedSentence === value.block_id + "_" + this.props.page_no + "_source" && this.props.value ? "#F4FDFF" : "",
          border:
            this.props.selectedSentence === value.block_id + "_" + this.props.page_no + "_source" && this.props.value ? "1px solid #1C9AB7" : "",
          height: value.text_height + "px",
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

  handleClickAway = (id, text, wf_code) => {
    if (!this.props.showSuggestions) {
      this.handleChangeEvent({ target: { value: text } })
      this.props.handleBlur(id, wf_code);
    }
  };

  handleTargetUpdate = (sentence, styles, not_tokenized) => {
    return (
      sentence.tokenized_sentences && sentence.tokenized_sentences.length > 0 ?
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
            this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType, sentence.block_identifier, sentence.has_sibling);
          }}
          ref={textarea => {
            this.textInput = textarea;
          }}
        >
          <Textfit
            mode={sentence.children && sentence.children.length == 1 ? "single" : "multiple"}
            style={{ height: parseInt(sentence.text_height), width: parseInt(sentence.text_width) }}
            min={1}
            max={parseInt(sentence.font_size)}
          >
            {sentence.hasOwnProperty("tokenized_sentences") &&
              sentence.tokenized_sentences.map((text, tokenIndex) => {
                if (this.props.targetSelected === text.sentence_id + "_" + this.props.page_no) {
                  return (
                    // <ClickAwayListener id={tokenIndex} onClickAway={() => this.handleClickAway(sentence.block_identifier + "_" + this.props.page_no, wfcodes.DP_WFLOW_S_C)}>

                      <div
                        style={{
                          position: 'relative',
                          zIndex: 1
                        }}
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
                              block_identifier_with_page={sentence.block_identifier + "_" + this.props.page_no}
                              style={{
                                width: "600px",
                                // height: sentence.text_height + 5 + "px",
                                // resize: "none",
                                // resize: "both", 
                                fontSize: sentence.font_size + "px",
                                fontFamily: sentence.font_family,
                                zIndex: 1111,
                                borderRadius: "4px",
                                backgroundColor: "#F4FDFF",
                                border: '1px solid #1C9AB7',
                              }}
                              tokenIndex={tokenIndex}
                              value={this.props.targetText.tgt}
                              sentence={sentence}
                              sourceText={text.src}
                              page_no={this.props.page_no}
                              handleChangeEvent={this.handleChangeEvent.bind(this)}
                              fetchSuggestions={this.props.fetchSuggestions}
                              autoCompleteText={this.props.autoCompleteText}
                              handleSuggestion={this.props.handleSuggestion}
                              heightToBeIncreased={sentence.font_size}
                              handleBlur={this.props.handleBlur}
                              showSuggestions={this.props.showSuggestions}
                              handleSuggestionClose={this.props.handleSuggestionClose}
                              handleClickAway={this.handleClickAway.bind(this)}
                              tokenObject={text}
                            />
                          </span>
                          <span> </span>
                        </span>
                      </div>
                    // </ClickAwayListener>
                  );
                } else {
                  return (
                    <span>
                      <span>
                        <span
                          ref={text.sentence_id + "_" + this.props.page_no}
                          contentEditableId={true}
                          style={{
                            outline: "none",
                            background: (!not_tokenized && this.props.hoveredSentence.split('_')[0] === this.props.sentence.block_id) ? tokenIndex % 2 == 0 ? '#92a8d1' : "coral" : ''
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
        :
        <div></div>
    );
  };

  handleDoubleClickTarget = (evnt, id, text, pageDetails) => {
    this.props.handleDoubleClickTarget(evnt, id, text, pageDetails);
  };
  handleChange = name => event => {
    
    if (arr.includes(name)) {
      arr = arr.filter(item => item !== name);
    } else {
      arr.push(name);
    }

    this.setState({selectedValueArray: arr });
  };


  handleDoubleClick = (event, val, text, pageDetail) => {
    event.preventDefault();
    this.props.handleDoubleClick(val, text, pageDetail);
  };

  handleChangeEvent = event => {
    this.props.handleSourceChange(event, this.props.sentence);
  };

  makeSpan(text, child, spanId, tokenIndex) {
    return (<span style={{
      fontSize: child.font_size + "px",
      height: child.text_height + "px",
      left: child.text_left + "px",
      textJustify: "inter-word", textAlign: 'justify', background: (spanId && spanId === this.props.sentence.block_id && !this.props.selectedBlock) ? tokenIndex % 2 == 0 ? '#92a8d1' : "coral" : ''
    }}
    >
      {text}
    </span>)
  }

  makeDiv(sentence, spans, div_style) {
    return (<div onMouseLeave={() => {
      this.props.value !== true && this.props.handleOnMouseLeave();
    }}
      onMouseEnter={() => {
        this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType, sentence.block_identifier, sentence.has_sibling);
      }} style={div_style}>{spans}</div>)

  }

  makeSpanObjects(sentence, text, tokenized_data, tokenIndex, spanId, child, elems, is_super) {
    text = text + ""
    text = text.replace(/\s{2,}/g, ' ');
    text = text.trim()
    const div_style = {
      textAlign: "justify",
      position: "absolute",
      top: child.text_top + "px",
      fontSize: child.font_size + "px",
      fontFamily: sentence.font_family,
      fontWeight: sentence.font_family && sentence.font_family.includes("Bold") && "bold",
      outline: "0px solid transparent",
      zIndex: 1,
      padding: "5px",
      lineHeight: sentence.children ? parseInt(sentence.text_height / sentence.children.length) + "px" : "20px",
      height: child.text_height + "px",
      left: child.text_left + "px",
      textAlignLast: sentence.children && sentence.children.length > 1 && "justify",
      width: child.text_width + "px"
    }
    if (is_super) {
      if (!child.dont_show) {
        elems.push(this.makeDiv(sentence, this.makeSpan(text, child, spanId, tokenIndex), div_style))
      }
      return { text: text, tokenized_data: tokenized_data, tokenIndex: tokenIndex, spanId: spanId, child: child, elems: elems }
    }
    if (text.length == tokenized_data[tokenIndex].src.length) {
      if (!child.dont_show) {
        elems.push(this.makeDiv(sentence, this.makeSpan(text, child, spanId, tokenIndex), div_style))
      }
      tokenIndex++
    } else if (text.length > tokenized_data[tokenIndex].src.length) {
      let spans = []
      while (text.length > 0) {
        if (tokenIndex >= tokenized_data.length) {
          tokenIndex--
          if (!child.dont_show) {
            spans.push(this.makeSpan(text, child, spanId, tokenIndex))
            spans.push(<span> </span>)
          }
          break
        }
        if (text.length > tokenized_data[tokenIndex].src.length) {
          if (!child.dont_show) {
            spans.push(this.makeSpan(text.substring(0, tokenized_data[tokenIndex].src.length), child, spanId, tokenIndex))
          }
          text = text.substring(tokenized_data[tokenIndex].src.length, text.length)
          text = text.trim()
          tokenIndex++
          if (!(tokenIndex == tokenized_data.length && text.length > 0)) {
            if (!child.dont_show) {
              spans.push(<span> </span>)
            }
          }
        } else {
          if (!child.dont_show) {
            spans.push(this.makeSpan(text, child, spanId, tokenIndex))
            spans.push(<span> </span>)
          }
          if (text.length == tokenized_data[tokenIndex].src.length) {
            tokenIndex++
          } else {
            tokenized_data[tokenIndex].src = tokenized_data[tokenIndex].src.substring(text.length, tokenized_data[tokenIndex].src.length)
            tokenized_data[tokenIndex].src = tokenized_data[tokenIndex].src.trim()
          }
          text = ''
        }
      }
      if (!child.dont_show) {
        elems.push(this.makeDiv(sentence, spans, div_style))
      }
    }
    else {
      if (!child.dont_show) {
        let spans = this.makeSpan(text, child, spanId, tokenIndex)
        let spans_array = []
        spans_array.push(spans)
        spans_array.push(<span> </span>)
        elems.push(this.makeDiv(sentence, spans_array, div_style))
      }
      tokenized_data[tokenIndex].src = tokenized_data[tokenIndex].src.substring(text.length, tokenized_data[tokenIndex].src.length)
      tokenized_data[tokenIndex].src = tokenized_data[tokenIndex].src.trim()
    }
    return { text: text, tokenized_data: tokenized_data, tokenIndex: tokenIndex, spanId: spanId, child: child, elems: elems }
  }

  renderLinesWithTokenizedData(sentenceOld) {
    let elems = []
    let tokenIndex = 0
    const sen = sentenceOld
    var allPages = this.props.sentences
    var childrens = []
    var tokenized_sentences = []
    var spanId = this.props.hoveredSentence.split('_')[0]
    var sentence = JSON.parse(JSON.stringify(sen))
    if (allPages && this.props.has_sibling) {
      allPages.map((page) => {
        page.text_blocks.map((block) => {
          if (block.block_id == spanId && sentence.block_id == spanId) {
            if (sentence.block_identifier != block.block_identifier) {
              if (block.children) {
                block.children.map((c) => {
                  let child = JSON.parse(JSON.stringify(c))
                  child.dont_show = true
                  childrens.push(child)
                })
              }
            } else {
              if (block.children) {
                block.children.map((child) => {
                  childrens.push(JSON.parse(JSON.stringify(child)))
                })
              }
            }
            if (block.tokenized_sentences.length > 0) {
              tokenized_sentences = block.tokenized_sentences
            }
          }
        })
      })
      if (childrens.length > 0) {
        sentence.children = JSON.parse(JSON.stringify(childrens))
        sentence.tokenized_sentences = JSON.parse(JSON.stringify(tokenized_sentences))
      }
    }

    var tokenized_data = sentence.tokenized_sentences
    tokenized_data.map((t) => {
      t.src = t.src.replace(/\s\s+/g, ' ')
      t.src = t.src.trim()
    })

    if (sentence.children) {
      sentence.children.map((child) => {
        if (tokenIndex <= tokenized_data.length - 1) {
          tokenized_data[tokenIndex].src = tokenized_data[tokenIndex].src.trim()
          tokenized_data[tokenIndex].src = tokenized_data[tokenIndex].src.replace(/\s\s+/g, ' ');
          if (child.children) {
            child.children.map((ch) => {
              ch.dont_show = child.dont_show
              var text = ''
              if (ch.attrib !== 'SUPERSCRIPT') {
                text += ch.text
                let obj = this.makeSpanObjects(sentence, text, tokenized_data, tokenIndex, spanId, ch, elems)
                text = obj.text
                tokenized_data = obj.tokenized_data
                tokenIndex = obj.tokenIndex
                spanId = obj.spanId
                child = obj.child
                elems = obj.elems
              } else {
                let obj = this.makeSpanObjects(sentence, ch.text, tokenized_data, tokenIndex, spanId, ch, elems, true)
                // text = obj.text
                // tokenized_data = obj.tokenized_data
                // tokenIndex = obj.tokenIndex
                // spanId = obj.spanId
                // child = obj.child
                elems = obj.elems
              }
            })
          }
          else {
            var text = child.text
            let obj = this.makeSpanObjects(sentence, text, tokenized_data, tokenIndex, spanId, child, elems)
            text = obj.text
            tokenized_data = obj.tokenized_data
            tokenIndex = obj.tokenIndex
            spanId = obj.spanId
            child = obj.child
            elems = obj.elems
          }
        }
      })
    } else {
      let text = sentence.text.trim()
      let obj = this.makeSpanObjects(sentence, text, tokenized_data, tokenIndex, spanId, sentence, elems)
      text = obj.text
      tokenized_data = obj.tokenized_data
      tokenIndex = obj.tokenIndex
      spanId = obj.spanId
      sentence = obj.child
      elems = obj.elems
    }
    return elems
  }

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
      arr.includes(sentence.block_id + "_" + this.props.page_no)?"2px solid rgb(28, 154, 183)" : this.props.hoveredSentence.split('_')[0] === this.props.sentence.block_id &&
          !this.props.selectedBlock &&
          !this.props.targetSelected &&
          this.props.value !== true
          ? "2px dotted grey"
          : ""
    };

    return this.props.paperType === "source" ? (
      <div>
        {this.props.tokenized && this.props.mergeButton === "save" && this.props.sentence.text && (
          <Checkbox
          
            style={{ top: sentence.text_top - 10 + "px", left: sentence.text_left - 50 + "px", position: "absolute", zIndex: 4 }}
            checked={arr.includes(sentence.block_id + "_" + this.props.page_no)? true: false }
            onChange={this.handleChange(sentence.block_id + "_" + this.props.page_no)}
            // value={this.state[sentence.block_id + "_" + this.props.page_no]}
            color="primary"
          />
        ) }
        <div
          id={sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType}
          style={styles}
          key={sentence.block_id}
          onBlur={event => this.props.handleBlur(this.props.sentence.block_identifier + "_" + this.props.page_no + "_" + this.props.paperType)}
          onMouseLeave={() => {
            this.props.value !== true && this.props.handleOnMouseLeave();
          }}
          onMouseEnter={() => {
            this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType, sentence.block_identifier, sentence.has_sibling);
          }}
          ref={sentence.block_id + "_" + this.props.page_no}
        >
        </div>
        {!this.props.tokenized && this.props.hoveredSentence.split('_')[0] === this.props.sentence.block_id && this.renderLinesWithTokenizedData(sentence)}
        {(this.props.tokenized || this.props.hoveredSentence.split('_')[0] !== this.props.sentence.block_id) && Array.isArray(sentence.children) &&
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
        <div>{this.handleTargetUpdate(sentence, styles, this.props.tokenized)}</div>
      );
  }
}

export default Preview;
