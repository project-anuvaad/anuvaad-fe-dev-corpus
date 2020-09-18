import React from "react";
import ContentEditable from "react-contenteditable";
import Checkbox from "@material-ui/core/Checkbox";

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

  handleChange = name => event => {
      console.log(name, event.target.value)
    this.setState({ [name]: !this.state[name] });
  };
  handleBlur = () => {
    this.setState({ toc: false, value: false });
  };

  handleDoubleClick = (event, val, n) => {
    event.preventDefault();
    this.props.handleEditClick(val);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.selectedSentence !== this.props.selectedSentence) {
      this.refs[this.props.selectedSentence] && this.refs[this.props.selectedSentence].focus();
    }
  }

  handleCheck = event => {
    this.props.handleCheck(this.props.sentence.block_id + "_" + this.props.page_no, event, false);
  };

  handleChangeEvent = (event, id) => {
      console.log(event.target.scrollHeight, )
      
    // this.props.handleSourceChange(this.props.sentence.block_id + "_" + this.props.page_no, event, this.props.sentence);
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
     height:sentence.text_height + "px",
     
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
      // backgroundColor: this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no ? "yellow" : ""
    //   backgroundColor:
    //   !sentence.children && (this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no && this.props.value
    //       ? "#F4FDFF"
    //       : this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock
    //       ? "#EAEAEA"
    //       : ""),
      border:
        this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no && this.props.value
          ? "1px solid #1C9AB7"
            :this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock && this.props.value !== true ? "1px dashed grey":""
                              
           
          
    };
    console.log("-----",this.props.hoveredSentence, this.props.value)
    return (
      <div>
          {this.props.checkbox &&
          <Checkbox
          style={{ top: sentence.text_top -10 + "px",
          left: sentence.text_left-50 + "px",position:"absolute" , zIndex:4}}
          checked={this.state[sentence.block_id]}
          onChange={this.handleChange(sentence.block_id)}
          value={sentence.block_id}
          color="primary"
        />}
          <div
            id={sentence.block_id + "_" + this.props.page_no}
            style={styles}
            key={sentence.block_id}
            onBlur={event => this.props.handleBlur(event)}
            // onInput={event => this.handleChangeEvent(event, sentence.block_id + "_" + this.props.page_no)}
            onDoubleClick={event => {
              !sentence.children && this.handleDoubleClick(event, sentence.block_id + "_" + this.props.page_no,3);
            }}
            onContextMenu={event => !this.props.checkbox && this.props.handleRightClick(event)}
            onMouseLeave={() => {
              this.props.value !== true && this.props.handleOnMouseLeave();
            }}
            onMouseEnter={() => {
              this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no);
            }}
            // contentEditable={ this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no ? true : false}
            contentEditable={this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no ?  true: false}
            ref={sentence.block_id + "_" + this.props.page_no}
          >
              {!sentence.children &&
            <span>
              {sentence.text}
              <span> </span>
            </span>}
          </div>
        
        {sentence.children && (
          sentence.children.map((textValue, tokenIndex) => {
            return (
              <div>
                {textValue.children ? (
                  textValue.children.map(value => {
                    return (
                      <div
                      onInput={event => this.handleChangeEvent(event, sentence.block_id + "_" + this.props.page_no)}
                      onContextMenu={event => !this.props.checkbox && this.props.handleRightClick(event)}
                      onBlur={event => this.props.handleBlur(event)}
                        id={value.block_id + "_" + this.props.page_no}
                        ref={value.block_id + "_" + this.props.page_no}
                        onDoubleClick={event => {
                          this.handleDoubleClick(event, value.block_id + "_" + this.props.page_no,2);
                        }}
                        onMouseLeave={() => {
                            this.props.value !== true && this.props.handleOnMouseLeave();
                          }}
                          onMouseEnter={() => {
                            this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no);
                          }}
                        contentEditable={this.props.selectedSentence === value.block_id + "_" + this.props.page_no ? true : false}
                        style={{
                          top: value.text_top + "px",
                          position: "absolute",
                          textAlign: "justify",
                          fontSize: value.font_size + "px",
                          textJustify: "inter-word",
                          outline: "0px solid transparent",
                          zIndex: 1,
                          padding: "5px",
                           height:  value.text_height + "px",
                        //   maxHeight: value.text_height + "px",
                          border:
                            this.props.selectedSentence === value.block_id + "_" + this.props.page_no && this.props.value
                              ? "1px solid #1C9AB7"
                             : "",
                          // outline: "2px solid red",
                          left: value.text_left + "px",
                        //   textAlignLast: this.props.selectedSentence !== textValue.block_id + "_" + this.props.page_no&& "justify",
                          // lineHeight: sentence.text_height + 'px',
                          textAlignLast:"justify",
                          width: value.text_width + "px"
                        }}
                      >
                        {value.text}
                      </div>
                    );
                  })
                ) : (
                  <div
                  onInput={event => this.handleChangeEvent(event, sentence.block_id + "_" + this.props.page_no)}
                  onContextMenu={event => !this.props.checkbox && this.props.handleRightClick(event)}
                  onBlur={event => this.props.handleBlur(event)}
                    id={textValue.block_id + "_" + this.props.page_no}
                    ref={textValue.block_id + "_" + this.props.page_no}
                    contentEditable={
                      !textValue.children && this.props.selectedSentence === textValue.block_id + "_" + this.props.page_no ? true : false
                    }
                    onDoubleClick={event => {
                      !textValue.children && this.handleDoubleClick(event, textValue.block_id + "_" + this.props.page_no,1);
                    }}
                    onMouseLeave={() => {
                        this.props.value !== true && this.props.handleOnMouseLeave();
                      }}
                      onMouseEnter={() => {
                        this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no);
                      }}
                    style={{
                      top: textValue.text_top + "px",
                      textAlign: "justify",
                    //   textAlignLast:this.props.selectedSentence !== textValue.block_id + "_" + this.props.page_no&& "justify",
                    textAlignLast:"justify",
                      position: "absolute",
                      outline: "0px solid transparent",
                      zIndex: 1,
                      height:  textValue.text_height + "px",
                    //   maxHeight: textValue.text_height + "px",
                      border:
                        !textValue.children && this.props.selectedSentence === textValue.block_id + "_" + this.props.page_no && this.props.value
                          ? "1px solid #1C9AB7"
                         
                          : "",
                          padding: "5px",
                      fontSize: textValue.font_size + "px",
                      display: "inline-block",

                      MozTextAlignLast: "justify",
                      left: textValue.text_left + "px",
                      // lineHeight: sentence.text_height + 'px',
                      width: textValue.text_width + "px"
                    }}
                  >
                      
                    {textValue.text}
                  </div>
                )}
              </div>
            );
          })
        )  }
        (
          
        )
      </div>
    );
  }
}

export default Preview;
