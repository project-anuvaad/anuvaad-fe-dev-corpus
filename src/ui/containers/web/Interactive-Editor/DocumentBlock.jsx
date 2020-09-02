import React from "react";
import ContentEditable from "react-contenteditable";

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: false
        }
    }

    handleMouseHover(id) {
        if (!this.props.selectedBlock && !this.props.createBlockId) {
            this.props.handleOnMouseEnter(id)
        }
    }

    handleCheck = event =>{
        this.props.handleCheck(this.props.sentence.block_id + "_" + this.props.page_no, event, false)
    }

    handleChangeEvent = event => {
       
        this.props.handleSourceChange(this.props.sentence.block_id + "_" + this.props.page_no, event)
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
            cursor: !this.state.isEditable &&'pointer',
            lineHeight: sentence.children && parseInt(sentence.text_height / sentence.children.length) + 'px',
            // backgroundColor: this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no ? "yellow" : ""
            backgroundColor: this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock ? "yellow" : ""
        }
      
        return (
            <div id={sentence.block_id + "_" + this.props.page_no} style={styles} key={sentence.block_id}
                onMouseEnter={() => this.handleMouseHover(sentence.block_id + "_" + this.props.page_no)}
                onMouseLeave={() => this.props.handleOnMouseEnter()}
                onDoubleClick={event => this.props.handleDoubleClick(sentence.block_id + "_" + this.props.page_no, event, sentence)}
                // contentEditable = {this.props.createBlockId === sentence.block_id + "_" + this.props.page_no ? true : false}
                onClick={() => {
                    if (sentence.block_id + "_" + this.props.page_no !== this.props.selectedBlock) {
                        this.props.handleBlockClick()
                    } else if(sentence.block_id + "_" + this.props.page_no !== this.props.createBlockId) {
                        this.props.handleEditor()
                    }
                }}
            >
                {(this.props.selectedBlock === sentence.block_id + "_" + this.props.page_no || this.props.createBlockId === sentence.block_id + "_" + this.props.page_no) ? (
                    <ContentEditable
                    html={this.props.selectedSourceText}
                        disabled={false}
                        onBlur={this.handleCheck}
                        onChange={this.handleChangeEvent}
                        style={{
                            border: "1px dashed #aaa",
                            padding: "5px",
                            cursor: 'auto',
                            // height: !sentence.children && parseInt(sentence.text_height) + "px"
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