import React from "react";
import ContentEditable from "react-contenteditable";

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isEditable:false
        }
    }

    handleMouseHover(id) {
        if(!this.props.selectedBlock) {
            this.props.handleOnMouseEnter(id)
        }
    }

    render() {
        const { sentence } = this.props;

        var styles = {
            position: "absolute ",
            top: sentence.text_top + "px",
            left: sentence.text_left + "px",
            fontSize: sentence.font_size + "px",
            color: sentence.font_color,
            width: sentence.text_width + "px",
            fontWeight: sentence.font_family && sentence.font_family.includes("Bold") && 'bold',
            textAlign: "justify",
            zIndex: 1,
            lineHeight: sentence.children && parseInt(sentence.text_height / sentence.children.length) + 'px',
            backgroundColor: this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no ? "yellow" : ""
        }
        return (
            <div id={sentence.block_id + "_" + this.props.page_no} style={styles} key={sentence.block_id}
                // onMouseEnter={() => this.props.handleOnMouseEnter(sentence.block_id+ "_" + this.props.page_no)}
                onMouseEnter={() => this.handleMouseHover(sentence.block_id+ "_" + this.props.page_no)}

                onMouseLeave={() => this.props.handleOnMouseEnter()}
                onDoubleClick = {event => this.props.handleDoubleClick(sentence.block_id + "_" + this.props.page_no, event)}
                // contentEditable = {this.props.selectedBlock === sentence.block_id + "_" + this.props.page_no ? true : false}
                onClick={()=>{
                    if(sentence.block_id + "_" + this.props.page_no !== this.props.selectedBlock) {
                        this.props.handleBlockClick()
                    }
                }}
            >
               {this.props.selectedBlock === sentence.block_id + "_" + this.props.page_no ? (
                    <ContentEditable
                      html={sentence.text}
                      disabled={false}
                    //   onBlur={this.props.handleCheck}
                    //   onChange={this.props.handleSourceChange}
                      style={{
                        border: "1px dashed #aaa",
                        padding: "5px"
                      }}
                    />
                  ) : (
                     sentence.text
                    )}
            </div >
        );
    }
}

export default Preview;