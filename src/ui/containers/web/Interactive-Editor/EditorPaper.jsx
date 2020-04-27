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
        if(supArr && Array.isArray(supArr) && supArr.length > 0) {
            return supArr.join()
        } else {
            return ''
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
                    }}>{sentence.text}<sup>{this.fetchSuperScript(sentence.sup_array)}</sup></div>)
            } else if (sentence.is_ner) {
                return (<div><div key={sentence._id} onClick={() => this.hoverOn(sentence._id)} onMouseEnter={() => this.hoverOn(sentence._id)} onMouseLeave={() => this.hoverOff()}
                    style={{
                        backgroundColor: (this.props.selectedSentence === sentence._id) ? "yellow" : '', float: align, textAlign: align,
                        fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : ''
                    }}>{sentence.text}<sup>{this.fetchSuperScript(sentence.sup_array)}</sup></div> <div style={{ width: '100%' }}><br />&nbsp;<br /></div></div>)
            } else {
                return (<div key={sentence._id} onClick={() => this.hoverOn(sentence._id)} onMouseEnter={() => this.hoverOn(sentence._id)} onMouseLeave={() => this.hoverOff()}
                    style={{
                        backgroundColor: this.props.selectedSentence === sentence._id ? "yellow" : '', textAlign: align, right: 0,
                        fontWeight: sentence.is_bold ? 'bold' : 'normal', textDecorationLine: sentence.underline ? 'underline' : ''
                    }}>{sentence.text}<sup>{this.fetchSuperScript(sentence.sup_array)}</sup><br /><br /></div>)
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

    render() {
        const { section, sentences } = this.props;
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