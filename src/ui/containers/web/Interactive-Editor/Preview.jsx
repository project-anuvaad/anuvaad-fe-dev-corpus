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
                if (!sentence.is_footer) {
                    sentenceArray.push(sentence)
                } else {
                    let sourceValue = ""
                    let targetValue = ""

                    let key = (sentence.text).substr(0, (sentence.text).indexOf(' '))

                    if (!isNaN(key)) {

                        if (sentence.text) {
                            sourceValue = (sentence.text).substr((sentence.text).indexOf(' ') + 1)
                        }
                        if (sentence.tokenized_sentences && Array.isArray(sentence.tokenized_sentences) && sentence.tokenized_sentences[0] && sentence.tokenized_sentences[0].target) {
                            targetValue = (sentence.tokenized_sentences[0].target).substr((sentence.tokenized_sentences[0].target).indexOf(' ') + 1)
                        }

                        supScripts[key] = sourceValue
                        targetSupScript[key] = targetValue

                    } else {
                        let prevKey = Object.keys(supScripts).length
                        console.log(sentence)
                        if (sentence.text) {
                            sourceValue = supScripts[prevKey]
                            sourceValue = sourceValue.concat(' ', sentence.text)
                        }
                        if (sentence.tokenized_sentences && Array.isArray(sentence.tokenized_sentences) && sentence.tokenized_sentences[0] && sentence.tokenized_sentences[0].target) {
                            debugger
                            targetValue = targetSupScript[prevKey]

                            sentence.tokenized_sentences.map(tokenSentence => {
                                targetValue = targetValue.concat(' ', tokenSentence.target)
                                return true;
                            })
                        }

                        supScripts[prevKey] = sourceValue
                        targetSupScript[prevKey] = targetValue

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
                <Grid container spacing={16} style={{ padding: "0 24px 12px 24px"}}>
                    <Grid item sm={2} lg={3} xl={3} className='GridFileDetails'>
                    </Grid>
                    <Grid item xs={12} sm={8} lg={6} xl={6} className='GridFileDetails'>
                        <Paper elevation={2} style={{ padding: '20px', overflowX: 'hidden' }}>
                            <EditorPaper paperType="target" isPreview = {true} sentences={this.state.sentences}
                                supScripts={this.state.targetSupScripts}
                            ></EditorPaper>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={2} lg={3} xl={3} className='GridFileDetails' style={{ textAlign: 'right' }}>
                        <Button variant="extended" size="large" color="primary" style={{ minWidth: '110px', fontSize: '90%', fontWeight: 'bold' }} onClick={() => this.handleOnCancel()}>
                            <CloseIcon size="large" />{" "}
                            &nbsp;&nbsp;CLOSE
            </Button>
                    </Grid>
                </Grid>
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