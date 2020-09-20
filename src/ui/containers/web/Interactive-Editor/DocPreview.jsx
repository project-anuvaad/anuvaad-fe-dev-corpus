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
        <div>
    {/* //   <Paper elevation={2} style={{ height: "98%", paddingBottom: "10px" }}> */}
        <Toolbar style={{ color: darkBlack, background: blueGrey50 }}>
          <Grid item xs={3} sm={3} lg={3} xl={3}>
            <Typography value="" variant="h6" gutterBottom style={{ width: "100%", flex: 1, color: '#1C9AB7' }}>
              {translate("intractive_translate.page.preview.originalPDF")}
            </Typography>
          </Grid>
          
        </Toolbar>
        <div style={{ maxHeight: window.innerHeight - 240, overflowY: "auto", display: "flex", flexDirection: "row", justifyContent: "center" }} id="pdfDocument">
          <Document file={url} onLoadSuccess={this.props.onDocumentLoadSuccess} style={{ align: "center",  display: "flex", flexDirection: "row", justifyContent: "center" }}>
                  
          
           <Page scale={this.state.pageScaleWidth} pageNumber={Number(this.props.pageNo) } onLoadSuccess={this.onPageLoad} />
           <Page scale={this.state.pageScaleWidth} pageNumber={Number(this.props.pageNo +1) } onLoadSuccess={this.onPageLoad} />
        
            
          </Document>
        </div>
      {/* </Paper> */}
      </div>
    );
  }
}



export default PdfPreview;