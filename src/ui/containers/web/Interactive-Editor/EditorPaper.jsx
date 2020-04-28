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
    
    fetchSentence(sentence,index,text) {
        let align = sentence.align === 'CENTER' ? 'center' : (sentence.align === 'RIGHT' ? 'right' : 'left')

        if ( sentence.is_ner && !sentence.is_new_line) {
            console.log()
            return (<div key={sentence._id} onClick={() => this.handleClick(index)} onMouseEnter={() => this.hoverOn(sentence._id)} onMouseLeave={() => this.hoverOff()} 
                        style={{ backgroundColor: (this.props.selectedSentence === sentence._id) ? "yellow" : this.props.submittedSentence===index && !this.props.selectedSentence ?"yellow":"", float: align, textAlign: align,display: 'inline-block',
                        fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}>{sentence.tokenized_sentences && sentence.tokenized_sentences.length>0 && sentence.tokenized_sentences[0][text]}</div>)
        } else if (sentence.is_ner && sentence.is_new_line) {
            return (<div key={sentence._id}><div key={sentence._id} onClick={() => this.handleClick(index)} onMouseEnter={() => this.hoverOn(sentence._id)} onMouseLeave={() => this.hoverOff()} 
                        style={{ backgroundColor: (this.props.selectedSentence === sentence._id) ? "yellow" : this.props.submittedSentence===index && !this.props.selectedSentence ?"yellow":"", float: align, textAlign: align,
                        fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}>{sentence.tokenized_sentences && sentence.tokenized_sentences.length>0 && sentence.tokenized_sentences[0][text]}</div> <div style={{width: '100%'}}><br/>&nbsp;<br/></div></div>)
        } else {
            return (<div key={sentence._id} onClick={() => this.handleClick(index)} onMouseEnter={() => this.hoverOn(sentence._id)} onMouseLeave={() => this.hoverOff()} 
                        style={{ backgroundColor: this.props.selectedSentence === sentence._id ?"yellow" : this.props.submittedSentence===index && !this.props.selectedSentence ?"yellow":"", textAlign: align, right: 0,
                        fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}>{sentence.tokenized_sentences && sentence.tokenized_sentences.length>0 && sentence.tokenized_sentences[0][text]}<br/><br/></div>)
        }
    }

    hoverOn(e) {
        this.props.handleOnMouseEnter(e)

    }

    handleClick(e)
    {
        this.props.handleSentenceClick(e)
    } 
    hoverOff() {
        this.props.handleOnMouseLeave()
    }

    render() {
        const { section, sentences, selectedSentence,text } = this.props;
        return (

            <div>
                <div style={{ padding: "10px 24px 24px 24px" }}>
                    <div variant="h6I" style={{ paddingBottom: "12px" }}>
                        {section}
                    </div>

                    {sentences && Array.isArray(sentences) && sentences.length > 0 && sentences.map((sentence, index) => {
                        return this.fetchSentence(sentence,index,text)
                    })}
                </div>
            </div >

        )
    }
}

;


export default withStyles(styles)(EditorPaper);