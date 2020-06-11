import React from "react";
import Grid from "@material-ui/core/Grid";
import "../../../styles/web/InteractivePreview.css";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import CloseIcon from "@material-ui/icons/Close";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Toolbar from "@material-ui/core/Toolbar";
import { translate } from "../../../../assets/localisation";

class PdfPreview extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      sentences: "",
      sourceSupScripts: "",
      targetSupScripts: "",
      header: "",
      scale: 1.0
    };
  }

  onPageLoad = (page) => {
    const parentDiv = document.querySelector('#pdfDocument')
    console.log(parentDiv)
    // let pageScale = parentDiv.clientHeight / page.originalHeight
    let pageScale = parentDiv.clientWidth / page.originalWidth
    console.log(this.state.header, pageScale)
    if (this.state.scale !== pageScale) {
      this.setState({ scale: pageScale });
    }
  }

  render() {
    const { pageNo, fileDetails, numPages } = this.props;
    const url =
      fileDetails &&
      fileDetails.download_source_path &&
      `${process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "https://auth.anuvaad.org"}/anuvaad/v1/download?file=${
      fileDetails.download_source_path ? fileDetails.download_source_path : ""
      }`;
    return (
      <Paper elevation={2} style={{ height: "98%", paddingBottom: "10px" }}>
        <Toolbar style={{ color: darkBlack, background: blueGrey50 }}>
          <Grid item xs={4} sm={3} lg={3} xl={3}>
            <Typography value="" variant="h6" gutterBottom style={{ width: '100%', flex: 1, marginLeft: "3%" }}>
              {translate("intractive_translate.page.preview.originalPDF")}
            </Typography>
          </Grid>
          <Grid item xs={7} sm={6} lg={6} xl={6}>
            {numPages && (
              <Grid container spacing={8} style={{ marginLeft: '25%' }}>
                <Grid item xs={4} sm={3} lg={2} xl={2}>
                  <Button
                    style={{ fontWeight: "bold", width: "100%" }}
                    color="primary"
                    disabled={pageNo <= 1}
                    onClick={event => {
                      this.props.handlePageChange(-1);
                    }}
                  >
                    {" "}
                    <ChevronLeftIcon size="large" />
                  </Button>
                </Grid>
                <Grid item xs={4} sm={3} lg={3} xl={3}>
                  <Button style={{ fontWeight: "bold", width: "100%", pointerEvents: "none" }} color="primary">
                    {`${pageNo} / ${numPages}`}
                  </Button>
                </Grid>

                <Grid item xs={4} sm={3} lg={1} xl={1}>
                  <Button
                    color="primary"
                    disabled={numPages <= pageNo}
                    onClick={event => {
                      this.props.handlePageChange(1);
                    }}
                    style={{ fontWeight: "bold", width: "100%" }}
                  >
                    <ChevronRightIcon size="large" />{" "}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={1} sm={1} lg={1} xl={1}></Grid>
          <Grid item xs={1} sm={1} lg={1} xl={1}>
            <Toolbar
              onClick={event => {
                this.props.handleClick(false, 4);
              }}
            >

              <CloseIcon style={{ cursor: "pointer" }} color="primary" />
              <Typography value="" variant="subtitle2" color="primary" style={{ cursor: "pointer" }}>
                {translate("common.page.label.close")}
            </Typography>
            </Toolbar>
          </Grid>
        </Toolbar>
        {console.log(window.innerHeight)}
        <div style={{ marginBottom: '0px', maxHeight: window.innerHeight - 180, overflowY: "auto" }} id="pdfDocument">
          {console.log(this.state.scale)}
          <Document file={url} onLoadSuccess={this.props.onDocumentLoadSuccess}>
            <Page onLoadSuccess={this.onPageLoad}
              scale={this.state.scale} pageNumber={pageNo} onLoadSuccess={this.onPageLoad} />
          </Document>


        </div>
      </Paper>
    );
  }
}


export default (PdfPreview);
