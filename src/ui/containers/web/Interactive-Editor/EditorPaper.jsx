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

    componentDidUpdate(prevProps) {
        if (prevProps.scrollToId !== this.props.scrollToId) {
            let sid = this.props.scrollToId.split('_')[0]
            if (this.refs[sid + '_' + this.props.paperType] && this.props.paperType !== this.props.parent) {
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

                supArray.push(<span><a href="#"><span onClick={() => this.handleOnClick(sentenceId + '_' + 0)} title={superScripts && superScripts[supScript] ? superScripts[supScript].text : ''}>{supScript}</span></a><span>{supArr.length === index + 1 ? '' : ','}</span></span>)
            })
            return supArray
        } else {
            return ''
        }
    }

    fetchTable(id, sentences) {
        let tableRow = []
        for (let row in sentences) {
            let col = []

            for (let block in sentences[row]) {
                let blockData = this.props.paperType === 'source' ? sentences[row][block].text : sentences[row][block].target
                let blockId = id + '_' + sentences[row][block].sentence_index
                let bgColor = !this.props.isPreview ? ((this.props.hoveredTableId === blockId) ? "yellow" : this.props.selectedTableId === blockId ? '#4dffcf' : "") : ""

                col.push(<td id={blockId}
                    onClick={() => this.props.handleTableCellClick(id, blockId, sentences[row][block], "true", this.props.paperType)}
                    onMouseEnter={() => this.tableHoverOn(id, blockId)}
                    onMouseLeave={() => this.tableHoverOff()}
                    style={{ backgroundColor: bgColor, padding: '8px', border: '1px solid black', borderCollapse: 'collapse' }}>
                    {blockData}</td>)
            }
            tableRow.push(<tr>{col}</tr>)
        }
        return <table ref={id + '_' + this.props.paperType} style={{ marginBottom: '20px', border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>{tableRow}</table>
    }

    fetchTokenizedSentence(sentence, isSpaceRequired) {
        if (sentence.tokenized_sentences && Array.isArray(sentence.tokenized_sentences) && sentence.tokenized_sentences.length > 0) {
            let sentenceArray = []
            if (this.props.paperType === 'source') {
                sentence.tokenized_sentences.map((tokenText) => {

                    let bgColor = !this.props.isPreview ? ((this.props.hoveredSentence === sentence._id + '_' + tokenText.sentence_index) ? 'yellow' : this.props.selectedSentenceId === sentence._id + '_' + tokenText.sentence_index ? '#4dffcf' : "") : ""

                    sentenceArray.push(<span
                        style={{
                            fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '',
                            backgroundColor: bgColor
                        }}

                        key={sentence._id + '_' + tokenText.sentence_index} onClick={() => this.handleOnClick(sentence._id + '_' + tokenText.sentence_index)} onMouseEnter={() => this.hoverOn(sentence._id + '_' + tokenText.sentence_index)} onMouseLeave={() => this.hoverOff()}>
                        {tokenText.text}{isSpaceRequired ? <span> </span> : <span></span>}</span>)
                })
                return sentenceArray
            }
            if (this.props.paperType === 'target') {
                sentence.tokenized_sentences.map((tokenText) => {
                    sentenceArray.push(<span
                        style={{
                            fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '',
                            backgroundColor: (this.props.hoveredSentence === sentence._id + '_' + tokenText.sentence_index) ? 'yellow' : this.props.selectedSentenceId === sentence._id + '_' + tokenText.sentence_index ? '#4dffcf' : "",
                        }}
                        key={sentence._id + '_' + tokenText.sentence_index} onClick={() => this.handleOnClick(sentence._id + '_' + tokenText.sentence_index)} onMouseEnter={() => this.hoverOn(sentence._id + '_' + tokenText.sentence_index)} onMouseLeave={() => this.hoverOff()}>
                        {tokenText.target}{isSpaceRequired ? <span> </span> : <span></span>}</span>)
                })
                return sentenceArray
            }

        }
    }

    fetchSentence(sentence) {
        let align = sentence.align === 'CENTER' ? 'center' : (sentence.align === 'RIGHT' ? 'right' : 'left')

        if (!sentence.is_footer && sentence.text) {
            if (sentence.is_ner && !sentence.is_new_line) {
                return (<div ref={sentence._id + '_' + this.props.paperType} key={sentence._id} style={{ float: align, textAlign: align, display: 'inline-block', fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}>
                    {this.fetchTokenizedSentence(sentence, false)}<sup>{this.fetchSuperScript(sentence.sup_array)}</sup></div>)

            } else if (sentence.is_ner) {
                return (<div><div ref={sentence._id + '_' + this.props.paperType} key={sentence._id} style={{ float: align, textAlign: align, fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}>
                    {this.fetchTokenizedSentence(sentence, false)}<sup>{this.fetchSuperScript(sentence.sup_array)}</sup></div> <div style={{ width: '100%' }}><br />&nbsp;<br /></div></div>)
            } else {
                return (<div ref={sentence._id + '_' + this.props.paperType} key={sentence._id} style={{ textAlign: align, right: 0, fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}>
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

    tableHoverOn(sentenceId, tableId, val) {
        if (!this.props.isPreview) {
            this.props.handleTableHover(sentenceId, tableId, val, this.props.paperType)
        }
    }

    tableHoverOff() {

        if (!this.props.isPreview) {
            this.props.handleTableHover('', '')
        }

    }

    handleOnClick(id) {
        if (!this.props.isPreview) {
            this.props.handleSentenceClick(id, true, this.props.paperType)
        }
    }

    render() {
        const { section, sentences, header, footer } = this.props;

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
                                    {header}
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