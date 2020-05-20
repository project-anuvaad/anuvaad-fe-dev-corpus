import React from "react";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = {
    paperHeader: {
        color: darkBlack,
        background: blueGrey50
    },

};

class EditorPaper extends React.Component {

    componentDidMount() {
        document.addEventListener('selectionchange', this.getSelectionText.bind(this));
        document.addEventListener('mouseup', this.getSelectionText.bind(this));
        document.addEventListener('keyup', this.getSelectionText.bind(this));
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

    fetchTable(id, sentences) {
        let tableRow = []
        let index = 0
        for (let row in sentences) {
            let col = []

            for (let block in sentences[row]) {
                let blockData = this.props.paperType === 'source' ? sentences[row][block].text : sentences[row][block].target
                let blockId = id + '_' + sentences[row][block].sentence_index
                let bgColor = !this.props.isPreview ? ((this.props.hoveredTableId === blockId) ? "yellow" : this.props.selectedTableId === blockId ? '#4dffcf' : "") : ""

                col.push(<td id={blockId} key={blockId}
                    onClick={() => this.props.handleTableCellClick(id, blockId, sentences[row][block], "true", this.props.paperType)}
                    onMouseEnter={() => this.tableHoverOn(id, blockId)}
                    onMouseLeave={() => this.tableHoverOff()}
                    style={{ backgroundColor: bgColor, padding: '8px', border: '1px solid black', borderCollapse: 'collapse' }}>
                    {blockData}</td>)
            }
            tableRow.push(<tr key={index}>{col}</tr>)
            index++
        }
        return <table key={id} ref={id + '_' + this.props.paperType} style={{ marginBottom: '20px', border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}><tbody>{tableRow}</tbody></table>
    }

    fetchTokenizedSentence(sentence, isSpaceRequired) {
        if (sentence.tokenized_sentences && Array.isArray(sentence.tokenized_sentences) && sentence.tokenized_sentences.length > 0) {
            let sentenceArray = []
            if (this.props.paperType === 'source') {
                sentence.tokenized_sentences.map((tokenText) => {

                    let bgColor = !this.props.isPreview ? ((this.props.hoveredSentence === sentence._id + '_' + tokenText.sentence_index) ? 'yellow' : this.props.selectedSentenceId === sentence._id + '_' + tokenText.sentence_index ? '#4dffcf' : "") : ""

                    sentenceArray.push(<span
                        id={sentence._id + '_' + tokenText.sentence_index}
                        style={{
                            fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '',
                            backgroundColor: bgColor
                        }}
                        ref={sentence._id + '_' + tokenText.sentence_index + '_' + this.props.paperType}
                        key={sentence._id + '_' + tokenText.sentence_index} onClick={() => this.handleOnClick(sentence._id + '_' + tokenText.sentence_index)} onMouseEnter={() => this.hoverOn(sentence._id + '_' + tokenText.sentence_index)} onMouseLeave={() => this.hoverOff()}>
                        {tokenText.text}{isSpaceRequired ? <span> </span> : <span></span>}</span>)
                    return true
                })
                return sentenceArray
            }
            if (this.props.paperType === 'target') {
                sentence.tokenized_sentences.map((tokenText) => {
                    sentenceArray.push(<span
                        id={sentence._id + '_' + tokenText.sentence_index}
                        ref={sentence._id + '_' + tokenText.sentence_index + '_' + this.props.paperType}
                        style={{
                            fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '',
                            backgroundColor: (this.props.hoveredSentence === sentence._id + '_' + tokenText.sentence_index) ? 'yellow' : this.props.selectedSentenceId === sentence._id + '_' + tokenText.sentence_index ? '#4dffcf' : "",
                        }}
                        key={sentence._id + '_' + tokenText.sentence_index} onClick={() => this.handleOnClick(sentence._id + '_' + tokenText.sentence_index)} onMouseEnter={() => this.hoverOn(sentence._id + '_' + tokenText.sentence_index)} onMouseLeave={() => this.hoverOff()}>
                        {tokenText.target}{isSpaceRequired ? <span> </span> : <span></span>}</span>)
                    return true
                })
                return sentenceArray
            }

        }
    }

    getSelectionText() {
        var text = "";
        let selection = {}
        var activeEl = document.activeElement;
        var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
        if (
            (activeElTagName == "textarea") || (activeElTagName == "input" &&
                /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
            (typeof activeEl.selectionStart == "number")
        ) {
            text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
        } else if (window.getSelection) {
            text = window.getSelection().toString();
        }

        let sentences = ""
        if (window.getSelection()) {
            sentences = window.getSelection()
        }
        if (sentences && sentences.anchorNode && sentences.anchorNode.parentElement && sentences.anchorNode.parentElement.id && sentences.anchorNode.textContent) {
            selection.startNode = window.getSelection().anchorNode.parentElement.id
            selection.starText = window.getSelection().anchorNode.textContent
        }

        if (sentences && sentences.focusNode && sentences.focusNode.parentElement && sentences.focusNode.parentElement.id && sentences.focusNode.textContent) {
            selection.endNode = window.getSelection().focusNode.parentElement.id
            selection.endText = window.getSelection().focusNode.textContent
        }

        // console.log(this.props.handleSelection())
        if(selection) {
            this.props.handleSelection()
        }
    }

    fetchSentence(sentence) {
        let align = sentence.align === 'CENTER' ? 'center' : (sentence.align === 'RIGHT' ? 'right' : 'left')

        if (!sentence.is_footer && sentence.text) {
            if (sentence.is_ner && !sentence.is_new_line) {
                if (align === 'left') {
                    return (<div key={sentence._id} ref={sentence._id + '_' + this.props.paperType} style={{ width: '60%', float: align, textAlign: align, display: 'inline-block', fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}>
                        {this.fetchTokenizedSentence(sentence, false)}<sup>{this.fetchSuperScript(sentence.sup_array)}</sup></div>)
                } else {
                    return (<div key={sentence._id} ref={sentence._id + '_' + this.props.paperType} style={{ float: align, textAlign: align, display: 'inline-block', fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}>
                        {this.fetchTokenizedSentence(sentence, false)}<sup>{this.fetchSuperScript(sentence.sup_array)}</sup></div>)
                }

            } else if (sentence.is_ner) {
                return (<div key={sentence._id}><div ref={sentence._id + '_' + this.props.paperType} key={sentence._id} style={{ textAlign: align, fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}>
                    {this.fetchTokenizedSentence(sentence, false)}<sup>{this.fetchSuperScript(sentence.sup_array)}</sup></div> <div style={{ width: '100%' }}><br />&nbsp;<br /></div></div>)
            } else {
                return (<div key={sentence._id} style={{ textAlign: align, right: 0, fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}>
                    {this.fetchTokenizedSentence(sentence, true)}<sup><span>{this.fetchSuperScript(sentence.sup_array)}</span></sup><br /><br /></div>)
            }
        } else if (sentence.is_table) {
            return this.fetchTable(sentence._id, sentence.table_items)

        } else {
            return <div></div>
        }

    }

    hoverOn(e) {
        if (!this.props.isPreview) {
            this.props.handleOnMouseEnter(e, this.props.paperType)
        }
    }

    hoverOff() {
        if (!this.props.isPreview) {
            this.props.handleOnMouseEnter('')
        }
    }

    tableHoverOn(sentenceId, tableId) {
        if (!this.props.isPreview) {
            this.props.handleTableHover(sentenceId, tableId, this.props.paperType)
        }
    }

    tableHoverOff() {

        if (!this.props.isPreview) {
            this.props.handleTableHover('', '')
        }

    }

    handleOnClick(id) {
        if (!this.props.isPreview) {
            if (id) {
                this.props.handleSentenceClick(id, true, this.props.paperType)
            }
        }
    }

    render() {
        const { sentences, header, footer } = this.props;
        return (
            <div>

                {header ? <div style={{ color: 'grey' }}>
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
                        return this.fetchSentence(sentence)
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