import React from "react";
import ContentEditable from "react-contenteditable";
import Popover from 'react-text-selection-popover';
import placeRight from './placeRight'
import CircularProgress from '@material-ui/core/CircularProgress';
import Popover1 from "./Menu"

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

    handleCalc(value, tokenText) {
        const temp = value.split(" ");
        const tagged_tgt = tokenText.tagged_tgt.split(" ");
        const tagged_src = tokenText.tagged_src.split(" ");
        const tgt = tokenText.tgt && tokenText.tgt.split(" ");
        const src = tokenText.src && tokenText.src.split(" ");
        const resultArray = [];
        let index;
        temp.map(item => {
            if (item !== " ") {
                const ind = tgt.indexOf(item, resultArray.length);
                const arr = [item, `${item},`, `${item}.`];
                let src_ind = -1;
                arr.map((el, i) => {
                    if (src_ind === -1) {
                        src_ind = src.indexOf(el);
                        index = i;
                    }
                    return true;
                });
                if (ind !== -1) {
                    resultArray.push(tagged_tgt[ind]);
                } else if (src_ind !== -1) {
                    if (index > 0) {
                        if (src_ind > tagged_src.length - 1) {
                            src_ind = tagged_src.length - 1
                        }
                        const tem = tagged_src[src_ind];
                        resultArray.push(tem.slice(0, tem.length - 1));
                    } else {
                        resultArray.push(tagged_src[src_ind]);
                    }
                } else {
                    resultArray.push(item);
                }
            } else {
                resultArray.push(item);
            }
            return true;
        });
        return resultArray.join(" ");
    }



    handleTargetChange(refId, event, sentence, tokenText, tokenIndex, senIndex) {
        var selObj = window.getSelection();
        var range = selObj.getRangeAt(0)
        var boundary = range.getBoundingClientRect();
        let topValue = 0
        let leftValue = 0
        if (boundary) {
            topValue = boundary.y + 15
            leftValue = boundary.x + 5
        }
        if (event.key === 'Escape') {
            this.props.handleEditor(null, this.props.paperType)
            this.setState({
                contentEditableId: null,
                selectedIndex: 0,
                editable: false
            })
        }
        else if (event.key === 'Tab') {
            event.preventDefault()
        }

        if (((event.key === ' ' || event.key === 'Spacebar') && this.state.previousKeyPressed === 'Shift')) {
            let editableDiv = this.refs[refId]
            var caretPos = 0,
                sel, range;
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    if (range.commonAncestorContainer.parentNode == editableDiv) {
                        caretPos = range.endOffset;
                    }
                }
            } else if (document.selection && document.selection.createRange) {
                range = document.selection.createRange();
                if (range.parentElement() == editableDiv) {
                    var tempEl = document.createElement("span");
                    editableDiv.insertBefore(tempEl, editableDiv.firstChild);
                    var tempRange = range.duplicate();
                    tempRange.moveToElementText(tempEl);
                    tempRange.setEndPoint("EndToEnd", range);
                    caretPos = tempRange.text.length;
                }
            }
            let targetVal = this.handleCalc(editableDiv.textContent.substring(0, caretPos), tokenText)

            this.setState({
                anchorEl: event.currentTarget,
                showLoader: true
            })
            this.props.handleTargetChange(refId, event, sentence, tokenText, tokenIndex, senIndex, targetVal, topValue, leftValue)
            // this.props.fecthNextSuggestion()

        } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter') {
            if (event.key === 'Enter') {
                if (this.state.open) {
                    this.handleUpdateSentenceWithPrediction()
                }
            }
            event.preventDefault()
        }
        else {
            this.setState({
                open: false,
                // showLoader: false
            })
        }
        this.setState({
            previousKeyPressed: event.key,
            previousPressedKeyCode: event.keyCode
        })
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
                    {sentence.hasOwnProperty('tokenized_sentences') && sentence.tokenized_sentences.map((text, tokenIndex) => {
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
                                        onKeyDown={(event) => this.handleTargetChange(text.sentence_id + "_" + this.props.page_no, event, "", text, tokenIndex, "senIndex")}
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
                    })}
                    <Popover isOpen={this.props.showLoader} containerNode={this.state.anchorEl} placementStrategy={placeRight} >
                        <CircularProgress
                            // disableShrink
                            size={18}
                            thickness={8}
                            style={{ marginLeft: "15px" }}
                        />
                    </Popover>
                </div>

            );
        }
    }
}

export default Preview;