import "regenerator-runtime/runtime";
import "core-js-pure/stable";
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
import TextField from "@material-ui/core/TextField";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import PdfFileUpload from "../../../flux/actions/apis/pdffileupload";
import history from "../../../web.history";
import Snackbar from "../../components/web/common/Snackbar";
import { translate } from "../../../assets/localisation";

const styles = theme => ({
  paper: {
    margin: "30%",
    width: "40%",
    minWidth: "20%",
    marginTop: "5%",
    padding: "2%",
    marginLeft: "22%"
  },
  typography: {
    textAlign: "center",
    minWidth: "10%"
  },
  button: {
    marginTop: "4%",
    marginLeft: "20%",
    width: "60%"
  }
});

class PdfUpload extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      open: false,
      name: "",
      message: "File uplaoded successfully",
      showComponent: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { APITransport } = this.props;
    console.log("---files", this.state.files.length);
    if (this.state.files.length > 0 && this.state.name) {
      const apiObj = new PdfFileUpload(this.state.name, this.state.files[0]);
      APITransport(apiObj);
    } else {
      alert("Field should not be empty!");
    }
  }

  renderApi(val) {
    // const { APITransport } = this.props;
    // console.log(this.state.filesPath)
    // const apiObj = new PdfFileUpload(
    //   "test",
    //   val
    // );
    // APITransport(apiObj);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.uploadpdf !== this.props.uploadpdf) {
      this.setState({ filesPath: this.props.uploadpdf, open: true });

      setTimeout(() => {
        history.push(`${process.env.PUBLIC_URL}/view-pdf`);
      }, 2000);
    }
  }

  readFileDataAsBinary(file) {
    console.log(file);
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

  handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleChange = files => {
    if (files.length > 0) {
      this.setState({
        files
      });
    }
  };

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Grid container spacing={24} style={{ padding: 24 }}>
          <Grid item xs={12} sm={12} lg={12} xl={12}>
            <Typography value="" variant="h4" className={this.props.classes.typography}>
              Upload File
            </Typography>
            <br />
            <br />
          </Grid>
          <Grid container spacing={24} style={{ marginLeft: "12%" }}>
            <Grid item xs={5} sm={5} lg={5} xl={5}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "85%", paddingTop: "30px", paddingBottom: "30px" }}>
                Enter file name :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6}>
              <TextField
                value={this.state.workspaceName}
                required
                id="outlined-name"
                margin="normal"
                onChange={event => {
                  this.handleTextChange("name", event);
                }}
                variant="outlined"
                style={{ width: "60%" }}
              />
            </Grid>
          </Grid>
          <DropzoneArea
            showPreviewsInDropzone
            acceptedFiles={[".pdf"]}
            onChange={this.handleChange.bind(this)}
            filesLimit={1}
            dropzoneText="Drag and drop a pdf file here or click"
            onDelete={this.handleDelete.bind(this)}
          />
          <Button variant="contained" color="primary" className={this.props.classes.button} size="large" onClick={this.handleSubmit.bind(this)}>
            SUBMIT
          </Button>
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
    );
  }
}

const mapStateToProps = state => ({
  uploadpdf: state.uploadpdf
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PdfUpload)));
