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
import htmlToText from "html-to-text";
import Paper from "@material-ui/core/Paper";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import Toolbar from "@material-ui/core/Toolbar";
import PdfPreview from './PdfPreview'
import InfiniteScroll from 'react-infinite-scroll-component';
import Arrow from "@material-ui/icons/ArrowUpward";
import CircularProgress from '@material-ui/core/CircularProgress';

// import Data from "./json/File3002.json";
// import Data from "./json/Judgement.json";
// import Data from "./json/DelhiHC.json";
//  import Data from "./JudgementNew.json";

class PdfFileEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceSupScripts: "",
      targetSupScripts: "",
      header: "",

      backgroundImage: "",
      pageArr: [],
      hoveredSentence: "",
      sentences: '',
      selectedText: "",
      clear: false,
      height: 0,
      showCompareDocs: false,
      pageNo: 1,
      zoom: false,
      scrollToPage: "",
      popOver: false,
      hoveredTableId: "",
      // selectedCell: "",
      pageCount: 0,
      hasMoreItems: true,
      currentPage: 0,
      pagesToBeLoaded: 2,
      fileDetails: {},
      scrollToTop: false
    };
  }

  componentDidMount() {
    // const apiObj1 = new FileDetails(this.props.match.params.fileid);
    // this.props.APITransport(apiObj1);
    this.props.ClearContent(null)
    this.setState({showLoader: true})
    /* Pagination api */
    let jobId = this.props.match.params.jobid

    const apiObj = new FileContent(jobId, 1, this.state.pagesToBeLoaded);
    this.props.APITransport(apiObj);
    let obj = {}
    obj.download_source_path = this.props.match.params.inputfileid
    this.setState({ fileDetails: obj , showLoader : true, buttonDisable: true})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.documentDetails !== this.props.documentDetails) {

      const temp = this.props.documentDetails.result;
      this.setState({
        sentences: temp,
        showLoader :false,
      });
    }

    /* Pagination api */
    if (prevProps.fetchContent !== this.props.fetchContent) {
      const temp = this.props.fetchContent.result.data;

      if(!temp) {
        this.setState({
          hasMoreItems: true,
          currentPage: 0,
          pagesToBeLoaded: 2,
        });
      } else {
        this.setState({
          sentences: temp,
          showLoader :false,
          pageCount: this.props.fetchContent.result.count,
          currentPage: this.state.currentPage + this.state.pagesToBeLoaded,
          hasMoreItems: this.props.fetchContent.result.count > this.state.currentPage + this.state.pagesToBeLoaded ? true : false
        });
      }
     
    }
  }

  fetchData() {
    let jobId = this.props.match.params.jobid
    const apiObj = new FileContent(jobId, this.state.currentPage + 1, this.state.currentPage + this.state.pagesToBeLoaded);
    this.props.APITransport(apiObj);
    this.setState({buttonDisable: false})
  }

  handleOnMouseEnter(sentenceId, parent, pageNo) {
    this.setState({ hoveredSentence: sentenceId, hoveredTableId: "" });
  }

  handleOnMouseLeave() {
    this.setState({ hoveredSentence: "" });
  }

  handleDialog(title, dialogMessage) {
    this.setState({ openDialog: true, title, dialogMessage, openEl: false });
  }

  handleDuplicateBlock(block, blockText, page) {
    block = block.split("_")[0]

    var sen = this.state.sentences;
    var pageData = page;
    var value;
    var height;
    pageData &&
      pageData.text_blocks &&
      pageData.text_blocks.map((blockData, i) => {
        if (parseInt(block) === blockData.block_id) {
          value = i;
          height = blockData.text_top;
        }
      });
    var a = JSON.parse(JSON.stringify(pageData.text_blocks[value]));

    pageData.text_blocks.splice(value + 1, 0, a);

    let arr = [];
    var extraHeight = 0;
    pageData &&
      pageData.text_blocks &&
      pageData.text_blocks.map((blockData, i) => {
        if (i > value || blockData.text_top > height) {
          extraHeight = pageData.text_blocks[value].text_height;
          blockData.text_top = blockData.text_top + extraHeight;
        }
      });
    pageData.page_height = pageData.page_height + extraHeight;
    pageData &&
      sen.map(sentence => {
        if (sentence.page_no === pageData.text_blocks.page_no) {
          sentence = pageData;
        }
      });

    this.setState({ sentences: sen });
    this.indexCorrection();
  }

  handleDeleteTable(table, pageData) {
    let tableId = table.split("_")[0]
    let page = table.split("_")[3]
    let sourceSentence = this.state.sentences
    let targetSentence = this.state.sentences

    let height, top;
    let tableData = []
    let blockData = []

    if (pageData && Array.isArray(pageData.tables) && pageData.tables.length > 0) {
      pageData.tables.map((tab, tabInxed) => {
        if (tabInxed == tableId) {
          height = tab.text_height
          top = tab.text_top
        }
      })
    }
    let parentTable = {}
    if (sourceSentence && Array.isArray(sourceSentence) && sourceSentence.length > 0) {
      sourceSentence.map((pages, i) => {
        if (page == pages.page_no) {
          if (pages && pages.tables && Array.isArray(pages.tables) && pages.tables.length > 0) {
            pages.tables.map((tables, tabIndex) => {
              if (tableId != tabIndex) {
                if (tables.text_top < top) {
                  tableData.push(tables)
                } else if (tables.text_top == top) {

                } else {
                  if (tables && tables.children && Array.isArray(tables.children) && tables.children.length > 0) {
                    tables.children.map((children, i) => {

                      children.text_top = parseInt(children.text_top) - parseInt(height)
                      return children
                    })
                    tableData.push(tables)
                  }
                }
              } else {
                return false
              }
            })
            parentTable = tableData
          }

          if (pages && pages.text_blocks && Array.isArray(pages.text_blocks) && pages.text_blocks.length > 0) {
            pages.text_blocks.map((blocks, tabIndex) => {
              if (blocks.text_top > top) {
                blocks.text_top = blocks.text_top - height
                blockData.push(blocks)
              } else {
                blockData.push(blocks)
              }
            })
          }
        }
      })

      if (targetSentence && Array.isArray(targetSentence) && targetSentence.length > 0) {
        targetSentence.map(sen => {
          if (sen.page_no == page) {

            if (parentTable && parentTable.length > 0) {
              sen.tables = parentTable
            } else {
              sen.tables = null
            }

            if (blockData && blockData.length > 0) {
              sen.text_blocks = blockData
            } else {
              sen.text_blocks = null
            }
          }
        })
      }
      this.setState({ sentences: targetSentence })
    }
  }

  handleDuplicateTable(table, pageData) {
    let tableId = table.split("_")[0]
    let page = table.split("_")[3]
    let sourceSentence = this.state.sentences
    let targetSentence = this.state.sentences

    let height, top;
    let tableData = []
    let blockData = []
    let newTable

    if (pageData && Array.isArray(pageData.tables) && pageData.tables.length > 0) {
      pageData.tables.map((tab, tabInxed) => {
        if (tabInxed == tableId) {
          height = tab.text_height
          top = tab.text_top
        }
      })
    }
    let parentTable = {}
    if (sourceSentence && Array.isArray(sourceSentence) && sourceSentence.length > 0) {
      sourceSentence.map((pages, i) => {
        if (page == pages.page_no) {
          if (pages && pages.tables && Array.isArray(pages.tables) && pages.tables.length > 0) {
            pages.tables.map((tables, tabIndex) => {
              if (tables.text_top < top || tables.text_top == top) {
                tableData.push(tables)
                if (tables.text_top == top) {
                  // newTable.text_top = top + height

                  // tables && tables.children && Array.isArray(tables.children) && tables.children.length > 0 && tables.children.map((cell, cellIndex) => {
                  //   cell.text_top = cell.text_top + height
                  //   return cell
                  // })
                  // tableData.push(tables)
                  let cell = []
                  let table = pageData.tables[tableId]
                  for (i = 0; i < pageData.tables[tableId].children.length; i++) {
                    let cellData = pageData.tables[tableId].children[i]
                    cellData.text_top = cellData.text_top + height

                    cell.push(cellData)
                  }
                  table.children = cell
                  tableData.push(table)
                }

              } else {
                if (tables && tables.children && Array.isArray(tables.children) && tables.children.length > 0) {
                  tables.children.map((children, i) => {

                    children.text_top = parseInt(children.text_top) + parseInt(height)
                    return children
                  })
                  tableData.push(tables)
                }
              }

            })
            parentTable = tableData
          }

          if (pages && pages.text_blocks && Array.isArray(pages.text_blocks) && pages.text_blocks.length > 0) {
            pages.text_blocks.map((blocks, tabIndex) => {
              if (blocks.text_top > top) {
                blocks.text_top = blocks.text_top + height
                blockData.push(blocks)
              } else {
                blockData.push(blocks)
              }
            })
          }
        }
      })

      if (targetSentence && Array.isArray(targetSentence) && targetSentence.length > 0) {
        targetSentence.map(sen => {
          if (sen.page_no == page) {
            let pageHeight = sen.page_height
            sen.page_height = pageHeight + height
            if (parentTable && parentTable.length > 0) {
              sen.tables = parentTable
            } else {
              sen.tables = null
            }

            if (blockData && blockData.length > 0) {
              sen.text_blocks = blockData
            } else {
              sen.text_blocks = null
            }
          }
        })
      }
      this.setState({ sentences: targetSentence })
    }
  }

  handleDeleteBlock(block, blockText, pageData, type) {
    block = block.split("_")[0]
    let blocks = [];
    let height, top;

    pageData &&
      pageData.text_blocks &&
      pageData.text_blocks.map(data => {
        if (data.block_id == block) {
          height = data.text_height;
          top = data.text_top;
        }
      });

    pageData &&
      pageData.text_blocks &&
      pageData.text_blocks.map((blockData, i) => {
        if (blockData.block_id == block) {
          delete pageData.text_blocks[i];
        } else {

          if (blockData.block_id > block || blockData.text_top > top) {
            let blockTop = blockData.text_top - height;

            blockData.text_top = blockTop;
            blocks.push(blockData);

          } else {
            blocks.push(blockData);
          }
        }
      });

    let parentTable = {}
    let tableData = []

    pageData &&
      pageData.tables &&
      pageData.tables.map((tables, i) => {
        if (tables && tables.children && Array.isArray(tables.children) && tables.children.length > 0) {
          if (tables.children[0].text_top < top && pageData.text_top < top) {
            tableData.push(tables)
          } else {
            tables.children.map((children, i) => {
              children.text_top = parseInt(children.text_top) - parseInt(height)
              return children

            })
            tableData.push(tables)
          }
        }
      });
    parentTable = tableData


    pageData.page_height = pageData.page_height - height;
    this.indexCorrection();

    let res = [];
    if (this.state.sentences && Array.isArray(this.state.sentences) && this.state.sentences.length > 0) {
      this.state.sentences.map((sentence, index) => {
        if (sentence.page_no === pageData.page_no) {
          sentence.text_blocks = blocks;
          sentence.tables = parentTable
          res.push(sentence);
        } else {
          res.push(sentence);
        }
      });
    }
    this.setState({ sentences: res });
  }
  handleCreateBlock(block, page) {
    let blockId = block.split("_")[0]
    let pageNO = block.split("_")[1]

    var sen = this.state.sentences;
    var pageData = page;
    var value, height;
    let selectedSourceText = ""
    let id = parseInt(blockId) + 1
    pageData &&
      pageData.text_blocks &&
      pageData.text_blocks.map((blockData, i) => {
        selectedSourceText = blockData.text
        if (parseInt(blockId) === blockData.block_id) {
          value = i;
          height = blockData.text_top;
        }
      });
    var a = JSON.parse(JSON.stringify(pageData.text_blocks[value]));
    a.text = null
    a.text_top = a.text_top + pageData.text_blocks[value].text_height
    a.text_height = 30;
    a.children = null;
    pageData.text_blocks.splice(value + 1, 0, a);
    let arr = [];

    var extraHeight = 0;
    pageData &&
      pageData.text_blocks &&
      pageData.text_blocks.map((blockData, i) => {
        if ((i > value || blockData.text_top > height) && blockData.text) {
          extraHeight = pageData.text_blocks[value].text_height;
          blockData.text_top = blockData.text_top + 30;
        }
      });

    // pageData &&
    //   pageData.tables &&
    //   pageData.tables.map((tables, i) => {
    //     if ((i > value || tables.text_top > height) && tables.text) {
    //       extraHeight = pageData.text_blocks[value].text_height;
    //       tables.text_top = tables.text_top + 30;
    //     }
    //   });
    pageData.page_height = pageData.page_height + 30;
    pageData &&
      sen.map(sentence => {
        if (sentence.page_no === pageData.text_blocks.page_no) {
          sentence = pageData;
        }
      });
    this.setState({ sentences: sen, selectedSourceText: "", selectedBlockId: id + "_" + pageNO, isEditable: true, height: 30 });
    this.indexCorrection();

  }

  handleEditor(value) {
    ((this.state.selectedBlockId && value && this.state.selectedBlockId !== value) || this.state.clear) && this.setState({ selectedBlockId: null, clear: false })
  }

  handleDialogSave(selection, operation_type, pageDetails) {
    let startNodeId = selection.startNode.split("_")[0]
    let endNodeId = selection.endNode.split("_")[0]
    
    if(parseInt(startNodeId) > parseInt(endNodeId)){
      endNodeId = selection.startNode.split("_")[0]
      startNodeId = selection.endNode.split("_")[0];
    }
    let index, width;
    
    if (operation_type === "merge") {

      
      var sentenceObj = pageDetails.text_blocks;
      sentenceObj.map((sentence, i) => {
        
        if(sentence.block_id == startNodeId){
           index = i;
           width = sentence.text_width;
        }
       
        if (index && sentence.block_id >= startNodeId && sentence.block_id <= endNodeId ) {
          if (width >= sentence.text_width && i!= index) {
            // sentenceObj[index].text_top = sentence.text_top;
            // sentenceObj[i + 1].text_height = sentenceObj[i + 1].text_height + sentence.text_height;
            sentenceObj[index].text = sentenceObj[index].text+ sentence.text;
            sentenceObj[index].text_height = sentenceObj[index].text_height + sentence.text_height;
            sentence.children &&Array.prototype.push.apply(sentenceObj[index].children,sentence.children); 
            
            index !== i && delete sentenceObj[i];
          } 
          else if(i!= index){
            sentence.text_top = sentenceObj[index].text_top
            sentence.text = sentenceObj[index].text + sentence.text
            sentence.children &&Array.prototype.push.apply(sentence.children, sentenceObj[index].children); 
            sentence.text_height = sentenceObj[index].text_height + sentence.text_height
            delete sentenceObj[index];
            width = sentence.text_width;
            index = i;
            
          }
        }
      });
    }
    var sen = this.state.sentences;

    pageDetails &&
      sen.map(sentence => {
        if (sentence.page_no === pageDetails.page_no) {
          sentence.text_blocks = sentenceObj;
        }
      });

    this.setState({ sentences: sen });
    this.indexCorrection();
    this.handleEditor()
  }

  indexCorrection = () => {
    var sentenceObj = [...this.state.sentences];
    sentenceObj.map(sentence => {
      var sen = sentence.text_blocks.filter(val => val)
      sen.map((value, index) => {

        sen[index].block_id = index;

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
      this.setState({ selectedCell: selectedBlock })
    } else {
      this.setState({ selectedSourceText: selectedBlock.text })
    }
  }

  handleSourceChange = (block, evt, blockValue) => {

    this.setState({ selectedSourceText: evt.target.value, height: evt.currentTarget.offsetHeight });
    if (this.state.height !== 0 && this.state.height !== evt.currentTarget.offsetHeight) {
      this.handleCheck(block, evt, true)
    }
    else if (this.state.height === 0 && evt.currentTarget.offsetHeight - blockValue.text_height > 0) {
      this.handleCheck(block, evt, true, evt.currentTarget.offsetHeight - blockValue.text_height)
    }
  };
  handleCheck(block, evt, checkValue, diffValue) {

    let blockId = block.split("_")[0]
    let pageNo = block.split("_")[1]
    let blockTop, blockHeight, valueH = 0;
    let docPage = this.state.sentences;
    let strText = htmlToText.fromString(this.state.selectedSourceText);

    if (docPage && Array.isArray(docPage) && docPage.length > 0) {
      docPage.map((page, index) => {
        if (page.page_no == pageNo) {
          if (page.text_blocks && Array.isArray(page.text_blocks) && page.text_blocks.length > 0) {


            page.text_blocks.map((block, i) => {
              if (block.block_id == blockId) {
                console.log(block)
                blockTop = block.text_top;
                blockHeight = block.text_height;
                block.text = strText;
              }
            })

            page.text_blocks.map((block, i) => {
              console.log(blockTop, block.text_top)
              if (block.text_top > blockTop) {
                if (this.state.height !== 0 && this.state.height !== evt.currentTarget.offsetHeight) {
                  valueH = - this.state.height + evt.currentTarget.offsetHeight;
                  block.text_top = block.text_top - this.state.height + evt.currentTarget.offsetHeight
                }
                else if (diffValue) {

                  block.text_top = block.text_top + diffValue;
                }
                // if(this.state.height ===0 && evt.currentTarget.offsetHeight - block.text_height> 5){
                //   block.text_height=  block.text_height + evt.currentTarget.offsetHeight - block.text_height - 3

                // }
              }
            })
            if ((this.state.height !== 0 && this.state.height !== evt.currentTarget.offsetHeight) || diffValue) {

              page.page_height = page.page_height + valueH;
              valueH = 0;
            }

          }
        }
      })
    }
    !checkValue && this.setState({ selectedBlockId: null, clear: false })

    this.setState({ sentences: docPage, height: checkValue ? evt.currentTarget.offsetHeight : 0, clear: true })

  };

  handleCompareDocs() {
    this.setState({ showCompareDocs: true })
  }


  handleCompareDocClose() {
    this.setState({ showCompareDocs: false })
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
    if(this.state.pageNo !== pageNo) {
      this.setState({ pageNo: parseInt(pageNo), scrollToPage: pageNo })
    }
  }

  handleTableHover(id) {
    this.setState({ hoveredTableId: id, hoveredSentence: "" })
  }

  handlePopUp() {
    this.setState({ popOver: true })
  }

  handleBackToTop() {
    this.setState({ scrollToPage: 1, scrollToTop: true })
  }

  handleScroll() {
    this.setState({ scrollToTop: false })
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
    // width: this.state.sentences && rightPaddingValue-leftPaddingValue+20+ "px",
    let paperWidth = this.state.sentences && this.state.sentences[0].page_width - leftPaddingValue - 78 + "px";

    if (!this.state.showCompareDocs) {
      return (
        <div style={{ dislay: "flex", flexDirection: "row" }}>
          {this.state.showLoader &&< Spinner/>}
          <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "right", marginRight: "25px", marginBottom: "15px" }}>
            <div style={{ position: "fixed" }}>
              <Button variant="extended" color="primary" style={{ textTransform: "capitalize", fontSize: '100%', fontWeight: 'bold' }} onClick={() => this.handleCompareDocs()}>
                Compare with Original
            </Button>
              <Button variant="extended" color="primary" style={{ textTransform: "capitalize", fontSize: '100%', fontWeight: 'bold', marginLeft: "10px" }} onClick={() => this.handleOnClose()}>
                <CloseIcon />{" "}&nbsp;&nbsp;{translate('common.page.label.close')}
              </Button>
            </div>
            <Button
              variant="extendedFab"
              color="primary"
              onClick={() => this.handleBackToTop()}
              style={{ position: "fixed", bottom: "10px" }}
              disabled={this.state.buttonDisable}
            >
              <Arrow />
            </Button>
          </div>

          <div style={{ marginLeft: "auto", marginRight: "auto" }} onClick={() => this.handleEditor()}>
            <InfiniteScroll
              next={this.fetchData.bind(this)}
              hasMore={this.state.hasMoreItems}
              dataLength={this.state.sentences ? this.state.sentences.length : 0}
              // loader={
              //   <p style={{ textAlign: 'center' }}>
              //     {/* <b>Loading...</b> */}
              //     <CircularProgress size={20} style={{
              //       zIndex: 1000,
              //     }} />

              //   </p>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>You have seen it all</b>
                </p>
              }
              style={{ overflow: "hidden" }}
              onScroll={() => this.handleScroll()}
            >
              {this.state.sentences &&
                this.state.sentences.map((sentence, index) => {
                  return (
                    <div id={sentence.page_no} key={sentence.page_no}>
                      <SourceView
                        isPreview={false}
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
                        handleOnMouseEnter={this.handleOnMouseEnter.bind(this)}
                        handleDialogSave={this.handleDialogSave.bind(this)}
                        handleDuplicateBlock={this.handleDuplicateBlock.bind(this)}
                        handleDeleteBlock={this.handleDeleteBlock.bind(this)}
                        handleCreateBlock={this.handleCreateBlock.bind(this)}
                        handleSourceChange={this.handleSourceChange.bind(this)}
                        handleEditor={this.handleEditor.bind(this)}
                        handleCheck={this.handleCheck.bind(this)}
                        handleSource={this.handleSource.bind(this)}
                        handleTableHover={this.handleTableHover.bind(this)}
                        handlePopUp={this.handlePopUp.bind(this)}
                        handleDeleteTable={this.handleDeleteTable.bind(this)}
                        handleDuplicateTable={this.handleDuplicateTable.bind(this)}
                      />
                    </div>
                  );

                })}
            </InfiniteScroll>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          
          <Grid container spacing={8} style={{ padding: "0 24px 12px 24px" }}>

            <Grid item xs={12} sm={6} lg={6} xl={6} style={{ padding: "8px" }}>
              <Paper>
                <PdfPreview data={this.state.fileId}
                  pageNo={this.state.pageNo}
                  numPages={this.state.numPages}
                  zoom={this.state.zoom}
                  handlePageChange={this.handlePageChange.bind(this)}
                  onDocumentLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
                  fileDetails={this.state.fileDetails}
                  handleChange={this.handleZoomChange.bind(this)}
                  handleClick={this.handleCompareDocClose.bind(this)}
                ></PdfPreview>

              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={6} xl={6} style={{ padding: "8px" }}>
              <Paper id="scrollableDiv" style={{ overflow: "scroll", maxHeight: window.innerHeight - 100 }}>
                <Toolbar style={{ color: darkBlack, background: blueGrey50 }}>
                  Source
                </Toolbar>
                <div>
                  <InfiniteScroll
                    next={this.fetchData.bind(this)}
                    hasMore={this.state.hasMoreItems}
                    dataLength={this.state.sentences ? this.state.sentences.length : 0}
                      loader={
                        this.state.showLoader && <p style={{ textAlign: 'center' }}>
                        {/* <b>Loading...</b> */}
                        <CircularProgress size={20} style={{
                          zIndex: 1000,
                        }} />

                      </p>}
                    endMessage={
                      <p style={{ textAlign: 'center' }}>
                        <b>You have seen it all</b>
                      </p>
                    }
                    style={{ overflow: "hidden" }}
                    scrollableTarget="scrollableDiv"
                    onScroll={() => this.handleScroll()}
                  >
                    {this.state.sentences &&
                      this.state.sentences.map((sentence, index) => {

                        return (
                          <div>
                            <SourceView
                              isPreview={true}
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
                              scrollToPage={this.state.scrollToPage}
                              selectedCell={this.state.selectedCell}
                              handleOnMouseEnter={this.handleOnMouseEnter.bind(this)}
                              handleDialogSave={this.handleDialogSave.bind(this)}
                              handleDuplicateBlock={this.handleDuplicateBlock.bind(this)}
                              handleDeleteBlock={this.handleDeleteBlock.bind(this)}
                              handleCreateBlock={this.handleCreateBlock.bind(this)}
                              handleSourceChange={this.handleSourceChange.bind(this)}
                              handleEditor={this.handleEditor.bind(this)}
                              handleCheck={this.handleCheck.bind(this)}
                              handleSource={this.handleSource.bind(this)}
                              handlePreviewPageChange={this.handlePreviewPageChange.bind(this)}
                              handleTableHover={this.handleTableHover.bind(this)}
                              handlePopUp={this.handlePopUp.bind(this)}
                              handleDeleteTable={this.handleDeleteTable.bind(this)}
                              handleDuplicateTable={this.handleDuplicateTable.bind(this)}
                            />
                          </div>
                        );

                      })}
                  </InfiniteScroll>
                </div>
               
              </Paper>
            </Grid>
          </Grid>
          
        </div>
      )
      
    }
    
  }
}

const mapStateToProps = state => ({
  fetchPdfSentence: state.fetchPdfSentence,
  fileUpload: state.fileUpload,
  documentDetails: state.documentDetails,
  fetchContent: state.fetchContent
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
