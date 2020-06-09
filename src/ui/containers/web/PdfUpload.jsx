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
import Select from "../../components/web/common/Select";
import FetchModel from "../../../flux/actions/apis/fetchmodel";
import FetchLanguage from "../../../flux/actions/apis/fetchlanguage";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  paper: {
    width: "60%",
    minWidth: "200px",
    marginTop: "3%",
    padding: "2%",
    marginLeft: "15%"
  },
  typography: {
    marginTop:'6%',
    minWidth: "5%",
    align:'center',
    marginLeft:"40%",
    fontfamily: 'Trebuchet MS, sans-serif	',
     color: '#003366' 
    
  },
  button: {
    marginTop: "4%",
    marginLeft: "5%",
    width: "90%",
    backgroundColor:'#1ca9c9'
  },
  dropZone: {
    height:"1200px",
    color:'#1ca9c9'
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
      modelLanguage: [],
      name: "",
      message: "File uplaoded successfully",
      showComponent: false,

    };
  }

  handleSubmit(e) {
    let model = "";
    let target_lang_name = ''
    let source_lang_name = ''
    if (this.state.modelLanguage) {
      this.state.modelLanguage.map(item =>
        item.target_language_code === this.state.target &&
          item.source_language_code === this.state.source &&
          item.is_primary
          ? (model = item)
          : ""
      );
      this.state.language.map((lang) => {
        if (lang.language_code === this.state.target) {
          target_lang_name = lang.language_name
        } if (lang.language_code === this.state.source) {
          source_lang_name = lang.language_name
        }
        return true
      })
      e.preventDefault();
      const { APITransport } = this.props;
      if (this.state.files.length > 0 && this.state.workspaceName) {
        const apiObj = new PdfFileUpload(
          this.state.workspaceName,
          this.state.files[0],
          source_lang_name,
          target_lang_name,
          model
        );
        APITransport(apiObj);
      } else {
        alert("Field should not be empty!");
      }
    }
  }


  // Source language
  handleSource(modelLanguage, supportLanguage) {
    const result = [];
    if (modelLanguage && Array.isArray(modelLanguage) && modelLanguage.length > 0 && supportLanguage && supportLanguage.length > 0) {
      modelLanguage.map(
        item =>
          item.interactive_end_point && supportLanguage.map(value => (item.source_language_code === value.language_code ? result.push(value) : null))
      );
    }
    const value = new Set(result);
    const source_language = [...value];
    return source_language;
  }

  // Target language
  handleTarget(modelLanguage, supportLanguage, sourceLanguage) {
    const result = [];
    if (modelLanguage && Array.isArray(modelLanguage) && modelLanguage.length > 0) {
      modelLanguage.map(item => {
        item.source_language_code === sourceLanguage &&
          item.interactive_end_point &&
          supportLanguage.map(value => (item.target_language_code === value.language_code ? result.push(value) : null));
        return true;
      });
    }
    const value = new Set(result);
    const target_language = [...value];
    return target_language;
  }
  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // handleChange = files => {
  //   this.setState({
  //     files
  //   });
  // };

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
        files,
        workspaceName: this.state.workspaceName ? this.state.workspaceName : files[0].name.slice(0, -4)
      });
    }
  };

  render() {
    return (
     <div>
      
            <Typography value=""  variant="h4" className={this.props.classes.typography}>
              {translate("common.page.label.uploadFile")}
            </Typography><br/>
            <Typography style={{marginLeft:'38%'}}>
              Upload file that you want to translate.
            </Typography >
            <br />
          <Paper className={this.props.classes.paper}>
          <Grid container spacing={8}>

          <Grid item xs={12} sm={6} lg={6} xl={6} >
          <DropzoneArea style={{minHeight:'385px'}}
            showPreviewsInDropzone
            acceptedFiles={[".pdf"]}
            onChange={this.handleChange.bind(this)}
            filesLimit={1}
            maxFileSize={20000000}
            dropzoneText={translate("common.page.label.addDropFile")}
            onDelete={this.handleDelete.bind(this)}
          />
            </Grid>

            <Grid item xs={12} sm={6} lg={6} xl={6}  >
         
          
            <Grid container spacing={24} style={{ marginLeft: "3%" }}>
              <Typography gutterBottom variant="title"  style={{ width: "100%", paddingTop: "15px",fontSize:"20px"}}>
                {translate('common.page.label.sourceLang')+ ' *' }
              </Typography>
          
              <Select
                id="outlined-age-simple"
                selectValue="language_code"
                fullWidth
                MenuItemValues={this.state.modelLanguage.length > 0 && this.handleSource(this.state.modelLanguage, this.state.language)}
                // MenuItemValues={["English"]}
                handleChange={this.handleSelectChange}
                value={this.state.source}
                name="source"
                style={{ marginRight: "30%", marginBottom: "4%", marginTop: "4%",width:"100%" }}
              />
    

            </Grid>
          <br />
          <br />
          <Grid container spacing={24} style={{ marginLeft: "3%" }}>
            
              <Typography
                value="Select target language"
                variant="title"
                gutterBottom="true"
                style={{ width: "100%", paddingTop: "15px",fontSize:"20px" }}
              >
                {translate('common.page.label.targetLang') + ' *'}
              </Typography>
              <br />
              <Select
                id="outlined-age-simple"
                selectValue="language_code"
                MenuItemValues={this.state.source && this.state.modelLanguage.length > 0 ? this.handleTarget(this.state.modelLanguage, this.state.language, this.state.source) : []}
                // MenuItemValues={["Hindi"]}
                handleChange={this.handleSelectChange}
                value={this.state.target}
                name="target"
                style={{ marginRight: "30%", marginBottom: "4%", marginLeft: "10%", width:"100%" }}
              />
          </Grid>
          <Grid container spacing={24} style={{ marginLeft: "3%" }}>
              <Typography gutterBottom variant="title"  style={{  paddingTop: "30px",fontSize:"20px" }}>
                {translate("common.page.label.filename")}
              </Typography>
              <br />
              <TextField
                value={this.state.workspaceName}
                id="outlined-name"
                margin="normal"
                onChange={event => {
                  this.handleTextChange("workspaceName", event);
                }}
                variant="outlined"
                style={{ width: '90%' }}
              />
            </Grid>
         <Button variant="contained" color="primary" className={this.props.classes.button} size="large" onClick={this.handleSubmit.bind(this)}>
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
