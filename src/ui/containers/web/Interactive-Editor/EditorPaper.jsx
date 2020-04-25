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

    fetchSentence(sentence) {
        let align = sentence.align === 'CENTER' ? 'center' : (sentence.align === 'RIGHT' ? 'right' : 'left')

        if ( sentence.is_ner && !sentence.is_new_line) {
            return (<div key={sentence._id} onClick={() => this.hoverOn(sentence._id)} onMouseEnter={() => this.hoverOn(sentence._id)} onMouseLeave={() => this.hoverOff()} 
                        style={{ backgroundColor: (this.props.selectedSentence === sentence._id) ? "yellow" : '', float: align, textAlign: align,display: 'inline-block',
                        fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}>{sentence.text}</div>)
        } else if (sentence.is_ner && sentence.is_new_line) {
            return (<div><div key={sentence._id} onClick={() => this.hoverOn(sentence._id)} onMouseEnter={() => this.hoverOn(sentence._id)} onMouseLeave={() => this.hoverOff()} 
                        style={{ backgroundColor: (this.props.selectedSentence === sentence._id) ? "yellow" : '', float: align, textAlign: align,
                        fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}>{sentence.text}</div> <div style={{width: '100%'}}><br/>&nbsp;<br/></div></div>)
        } else {
            return (<div key={sentence._id} onClick={() => this.hoverOn(sentence._id)} onMouseEnter={() => this.hoverOn(sentence._id)} onMouseLeave={() => this.hoverOff()} 
                        style={{ backgroundColor: this.props.selectedSentence === sentence._id ? "yellow" : '', textAlign: align, right: 0,
                        fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : '' }}>{sentence.text}<br/><br/></div>)
        }
    }

    hoverOn(e) {
        this.props.handleOnMouseEnter(e)

    }

    hoverOff() {
        this.props.handleOnMouseLeave()
    }

    render() {
        const { section, sentences, selectedSentence } = this.props;
        return (

            <div>
                <div style={{ padding: "10px 24px 24px 24px" }}>
                    <div variant="h6I" style={{ paddingBottom: "12px" }}>
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