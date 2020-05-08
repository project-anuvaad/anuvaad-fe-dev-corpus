import React from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import "../../../styles/web/InteractiveEditor.css";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Toolbar from "@material-ui/core/Toolbar";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import DoneIcon from "@material-ui/icons/Done";
import { translate } from "../../../../assets/localisation";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import Editor from "./Editor";
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import FetchDoc from "../../../../flux/actions/apis/fetchdocsentence";
import history from "../../../../web.history";
import EditorPaper from "./EditorPaper"
import InteractiveApi from "../../../../flux/actions/apis/interactivesavesentence";
import Snackbar from "../../../components/web/common/Snackbar";

class IntractiveTrans extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      collapseToken: false,
      gridValue: 4,
      message: translate("intractive_translate.page.snackbar.message"),
      hoveredSentence: '',
      hoveredTableId: '',
      selectedSentenceId: "",
      selectedTableId: '',
      clickedSentence: false,
      sourceSupScripts: {},
      targetSupScripts: {},
      token: false
    };
  }

  handleClick(value, gridValue) {
    this.setState({ collapseToken: value, gridValue });
  }

  handleBack() {
    history.push(`${process.env.PUBLIC_URL}/view-pdf`);
  }

  componentDidMount() {

    const { APITransport } = this.props;
    const apiObj = new FetchDoc(this.props.match.params.fileid);
    APITransport(apiObj);

  }

  componentDidUpdate(prevProps) {

    if (prevProps.interactiveUpdate !== this.props.interactiveUpdate) {
      this.setState({ open: this.state.token });
      this.state.token &&
        setTimeout(() => {
          this.handleBack()
        }, 3000);

    }
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
              sScript.text = sourceValue.concat(' ', sentence.text)
            }
            if (sentence.tokenized_sentences && Array.isArray(sentence.tokenized_sentences)) {
              tScript.sentence_id = targetSupScript[prevKey].sentence_id
              targetValue = targetSupScript[prevKey].text

              sentence.tokenized_sentences.map(tokenSentence => {
                tScript.text = targetValue.concat(' ', tokenSentence.target)

              })
            }
            supScripts[prevKey] = sScript
            targetSupScript[prevKey] = tScript
          }

        }
        return true;
      })
      this.setState({ sentences: sentenceArray, fileDetails: this.props.fetchPdfSentence.pdf_process, sourceSupScripts: supScripts, targetSupScripts: targetSupScript });
    }

  }


  handleSave(value, index, submittedId, keyValue, cellValue, taggedValue) {
    let obj = this.state.sentences
    let temp = this.state.sentences[index]
    if (!temp.is_table) {

      temp.tokenized_sentences[submittedId.split("_")[1]].target = value.tgt ? value.tgt : value;
      temp.tokenized_sentences[submittedId.split("_")[1]].tagged_tgt = value.tagged_tgt ? value.tagged_tgt : taggedValue;
    }

    else {
      temp.table_items[keyValue][cellValue].target = value.tgt ? value.tgt : value;
      temp.table_items[keyValue][cellValue].tagged_tgt = value.tagged_tgt ? value.tagged_tgt : taggedValue;
    }

    obj[index] = temp;
    this.setState({
      sentences: obj
    })

  }

  handleDone(token) {
    const { APITransport } = this.props;
    const apiObj = new InteractiveApi(this.state.sentences);
    APITransport(apiObj);
    this.setState({ token })

  }



  handleOnMouseEnter(sentenceId, parent) {
    this.setState({ hoveredSentence: sentenceId, scrollToId: sentenceId, parent: parent })
  }

  handleOnMouseLeave() {
    this.setState({ hoveredSentence: '' })
  }

  handleTableHover(sentenceId, tableId, parent) {
    this.setState({ hoveredSentence: sentenceId, hoveredTableId: tableId, scrollToId: sentenceId, parent: parent })
  }

  handleTableHoverLeft() {
    this.setState({ hoveredSentence: '', hoveredTableId: '' })
  }

  handleSenetenceOnClick(sentenceId, value, parent) {
    this.setState({ selectedSentenceId: sentenceId, clickedSentence: value, selectedTableId: '', scrollToId: sentenceId, parent: parent })
  }

  handleCellOnClick(sentenceId, tableId, clickedCell, value, parent) {

    console.log("cell", sentenceId, tableId, clickedCell, value, parent)
    this.setState({ selectedSentenceId: tableId, selectedTableId: tableId, clickedSentence: value, scrollToId: sentenceId, clickedCell: clickedCell, parent: parent })
  }

  handlePreview() {
    if (this.props.match.params.fileid) {
      history.push(`${process.env.PUBLIC_URL}/interactive-preview/${this.props.match.params.fileid}`);
    }

  }

  render() {
    const { gridValue } = this.state;
    return (

      <div style={{ marginLeft: "-100px" }}>
        {this.state.sentences &&
          <div>
            <Grid container spacing={8} style={{ padding: "0 24px 12px 24px" }}>
              <Grid item xs={12} sm={6} lg={2} xl={2} className='GridFileDetails'>
                <Button variant="outlined" size="large" onClick={event => {
                  this.handleBack();
                }} color="primary" style={{ width: "100%", minWidth: '150px', fontSize: '90%', fontWeight: 'bold' }}>
                  <ChevronLeftIcon fontSize="large" /> &nbsp;&nbsp;Documents
            </Button>
              </Grid>
              <Grid item xs={false} sm={6} lg={8} xl={8} className='GridFileDetails'>

                <Button variant="outlined" size="large" className='GridFileDetails' style={{ width: "100%", pointerEvents: "none", fontSize: '90%', fontWeight: 'bold' }}>
                  <PlayArrowIcon fontSize="large" style={{ color: 'grey' }} />{this.state.fileDetails && "Source : " + this.state.fileDetails.source_lang}
                  <PlayArrowIcon fontSize="large" style={{ color: 'grey' }} /> {this.state.fileDetails && "Target : " + this.state.fileDetails.target_lang}
                  <PlayArrowIcon fontSize="large" style={{ color: 'grey' }} /> {this.state.fileDetails && "Filename : " + this.state.fileDetails.process_name}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} lg={1} xl={1}>
                <Button variant="outlined" size="large" color="primary" style={{ width: "100%", minWidth: '110px', fontSize: '90%', fontWeight: 'bold' }} onClick={() => this.handlePreview()}>
                  <VisibilityIcon fontSize="large" />
              &nbsp;&nbsp;Preview
            </Button>
              </Grid>
              <Grid item xs={12} sm={6} lg={1} xl={1} >
                <Button onClick={event => {
                  this.handleDone(true);
                }} variant="outlined" size="large" color="primary" style={{ width: "100%", minWidth: '55px', fontSize: '90%', fontWeight: 'bold' }}>
                  <DoneIcon fontSize="large" />&nbsp;&nbsp;Done
            </Button>
              </Grid>
            </Grid>

            <Grid container spacing={16} style={{ padding: "0 24px 0px 24px" }}>
              {!this.state.collapseToken ? (
                <Grid item xs={12} sm={6} lg={4} xl={4} className='GridFileDetails'>
                  <Paper elevation={2} style={{ paddingBottom: "10px", maxHeight: window.innerHeight - 180, overflowY: 'scroll' }}>
                    <Toolbar style={{ color: darkBlack, background: blueGrey50 }}>
                      <Typography value="" variant="h6" gutterBottom style={{ flex: 1, marginLeft: "3%" }}>
                        Source
                  </Typography>
                      <Toolbar onClick={event => {
                        this.handleClick(true, 7);
                      }}>
                        <KeyboardBackspaceIcon style={{ cursor: "pointer" }}
                          color="primary"

                        />
                        <Typography value="" variant="subtitle2" color="primary" style={{ cursor: "pointer" }}>
                          Collapse
                  </Typography>
                      </Toolbar>
                    </Toolbar>
                    <EditorPaper paperType="source" sentences={this.state.sentences} hoveredSentence={this.state.hoveredSentence} hoveredTableId={this.state.hoveredTableId}
                      isPreview={false}
                      handleOnMouseEnter={this.handleOnMouseEnter.bind(this)}
                      scrollToId={this.state.scrollToId}
                      handleTableHover={this.handleTableHover.bind(this)}
                      parent={this.state.parent}
                      selectedSentenceId={this.state.selectedSentenceId}
                      selectedTableId={this.state.selectedTableId}
                      supScripts={this.state.sourceSupScripts}
                      handleSentenceClick={this.handleSenetenceOnClick.bind(this)} handleTableCellClick={this.handleCellOnClick.bind(this)}
                    ></EditorPaper>
                  </Paper>
                </Grid>
              ) : (
                  <Grid item xs={1} sm={1} lg={1} xl={1}>
                    <Paper elevation={2} style={{ height: "49px", paddingBottom: "15px" }}>
                      <Toolbar onClick={event => {
                        this.handleClick(false, 4);
                      }} style={{ color: darkBlack, background: blueGrey50 }}>
                        <KeyboardTabIcon
                          color="primary"
                          style={{ cursor: "pointer" }}
                        />  &nbsp;&nbsp;
              <Typography value="" variant="subtitle2" color="primary" style={{ cursor: "pointer" }}>
                          Source
              </Typography>
                      </Toolbar>
                    </Paper>
                  </Grid>

                )}
              <Grid item xs={12} sm={6} lg={4} xl={4} className='GridFileDetails'>
                <Paper elevation={2} style={{ paddingBottom: "10px", maxHeight: window.innerHeight - 180, overflowY: 'scroll' }}>
                  <Toolbar style={{ color: darkBlack, background: blueGrey50 }}>
                    <Typography value="" variant="h6" gutterBottom style={{ marginLeft: "3%" }}>
                      Target
                  </Typography>
                  </Toolbar>
                  <EditorPaper paperType="target" sentences={this.state.sentences} hoveredSentence={this.state.hoveredSentence} hoveredTableId={this.state.hoveredTableId}
                    isPreview={false}
                    scrollToId={this.state.scrollToId}
                    parent={this.state.parent}
                    handleOnMouseEnter={this.handleOnMouseEnter.bind(this)}
                    handleTableHover={this.handleTableHover.bind(this)}
                    selectedSentenceId={this.state.selectedSentenceId}
                    selectedTableId={this.state.selectedTableId}
                    supScripts={this.state.targetSupScripts}
                    handleSentenceClick={this.handleSenetenceOnClick.bind(this)} handleTableCellClick={this.handleCellOnClick.bind(this)}></EditorPaper>
                </Paper>
              </Grid>



              <Grid item xs={12} sm={12} lg={gridValue} xl={gridValue}>
                {this.state.sentences && this.state.sentences[0] && <Editor modelDetails={this.state.fileDetails.model} hadleSentenceSave={this.handleDone.bind(this)} handleSave={this.handleSave.bind(this)} clickedCell={this.state.clickedCell} selectedTableId={this.state.selectedTableId} clickedSentence={this.state.clickedSentence} handleCellOnClick={this.handleCellOnClick.bind(this)} handleSenetenceOnClick={this.handleSenetenceOnClick.bind(this)} submittedId={this.state.selectedSentenceId} sentences={this.state.sentences} />}
              </Grid>
            </Grid>
            {this.state.open && (
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={this.state.open}
                autoHideDuration={3000}
                onClose={this.handleClose}
                variant="success"
                message={this.state.fileDetails.process_name + " saved successfully !..."}
              />)}
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  fetchPdfSentence: state.fetchPdfSentence,
  interactiveUpdate: state.interactiveUpdate
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      NMTApi: APITransport,
      NMTSPApi: APITransport,
      MODELApi: APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IntractiveTrans));