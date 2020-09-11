import React from "react";
import ContentEditable from "react-contenteditable";

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            isEditable: false,
            value: false
        }
    }

    handleMouseHover(id) {
        
        if (!this.props.selectedSentence) {
            
            this.props.handleOnMouseEnter(id)
        }
    }
    handleBlur = ()=>{
        this.setState({toc:false, value : false})
    }

    handleDoubleClick = (eve, val)=>{
        this.props.handleEditClick(val)
        
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedSentence !== this.props.selectedSentence) {

            this.textInput.focus();
            

        }}
       

    handleCheck = event => {
        this.props.handleCheck(this.props.sentence.block_id + "_" + this.props.page_no, event, false)
    }

    handleChangeEvent = event => {

        this.props.handleSourceChange(this.props.sentence.block_id + "_" + this.props.page_no, event, this.props.sentence)
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
            outline: "0px solid transparent",
            cursor: !this.state.isEditable && 'pointer',
            lineHeight: sentence.children && parseInt(sentence.text_height / sentence.children.length) + 'px',
            // backgroundColor: this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no ? "yellow" : ""
            backgroundColor:this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no && this.props.value ? "#F4FDFF" : this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock ? "#EAEAEA" : "",
            border : this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no && this.props.value ?'1px solid #1C9AB7'  :this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock ? '1px dashed grey':'',
        }
        return (
            <div id={sentence.block_id + "_" + this.props.page_no} style={styles} key={sentence.block_id}
                onBlur = {event => this.props.handleBlur(event)}
                onInput={event => this.handleChangeEvent(event)}
                    
                  
                onDoubleClick = {event => {this.handleDoubleClick(event, sentence.block_id + "_" + this.props.page_no)}}
                onMouseLeave={() => {this.props.value !== true&& this.props.handleOnMouseEnter()}}
                             onMouseEnter={() => {this.props.value!== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no)}}
                // contentEditable = {this.props.createBlockId === sentence.block_id + "_" + this.props.page_no ? true : false}
                // onClick={() => {
                //     if (sentence.block_id + "_" + this.props.page_no !== this.props.selectedBlock) {
                //         this.props.handleBlockClick(false, sentence.block_id + "_" + this.props.page_no)
                //     } else if (sentence.block_id + "_" + this.props.page_no !== this.props.createBlockId) {

                //         console.log(sentence.block_id + "_" + this.props.page_no)
                //         this.props.handleEditor(sentence.block_id + "_" + this.props.page_no)
                //     }
                // }}
                 contentEditable={this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no ?  true: false}
                 
                 ref={textarea => {
                    this.textInput = textarea;
                  }}
            >
                {/* {(this.props.selectedBlock === sentence.block_id + "_" + this.props.page_no || this.props.createBlockId === sentence.block_id + "_" + this.props.page_no) ? (
                    console.log("sajish")
                    // <ContentEditable
                    //     autoComplete="off"
                    //     html={this.props.selectedSourceText}
                    //     disabled={false}
                    //     onBlur={this.handleCheck}
                    //     onChange={this.handleChangeEvent}
                    //     style={{
                    //         border: "1px solid #1C9AB7",

                    //         cursor: 'auto',
                    //         backgroundColor: "#F4FDFF",
                    //         outline: "none !important"
                    //         // height: !sentence.children && parseInt(sentence.text_height) + "px"
                    //     }}
                    // />
                ) : ( */}
                        {sentence.hasOwnProperty('tokenized_sentences') ? sentence.tokenized_sentences.map((text, tokenIndex) => {
                            return <span key = {text.sentence_id} style={{ color:(this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock )? tokenIndex%2 ==0 ? '#357EC7': "#9F000F":'' }}
                                >{text.src?text.src:text.src_text}</span>
                        }) : <div
                            
                            style={{ backgroundColor: this.props.hoveredSentence === sentence.block_id + "_" + this.props.page_no }}>{sentence.text}</div>

                    }
            </div >
        );
    }
}

export default Preview;