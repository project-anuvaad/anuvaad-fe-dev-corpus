import React from "react";

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isEditable:false
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
            <div id={sentence.block_id} style={styles} key={sentence.block_id}
                onMouseEnter={() => this.props.handleOnMouseEnter(sentence.block_id+ "_" + this.props.page_no)}
                onMouseLeave={() => this.props.handleOnMouseEnter()}
                onDoubleClick = {()=>this.setState({isEditable:true})}
                contentEditable = {this.state.isEditable}
            >
                {sentence.text}
            </div >
        );
    }
}

export default Preview;