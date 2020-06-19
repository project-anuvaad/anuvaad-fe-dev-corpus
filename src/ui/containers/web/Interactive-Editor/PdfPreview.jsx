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
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
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

  onPageLoad = page => {
    console.log(page, this.props.zoom);
    const parentDiv = document.querySelector("#pdfDocument");

    let pageScale = parentDiv.clientHeight / page.originalHeight;

    let pageScaleWidth = parentDiv.clientWidth / page.originalWidth;

    // let pageScale = parentDiv.clientWidth / page.originalWidth
    if (this.state.scale !== pageScale) {
      this.setState({ scale: pageScale, pageScaleWidth });
    }
  };

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
            <Typography value="" variant="h6" gutterBottom style={{ width: "100%", flex: 1, marginLeft: "3%" }}>
              {translate("intractive_translate.page.preview.originalPDF")}
            </Typography>
          </Grid>
          <Grid item xs={7} sm={6} lg={6} xl={6}>
            {numPages && (
              <Grid container spacing={8} style={{ marginLeft: "25%" }}>
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
          <Grid item xs={1} sm={1} lg={1} xl={1}>
            {this.props.zoom ? (
              <Button
                color="primary"
                disabled={numPages <= pageNo}
                onClick={event => {
                  this.props.handleChange();
                }}
                style={{ fontWeight: "bold", width: "100%" }}
              >
                <ZoomOutIcon size="Large" />
              </Button>
            ) : (
                <Button
                  color="primary"
                  disabled={numPages <= pageNo}
                  onClick={event => {
                    this.props.handleChange();
                  }}
                  style={{ fontWeight: "bold", width: "100%" }}
                >
                  <ZoomInIcon size="Large" />
                </Button>
              )}
          </Grid>
          <Grid item xs={1} sm={12} lg={2} xl={2}>
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
        {console.log("sajish")}
        <div style={{ marginLeft: !this.props.zoom && '10%', marginBottom: "0px", maxHeight: window.innerHeight - 180, overflowY: "auto" }} id="pdfDocument">
          <Document file={url} onLoadSuccess={this.props.onDocumentLoadSuccess} style={{ align: "center" }}>
            <Page scale={!this.props.zoom ? this.state.scale : this.state.pageScaleWidth} pageNumber={pageNo} onLoadSuccess={this.onPageLoad} />
          </Document>
        </div>
      </Paper>
    );
  }
}

export default PdfPreview;
