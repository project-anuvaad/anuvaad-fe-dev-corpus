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
import DoneIcon from "@material-ui/icons/Done";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";
import ContextMenu from "react-context-menu";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import htmlToText from "html-to-text";
import { translate } from "../../../../assets/localisation";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import Editor from "./Editor";
import FetchDoc from "../../../../flux/actions/apis/fetchdocsentence";
import InteractiveSourceUpdate from "../../../../flux/actions/apis/interactivesourceupdate";
import history from "../../../../web.history";
import EditorPaper from "./EditorPaper";
import InteractiveApi from "../../../../flux/actions/apis/interactivesavesentence";
import Snackbar from "../../../components/web/common/Snackbar";
import SentenceMerge from "../../../../flux/actions/apis/InteractiveMerge";
import Dialog from "../../../components/web/common/SimpleDialog";
import PdfPreview from "./PdfPreview";
import UpdatePdfTable from "../../../../flux/actions/apis/updatePdfTable"

class IntractiveTrans extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      collapseToken: false,
      gridValue: 4,
      message: translate("intractive_translate.page.snackbar.message"),
      hoveredSentence: "",
      hoveredTableId: "",
      selectedSentenceId: "",
      selectedTableId: "",
      clickedSentence: false,
      sourceSupScripts: {},
      targetSupScripts: {},
      superScript: false,
      token: false,
      header: "",
      openDialog: "",
      footer: "",
      pageNo: 1,
      isAddNewCell: false,
      scrollToPage: ""
    };
  }

  handleClick(value, gridValue) {
    this.setState({ collapseToken: value, gridValue });
  }

  handleBack() {
    history.push(`${process.env.PUBLIC_URL}/view-pdf`);
  }

  componentDidMount() {
    this.handleSentenceApi();
  }

  handleSentenceApi() {
    const { APITransport } = this.props;
    const apiObj = new FetchDoc(this.props.match.params.fileid);
    APITransport(apiObj);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.interactiveUpdate !== this.props.interactiveUpdate) {
      this.setState({ open: this.state.token });
      this.state.token &&
        setTimeout(() => {
          this.handleBack();
        }, 3000);
    }
    if (prevProps.updateSource !== this.props.updateSource) {
      this.handleSentenceApi();
      this.setState({ selectedSourceCheckText: "", selectedSourceText: '', selectedSourceId: '' })
    }
    if (prevProps.mergeSentenceApi !== this.props.mergeSentenceApi) {
      this.handleSentenceApi();
      this.setState({
        merge: true,
        selectedMergeSentence: []
      });
    }

    if (prevProps.updatePdfTable !== this.props.updatePdfTable) {
      const { APITransport } = this.props;
      const apiObj = new FetchDoc(this.props.match.params.fileid);
      APITransport(apiObj);
    }

    if (prevProps.fetchPdfSentence !== this.props.fetchPdfSentence) {
      const temp = this.props.fetchPdfSentence.data;
      const sentenceArray = [];
      const superArray = [];
      const supScripts = {};
      const targetSupScript = {};
      temp.map(sentence => {
        if (Array.isArray(sentence.tokenized_sentences) && sentence.tokenized_sentences.length) {
          if (!sentence.is_footer && !sentence.is_header && !sentence.is_footer_text) {
            sentenceArray.push(sentence);
          } else if (sentence.is_footer) {
            superArray.push(sentence);
            let sourceValue = "";

            const key = sentence.text.substr(0, sentence.text.indexOf(" "));

            if (!isNaN(key)) {
              const sScript = {};
              const tScript = {};

              sScript.sentence_id = sentence._id;
              tScript.sentence_id = sentence._id;

              if (sentence.text) {
                sScript.text = sentence.text.substr(sentence.text.indexOf(" ") + 1);
              }
              if (
                sentence.tokenized_sentences &&
                Array.isArray(sentence.tokenized_sentences) &&
                sentence.tokenized_sentences[0] &&
                sentence.tokenized_sentences[0].target
              ) {
                tScript.text = sentence.tokenized_sentences[0].target.substr(sentence.tokenized_sentences[0].target.indexOf(" ") + 1);
              }

              supScripts[key] = sScript;
              targetSupScript[key] = tScript;
            } else {
              const sScript = {};
              const tScript = {};

              const prevKey = Object.keys(supScripts).length;

              if (sentence.text && supScripts[prevKey] && supScripts[prevKey].sentence_id) {
                sScript.sentence_id = supScripts[prevKey].sentence_id;
                sourceValue = supScripts[prevKey].text;
                if (sourceValue) {
                  sScript.text = sourceValue.concat(" ", sentence.text);
                } else {
                  sScript.text = sentence.text;
                }
              }
              if (
                sentence.tokenized_sentences &&
                Array.isArray(sentence.tokenized_sentences) &&
                targetSupScript[prevKey] &&
                targetSupScript[prevKey]._id
              ) {
                tScript.sentence_id = targetSupScript[prevKey].sentence_id;
                tScript.text = targetSupScript[prevKey].text;

                sentence.tokenized_sentences.map(tokenSentence => {
                  tScript.text = tScript.text.concat(" ", tokenSentence.target);
                  return true;
                });
              }
              supScripts[prevKey] = sScript;
              targetSupScript[prevKey] = tScript;
            }
          }
        } else if (sentence.is_header) {
          this.setState({ header: sentence.text });
        } else if (sentence.is_footer_text) {
          this.setState({ footer: sentence.text });
        }
        return true;
      });

      this.setState({ open: this.state.merge });
      this.state.merge &&
        setTimeout(() => {
          this.setState({ merge: false, open: false });
        }, 2000);

      this.setState({
        sentences: sentenceArray,
        merge: false,
        scriptSentence: superArray,
        fileDetails: this.props.fetchPdfSentence.pdf_process,
        sourceSupScripts: supScripts,
        targetSupScripts: targetSupScript,
        clickedSentence: "",
        selectedSentenceId: "",
        contextToken: false,
        addSentence: false
      });
    }
  }

  handleSave(value, index, submittedId, sentenceIndex, keyValue, cellValue, taggedValue) {
    const obj = this.state.sentences;
    const temp = this.state.sentences[index];
    if (temp.is_table) {
      temp.table_items[keyValue][cellValue].target = value.tgt ? value.tgt : value;
      temp.table_items[keyValue][cellValue].tagged_tgt = value.tagged_tgt ? value.tagged_tgt : taggedValue;
    }
    temp.tokenized_sentences[sentenceIndex].target = value.tgt ? value.tgt : value;
    temp.tokenized_sentences[sentenceIndex].tagged_tgt = value.tagged_tgt ? value.tagged_tgt : taggedValue;

    obj[index] = temp;
    this.setState({
      sentences: obj
    });

    this.handleDone(false, temp);
  }

  handleDone(token, value) {
    const { APITransport } = this.props;
    const senArray = [];
    senArray.push(value);
    const apiObj = new InteractiveApi(senArray);
    APITransport(apiObj);
    this.setState({ token });
  }

  handleScriptSave(target, indexValue) {
    const temp = this.state.targetSupScripts;
    temp[indexValue].text = target.tgt ? target.tgt : target;
    this.setState({
      targetSupScripts: temp
    });
  }

  handleOnMouseEnter(sentenceId, parent, pageNo) {
    if (this.state.selectedSentenceId) {
      this.setState({ hoveredSentence: sentenceId, scrollToId: "", pageNo: pageNo || this.state.pageNo, parent });
    } else {
      this.setState({ hoveredSentence: sentenceId, scrollToId: sentenceId, pageNo: pageNo || this.state.pageNo, parent });
    }
  }

  handleOnMouseLeave() {
    this.setState({ hoveredSentence: "" });
  }

  handleTableHover(sentenceId, tableId, parent, pageNo) {
    if (this.state.clickedCell) {
      this.setState({ hoveredSentence: sentenceId, hoveredTableId: tableId, scrollToId: "", pageNo: pageNo || this.state.pageNo, parent });
    } else {
      this.setState({
        hoveredSentence: sentenceId,
        hoveredTableId: tableId,
        scrollToId: sentenceId,
        pageNo: pageNo || this.state.pageNo,
        parent
      });
    }
  }

  handleTableHoverLeft() {
    this.setState({ hoveredSentence: "", hoveredTableId: "" });
  }

  handleSenetenceOnClick(sentenceId, value, parent, pageNo, next_previous) {
    this.setState({
      selectedSentenceId: sentenceId,
      clickedSentence: value,
      selectedTableId: "",
      scrollToId: sentenceId,
      pageNo: pageNo || this.state.pageNo,
      parent,

      superScript: false
    });
    if (next_previous) {
      this.setState({ parent: "target" });
      const self = this;
      setTimeout(() => {
        self.setState({ scrollToId: "" });
        self.setState({ scrollToId: sentenceId, parent: "source" });
      }, 350);
    }
  }

  handleAddSentence() {
    this.setState({ addSentence: true, operation_type: "merge-individual" });
  }

  handleApiMerge() {
    const { APITransport } = this.props;
    let totalSelectedSentence = this.state.mergeSentence
    let splitArray = [];

    if (this.state.operation_type === "merge-individual") {
      splitArray.push(totalSelectedSentence[0])
      if (totalSelectedSentence[0]._id !== totalSelectedSentence.slice(-1)[0]._id) {
        splitArray.push(totalSelectedSentence.slice(-1)[0])
      }

      totalSelectedSentence = splitArray

    }
    if (this.state.operation_type === "merge" || this.state.operation_type === "split" || this.state.operation_type === "merge-individual") {
      const apiObj = new SentenceMerge(
        totalSelectedSentence,
        this.state.startSentence,
        this.state.operation_type,
        this.state.endSentence,
        this.state.splitSentence
      );
      APITransport(apiObj);
    }
    this.handleClose();
  }

  handleDialogSave() {
    this.handleApiMerge();
    this.setState({ openDialog: false });
  }

  handleSuperScript(sentenceId, value, parent, token) {
    this.setState({
      selectedSentenceId: sentenceId,
      clickedSentence: value,
      selectedTableId: "",
      scrollToId: sentenceId,
      parent,
      contextToken: false,
      superScript: token
    });
    this.handleClose();
  }

  handleClose = () => {

    this.setState({ openDialog: false, operation_type: '', mergeSentence: [], selectedMergeSentence: [], endSentence: '', startSentence: '', addSentence: false, selectedMergeSentence: [] });
  };

  handleDialog() {
    this.setState({ openDialog: true });
  }

  handleCellOnClick(sentenceId, tableId, clickedCell, value, parent, pageNo, next_previous) {
    this.setState({
      selectedSentenceId: tableId,
      selectedTableId: tableId,
      clickedSentence: value,
      scrollToId: sentenceId,
      clickedCell,
      parent,
      superScript: false,
      contextToken: false,
      pageNo,
      selectedSourceId: "",
      isAddNewCell: true
    });
    this.handleClose();

    if (next_previous) {
      this.setState({ parent: "target" });
      const self = this;
      setTimeout(() => {
        self.setState({ scrollToId: "" });
        self.setState({ scrollToId: sentenceId, parent: "source" });
      }, 350);
    }
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  handlePageChange(value) {
    this.setState({ pageNo: this.state.pageNo + value });
  }
  handlePageChange(value) {
    this.setState({ pageNo: this.state.pageNo + value, scrollToPage: this.state.pageNo + value })
  }

  handlePreview() {
    if (this.props.match.params.fileid) {
      history.push(`${process.env.PUBLIC_URL}/interactive-preview/${this.props.match.params.fileid}`);
    }
  }

  handleonDoubleClick(selectedSourceId, selectedSourceText) {
    console.log("clicked");
    this.setState({ selectedSourceId, selectedSourceText, selectedSourceCheckText: selectedSourceText });
  }

  handleSourceChange = evt => {
    this.setState({ selectedSourceText: evt.target.value });
  };

  handleCheck = () => {
    const startValue = this.state.selectedSourceId.split("_");
    let sentenceObj; let updatedSentence;

    const text = htmlToText.fromString(this.state.selectedSourceText);
    if (this.state.selectedSourceCheckText !== text) {
      this.state.sentences.map((sentence, index) => {
        if (sentence._id === startValue[0]) {
          sentence.tokenized_sentences.map((value, index) => {
            if (value.sentence_index === Number(startValue[1])) {
              value.src = text;
              value.text = text;
              sentenceObj = sentence;
              updatedSentence = value;
            }
          });
        }
      });
      const { APITransport } = this.props;
      const apiObj = new InteractiveSourceUpdate(sentenceObj, updatedSentence);
      APITransport(apiObj);

    }
  };

  handleSelection(selectedSentence, event) {
    if (selectedSentence && selectedSentence.startNode && selectedSentence.endNode && selectedSentence.pageNo && window.getSelection().toString()) {
      let initialIndex;
      let startSentence;
      let endIndex;
      let endSentence;
      let operation_type;
      let selectedSplitValue;
      const { pageNo } = selectedSentence;

      const startValue = selectedSentence.startNode.split("_");
      const endValue = selectedSentence.endNode.split("_");

      this.state.sentences.map((sentence, index) => {
        if (sentence._id === startValue[0]) {
          initialIndex = index;
          sentence.tokenized_sentences.map((value, index) => {
            if (value.sentence_index === Number(startValue[1])) {
              startSentence = value;
            }
            return true;
          });
        }
        if (sentence._id === endValue[0]) {
          endIndex = index;

          sentence.tokenized_sentences.map((value, index) => {
            if (value.sentence_index === Number(endValue[1])) {
              endSentence = value;
            }
            return true;
          });
        }
        return true;
      });

      const mergeSentence = this.state.sentences.slice(initialIndex, endIndex + 1);
      if (startValue[0] === endValue[0] && startValue[1] === endValue[1]) {
        const selectedSplitEndIndex = window.getSelection() && window.getSelection().getRangeAt(0).endOffset;
        operation_type = "split";
        selectedSplitValue = startSentence.src.substring(0, selectedSplitEndIndex);
      } else {
        operation_type = "merge";
        selectedSplitValue = window.getSelection().toString();
      }

      this.state.addSentence
        ? this.setState({
          mergeSentence: [...this.state.mergeSentence, ...mergeSentence],
          selectedMergeSentence: [...this.state.selectedMergeSentence, selectedSentence],
          endSentence,
          openEl: true,
          contextToken: true,
          addSentence: true,
          pageNo
        })
        : this.setState({
          mergeSentence,
          selectedMergeSentence: [selectedSentence],
          startSentence,
          endSentence,
          operation_type,
          openEl: true,
          splitSentence: selectedSplitValue,
          contextToken: true,
          pageNo
        });
    }
  }

  handleAddCell(sentence, operationType) {
    if(sentence && operationType) {
          const { APITransport } = this.props;
          const apiObj = new UpdatePdfTable(sentence, operationType);
          APITransport(apiObj);
    }

  }

  render() {
    const { gridValue } = this.state;
    const pagen = this.state.pageNo;
    const url =
      this.state.fileDetails &&
      this.state.fileDetails.download_source_path &&
      `${process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "https://auth.anuvaad.org"}/anuvaad/v1/download?file=${
      this.state.fileDetails.download_source_path ? this.state.fileDetails.download_source_path : ""
      }`;
    return (
      <div style={{ marginLeft: "-100px" }}>
        {this.state.sentences && (
          <div>
            {!this.state.collapseToken && (
              <Grid container spacing={8} style={{ padding: "0 24px 12px 24px" }}>
                <Grid item xs={12} sm={6} lg={2} xl={2} className="GridFileDetails">
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={event => {
                      this.handleBack();
                    }}
                    color="primary"
                    style={{ width: "100%", minWidth: "150px", fontSize: "90%", fontWeight: "bold" }}
                  >
                    <ChevronLeftIcon fontSize="large" /> &nbsp;&nbsp;{translate("common.page.title.document")}
                  </Button>
                </Grid>
                <Grid item xs={false} sm={6} lg={7} xl={7} className="GridFileDetails">
                  <Button
                    variant="outlined"
                    size="large"
                    className="GridFileDetails"
                    style={{ width: "100%", overflow: "hidden", whiteSpace: "nowrap", pointerEvents: "none", fontSize: "90%", fontWeight: "bold" }}
                  >
                    <PlayArrowIcon fontSize="large" style={{ color: "grey" }} />
                    {this.state.fileDetails && `${translate("common.page.label.source")} : ${this.state.fileDetails.source_lang}`}
                    <PlayArrowIcon fontSize="large" style={{ color: "grey" }} />{" "}
                    {this.state.fileDetails && `${translate("common.page.label.target")} : ${this.state.fileDetails.target_lang}`}
                    <PlayArrowIcon fontSize="large" style={{ color: "grey" }} />{" "}
                    <div style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                      {this.state.fileDetails && `${translate("common.page.label.fileName")} : ${this.state.fileDetails.process_name}`}
                    </div>
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} lg={2} xl={2}>
                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    style={{ width: "100%", minWidth: "110px", fontSize: "90%", fontWeight: "bold", overflow: "hidden", whiteSpace: "nowrap" }}
                    onClick={() => this.handlePreview()}
                  >
                    <VisibilityIcon fontSize="large" />
                    &nbsp;&nbsp;{translate("common.page.label.review/download")}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} lg={1} xl={1}>
                  <Button
                    onClick={event => {
                      this.handleDone(true, this.state.scriptSentence);
                    }}
                    variant="outlined"
                    size="large"
                    color="primary"
                    style={{ width: "100%", minWidth: "55px", fontSize: "90%", fontWeight: "bold" }}
                  >
                    <DoneIcon fontSize="large" />
                    &nbsp;&nbsp;{translate("common.page.label.done")}
                  </Button>
                </Grid>
              </Grid>
            )}
            <Grid container spacing={16} style={{ padding: "0 24px 0px 24px" }}>
              {!this.state.collapse ? (
                <Grid item xs={12} sm={6} lg={gridValue} xl={gridValue} className="GridFileDetails">
                  <Paper
                    elevation={2}
                    style={{
                      paddingBottom: "10px",
                      maxHeight: this.state.collapseToken ? window.innerHeight - 120 : window.innerHeight - 180,
                      paddingBottom: "12px"
                    }}
                  >
                    <Toolbar style={{ color: darkBlack, background: blueGrey50 }}>
                      <Typography value="" variant="h6" gutterBottom style={{ flex: 1, marginLeft: "3%" }}>
                        {translate("common.page.label.source")}
                      </Typography>

                      {!this.state.collapseToken && (
                        <Toolbar
                          onClick={event => {
                            this.handleClick(true, 6);
                          }}
                        >
                          <PictureAsPdfIcon style={{ cursor: "pointer" }} color="primary" />
                          <Typography value="" variant="subtitle2" color="primary" style={{ cursor: "pointer" }}>
                            Compare with original
                          </Typography>
                        </Toolbar>
                      )}
                    </Toolbar>
                    <div
                      id="popUp"
                      style={{
                        maxHeight: this.state.collapseToken ? window.innerHeight - 220 : window.innerHeight - 280,
                        overflowY: "scroll",
                        padding: "24px"
                      }}
                    >
                      <EditorPaper
                        paperType="source"
                        sentences={this.state.sentences}
                        hoveredSentence={this.state.hoveredSentence}
                        hoveredTableId={this.state.hoveredTableId}
                        isPreview={false}
                        header={this.state.header}
                        footer={this.state.footer}
                        handleOnMouseEnter={this.handleOnMouseEnter.bind(this)}
                        scrollToId={this.state.scrollToId}
                        scrollToPage={this.state.scrollToPage}
                        handleTableHover={this.handleTableHover.bind(this)}
                        parent={this.state.parent}
                        selectedSentenceId={this.state.selectedSentenceId}
                        selectedTableId={this.state.selectedTableId}
                        supScripts={this.state.sourceSupScripts}
                        handleSuperScript={this.handleSuperScript.bind(this)}
                        handleSentenceClick={this.handleSenetenceOnClick.bind(this)}
                        handleTableCellClick={this.handleCellOnClick.bind(this)}
                        handleSelection={this.handleSelection.bind(this)}
                        selectedMergeSentence={this.state.addSentence ? this.state.selectedMergeSentence : ""}
                        handleSourceChange={this.handleSourceChange}
                        selectedSourceText={this.state.selectedSourceText}
                        selectedSourceId={this.state.selectedSourceId}
                        handleonDoubleClick={this.handleonDoubleClick.bind(this)}
                        handleCheck={this.handleCheck}
                        handleAddCell={this.handleAddCell.bind(this)}
                      />
                    </div>
                  </Paper>
                </Grid>
              ) : (
                  <Grid item xs={1} sm={1} lg={1} xl={1}>
                    <Paper elevation={2} style={{ height: "49px", paddingBottom: "15px" }}>
                      <Toolbar
                        onClick={event => {
                          this.handleClick(false, 4);
                        }}
                        style={{ color: darkBlack, background: blueGrey50 }}
                      >
                        <KeyboardTabIcon color="primary" style={{ cursor: "pointer" }} /> &nbsp;&nbsp;
                      <Typography value="" variant="subtitle2" color="primary" style={{ cursor: "pointer" }}>
                          {translate("common.page.label.source")}
                        </Typography>
                      </Toolbar>
                    </Paper>
                  </Grid>
                )}

              {!this.state.collapseToken ? (
                <Grid item xs={12} sm={6} lg={4} xl={4} className="GridFileDetails">
                  <Paper elevation={2} style={{ paddingBottom: "10px", maxHeight: window.innerHeight - 180, paddingBottom: "12px" }}>
                    <Toolbar style={{ color: darkBlack, background: blueGrey50 }}>
                      <Typography value="" variant="h6" gutterBottom style={{ marginLeft: "10px" }}>
                        {translate("common.page.label.target")}
                      </Typography>
                    </Toolbar>

                    <div style={{ maxHeight: window.innerHeight - 280, overflowY: "scroll", padding: "24px" }}>
                      <EditorPaper
                        paperType="target"
                        sentences={this.state.sentences}
                        hoveredSentence={this.state.hoveredSentence}
                        hoveredTableId={this.state.hoveredTableId}
                        isPreview={false}
                        header={this.state.header}
                        footer={this.state.footer}
                        scrollToId={this.state.scrollToId}
                        parent={this.state.parent}
                        handleOnMouseEnter={this.handleOnMouseEnter.bind(this)}
                        handleTableHover={this.handleTableHover.bind(this)}
                        selectedSentenceId={this.state.selectedSentenceId}
                        selectedTableId={this.state.selectedTableId}
                        supScripts={this.state.targetSupScripts}
                        handleSuperScript={this.handleSuperScript.bind(this)}
                        handleSentenceClick={this.handleSenetenceOnClick.bind(this)}
                        handleTableCellClick={this.handleCellOnClick.bind(this)}
                        handleSelection={this.handleSelection.bind(this)}
                      />
                    </div>
                  </Paper>
                </Grid>
              ) : (
                  <Grid item xs={12} sm={6} lg={gridValue} xl={gridValue} className="GridFileDetails">
                    <PdfPreview
                      pageNo={this.state.pageNo}
                      fileDetails={this.state.fileDetails}
                      numPages={this.state.numPages}
                      onDocumentLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
                      handlePageChange={this.handlePageChange.bind(this)}
                      handleClick={this.handleClick.bind(this)}
                    />
                  </Grid>
                )}
              {!this.state.collapseToken && (
                <Grid item xs={12} sm={12} lg={4} xl={4}>
                  {this.state.sentences && this.state.sentences[0] && (
                    <Editor
                      handleScriptSave={this.handleScriptSave.bind(this)}
                      superScriptToken={this.state.superScript}
                      scriptSentence={this.state.scriptSentence}
                      modelDetails={this.state.fileDetails.model}
                      hadleSentenceSave={this.handleDone.bind(this)}
                      handleSave={this.handleSave.bind(this)}
                      clickedCell={this.state.clickedCell}
                      selectedTableId={this.state.selectedTableId}
                      clickedSentence={this.state.clickedSentence}
                      handleCellOnClick={this.handleCellOnClick.bind(this)}
                      handleSenetenceOnClick={this.handleSenetenceOnClick.bind(this)}
                      submittedId={this.state.selectedSentenceId}
                      sentences={this.state.sentences}
                      handleSelectionClose={this.handleClose.bind(this)}
                    />
                  )}
                </Grid>)}
            </Grid>

            {this.state.openDialog && (
              <Dialog
                message="Selected sentence from different position. Do you want to merge ? "
                handleSubmit={this.handleDialogSave.bind(this)}
                handleClose={this.handleClose.bind(this)}
                open
                title="Merge"
              />
            )}
            {this.state.open && (
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={this.state.open}
                autoHideDuration={3000}
                variant="success"
                message={
                  this.state.token
                    ? `${this.state.fileDetails.process_name} saved successfully !...`
                    : this.state.operation_type === "merge"
                      ? "Sentence merged successfully!..."
                      : "Sentence splitted successfully!..."
                }
              />
            )}
            {window.getSelection().toString() &&
              this.state.contextToken &&
              this.state.startSentence &&
              this.state.endSentence &&
              this.state.operation_type && (
                <ContextMenu
                  contextId="popUp"
                  items={[
                    {
                      label:
                        this.state.operation_type === "merge" || this.state.operation_type === "merge-individual"
                          ? "Merge Sentence"
                          : "Split Sentence",
                      onClick:
                        this.state.operation_type === "merge-individual" && this.state.addSentence
                          ? this.handleDialog.bind(this)
                          : this.handleApiMerge.bind(this),
                      closeOnClick: true,
                      closeOnClickOut: true
                    },
                    this.state.mergeSentence.length < 2 &&
                    this.state.operation_type === "split" && {
                      label: "Add another sentence",
                      onClick: this.handleAddSentence.bind(this),
                      closeOnClick: true,
                      closeOnClickOut: true
                    }
                  ]}
                />
              )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  fetchPdfSentence: state.fetchPdfSentence,
  interactiveUpdate: state.interactiveUpdate,
  mergeSentenceApi: state.mergeSentenceApi,
  updateSource: state.updateSource,
  updatePdfTable: state.updatePdfTable
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
