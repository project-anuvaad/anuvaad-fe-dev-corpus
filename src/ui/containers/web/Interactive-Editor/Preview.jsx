import React from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import "../../../styles/web/InteractivePreview.css";
import Button from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import FetchDoc from "../../../../flux/actions/apis/fetchdocsentence";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import CloseIcon from "@material-ui/icons/Close";
import DownloadIcon from "@material-ui/icons/ArrowDownward";
import history from "../../../../web.history";
import EditorPaper from "./EditorPaper"

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            sentences: '',
            sourceSupScripts: '',
            targetSupScripts: '',
            header: ""
        };
    }

    componentDidMount() {
        const { APITransport } = this.props;
        const apiObj = new FetchDoc(this.props.match.params.fileid);
        APITransport(apiObj);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fetchPdfSentence !== this.props.fetchPdfSentence) {
            let temp = this.props.fetchPdfSentence.data;
            let sentenceArray = []
            let supScripts = {}
            let targetSupScript = {}
            temp.map(sentence => {
                if (!sentence.is_footer && !sentence.is_header) {
                    sentenceArray.push(sentence)
                } else if (sentence.is_header) {
                    this.setState({ header: sentence.text })
                } else {

                    let sourceValue = ""
                    let targetValue = ""

                    let key = (sentence.text).substr(0, (sentence.text).indexOf(' '))

                    if (!isNaN(key)) {
                        let sScript = {}
                        let tScript = {}

                        sScript.sentence_id = sentence._id
                        tScript.sentence_id = sentence._id

                        if (sentence.text) {
                            sScript.text = (sentence.text).substr((sentence.text).indexOf(' ') + 1)
                        }
                        if (sentence.tokenized_sentences && Array.isArray(sentence.tokenized_sentences) && sentence.tokenized_sentences[0] && sentence.tokenized_sentences[0].target) {
                            tScript.text = (sentence.tokenized_sentences[0].target).substr((sentence.tokenized_sentences[0].target).indexOf(' ') + 1)
                        }

                        supScripts[key] = sScript
                        targetSupScript[key] = tScript

                    } else {
                        let sScript = {}
                        let tScript = {}

                        let prevKey = Object.keys(supScripts).length

                        if (sentence.text) {
                            sScript.sentence_id = supScripts[prevKey].sentence_id
                            sourceValue = supScripts[prevKey].text
                            if (sourceValue) {
                                sScript.text = sourceValue.concat(' ', sentence.text)
                            } else {
                                sScript.text = sentence.text
                            }
                        }
                        if (sentence.tokenized_sentences && Array.isArray(sentence.tokenized_sentences)) {
                            tScript.sentence_id = targetSupScript[prevKey].sentence_id
                            tScript.text = targetSupScript[prevKey].text

                            sentence.tokenized_sentences.map(tokenSentence => {
                                tScript.text = (tScript.text).concat(' ', tokenSentence.target)
                                return true;
                            })
                        }
                        supScripts[prevKey] = sScript
                        targetSupScript[prevKey] = tScript
                    }

                }
                return true;
            })
            this.setState({ sentences: sentenceArray, sourceSupScripts: supScripts, targetSupScripts: targetSupScript })
        }
    }

    handleOnCancel() {
        history.push(`${process.env.PUBLIC_URL}/interactive-editor/${this.props.match.params.fileid}`);
    }

    render() {
        return (
            <div style={{ marginLeft: "-100px" }}>
               { this.state.sentences &&
                <Grid container spacing={16} style={{ padding: "0 24px 12px 24px"}}>
                    <Grid item sm={2} lg={3} xl={3} className='GridFileDetails'>
                    </Grid>
                    <Grid item xs={12} sm={8} lg={6} xl={6} className='GridFileDetails'>
                        <Paper elevation={2} style={{ padding: '10%', overflowX: 'hidden' }}>
                            <EditorPaper header={this.state.header} paperType="target" isPreview={true} sentences={this.state.sentences}
                                supScripts={this.state.targetSupScripts}
                            ></EditorPaper>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={2} lg={3} xl={3} className='GridFileDetails' style={{ textAlign: 'right' }}>
                        <Button variant="extended" size="large" color="primary" style={{ minWidth: '110px', fontSize: '90%', fontWeight: 'bold' }} onClick={() => this.handleOnCancel()}>
                            <CloseIcon size="large" />{" "}&nbsp;&nbsp;CLOSE
                            </Button>
                    </Grid>
                </Grid>
    }
            </div>
        )
    }

}
const mapStateToProps = state => ({
    user: state.login,
    apistatus: state.apistatus,
    fetchPdfSentence: state.fetchPdfSentence,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            APITransport,
        },
        dispatch
    );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Preview));