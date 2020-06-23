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
import APITransport from "../../../flux/actions/apitransport/apitransport";
import PdfFileUpload from "../../../flux/actions/apis/pdftodoc";
import Snackbar from "../../components/web/common/Snackbar";
import { translate } from "../../../assets/localisation";

const styles = theme => ({
  paper: {
    width: "40%",
    minWidth: "20%",
    marginTop: "7%",
    padding: "2.5% 2.5% 3% 2.5%",
    marginLeft: "22%",
    marginBottom:'12%'
  },
  typography: {
    textAlign: "center",
    minWidth: "10%",
    color:'#233466'
  },
  button: {
    marginTop: "6%",
    marginLeft: "9.5%",
    width: "80%",
    backgroundColor:"#1C9AB7",
    color:"#FFFFFF",
    borderRadius:"20px 20px 20px 20px",
    height:'45px'
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
    if (this.state.files.length > 0) {
      const apiObj = new PdfFileUpload(this.state.files[0]);
      APITransport(apiObj);
    } else {
      alert("Field should not be empty!");
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.docpath !== this.props.docpath) {
      this.setState({ filesPath: this.props.docpath, open: true });
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
      files: [],
      filesPath: null
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
              {translate("common.page.label.uploadFile")}
            </Typography>
            <br />
            <br />
          </Grid>
          <DropzoneArea
            showPreviewsInDropzone
            acceptedFiles={[".pdf"]}
            onChange={this.handleChange.bind(this)}
            filesLimit={1}
            maxFileSize={20000000}
            dropzoneText={translate("common.page.label.addDropFile")}
            onDelete={this.handleDelete.bind(this)}
          
          />
          {this.state.filesPath && (
            <Grid container spacing={8}>
              <Grid item xs={12} sm={12} lg={12} xl={12}>
                <a
                  href={`${process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "http://auth.anuvaad.org"}/download/${
                    this.state.filesPath
                  }`}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained"  className={this.props.classes.button} size="large">
                    {translate("common.page.button.download&View")}
                  </Button>
                </a>
              </Grid>
            </Grid>
          )}
          <Button variant="contained"  className={this.props.classes.button} size="large" onClick={this.handleSubmit.bind(this)}>
            {translate("common.page.button.submit")}
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
  docpath: state.docpath
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
