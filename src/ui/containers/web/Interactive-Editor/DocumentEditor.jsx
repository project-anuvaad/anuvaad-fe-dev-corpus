import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import SourceView from "./DocumentSource";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Fab";
import { translate } from "../../../../assets/localisation";
import history from "../../../../web.history";
import FileDetails from "../../../../flux/actions/apis/fetch_filedetails";
import ClearContent from "../../../../flux/actions/apis/clearcontent";
import FileContent from "../../../../flux/actions/apis/fetchcontent";
import Spinner from "../../../components/web/common/Spinner";
import Paper from "@material-ui/core/Paper";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import Toolbar from "@material-ui/core/Toolbar";
import PdfPreview from "./PdfPreview";
import DocPreview from "./DocPreview";
import InfiniteScroll from "react-infinite-scroll-component";
import Arrow from "@material-ui/icons/ArrowUpward";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import GetAppIcon from "@material-ui/icons/GetApp";
import DoneIcon from "@material-ui/icons/Done";
import Typography from "@material-ui/core/Typography";
import Snackbar from "../../../components/web/common/Snackbar";
import WorkFlow from "../../../../flux/actions/apis/fileupload";
import TextButton from '@material-ui/core/Button';

const BLOCK_OPS = require("../../../../utils/block.operations");

class PdfFileEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceSupScripts: "",
      targetSupScripts: "",
      header: "",
      tokenized: true,
      backgroundImage: "",
      pageArr: [],
      hoveredSentence: "",
      sentences: "",
      selectedText: "",
      clear: false,
      height: 0,
      showCompareDocs: false,
      pageNo: 1,
      zoom: false,
      scrollToPage: "",
      popOver: false,
      hoveredTableId: "",
      textChange: false,
      pageCount: 0,
      hasMoreItems: true,
      currentPage: 0,
      pagesToBeLoaded: 2,
      fileDetails: {},
      scrollToTop: false,
      scrollToId: "",
      editableId: "",
      showNextSuggestion: false,
      workflow: "DP_WFLOW_S_TTR"
    };
  }

  componentDidMount() {
    this.props.ClearContent(null);
    this.setState({ showLoader: true });
    /* Pagination api */
    let jobId = this.props.match.params.jobid;

    const apiObj = new FileContent(jobId, 1, this.state.pagesToBeLoaded);
    this.props.APITransport(apiObj);
    let obj = {};
    obj.download_source_path = this.props.match.params.inputfileid;
    this.setState({ fileDetails: obj, showLoader: true, buttonDisable: true, pdfPage: 1 });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.documentDetails !== this.props.documentDetails) {
      const temp = this.props.documentDetails.result;
      this.setState({
        sentences: temp,
        showLoader: false
      });
    }
    if (prevProps.workflowStatus !== this.props.workflowStatus) {
      console.log(this.state.startPage, this.state.endPage)
      const apiObj = new FileContent(this.props.match.params.jobid, this.state.startPage, this.state.endPage);
      this.props.APITransport(apiObj);
      this.setState({ apiStatus: true });
    }

    /* Pagination api */
    if (prevProps.fetchContent !== this.props.fetchContent) {
      // let temp = Data.data;
      let temp = this.props.fetchContent.result.data;
      // let sentenceObj = temp;
      // sentenceObj &&
      //   sentenceObj.map(sentence => {
      //     sentence.text_blocks &&
      //       sentence.text_blocks.map(sentenceChildren => {
      //         sentenceChildren.children
      //           ? sentenceChildren.children.map(children => {
      //               children.children
      //                 ? children.children.map(value => {
      //                     value.max_font = value.font_size;
      //                   })
      //                 : (children.max_font = children.font_size);

      //               // children.font_size = children.font_size -1;
      //             })
      //           : (sentenceChildren.max_font = sentenceChildren.font_size);
      //       });
      //   });
      // temp = sentenceObj;

      if (!temp) {
        this.setState({
          hasMoreItems: true,
          currentPage: 0,
          pagesToBeLoaded: 2
        });
      } else {
        this.setState({
          sentences: temp,
          open: this.state.apiStatus && true,
          message: this.state.apiStatus && (this.state.apiCall == "Merge sentence" ? "Sentence merged successfully!" :this.state.apiCall == "merge" ? "Paragraph merged successfully":this.state.apiCall == "Split sentence"? "Sentence Splitted Sucessfully" : "Sentence updated successfully...!"),
          apiStatus: false,
          apiCall: false,
          showLoader: false,
          pageCount: this.props.fetchContent.result.count,
          // pageCount: Data.count,
          currentPage: this.state.currentPage + this.state.pagesToBeLoaded,
          hasMoreItems: this.props.fetchContent.result.count > this.state.currentPage + this.state.pagesToBeLoaded ? true : false
          // hasMoreItems: Data.count > this.state.currentPage + this.state.pagesToBeLoaded ? true : false
        });
      }
    }
  }

  getPageId(blocks) {
    debugger
    let page_ids = [];
    blocks.forEach(element => {
      page_ids.push(parseInt(element.split("_")[1]));
    });
    this.setState({ startPage: Math.min(...page_ids), endPage: Math.max(...page_ids) });
  }

  workFlowApi(workflow, blockDetails, update) {
    console.log("-----",update)
    
    let pageInfo;
    const apiObj = new WorkFlow(
      workflow,
      blockDetails,
      this.props.match.params.jobid,
      this.props.match.params.locale,
      "",
      "",
      parseInt(this.props.match.params.modelId)
    );
    console.log(this.state.startPage, this.state.endPage)
    debugger
      pageInfo = update!== "merge" && blockDetails.length>0 && blockDetails[0].page_info.page_no;
      
    this.props.APITransport(apiObj);
    pageInfo ?  this.setState({ apiCall: update, startPage : pageInfo, endPage: pageInfo}):this.setState({ apiCall: update});
  }

  fetchData() {
    let jobId = this.props.match.params.jobid;

    const apiObj = new FileContent(jobId, this.state.currentPage + 1, this.state.currentPage + this.state.pagesToBeLoaded);
    this.props.APITransport(apiObj);

    this.setState({ buttonDisable: false, pdfPage: this.state.currentPage + 1 });
  }

  handleOnMouseEnter(sentenceId, parent, yOffset, block_identifier, has_sibling) {
    this.setState({
      hoveredSentence: sentenceId,
      hoveredTableId: "",
      parent: parent,
      scrollToId: sentenceId,
      yOffset: yOffset,
      block_identifier: block_identifier,
      has_sibling: has_sibling
    });
  }

  handleOnMouseLeave() {
    this.setState({ hoveredSentence: "", selectedBlockId: "", selectedSourceText: "", scrollToId: null, edited: false });
  }

  handleDialog(title, dialogMessage) {
    this.setState({ openDialog: true, title, dialogMessage, openEl: false });
  }

  handleMenuPosition(topValue, leftValue) {
    this.setState({ menuTopValue: topValue, menuLeftValue: leftValue });
  }

  handleSentenceOperation(start, end, sentence, type) {
    let start_id = start;
    let end_id = end;
    let startSentence = start.split("_");
    let endSentence = end.split("_");
    if (parseInt(startSentence[0]) === parseInt(endSentence[0]) && parseInt(startSentence[1]) == parseInt(endSentence[1])) {
      if (parseInt(startSentence[2]) > parseInt(endSentence[2])) {
        start_id = end;
        end_id = start;
      }

      let sentenceObj = this.state.sentences;
      let token,
        textValue = "",
        index;
      let selectedBlock = sentenceObj[startSentence[0]] && sentenceObj[startSentence[0]].text_blocks[startSentence[1]];
      if (sentenceObj[startSentence[0]] && type === "Merge sentence") {
        selectedBlock.tokenized_sentences.map((text, i) => {
          if (text.s_id == start_id || token === true) {
            token = true;
            index = i;

            textValue = textValue + " " + text.src;
            text.src = null;
          }

          if (text.s_id == end_id) {
            token = false;
            text.src = null;
          }
        });
        selectedBlock.tokenized_sentences[index].src = textValue;
      } else if (sentenceObj[startSentence[0]] && type === "Split sentence") {
        const selectedSplitEndIndex = window.getSelection() && window.getSelection().getRangeAt(0).endOffset;
        let selectedSplitValue, nextSplitValue, copySentence, ind;
        selectedBlock.tokenized_sentences.map((text, i) => {
          if (text.s_id == start_id) {
            selectedSplitValue = text.src.substring(0, selectedSplitEndIndex);
            nextSplitValue = text.src.substring(selectedSplitEndIndex, text.src.length);
            text.src = selectedSplitValue;
            copySentence = JSON.parse(JSON.stringify(text));
            copySentence.src = nextSplitValue;
            ind = i;
          }
        });
        let id = copySentence.s_id.split("_");
        id[2] = selectedBlock.tokenized_sentences.length;
        let newId = id.join("_");

        copySentence.s_id = newId;

        selectedBlock.tokenized_sentences.splice(ind + 1, 0, copySentence);
        selectedBlock.tokenized_sentences = this.tokenizedIndex(selectedBlock.tokenized_sentences);
      }

      this.setState({ sentences: sentenceObj });
    } else {
      alert("something went wrong... please try again");
    }
  }

  handleEditor(value) {
    ((this.state.selectedBlockId && value && this.state.selectedBlockId !== value) || this.state.clear) &&
      this.setState({ selectedBlockId: null, clear: false });
  }

  handleAutoCompleteEditor(id, paperType) {
    this.setState({ editableId: id });
  }

  tokenizedIndex = (tokenizedArray, indexValue) => {
    let i = 0;
    let indexes = tokenizedArray[0].s_id.split("_");
    let values;

    tokenizedArray.map(sentence => {
      values = sentence.s_id.split("_");
      i = i + 1;
      values[1] = indexValue ? indexValue : indexes[1];
      values[2] = i;
      sentence.s_id = values.join("_");
    });
    return tokenizedArray;
  };

  indexCorrection = () => {
    var sentenceObj = [...this.state.sentences];
    sentenceObj.map(sentence => {
      var sen = sentence.text_blocks.filter(val => val);
      sen.map((value, index) => {
        sen[index].block_id = index;
        this.tokenizedIndex(value.tokenized_sentences, index);
      });
      sentence.text_blocks = sen;
    });
    this.setState({ sentences: sentenceObj });
  };

  handleOnClose() {
    history.push(`${process.env.PUBLIC_URL}/view-document`);
  }
  handleSource(selectedBlock, type) {
    if (type === "table") {
      this.setState({ selectedCell: selectedBlock });
    } else {
      this.setState({ edited: true, selectedSourceText: type, selectedBlock: selectedBlock });
    }
  }

  handleSourceChange = (evt, blockValue) => {

    if (this.state.pageDetails == "target") {
      let sentenceObj = this.state.targetText;
      sentenceObj.tgt = evt.target.value;
      this.setState({ targetText: sentenceObj });
    } else {
      let sentenceObj = this.state.selectedSourceText;
      sentenceObj.text = evt.target.value;

      this.setState({ selectedSourceText: sentenceObj, height: evt.currentTarget.offsetHeight, textChange: true });
    }
  };

  handleSuggestion(suggestion, targetValue) {
    let sentenceObj = this.state.targetText;
    sentenceObj.tgt = targetValue + suggestion;
    this.setState({ targetText: sentenceObj, showNextSuggestion: true });
  }

  handleDoubleClickTarget(event, id, text, pageDetails, block_id) {
    this.setState({ targetSelected: id, targetText: text, pageDetails, hoveredSentence: block_id });
  }
  handleCheck(block, evt, checkValue, diffValue) {
    let blockId = block.split("_")[0];
    let pageNo = block.split("_")[1];
    let blockTop,
      blockHeight,
      valueH = 0;
    let docPage = this.state.sentences;
    let strText = this.state.selectedSourceText;

    if (docPage && Array.isArray(docPage) && docPage.length > 0) {
      docPage.map((page, index) => {
        if (page.page_no == pageNo) {
          if (page.text_blocks && Array.isArray(page.text_blocks) && page.text_blocks.length > 0) {
            page.text_blocks.map((block, i) => {
              if (block.block_id == blockId) {
                blockTop = block.text_top;
                blockHeight = block.text_height;
                block.text = strText;
              }
            });

            page.text_blocks.map((block, i) => {
              if (block.text_top > blockTop) {
                if (this.state.height !== 0 && this.state.height !== evt.currentTarget.offsetHeight) {
                  valueH = -this.state.height + evt.currentTarget.offsetHeight;
                  block.text_top = block.text_top - this.state.height + evt.currentTarget.offsetHeight;
                } else if (diffValue) {
                  block.text_top = block.text_top + diffValue;
                }
                // if(this.state.height ===0 && evt.currentTarget.offsetHeight - block.text_height> 5){
                //   block.text_height=  block.text_height + evt.currentTarget.offsetHeight - block.text_height - 3

                // }
              }
            });
            if ((this.state.height !== 0 && this.state.height !== evt.currentTarget.offsetHeight) || diffValue) {
              page.page_height = page.page_height + valueH;
              valueH = 0;
            }
          }
        }
      });
    }
    !checkValue && this.setState({ selectedBlockId: null, clear: false });

    this.setState({ sentences: docPage, height: checkValue ? evt.currentTarget.offsetHeight : 0, clear: true });
  }

  handleCompareDocs() {
    this.setState({ showCompareDocs: true });
  }

  handleChangeView() {
    this.setState({
      tokenized: !this.state.tokenized,
      hoveredSentence: "",
      selectedBlock: "",
      targetSelected: "",
      pageDetails: "",
      edited: false,
      mergeButton: "Merge"
    });
  }

  handleCompareDocClose() {
    this.setState({ showCompareDocs: false });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  handlePageChange(value) {
    this.setState({ pageNo: Number(this.state.pageNo) + Number(value), scrollToPage: Number(this.state.pageNo) + Number(value) });
  }

  handleZoomChange = value => {
    this.setState({ zoom: !this.state.zoom });
  };

  handlePreviewPageChange(pageNo, value) {
    if (this.state.pageNo !== pageNo) {
      this.setState({ pageNo: parseInt(pageNo) });
    }
  }

  handleTableHover(id) {
    this.setState({ hoveredTableId: id, hoveredSentence: "" });
  }

  handlePopUp() {
    this.setState({ popOver: true });
  }

  handleBackToTop() {
    this.setState({ scrollToPage: 1, scrollToTop: true });
  }

  handleScroll() {
    this.setState({ scrollToTop: false });
  }

  handleClick(value) {
    this.setState({ mergeButton: value });
  }

  handleBlur(id, wf_code, saveData) {
    let status = "update";
    let idDetails = id.split("_")
    let text = "";
    let blockItem;

    this.state.sentences.map(page => {
      if (page.page_no == idDetails[1]) {
        page.text_blocks.map(block => {
          if (block.block_identifier == idDetails[0]) {
            block &&
              block.children &&
              Array.isArray(block.children) &&
              block.children.length > 0 &&
              block.children.map(children => {
                children.children
                  ? children.children.map(grandChildren => {
                      text = text + " " + grandChildren.text;
                    })
                  : (text = text + " " + children.text);
              });

            if (block.text !== text) {
              block.text = text;
              blockItem = block;
            } else if (wf_code) {
              blockItem = block;
            }
          }
        });
      }
    });

    if (blockItem && !wf_code && this.state.textChange) this.workFlowApi("DP_WFLOW_S_TTR", [blockItem], status);
    else if (wf_code && blockItem && saveData) this.workFlowApi(wf_code, [blockItem], status);
    this.setState({
      hoveredSentence: "",
      targetSelected: "",
      pageDetails: "",
      selectedBlockId: "",
      selectedSourceText: "",
      edited: false,
      textChange: false,
      updatePage: parseInt(idDetails[1])
    });
  }

  updateContent(selectedArray) {
    if (selectedArray.length > 0) {
      let updated_blocks = BLOCK_OPS.get_merged_blocks(this.state.sentences, selectedArray);
      this.getPageId(selectedArray);
      updated_blocks.length > 0 && this.workFlowApi(this.state.workflow, updated_blocks, "merge");
    }
  }

  handleAutoCompleteText(id, sentennceIndex, sentences, pageNo, blockId, textData) {
    let data = this.state.sentences;
    let blocks;

    data &&
      Array.isArray(data) &&
      data.length > 0 &&
      data.map((sentence, i) => {
        let textBlocks;
        if (pageNo === sentence.page_no) {
          textBlocks = sentence.text_blocks;
          if (textBlocks && Array.isArray(textBlocks) && textBlocks.length > 0) {
            textBlocks.map((block, blockIndex) => {
              if (blockId === block.block_id) {
                blocks = block;

                blocks.tokenized_sentences &&
                  Array.isArray(blocks.tokenized_sentences) &&
                  blocks.tokenized_sentences.length > 0 &&
                  blocks.tokenized_sentences.map((token, tId) => {
                    if (sentennceIndex === tId) {
                      token.tgt = textData;
                      token.tagged_tgt = textData;
                    }
                  });
              }
            });
          }
        }
      });
  }

  render() {
    let leftPaddingValue = 0;
    let rightPaddingValue = 0;

    this.state.sentences &&
      this.state.sentences.map(sentence => {
        if (leftPaddingValue > parseInt(sentence.x) || leftPaddingValue == 0) {
          leftPaddingValue = parseInt(sentence.x);
        }
        if ((sentence.width && rightPaddingValue < parseInt(sentence.width) + parseInt(sentence.x)) || (sentence.width && rightPaddingValue == 0)) {
          rightPaddingValue = parseInt(sentence.width) + parseInt(sentence.x);
        }
      });
    let paperWidth = this.state.sentences && this.state.sentences[0].page_width - leftPaddingValue - 78 + "px";

    return (
      <div>
        {this.state.sentences && (
          <div>
            <Grid
              container
              spacing={8}
              style={{ marginTop: "-10px", padding: "10px 24px 12px 24px", position: "fixed", zIndex: 1000, background: "#F5F9FA" }}
            >
              <Grid item xs={12} sm={6} lg={2} xl={2} className="GridFileDetails">
                <Button
                  variant="outlined"
                  onClick={event => {
                    this.handleOnClose();
                  }}
                  style={{ textTransform: "capitalize", width: "100%", minWidth: "150px", borderRadius: "30px", color: "#233466" }}
                >
                  <ChevronLeftIcon fontSize="large" />
                  {translate("common.page.title.document")}
                </Button>
              </Grid>
              <Grid item xs={false} sm={6} lg={7} xl={7} className="GridFileDetails">
                <Button
                  color="primary"
                  variant="outlined"
                  className="GridFileDetails"
                  style={{
                    textTransform: "capitalize",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    borderRadius: "30px"
                  }}
                >
                  <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {!this.state.apiCall ? (this.state.tokenized ? "You are in validation mode" : "You are in Translation mode") : "Loading ....."}
                  </div>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} lg={2} xl={2}>
                <Button
                  variant="contained"
                  // color="primary"
                  style={{
                    color: "#233466",
                    textTransform: "capitalize",
                    width: "100%",
                    minWidth: "110px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    borderRadius: "30px"
                  }}
                  disabled={this.state.apiCall ? true : false}
                  onClick={() => this.handleChangeView()}
                >
                  {this.state.tokenized ? "Go to Translational mode" : "Go to Validation mode"}
                  <ChevronRightIcon fontSize="large" />
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} lg={1} xl={1}>
                <Button
                  onClick={event => {
                    alert("In progress");
                  }}
                  variant="outlined"
                  style={{ width: "100%", minWidth: "55px", borderRadius: "30px", color: "#233466" }}
                >
                  <DoneIcon fontSize="large" style={{ color: "#233466" }} />
                  &nbsp;&nbsp;{translate("common.page.label.done")}
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <Paper>
                  {this.state.tokenized ?
                    <Toolbar style={{ color: darkBlack, background: this.state.edited ? "#989E9C" : blueGrey50 }}>
                      <Typography value="" variant="h6" gutterBottom style={{ flex: 1, color: "#1C9AB7" }}>
                        Extracted Document
                     </Typography>

                      {this.state.tokenized && !this.state.apiCall && (
                        <Toolbar
                          onClick={event => {
                            this.handleClick(this.state.mergeButton === "save" ? "Merge" : "save");
                          }}
                          style={{ paddingRight: "0px" }}
                        >
                          <Typography value="" variant="subtitle2" style={{ cursor: "pointer", color: "#233466", paddingLeft: "7px" }}>
                            {this.state.mergeButton == "save" ? "Save" : "Merge Blocks"}
                          </Typography>
                        </Toolbar>
                      )}
                    </Toolbar> :

                    <Toolbar style={{ color: darkBlack, background: this.state.pageDetails === "target" ? "#989E9C" : blueGrey50 }}>
                      <Typography value="" variant="h6" gutterBottom style={{ flex: 1, color: "#1C9AB7" }}>
                        Translated Document
                    </Typography>
                    </Toolbar>
                  }
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <Paper elevation={2}>
                  {!this.state.tokenized ?
                    <Toolbar style={{ color: darkBlack, background: this.state.pageDetails === "target" ? "#989E9C" : blueGrey50 }}>
                      <Typography value="" variant="h6" gutterBottom style={{ flex: 1, color: "#1C9AB7" }}>
                        Extracted Document
                      </Typography>
                    </Toolbar>

                    :
                    <Toolbar style={{ color: darkBlack, background: blueGrey50 }}>

                      <Grid item xs={3} sm={3} lg={3} xl={3}>
                        <Typography value="" variant="h6" gutterBottom style={{ width: "100%", flex: 1, color: '#1C9AB7' }}>
                          {translate("intractive_translate.page.preview.originalPDF")}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} lg={6} xl={6}>
                        {this.state.numPages && this.state.pageNo && (
                          <Grid container spacing={8}>
                            <Grid item xs={4} sm={4} lg={4} xl={4} style={{ textAlign: 'right' }}>
                              <TextButton
                                style={{ fontWeight: "bold", width: "80%" }}
                                color="primary"
                                disabled={this.state.pageNo <= 1}
                                onClick={event => {
                                  this.handlePageChange(-1);
                                }}
                              >
                                {" "}
                                <ChevronLeftIcon size="large" />
                              </TextButton>
                            </Grid>
                            <Grid item xs={4} sm={4} lg={4} xl={4} style={{ textAlign: 'center' }}>
                              <TextButton style={{ fontWeight: "bold", width: "100%", pointerEvents: "none" }}>
                                {`${this.state.pageNo} / ${this.state.numPages}`}
                              </TextButton>
                            </Grid>

                            <Grid item xs={4} sm={4} lg={4} xl={4} style={{ textAlign: 'left' }}>
                              <TextButton
                                color="primary"
                                disabled={this.state.numPages <= this.state.pageNo}
                                onClick={event => {
                                  this.handlePageChange(1);
                                }}
                                style={{ fontWeight: "bold", width: "80%" }}
                              >
                                <ChevronRightIcon size="large" />{" "}
                              </TextButton>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Toolbar>
                  }
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={16} style={{ padding: "142px 24px 12px 24px" }}>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <Paper
                  elevation={this.state.edited ? 12 : 2}
                  style={{
                    // paddingBottom: "12px"
                  }}
                >
                  {/* <Toolbar style={{ color: darkBlack, background: this.state.edited ? "#989E9C" : blueGrey50 }}>
                    <Typography value="" variant="h6" gutterBottom style={{ flex: 1, color: "#1C9AB7" }}>
                      Extracted Document
                    </Typography>

                    {this.state.tokenized && !this.state.apiCall && (
                      <Toolbar
                        onClick={event => {
                          this.handleClick(this.state.mergeButton === "save" ? "Merge" : "save");
                        }}
                        style={{ paddingRight: "0px" }}
                      >
                        <Typography value="" variant="subtitle2" style={{ cursor: "pointer", color: "#233466", paddingLeft: "7px" }}>
                          {this.state.mergeButton == "save" ? "Save" : "Merge Blocks"}
                        </Typography>
                      </Toolbar>
                    )}
                  </Toolbar> */}
                  <div
                    id="scrollableDiv"
                    style={
                      this.state.tokenized
                        ? {
                          maxHeight: window.innerHeight - 240,
                          overflow: this.state.edited ? "hidden" : "scroll"
                        }
                        : {}
                    }
                  >
                    <InfiniteScroll
                      next={this.fetchData.bind(this)}
                      hasMore={this.state.hasMoreItems}
                      dataLength={this.state.sentences ? this.state.sentences.length : 0}
                      loader={
                        <p style={{ textAlign: "center" }}>
                          <CircularProgress
                            size={20}
                            style={{
                              zIndex: 1000
                            }}
                          />
                        </p>
                      }
                      endMessage={
                        <p style={{ textAlign: "center" }}>
                          <b>You have seen it all</b>
                        </p>
                      }
                      // style={{ overflowY: "hidden" }}
                      scrollableTarget={this.state.tokenized ? "scrollableDiv" : null}
                      onScroll={() => this.handleScroll()}
                    >
                      {this.state.sentences &&
                        this.state.sentences.map((sentence, index) => {
                          return (
                            <div>
                              <SourceView
                                block_identifier={this.state.block_identifier}
                                sentences={this.state.sentences}
                                has_sibling={this.state.has_sibling}
                                paperType="source"
                                isPreview={true}
                                parent={this.state.parent}
                                key={sentence.page_no + "_" + index}
                                pageNo={sentence.page_no}
                                sourceSentence={sentence}
                                selectedSourceText={this.state.selectedSourceText}
                                createBlockId={this.state.selectedBlockId}
                                isEditable={this.state.isEditable}
                                hoveredSentence={this.state.hoveredSentence}
                                hoveredTableId={this.state.hoveredTableId}
                                clear={this.state.clear}
                                heightValue={this.state.height}
                                popOver={this.state.popOver}
                                selectedCell={this.state.selectedCell}
                                scrollToPage={this.state.scrollToPage}
                                scrollToTop={this.state.scrollToTop}
                                scrollToId={this.state.scrollToId}
                                yOffset={this.state.yOffset}
                                workFlowApi = {this.workFlowApi.bind(this)}
                                handleOnMouseEnter={this.handleOnMouseEnter.bind(this)}
                                handleOnMouseLeave={this.handleOnMouseLeave.bind(this)}
                                handleSourceChange={this.handleSourceChange.bind(this)}
                                handleEditor={this.handleEditor.bind(this)}
                                handleCheck={this.handleCheck.bind(this)}
                                handleSource={this.handleSource.bind(this)}
                                handleTableHover={this.handleTableHover.bind(this)}
                                handlePopUp={this.handlePopUp.bind(this)}
                                handleBlur={this.handleBlur.bind(this)}
                                handleSentenceOperation={this.handleSentenceOperation.bind(this)}
                                tokenized={this.state.tokenized}
                                handlePreviewPageChange={this.handlePreviewPageChange.bind(this)}
                                mergeButton={this.state.mergeButton}
                                updateContent={this.updateContent.bind(this)}
                                editableId={this.state.editableId}
                                handleAutoCompleteEditor={this.handleAutoCompleteEditor.bind(this)}
                                targetSelected={this.state.targetSelected}
                              />
                            </div>
                          );
                        })}
                    </InfiniteScroll>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <Paper
                  style={this.state.tokenized ? {
                    paddingBottom: "12px",
                    paddingTop: "12px",
                    // height: "98%"
                  }: {}}
                >
                  {this.state.tokenized ? (
                    <DocPreview
                      parent="document-editor"
                      data={this.state.fileId}
                      pageNo={this.state.pageNo}
                      numPages={this.state.numPages}
                      zoom={this.state.zoom}
                      handlePageChange={this.handlePageChange.bind(this)}
                      onDocumentLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
                      fileDetails={this.state.fileDetails}
                      handleChange={this.handleZoomChange.bind(this)}
                      handleClick={this.handleCompareDocClose.bind(this)}
                    ></DocPreview>
                  ) : (
                      <div>
                        {/* <Toolbar style={{ color: darkBlack, background: this.state.pageDetails === "target" ? "#989E9C" : blueGrey50 }}>
                          <Typography value="" variant="h6" gutterBottom style={{ flex: 1, color: "#1C9AB7" }}>
                            Translated Document
                        </Typography>
                        </Toolbar> */}
                        <div
                          id="scrollableTargetDiv"
                          style={
                            {
                              // maxHeight: window.innerHeight - 240,
                              // overflow: this.state.edited ? "hidden" : "scroll"
                            }
                          }
                        >
                          <InfiniteScroll
                            next={this.fetchData.bind(this)}
                            hasMore={this.state.hasMoreItems}
                            dataLength={this.state.sentences ? this.state.sentences.length : 0}
                            loader={
                              <p style={{ textAlign: "center" }}>
                                <CircularProgress
                                  size={20}
                                  style={{
                                    zIndex: 1000
                                  }}
                                />
                              </p>
                            }
                            endMessage={
                              <p style={{ textAlign: "center" }}>
                                <b>You have seen it all</b>
                              </p>
                            }
                            // style={{ overflowY: "hidden" }}
                            // scrollableTarget="scrollableTargetDiv"
                            onScroll={() => this.handleScroll()}
                          >
                            {this.state.sentences &&
                              this.state.sentences.map((sentence, index) => {
                                return (
                                  <div>
                                    <SourceView
                                      block_identifier={this.state.block_identifier}
                                      sentences={this.state.sentences}
                                      has_sibling={this.state.has_sibling}
                                      isPreview={true}
                                      paperType="target"
                                      parent={this.state.parent}
                                      key={sentence.page_no + "_" + index}
                                      pageNo={sentence.page_no}
                                      sourceSentence={sentence}
                                      selectedSourceText={this.state.selectedSourceText}
                                      createBlockId={this.state.selectedBlockId}
                                      isEditable={this.state.isEditable}
                                      hoveredSentence={this.state.hoveredSentence}
                                      hoveredTableId={this.state.hoveredTableId}
                                      clear={this.state.clear}
                                      heightValue={this.state.height}
                                      popOver={this.state.popOver}
                                      selectedCell={this.state.selectedCell}
                                      scrollToPage={this.state.scrollToPage}
                                      scrollToTop={this.state.scrollToTop}
                                      scrollToId={this.state.scrollToId}
                                      yOffset={this.state.yOffset}
                                      modelId={this.props.match.params.modelId}
                                      handleOnMouseEnter={this.handleOnMouseEnter.bind(this)}
                                      handleOnMouseLeave={this.handleOnMouseLeave.bind(this)}
                                      handleSourceChange={this.handleSourceChange.bind(this)}
                                      handleEditor={this.handleEditor.bind(this)}
                                      handleCheck={this.handleCheck.bind(this)}
                                      handleSource={this.handleSource.bind(this)}
                                      handleTableHover={this.handleTableHover.bind(this)}
                                      handlePopUp={this.handlePopUp.bind(this)}
                                      handleSentenceOperation={this.handleSentenceOperation.bind(this)}
                                      tokenized={this.state.tokenized}
                                      handlePreviewPageChange={this.handlePreviewPageChange.bind(this)}
                                      menuTopValue={this.state.menuTopValue}
                                      menuLeftValue={this.state.menuLeftValue}
                                      handleMenuPosition={this.handleMenuPosition.bind(this)}
                                      handleAutoCompleteText={this.handleAutoCompleteText.bind(this)}
                                      editableId={this.state.editableId}
                                      handleAutoCompleteEditor={this.handleAutoCompleteEditor.bind(this)}
                                      targetSelected={this.state.targetSelected}
                                      handleDoubleClickTarget={this.handleDoubleClickTarget.bind(this)}
                                      handleBlur={this.handleBlur.bind(this)}
                                      targetText={this.state.targetText}
                                      handleSuggestion={this.handleSuggestion.bind(this)}
                                      showNextSuggestion={this.state.showNextSuggestion}
                                    />
                                  </div>
                                );
                              })}
                          </InfiniteScroll>
                        </div>
                      </div>
                    )}
                </Paper>
              </Grid>
            </Grid>
          </div>
        )}
        {!this.state.sentences && <Spinner />}
        {this.state.open && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.open}
            autoHideDuration={3000}
            variant="success"
            message={this.state.message}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetchPdfSentence: state.fetchPdfSentence,
  fileUpload: state.fileUpload,
  documentDetails: state.documentDetails,
  fetchContent: state.fetchContent,
  workflowStatus: state.workflowStatus
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      ClearContent: ClearContent
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PdfFileEditor));
