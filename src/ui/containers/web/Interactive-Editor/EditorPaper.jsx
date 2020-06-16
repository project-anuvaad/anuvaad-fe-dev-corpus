import React from "react";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ContentEditable from 'react-contenteditable';
import CustomTable from '../../../components/web/common/CustomTable'

const styles = {
    paperHeader: {
        color: darkBlack,
        background: blueGrey50
    },

};


class EditorPaper extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            html: ''
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.scrollToId !== this.props.scrollToId) {
            let sid = this.props.scrollToId.split('_')[0]
            if (this.refs[sid + '_' + this.props.scrollToId.split('_')[1] + '_' + this.props.paperType] && this.props.paperType !== this.props.parent) {
                this.refs[sid + '_' + this.props.scrollToId.split('_')[1] + '_' + this.props.paperType].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
            }
            else if (this.refs[sid + '_' + this.props.paperType] && this.props.paperType !== this.props.parent) {
                this.refs[sid + '_' + this.props.paperType].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
            }
        } else if (prevProps.scrollToPage !== this.props.scrollToPage) {
            if (this.refs[this.props.scrollToPage + '_' + this.props.paperType])
                this.refs[this.props.scrollToPage + '_' + this.props.paperType].scrollIntoView({
                    behavior: 'smooth',
                })
        }
    }

    fetchSuperScript(supArr) {
        let supArray = []
        if (supArr && Array.isArray(supArr) && supArr.length > 0) {
            supArr.map((supScript, index) => {
                let superScripts = this.props.supScripts
                let sentenceId = superScripts[supScript] ? superScripts[supScript].sentence_id : ''

                supArray.push(<span key={index}><a href="#"><span onClick={() => this.props.handleSuperScript((sentenceId + '_' + 0), 'true', this.props.paperType, true)} title={superScripts && superScripts[supScript] ? superScripts[supScript].text : ''}>{supScript}</span></a><span>{supArr.length === index + 1 ? '' : ','}</span></span>)
                return true
            })
            return supArray
        } else {
            return ''
        }
    }

    getSelectionText(event) {
        var text = "";
        let selection = {}
        var activeEl = document.activeElement;
        var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;

        if ((activeElTagName === "textarea") || (activeElTagName === "input" && /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) && (typeof activeEl.selectionStart === "number")) {
            text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
        } else if (window.getSelection) {
            text = window.getSelection().toString();
        }

        let sentences = ""
        let startNode = ""
        let endNode = ""

        if (window.getSelection()) {
            sentences = window.getSelection()
        }
        if (sentences && sentences.anchorNode && sentences.anchorNode.parentElement && sentences.anchorNode.parentElement.id && sentences.anchorNode.textContent) {
            startNode = window.getSelection().anchorNode.parentElement.id
            this.props.sentences.map(paragraph => {
                if (paragraph._id === startNode.split('_')[0] && !paragraph.is_table) {
                    selection.startNode = startNode
                    selection.pageNo = paragraph.page_no
                    selection.startParagraph = paragraph
                }
                return true
            })
        }

        if (sentences && sentences.focusNode && sentences.focusNode.parentElement && sentences.focusNode.parentElement.id && sentences.focusNode.textContent) {
            endNode = window.getSelection().focusNode.parentElement.id
            this.props.sentences.map(paragraph => {
                if (paragraph._id === endNode.split('_')[0] && !paragraph.is_table) {
                    selection.endNode = endNode
                    selection.pageNo = paragraph.page_no
                    selection.endParagraph = paragraph
                }
                return true
            })
        }
        if (selection && selection.startNode && selection.endNode) {
            this.props.handleSelection(selection, event)
        }
    }

    fetchTokenizedSentence(sentence, isSpaceRequired) {
        if (sentence.tokenized_sentences && Array.isArray(sentence.tokenized_sentences) && sentence.tokenized_sentences.length > 0) {
            let sentenceArray = []
            if (this.props.paperType === 'source') {

                sentence.tokenized_sentences.map((tokenText) => {
                    if (tokenText.status !== "DELETED") {
                        let color = ""
                        let textColor = ""
                        if (this.props.selectedMergeSentence && Array.isArray(this.props.selectedMergeSentence) && this.props.selectedMergeSentence.length > 0) {
                            this.props.selectedMergeSentence.map(sentenceText => {
                                if ((sentence._id + '_' + tokenText.sentence_index === sentenceText.startNode) || (sentence._id + '_' + tokenText.sentence_index === sentenceText.endNode)) {
                                    color = "red"
                                    textColor = 'white'
                                }
                                return true
                            })
                        }

                        let bgColor = !this.props.isPreview ? ((this.props.hoveredSentence === sentence._id + '_' + tokenText.sentence_index) ? 'yellow' : color ? color : this.props.selectedSentenceId === sentence._id + '_' + tokenText.sentence_index ? '#4dffcf' : '') : ""
                        if (bgColor === 'yellow' || bgColor === '#4dffcf') {
                            textColor = 'black'
                        }
                        sentenceArray.push(<span key={sentence._id + '_' + tokenText.sentence_index}> <span
                            id={sentence._id + '_' + tokenText.sentence_index}
                            key={sentence._id + '_' + tokenText.sentence_index}
                            style={sentence.text_pending && this.props.selectedSourceId !== sentence._id + '_' + tokenText.sentence_index?{border: "1px solid #aaa",
                            padding: "7px 49.5%", borderColor:'orange'
                       }:{
                            fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '',
                            backgroundColor: bgColor,
                            color: textColor ? textColor : ''
                        }}

                            ref={sentence._id + '_' + tokenText.sentence_index + '_' + this.props.paperType}
                            key={sentence._id + '_' + tokenText.sentence_index} onDoubleClick={(event) => this.props.handleonDoubleClick(sentence._id + '_' + tokenText.sentence_index, tokenText.text, event)} onClick={(event) => {(sentence.text_pending) ? this.props.handleonDoubleClick(sentence._id + '_' + tokenText.sentence_index, tokenText.text) :this.handleOnClick(sentence._id + '_' + tokenText.sentence_index, sentence.page_no)}} onMouseEnter={() => this.hoverOn(sentence._id + '_' + tokenText.sentence_index, sentence.page_no)} onMouseLeave={() => this.hoverOff()}>
                            {this.props.selectedSourceId === sentence._id + '_' + tokenText.sentence_index ? <ContentEditable
                                html={this.props.selectedSourceText}
                                disabled={false}
                                onBlur={this.props.handleCheck}
                                onChange={this.props.handleSourceChange}
                                style={{
                                    border: "1px dashed #aaa",
                                    padding: "5px",
                                }}
                            /> : tokenText.text}</span>{isSpaceRequired ? <span>&nbsp;</span> : <span></span>}</span>)
                        return true
                    } else {
                        return true
                    }
                })
                return sentenceArray
            }
            if (this.props.paperType === 'target') {
                sentence.tokenized_sentences.map((tokenText) => {
                    if (tokenText.status !== "DELETED") {
                        sentenceArray.push(<span><span
                            ref={sentence._id + '_' + tokenText.sentence_index + '_' + this.props.paperType}
                            style={{
                                fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '',
                                backgroundColor: (this.props.hoveredSentence === sentence._id + '_' + tokenText.sentence_index) ? 'yellow' : this.props.selectedSentenceId === sentence._id + '_' + tokenText.sentence_index ? '#4dffcf' : "",
                            }}
                            key={sentence._id + '_' + tokenText.sentence_index} onClick={() => this.handleOnClick(sentence._id + '_' + tokenText.sentence_index, sentence.page_no)} onMouseEnter={() => this.hoverOn(sentence._id + '_' + tokenText.sentence_index, sentence.page_no)} onMouseLeave={() => this.hoverOff()}>
                            {tokenText.target}</span>{isSpaceRequired ? <span>&nbsp;</span> : <span></span>}</span>)
                    }
                    return true
                })
                return sentenceArray
            }

        }
    }

    fetchSentence(sentence, prevSentence, index, noOfPage) {
        let align = sentence.align === 'CENTER' ? 'center' : (sentence.align === 'RIGHT' ? 'right' : 'left')
        let pageNo = sentence.page_no

        if (!sentence.is_footer && !sentence.is_table&&(sentence.text||sentence.text_pending)) {
            let printPageNo = false
            let isFirst = false
            if (index === 0) {
                printPageNo = true
                isFirst = true
            } else if (prevSentence && sentence.page_no !== prevSentence.page_no) {
                printPageNo = true
            }

            if (sentence.is_ner && !sentence.is_new_line) {
                if (align === 'left') {

                    return (<div>{printPageNo ? <div ref={pageNo + '_' + this.props.paperType} style={{ textAlign: 'right', color: 'grey', fontSize: 'small' }}><div>&nbsp;</div>{!isFirst ? <hr /> : ''}Page: {pageNo}/{noOfPage}<div>&nbsp;</div></div> : <div></div>}<div key={sentence._id} ref={sentence._id + '_' + this.props.paperType}
                        style={{ width: '60%', float: align, textAlign: align, display: 'inline-block', fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}
                        onMouseUp={this.getSelectionText.bind(this)} onKeyUp={this.getSelectionText.bind(this)}>
                        {this.fetchTokenizedSentence(sentence, false)}<sup>{this.fetchSuperScript(sentence.sup_array)}</sup></div></div>)
                } else {
                    return (<div>{printPageNo ? <div ref={pageNo + '_' + this.props.paperType} style={{ textAlign: 'right', color: 'grey', fontSize: 'small' }}><div>&nbsp;</div>{!isFirst ? <hr /> : ''}Page: {pageNo}/{noOfPage}<div>&nbsp;</div></div> : <div></div>}<div key={sentence._id} ref={sentence._id + '_' + this.props.paperType}
                        style={{ float: align, textAlign: align, display: 'inline-block', fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}
                        onMouseUp={this.getSelectionText.bind(this)} onKeyUp={this.getSelectionText.bind(this)}>
                        {this.fetchTokenizedSentence(sentence, false)}<sup>{this.fetchSuperScript(sentence.sup_array)}</sup></div></div>)
                }

            } else if (sentence.is_ner) {
                return (<div>{printPageNo ? <div ref={pageNo + '_' + this.props.paperType} style={{ textAlign: 'right', color: 'grey', fontSize: 'small' }}><div>&nbsp;</div>{!isFirst ? <hr /> : ''}Page: {pageNo}/{noOfPage}<div>&nbsp;</div></div> : <div></div>}<div key={sentence._id} style={{ textAlign: 'justify' }} ><div ref={sentence._id + '_' + this.props.paperType} key={sentence._id}
                    style={{ textAlign: align, fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}
                    onMouseUp={this.getSelectionText.bind(this)} onKeyUp={this.getSelectionText.bind(this)}>
                    {this.fetchTokenizedSentence(sentence, false)}<sup>{this.fetchSuperScript(sentence.sup_array)}</sup></div> <div style={{ width: '100%' }}><br />&nbsp;<br /></div></div></div>)
            } else {
                return (<div>{printPageNo ? <div ref={pageNo + '_' + this.props.paperType} style={{ textAlign: 'right', color: 'grey', fontSize: 'small' }}><div>&nbsp;</div>{!isFirst ? <hr /> : ''}Page: {pageNo}/{noOfPage}<div>&nbsp;</div></div> : <div></div>}<div key={sentence._id}
                    style={{ textAlign: align, right: 0, fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}
                    onMouseUp={this.getSelectionText.bind(this)} onKeyUp={this.getSelectionText.bind(this)}>
                    <div style={{ textAlign: 'justify' }}>{this.fetchTokenizedSentence(sentence, true)}{sentence.sup_array ? <sup><span>{this.fetchSuperScript(sentence.sup_array)}</span></sup> : ''}<br /><br /></div></div></div>)
            }
        } else if (sentence.is_table) {
            // return this.fetchTable(sentence._id, sentence.table_items, prevSentence, index, pageNo, noOfPage)
            return <CustomTable id={sentence._id} tableItems={sentence.table_items}
                isPreview={this.props.isPreview}
                hoveredTableId={this.props.hoveredTableId}
                selectedTableId={this.props.selectedTableId}
                scrollToId={this.props.scrollToId}
                scrollToPage={this.props.scrollToPage}
                prevSentence={prevSentence} tableIndex={index} pageNo={pageNo} noOfPage={noOfPage}
                paperType={this.props.paperType}
                handleOnMouseEnter={this.tableHoverOn.bind(this)}
                handleOnMouseLeave={this.tableHoverOff.bind(this)}
                handleTableCellClick={this.handleTableOnCLick.bind(this)}
                handleAddCell={this.props.handleAddCell}
                sentence={sentence}
                handleSourceChange={this.props.handleSourceChange}
                selectedSourceText={this.props.selectedSourceText}
                selectedSourceId={this.props.selectedSourceId}
                handleonDoubleClick={this.handleonDoubleClick.bind(this)}
                handleCheck={this.props.handleCheck}
                handleDeleteTable={this.props.handleDeleteTable}
                handleAddNewTable={this.props.handleAddNewTable}
                handleAddTableCancel={this.props.handleAddTableCancel}
                handleAddNewSentence={this.props.handleAddNewSentence}

            ></CustomTable>
        } else {
            return <div></div>
        }

    }
    hoverOn(e, pageNo) {
        if (!this.props.isPreview) {
            this.props.handleOnMouseEnter(e, this.props.paperType, pageNo)
        }
    }

    hoverOff() {
        if (!this.props.isPreview) {
            this.props.handleOnMouseEnter('')
        }
    }

    tableHoverOn(sentenceId, tableId, pageNo, paragraph) {
        if (!this.props.isPreview) {
            this.props.handleTableHover(sentenceId, tableId, this.props.paperType, pageNo, paragraph)
        }
    }

    tableHoverOff() {
        if (!this.props.isPreview) {
            this.props.handleTableHover('', '')
        }

    }

    handleonDoubleClick(id, value, row, cell) {
        this.props.handleonDoubleClick(id, value, row, cell)
    }

    handleOnClick(id, pageNo) {
        if (!this.props.isPreview) {
            if (id) {
                this.props.handleSentenceClick(id, true, this.props.paperType, pageNo)
            }
        }
    }

    handleTableOnCLick(id, blockId, clisckedCell, value, parent, pageNo, next_previous) {
        this.props.handleTableCellClick(id, blockId, clisckedCell, value, parent, pageNo, next_previous)
    }

    render() {
        const { sentences, header, footer } = this.props;
        return (
            <div>

                {header ? <div style={{ color: 'grey', fontSize: 'small' }}>
                    <Grid container>
                        <Grid item xs={12} sm={8} lg={6} xl={6}>
                            {header}
                        </Grid>
                        {/* <Grid item sm={4} lg={6} xl={6}>{"test"}
                            </Grid> */}
                    </Grid>
                    <br />
                </div> : <div></div>}
                <div style={{ paddingLeft: '20px' }}>
                    {sentences && Array.isArray(sentences) && sentences.length > 0 && sentences.map((sentence, index) => {
                        return this.fetchSentence(sentence, sentences[index - 1], index, sentences[sentences.length - 1].page_no)
                    })}
                </div>
                {footer ?
                    <div>
                        <hr></hr>
                        <div style={{ color: 'grey' }}>
                            <Grid container>
                                <Grid item xs={12} sm={8} lg={6} xl={6}>
                                    {footer}
                                </Grid>
                            </Grid>
                        </div>
                    </div> : <div></div>
                }
            </div >

        )
    }
}

;


export default withStyles(styles)(EditorPaper);