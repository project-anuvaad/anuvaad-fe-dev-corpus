import React from "react";
import ContentEditable from "react-contenteditable";

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            isEditable: false,
            value: false,
            editable: false,
            contentEditableId: null
        }
    }


    handleMouseHover(id) {
        if (!this.props.selectedSentence) {
            this.props.handleOnMouseEnter(id, this.props.paperType)
        }
    }
    handleBlur = () => {
        this.setState({ toc: false, value: false })
    }

    handleDoubleClick = (eve, val) => {
        this.props.handleEditClick(val)

    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedSentence !== this.props.selectedSentence) {
            this.textInput.focus();
        }
    }


    handleCheck = event => {
        this.props.handleCheck(this.props.sentence.block_id + "_" + this.props.page_no, event, false)
    }

    handleChangeEvent = (event, id) => {
        this.props.handleSourceChange(this.props.sentence.block_id + "_" + this.props.page_no, event, this.props.sentence)
    }

    handleOnClickTarget(e, id, pageNo, ref) {
        this.setState({
            open: false,
            showLoader: false,
            topValue: e.clientY + 15,
            leftValue: e.clientX + 5,
        })

        // this.refs[ref].focus()
    }

   

    handleTargetChange(refId, event, sentence, tokenText, tokenIndex, senIndex) {
        // console.log('**********************************')
        // var selObj = window.getSelection();
        // var range = selObj.getRangeAt(0)
        // var boundary = range.getBoundingClientRect();
        // if (boundary) {
        //     this.setState({
        //         topValue: boundary.y + 15,
        //         leftValue: boundary.x + 5
        //     })
        // }
        // if (event.key === 'Escape') {
        //     this.props.handleEditor(null, this.props.paperType)
        //     this.setState({
        //         contentEditableId: null,
        //         selectedIndex: 0,
        //         editable: false
        //     })
        // }
        // else if (event.key === 'Tab') {
        //     event.preventDefault()
        // }
        // console.log(event.key)
        // console.log(this.state.previousKeyPressed)

        // if (((event.key === ' ' || event.key === 'Spacebar') && this.state.previousKeyPressed === 'Shift')) {
        //     debugger
        //     let editableDiv = this.refs[refId]
        //     var caretPos = 0,
        //         sel, range;
        //     if (window.getSelection) {
        //         sel = window.getSelection();
        //         if (sel.rangeCount) {
        //             range = sel.getRangeAt(0);
        //             if (range.commonAncestorContainer.parentNode == editableDiv) {
        //                 caretPos = range.endOffset;
        //             }
        //         }
        //     } else if (document.selection && document.selection.createRange) {
        //         range = document.selection.createRange();
        //         if (range.parentElement() == editableDiv) {
        //             var tempEl = document.createElement("span");
        //             editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        //             var tempRange = range.duplicate();
        //             tempRange.moveToElementText(tempEl);
        //             tempRange.setEndPoint("EndToEnd", range);
        //             caretPos = tempRange.text.length;
        //         }
        //     }
        //     let targetVal = this.handleCalc(editableDiv.textContent.substring(0, caretPos), tokenText)
        //     this.props.fecthNextSuggestion()
        //     //   const apiObj = new IntractiveApi(tokenText.src, targetVal, this.props.modelDetails, true, true);
        //     //   this.props.APITransport(apiObj);
        //     this.setState({
        //         anchorEl: event.currentTarget,
        //         caretPos: caretPos,
        //         targetVal: editableDiv.textContent.substring(0, caretPos),
        //         tokenIndex,
        //         showLoader: true,
        //         senIndex,
        //         suggestionSrc: tokenText.src,
        //         suggestionId: this.props.modelDetails
        //     })
        // } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter') {
        //     if (event.key === 'Enter') {
        //         if (this.state.open) {
        //             this.handleUpdateSentenceWithPrediction()
        //         }
        //     }
        //     event.preventDefault()
        // }
        // else {
        //     this.setState({
        //         open: false,
        //         showLoader: false
        //     })
        // }
        // this.setState({
        //     previousKeyPressed: event.key,
        //     previousPressedKeyCode: event.keyCode
        // })
    }

    render() {

        const { sentence, paperType } = this.props;

        var styles = {
            position: "absolute",
            top: sentence.text_top + "px",
            left: sentence.text_left + "px",
            fontSize: sentence.font_size + "px",
            color: sentence.font_color,
            width: sentence.text_width + "px",
            fontFamily: sentence.font_family,
            fontWeight: sentence.font_family && sentence.font_family.includes("Bold") && 'bold',
            fontFamily: sentence.font_family,
            textAlign: "justify",
            zIndex: 1,
            outline: "0px solid transparent",
            cursor: !this.state.isEditable && 'pointer',
            padding: '0px 5px 0px 5px',
            lineHeight: sentence.children && parseInt(sentence.text_height / sentence.children.length) + 'px',
            backgroundColor: this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no && this.props.value ? "#F4FDFF" : this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock ? "#EAEAEA" : "",
            border: this.props.selectedSentence === sentence.block_id + "_" + this.props.page_no && this.props.value ? '1px solid #1C9AB7' : this.props.hoveredSentence === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock ? '1px dashed grey' : '',
        }
        let spanId = null
        if (this.props.hoveredSentence) {
            spanId = this.props.hoveredSentence.split("_")[0] + "_" + this.props.hoveredSentence.split("_")[1]
        }
        let id = sentence.block_id + "_" + this.props.page_no + "_editable"
        if (this.props.paperType === "source") {
            return (<div id={sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType} style={styles} key={sentence.block_id}
                onBlur={event => this.props.handleBlur(event)}
                onInput={event => this.handleChangeEvent(event, sentence.block_id + "_" + this.props.page_no)}
                onMouseLeave={() => { this.props.value !== true && this.props.handleOnMouseLeave() }}
                onMouseEnter={() => { this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType) }}
                ref={textarea => {
                    this.textInput = textarea;
                }}
            >
                {sentence.hasOwnProperty('tokenized_sentences') ? sentence.tokenized_sentences.map((text, tokenIndex) => {


                    return <span><span id={text.sentence_id} key={text.sentence_id} style={{ borderRadius: '6px', background: (spanId && spanId === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock) ? tokenIndex % 2 == 0 ? '#92a8d1' : "coral" : '' }}
                    >
                        {this.props.paperType === "source" ? (text.src ? text.src : text.src_text) : (text.tgt ? text.tgt : text.tagged_tgt)}
                    </span><span> </span></span>
                }) : <div
                    id={sentence.block_id + "_" + this.props.page_no}
                    style={{ backgroundColor: spanId && spanId === this.props.sentence.block_id + "_" + this.props.page_no ? '#92a8d1' : "" }}>
                        {sentence.text}
                    </div>

                }
            </div>
            )
        } else {
            return (
                <div id={sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType} style={styles} key={sentence.block_id}
                    // onBlur={event => this.props.handleBlur(event)}
                    // onInput={event => this.handleChangeEvent(event, sentence.block_id + "_" + this.props.page_no)}
                    onMouseLeave={() => { this.props.value !== true && this.props.handleOnMouseLeave() }}
                    onMouseEnter={() => { this.props.value !== true && this.handleMouseHover(sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType) }}
                    ref={textarea => {
                        this.textInput = textarea;
                    }}
                >
                    {sentence.hasOwnProperty('tokenized_sentences') ? sentence.tokenized_sentences.map((text, tokenIndex) => {
                        return (
                            <div style={
                                this.props.contentEditableId === text.sentence_id + "_" + this.props.page_no && this.state.editable ? {
                                    border: '1px solid #1C9AB7', padding: '1%', backgroundColor: "#F4FDFF",
                                } : {}
                            }>
                                <span>
                                    <span
                                        // id={text.sentence_id} key={text.sentence_id}
                                        id={this.props.contentEditableId === text.sentence_id + "_" + this.props.page_no ? "editable" : text.sentence_id + "_" + this.props.page_no}
                                        key={this.props.contentEditableId ? id : text.sentence_id + "_" + this.props.page_no}
                                        ref={text.sentence_id + "_" + this.props.page_no}
                                        style={
                                            {
                                                outline: "none",
                                                background: (!this.props.contentEditableId && spanId && spanId === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock) ? tokenIndex % 2 == 0 ? '#92a8d1' : "coral" : ''
                                            }
                                        }
                                        contentEditable={this.props.contentEditableId === text.sentence_id + "_" + this.props.page_no && this.state.editable ? true : false}
                                        onKeyDown={(event) => this.props.handleTargetChange(sentence.block_id + "_" + this.props.page_no, event, "",text, tokenIndex, "senIndex")}
                                        onClick={(e) => {
                                            this.props.handleOnClickTarget(e, text.sentence_id + "_" + this.props.page_no, this.props.page_no, text.sentence_id + "_" + this.props.page_no + "_" + this.props.paperType)
                                        }}
                                        onDoubleClick={event => {
                                            this.setState({ contentEditableId: text.sentence_id + "_" + this.props.page_no, editable: true }),
                                                this.props.handleOnDoubleClickTarget(event, text.sentence_id + "_" + this.props.page_no, this.props.page_no, text.sentence_id + "_" + this.props.page_no + "_" + this.props.paperType)
                                        }}
                                    >
                                        {text.tgt ? text.tgt : text.tagged_tgt}
                                    </span>
                                    <span> </span>
                                </span>
                            </div>
                        )
                    }) :
                        (
                            <div style={
                                this.props.contentEditableId === sentence.block_id + "_" + this.props.page_no && this.state.editable ? {
                                    border: '1px solid #1C9AB7', padding: '1%', backgroundColor: "#F4FDFF",
                                } : {}
                            }>
                                <div
                                    id={this.props.contentEditableId === sentence.block_id + "_" + this.props.page_no ? "editable" : sentence.block_id + "_" + this.props.page_no}
                                    key={this.props.contentEditableId ? id : sentence.block_id + "_" + this.props.page_no}
                                    ref={sentence.block_id + "_" + this.props.page_no}
                                    style={
                                        {
                                            outline: "none",
                                            backgroundColor: !this.props.contentEditableId && spanId && spanId === this.props.sentence.block_id + "_" + this.props.page_no ? '#92a8d1' : ""
                                        }
                                    }
                                    contentEditable={this.props.contentEditableId === sentence.block_id + "_" + this.props.page_no && this.state.editable ? true : false}
                                    onKeyDown={(event) => this.props.handleTargetChange(sentence.block_id + "_" + this.props.page_no, event, sentence, sentence.text, sentence.block_id, "senIndex")}
                                    onClick={(e) => {
                                        this.props.handleOnClickTarget(e, sentence.block_id + "_" + this.props.page_no, this.props.page_no, sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType)
                                    }}
                                    onDoubleClick={event => {
                                        this.setState({ contentEditableId: sentence.block_id + "_" + this.props.page_no, editable: true }),
                                            this.props.handleOnDoubleClickTarget(event, sentence.block_id + "_" + this.props.page_no, this.props.page_no, sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType)
                                    }}
                                >
                                    {sentence.text}
                                </div></div>)
                    }
                </div>

            );
        }
    }
}

export default Preview;