import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";

import history from "../../../../web.history";
import Snackbar from "../../../components/web/common/Snackbar";
import { translate } from "../../../../assets/localisation";
import FileUploadStyles from "../../../styles/web/FileUpload";
import WorkFlow from "../../../../flux/actions/apis/fileupload";
import DocumentUpload from "../../../../flux/actions/apis/document_upload";

class PdfUpload extends Component {
  constructor() {
    super();
    this.state = {
      source: "",
      target: "",
      files: [],
      open: false,
      modelLanguage: [],
      name: "",
      message: "File uplaoded successfully",
      showComponent: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { APITransport } = this.props;
    if (this.state.files.length > 0) {
      const { APITransport } = this.props;

      const apiObj = new DocumentUpload(this.state.files, "docUplaod");
      APITransport(apiObj);
    } else {
      alert("Field should not be empty!");
    }
  }
  handleBack = () => {

    history.push(`${process.env.PUBLIC_URL}/view-document`)



  }

  componentDidUpdate(prevProps) {
    if (prevProps.documentUplaod !== this.props.documentUplaod) {
      console.log(this.props.documentUplaod)
      const { APITransport } = this.props;
      let path = this.state.fileName.split('.')
      const apiObj = new WorkFlow(this.props.documentUplaod.data,this.state.fileName, path[path.length-1] );
      APITransport(apiObj);
      // history.push(`${process.env.PUBLIC_URL}/interactive-document/${this.props.configUplaod.configUplaod}`);
    }
    if (prevProps.workflowStatus !== this.props.workflowStatus) {
      console.log("workflow",this.props.workflowStatus.status==="STARTED")
      history.push(`${process.env.PUBLIC_URL}/view-document`);
    }
  }

  readFileDataAsBinary(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = event => {
        resolve(event.target.result);
      };

      reader.onerror = err => {
        reject(err);
      };

      reader.readAsBinaryString(file);
    });
  }

  handleDelete = () => {
    this.setState({
      files: []
    });
  };

  handleChange = files => {
    console.log(files[0])
    if (files.length > 0) {
      this.setState({
        files,
        fileName:files[0].name,
        workspaceName: this.state.workspaceName ? this.state.workspaceName : files[0].name.slice(0, -4)
      });
    } else {
      this.setState({
        files,
        workspaceName: ""
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.div}>
        <Typography value="" variant="h4" className={classes.typographyHeader}>
          {translate("common.page.label.uploadFile")}
        </Typography>
        <br />
        <Typography className={classes.typographySubHeader}>{translate("pdf_upload.page.label.uploadMessage")}</Typography>
        <br />
        <Paper className={classes.paper}>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <DropzoneArea
                className={classes.DropZoneArea}
                showPreviewsInDropzone
                dropZoneClass={classes.dropZoneArea}
                acceptedFiles={[".txt,audio/*,.ods,.pptx,image/*,.psd,.pdf,.xlsm,.xltx,.xltm,.xla,.xltm,.docx,.rtf",".txt",".pdf",".doc",".ppt",".excel",".xlsx",".xls",".log",".xlsb"]}
                onChange={this.handleChange.bind(this)}
                filesLimit={1}
                maxFileSize={200000000000}
                dropzoneText={translate("common.page.label.addDropDocument")}
                onDelete={this.handleDelete.bind(this)}
              />
            </Grid>
            
            <Grid item xs={6} sm={6} lg={6} xl={6}>
              <Button variant="contained" color="primary" className={classes.button1} size="large" onClick={this.handleBack.bind(this)}>
                {translate("common.page.button.back")}
              </Button>
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6}>

              <Button variant="contained" color="primary" className={classes.button1} size="large" onClick={this.handleSubmit.bind(this)}>
                {translate("common.page.button.upload")}
              </Button>
            </Grid>

          </Grid>


          {this.state.open && (
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
              variant="success"
              message={this.state.message}
            />
          )}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fileUpload: state.fileUpload,
  configUplaod: state.configUplaod,
  workflowStatus: state.workflowStatus,
  documentUplaod : state.documentUplaod
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(withStyles(FileUploadStyles)(connect(mapStateToProps, mapDispatchToProps)(PdfUpload)));
