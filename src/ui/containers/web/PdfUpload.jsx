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
import Select from "../../components/web/common/SimpleSelect";
import FetchLanguage from "../../../flux/actions/apis/fetchlanguage";
import FetchModel from "../../../flux/actions/apis/fetchmodel";


const styles = theme => ({
  paper: {
    width: "40%",
    minWidth: "20%",
    marginTop: "2%",
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
      source: "",
      target: "",
      files: [],
      open: false,
      name: "",
      message: "File uplaoded successfully",
      showComponent: false
    };
  }

  handleSubmit(e) {
    let model = "";
    if (this.state.modelLanguage) {
      this.state.modelLanguage.map(item =>
        item.target_language_code === this.state.target.language_code &&
        item.source_language_code === this.state.source.language_code &&
        item.is_primary
          ? (model = item)
          : ""
      );
      e.preventDefault();
      const { APITransport } = this.props;
      console.log(this.state.source, this.state.target, model);
      if (this.state.files.length > 0 && this.state.name) {
        const apiObj = new PdfFileUpload(
          this.state.name,
          this.state.files[0],
          this.state.source.language_name,
          this.state.target.language_name,
          model
        );
        APITransport(apiObj);
      } else {
        alert("Field should not be empty!");
      }
    }
  }

  handleSource(modelLanguage, supportLanguage) {
    const result = [];
    if (modelLanguage && supportLanguage) {
      modelLanguage.map(item => supportLanguage.map(value => (item.source_language_code === value.language_code ? result.push(value) : null)));
    }
    const value = new Set(result);
    const source_language = [...value];
    // var src =[{_id: "5d7a0fcdb053d84641cebd1c", language_code: "en", language_name: "English", "status": "ACTIVE", "created_on": "2019-09-12T09:28:45.367Z"}]
    return source_language;
  }

  handleTarget(modelLanguage, supportLanguage, sourceLanguage) {
    const result = [];
    if (modelLanguage && supportLanguage) {
      modelLanguage.map(item => {
        item.source_language_code === sourceLanguage &&
          supportLanguage.map(value => (item.target_language_code === value.language_code ? result.push(value) : null));
        return true;
      });
    }
    const value = new Set(result);
    const target_language = [...value];

    return target_language;
  }

  handleSelectChange = event => {
    console.log("", event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = files => {
    this.setState({
      files
    });
  };

  componentDidMount() {
    const { APITransport } = this.props;
    const apiObj = new FetchLanguage();
    APITransport(apiObj);
    this.setState({ showLoader: true });
    const apiModel = new FetchModel();
    APITransport(apiModel);
    this.setState({ showLoader: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.supportLanguage !== this.props.supportLanguage) {
      this.setState({
        language: this.props.supportLanguage
      });
    }

    if (prevProps.langModel !== this.props.langModel) {
      this.setState({
        modelLanguage: this.props.langModel
      });
    }
    if (prevProps.uploadpdf !== this.props.uploadpdf) {
      this.setState({ filesPath: this.props.uploadpdf, open: true });
      history.push(`${process.env.PUBLIC_URL}/view-pdf`);
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
        <Grid container spacing={24} style={{ padding: 6 }}>
          <Grid item xs={12} sm={12} lg={12} xl={12}>
            <Typography value="" variant="h4" className={this.props.classes.typography}>
              {translate("common.page.label.uploadFile")}
            </Typography>
            <br />
            <br />
          </Grid>
          <Grid container spacing={24} style={{ marginLeft: "3%" }}>
            <Grid item xs={8} sm={8} lg={8} xl={8} style={{ paddingLeft: "2%" }}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "85%", paddingTop: "30px", paddingBottom: "30px" }}>
                {translate("common.page.label.filename")}
              </Typography>
              <br />
            </Grid>
            <Grid item xs={4} sm={4} lg={4} xl={4}>
              <TextField
                value={this.state.workspaceName}
                required
                id="outlined-name"
                margin="normal"
                onChange={event => {
                  this.handleTextChange("name", event);
                }}
                variant="outlined"
                style={{ width: 145 }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={24} style={{ marginLeft: "3%" }}>
            <Grid item xs={8} sm={8} lg={8} xl={8} style={{ paddingLeft: "2%" }}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "100%", paddingTop: "15px" }}>
                Select Source Language:{" "}
              </Typography>
            </Grid>
            <Grid item xs={3} sm={3} lg={3} xl={3}>
              <Select
                id="outlined-age-simple"
                MenuItemValues={this.handleSource(this.state.modelLanguage, this.state.language)}
                handleChange={this.handleSelectChange}
                value={this.state.source}
                name="source"
                style={{ marginRight: "30%", width: "80%", marginBottom: "5%", marginTop: "4%" }}
              />
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container spacing={24} style={{ marginLeft: "3%" }}>
            <Grid item xs={8} sm={8} lg={8} xl={8}>
              <Typography
                value="Select target language"
                variant="title"
                gutterBottom="true"
                style={{ width: "100%", paddingTop: "15px", paddingBottom: "30px" }}
              >
                Select Target Language:{" "}
              </Typography>
              <br />
            </Grid>
            <Grid item xs={3} sm={3} lg={3} xl={3}>
              <Select
                id="outlined-age-simple"
                MenuItemValues={
                  this.state.source.language_code
                    ? this.handleTarget(this.state.modelLanguage, this.state.language, this.state.source.language_code)
                    : []
                }
                handleChange={this.handleSelectChange}
                value={this.state.target}
                name="target"
                style={{ minWidth: 120, width: "80%", marginLeft: "10%", marginTop: "30" }}
              />
            </Grid>
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
          <Button variant="contained" color="primary" className={this.props.classes.button} size="large" onClick={this.handleSubmit.bind(this)}>
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
  uploadpdf: state.uploadpdf,
  supportLanguage: state.supportLanguage,
  langModel: state.langModel
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
