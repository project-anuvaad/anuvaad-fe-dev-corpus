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
import PdfUploadStyles from "../../../styles/web/PdfUploadStyles";

import ConfigUpload from "../../../../flux/actions/apis/configupload";

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

      const apiObj = new ConfigUpload(this.state.files[0], "configUplaod");
      APITransport(apiObj);
    } else {
      alert("Field should not be empty!");
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.configUplaod !== this.props.configUplaod) {
      
      history.push(`${process.env.PUBLIC_URL}/interactive-document/${this.props.configUplaod.configUplaod}`);
    }
    if (prevProps.fileUpload !== this.props.fileUpload) {
      //   history.push(`${process.env.PUBLIC_URL}/interactive-editor`);
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
    if (files.length > 0) {
      this.setState({
        files,
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
                acceptedFiles={[".pdf"]}
                dropZoneClass={classes.dropZoneArea}
                onChange={this.handleChange.bind(this)}
                filesLimit={1}
                maxFileSize={20000000}
                dropzoneText={translate("common.page.label.addDropFile")}
                onDelete={this.handleDelete.bind(this)}
              />
            </Grid>

            <Grid item xs={12} sm={12} lg={12} xl={12}>
              {/* <Grid container spacing={24} className={classes.grid}> */}
                <Button variant="contained" color="primary" className={classes.button} size="large" onClick={this.handleSubmit.bind(this)}>
                  {translate("common.page.button.upload")}
                </Button>
              </Grid>
            {/* </Grid> */}
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
  configUplaod: state.configUplaod
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(withStyles(PdfUploadStyles)(connect(mapStateToProps, mapDispatchToProps)(PdfUpload)));
