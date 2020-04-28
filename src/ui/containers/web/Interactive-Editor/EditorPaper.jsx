import React from "react";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import { withStyles } from "@material-ui/core";

const styles = {
    paperHeader: {
        color: darkBlack,
        background: blueGrey50
    },

};

class EditorPaper extends React.Component {

    fetchSuperScript(supArr) {
        if (supArr && Array.isArray(supArr) && supArr.length > 0) {
            return supArr.join()
        } else {
            return ''
        }
    }

    fetchTable(id, sentences) {
        let tableRow = []
        for (let row in sentences) {
            let col = []

            for (let block in sentences[row]) {
                col.push(<td id={sentences[row][block].node_index}
                    onClick={() => this.tableHoverOn(sentences[row][block].node_index)}
                    onMouseEnter={() => this.tableHoverOn(sentences[row][block].node_index)}
                    onMouseLeave={() => this.handleOnMouseLeave(sentences[row][block].node_index)}
                    style={{ backgroundColor: (this.props.selectedTableId === sentences[row][block].node_index) ? "yellow" : '', padding: '8px', border: '1px solid black', borderCollapse: 'collapse' }}>
                    {sentences[row][block].text}</td>)
            }
            tableRow.push(<tr>{col}</tr>)
        }
        return <table style={{ marginBottom: '20px', border: '1px solid black', borderCollapse: 'collapse' }}>{tableRow}</table>
    }

    fetchTokenizedSentence(sentence) {
        if (sentence.tokenized_sentences && Array.isArray(sentence.tokenized_sentences) && sentence.tokenized_sentences.length > 0) {
            let sentenceArray = []
            if(this.props.paperType === 'source') {
                sentence.tokenized_sentences.map((tokenText) => {
                    sentenceArray.push(<span>{tokenText.text}</span>)
                })
                return sentenceArray
            } 
            if(this.props.paperType === 'target') {
                sentence.tokenized_sentences.map((tokenText) => {
                    sentenceArray.push(<span>{tokenText.target}</span>)
                })
                return sentenceArray
            }
            
        }
    }

    fetchSentence(sentence) {
        let align = sentence.align === 'CENTER' ? 'center' : (sentence.align === 'RIGHT' ? 'right' : 'left')

        if (!sentence.is_footer && sentence.text) {
            if (sentence.is_ner && !sentence.is_new_line) {
                return (<div key={sentence._id} onClick={() => this.hoverOn(sentence._id)} onMouseEnter={() => this.hoverOn(sentence._id)} onMouseLeave={() => this.hoverOff()}
                    style={{
                        backgroundColor: (this.props.selectedSentence === sentence._id) ? "yellow" : '', float: align, textAlign: align, display: 'inline-block',
                        fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : ''
                    }}>{this.fetchTokenizedSentence(sentence)}<sup>{this.fetchSuperScript(sentence.sup_array)}</sup></div>)

            } else if (sentence.is_ner) {
                return (<div><div key={sentence._id} onClick={() => this.hoverOn(sentence._id)} onMouseEnter={() => this.hoverOn(sentence._id)} onMouseLeave={() => this.hoverOff()}
                    style={{
                        backgroundColor: (this.props.selectedSentence === sentence._id) ? "yellow" : '', float: align, textAlign: align,
                        fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : ''
                    }}>{this.fetchTokenizedSentence(sentence)}<sup>{this.fetchSuperScript(sentence.sup_array)}</sup></div> <div style={{ width: '100%' }}><br />&nbsp;<br /></div></div>)
            } else {
                return (<div key={sentence._id} onClick={() => this.hoverOn(sentence._id)} onMouseEnter={() => this.hoverOn(sentence._id)} onMouseLeave={() => this.hoverOff()}
                    style={{
                        backgroundColor: this.props.selectedSentence === sentence._id ? "yellow" : '', textAlign: align, right: 0,
                        fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : ''
                    }}>{this.fetchTokenizedSentence(sentence)}<sup>{this.fetchSuperScript(sentence.sup_array)}</sup><br /><br /></div>)
            }
        } else {
            return <div></div>
        }

    }

    hoverOn(e) {
        this.props.handleOnMouseEnter(e)

    }

    hoverOff() {
        this.props.handleOnMouseLeave()
    }

    tableHoverOn(e) {
        this.props.handleTableHover(e)
    }

    tableHoverOff() {
        this.props.handleTableHoverLeft()
    }

    render() {
        const { section, sentences, paperType } = this.props;
        return (

            <div>
                <div style={{ padding: "10px 24px 24px 24px" }}>
                    <div variant="h6" style={{ paddingBottom: "12px" }}>
                        {section}
                    </div>

                    {sentences && Array.isArray(sentences) && sentences.length > 0 && sentences.map((sentence, index) => {
                        return this.fetchSentence(sentence)
                    })}
                </div>
            </div >

        )
    }
}

;


export default withStyles(styles)(EditorPaper);