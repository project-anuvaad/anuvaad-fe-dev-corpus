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
        if(this.state.editable) {
            debugger
        }
    }


    handleCheck = event => {
        this.props.handleCheck(this.props.sentence.block_id + "_" + this.props.page_no, event, false)
    }

    handleChangeEvent = (event, id) => {
        this.props.handleSourceChange(this.props.sentence.block_id + "_" + this.props.page_no, event, this.props.sentence)
    }

    handleOnClickTarget(e, id, pageNo, ref) {
        debugger
        this.setState({
            open: false,
            showLoader: false,
            topValue: e.clientY + 15,
            leftValue: e.clientX + 5
        })

        this.refs[ref].focus()
    }

    handleOnDoubleClickTarget(e, id, pageNo, ref) {
        this.props.handleEditor(id, this.props.paperType)
        this.setState({
            open: false,
            showLoader: false,
        })
        setTimeout(() => { this.refs[ref].focus() }, 100)
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
            console.log(this.state.contentEditableId, '------', this.state.editable)
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
                            <span>
                                    {console.log(this.state.contentEditableId, "===", text.sentence_id + "_" + this.props.page_no)}
                                <span
                                    // id={text.sentence_id} key={text.sentence_id}
                                    id={this.state.contentEditableId === text.sentence_id + "_" + this.props.page_no ? "editable" : text.sentence_id + "_" + this.props.page_n}
                                    key={this.state.contentEditableId ? id : text.sentence_id + "_" + this.props.page_no}
                                    ref={text.sentence_id + "_" + this.props.page_no + "_" + this.props.paperType}
                                    style={
                                        this.state.contentEditableId === text.sentence_id + "_" + this.props.page_no && this.state.editable ? {
                                            borderRadius: '6px',
                                            border: '1px solid #1C9AB7', padding: '1%', backgroundColor: "#F4FDFF",
                                        } : {
                                                borderRadius: '6px',
                                                background: (!this.state.contentEditableId && spanId && spanId === this.props.sentence.block_id + "_" + this.props.page_no && !this.props.selectedBlock) ? tokenIndex % 2 == 0 ? '#92a8d1' : "coral" : ''
                                            }
                                    }
                                    contentEditable={this.state.contentEditableId === text.sentence_id + "_" + this.props.page_no && this.state.editable ? true : false}
                                    onClick={(e) => {
                                        this.handleOnClickTarget(e, text.sentence_id + "_" + this.props.page_no, sentence.page_no, text.sentence_id + "_" + this.props.page_no + "_" + this.props.paperType)
                                    }}
                                    onDoubleClick={event => {
                                        this.setState({ contentEditableId: text.sentence_id + "_" + this.props.page_no, editable: true }),
                                            this.handleOnDoubleClickTarget(event, text.sentence_id + "_" + this.props.page_no, this.props.page_no, text.sentence_id + "_" + this.props.page_no + "_" + this.props.paperType)
                                    }}
                                >
                                    {text.tgt ? text.tgt : text.tagged_tgt}
                                </span>
                                <span> </span>
                            </span>
                        )
                    }) :
                       ( <div
                            id={this.state.contentEditableId === sentence.block_id + "_" + this.props.page_no ? "editable" : sentence.block_id + "_" + this.props.page_n}
                            key={this.state.contentEditableId ? id : sentence.block_id + "_" + this.props.page_no}
                            ref={sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType}
                            style={
                                this.state.contentEditableId === sentence.block_id + "_" + this.props.page_no && this.state.editable ? {
                                    border: '1px solid #1C9AB7', padding: '1%', backgroundColor: "#F4FDFF",
                                    backgroundColor: !this.state.contentEditableId && spanId && spanId === this.props.sentence.block_id + "_" + this.props.page_no ? '#92a8d1' : ""
                                } :
                                    {
                                        backgroundColor: !this.state.contentEditableId && spanId && spanId === this.props.sentence.block_id + "_" + this.props.page_no ? '#92a8d1' : ""
                                    }
                            }
                            contentEditable={this.state.contentEditableId === sentence.block_id + "_" + this.props.page_no && this.state.editable ? true : false}
                            onClick={(e) => {
                                this.handleOnClickTarget(e, sentence.block_id + "_" + this.props.page_no, sentence.page_no, sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType)
                            }}
                            onDoubleClick={event => {
                                this.setState({ contentEditableId: sentence.block_id + "_" + this.props.page_no, editable: true }),
                                    this.handleOnDoubleClickTarget(event, sentence.block_id + "_" + this.props.page_no, this.props.page_no, sentence.block_id + "_" + this.props.page_no + "_" + this.props.paperType)
                            }}
                        >
                            {sentence.text}
                        </div>)

                    }
                </div>

            );
        }
    }
}

export default Preview;