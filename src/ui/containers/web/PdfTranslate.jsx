import Grid from '@material-ui/core/Grid';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FetchLanguage from "../../../flux/actions/apis/fetchlanguage";
import FetchModel from "../../../flux/actions/apis/fetchmodel";
import PdfTranslation from "../../../flux/actions/apis/translation";
import FetchFeedbackPending from "../../../flux/actions/apis/fetchfeedbackpending";
import APITransport from '../../../flux/actions/apitransport/apitransport';
import history from "../../../web.history";
import Button from "../../components/web/common/Button";
import DropZone from '../../components/web/common/DropZone';
import { DropzoneArea } from "material-ui-dropzone";
import Paper from '../../components/web/common/Paper';
import Select from "../../components/web/common/Select1";
import Typography from '../../components/web/common/Typography';
import { blueGrey50 } from "material-ui/styles/colors";
import { withStyles } from "@material-ui/core/styles";
import PdfUploadStyles from "../../styles/web/PdfUploadStyles";
import { withRouter } from 'react-router';


class doctranslate extends React.Component {
  state = {
    source: "",
    target: '',
    name: "",
    files: [],
    activeStep: 0,
    steps: ['Add', 'Edit', 'Download'],
    property: false,
    showLoader: false
  };

  componentDidMount() {

    const { APITransport } = this.props;
    const api = new FetchFeedbackPending();
    APITransport(api);
    const apiObj = new FetchLanguage();
    APITransport(apiObj);
    this.setState({ showLoader: true })
    const apiModel = new FetchModel();
    APITransport(apiModel);
    this.setState({ showLoader: true })
  }

  componentDidUpdate(prevProps) {

    if (prevProps.supportLanguage !== this.props.supportLanguage) {
      this.setState({
        language: this.props.supportLanguage
      })
    }


    if (prevProps.feedbackQuestions !== this.props.feedbackQuestions) {

      if (Object.getOwnPropertyNames(this.props.feedbackQuestions).length !== 0) {
        history.push("/feedback-form/translate")
      }
    }


    if (prevProps.langModel !== this.props.langModel) {
      this.setState({
        modelLanguage: this.props.langModel
      })
    }

    if (prevProps.translation !== this.props.translation) {
      history.push("/viewtranslate")
      this.setState({
        translation: this.props.translation
      })
    }
  }




  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = (files) => {
    this.setState({
      files: files
    });
  }

  handleSubmit = () => {
    var model = '';
    if (this.state.modelLanguage) {
      this.state.modelLanguage.map((item) => (
        item.target_language_code === this.state.target.language_code && item.source_language_code === this.state.source.language_code && item.is_primary ?
          model = item : ''))
      const { APITransport } = this.props;
      const apiObj = new PdfTranslation(this.state.source.language_name, this.state.target.language_name, this.state.files, model, this.state.source.language_code, this.state.target.language_code);
      APITransport(apiObj);
      this.setState({ showLoader: true })

    }
  }

  handleSource(modelLanguage, supportLanguage) {
    var result = [];
    if (modelLanguage && supportLanguage) {
      modelLanguage.map((item) =>
        supportLanguage.map((value) => (
          item.source_language_code === value.language_code ?
            result.push(value) : null
        )))
    }
    var value = new Set(result);
    var source_language = [...value]
    return source_language;
  }

  handleTarget(modelLanguage, supportLanguage, sourceLanguage) {
    var result = [];
    if (modelLanguage && supportLanguage) {
      modelLanguage.map((item) => {
        item.source_language_code === sourceLanguage &&
          supportLanguage.map((value) => (
            item.target_language_code === value.language_code ?
              result.push(value) : null
          ))
        return true;
      })
    }
    var value = new Set(result);
    var target_language = [...value]

    return target_language;

  }
  render() {
    const { user, classes, location } = this.props;
    return (

      <div>

        <Typography value="Document Translator" variant="h4" style={{
          marginTop: '6%',
          minWidth: "5%",
          align: 'center',
          marginLeft: "38%",
          fontfamily: 'Trebuchet MS, sans-serif	',
          color: '#003366'
        }} />


        <Paper value={
          <div>
            <Grid container spacing={4} >

              <Grid item xs={12} sm={6} lg={6} xl={6} >
                <DropzoneArea onChange={this.handleChange} showPreviewsInDropzone
                  acceptedFiles={[".docx"]} dropZoneClass={classes.dropZoneArea}
                  dropzoneText="Add/Drop a docx File here"
                 />
              </Grid>

              <Grid item xs={12} sm={6} lg={6} xl={6}  >
                <Grid container spacing={24} style={{ marginLeft: "6%", marginTop: '3%' }}>
                  <Typography value='Select Source Language' variant="title" gutterBottom="true" styles={{

                    marginTop: '4%',
                    height: "18px",
                    fontSize: "18px"
                  }} />

                  <Grid item xs={12} sm={12} lg={12} xl={12}  >
                    <Select id="outlined-age-simple"
                      MenuItemValues={this.handleSource(this.state.modelLanguage, this.state.language)}
                      handleChange={this.handleSelectChange} value={this.state.source}
                      name="source"
                      style={{
                        width: "100%",
                      }} />
                  </Grid>
                </Grid>
                <br /><br /><br />
                <Grid container spacing={24} style={{ marginLeft: "6%" }}>
                  <Typography value='Select Target Language' variant="title" gutterBottom="true" styles={{

                    marginTop: '6%',
                    height: "18px",
                    fontSize: '18px',
                  }} />

                  <Grid item xs={12} sm={12} lg={12} xl={12}  >
                    <Select id="outlined-age-simple"
                      MenuItemValues={this.state.source.language_code ? this.handleTarget(this.state.modelLanguage, this.state.language, this.state.source.language_code) : []}
                      handleChange={this.handleSelectChange} value={this.state.target} name="target"
                      style={{

                        width: "100%",
                      }} />
                  </Grid>
                </Grid>
                <br />
                {/* <Grid container spacing={24} > */}
                <Grid container spacing={24} style={{ marginLeft: "6%" }}>

                  <Grid item xs={12} sm={12} lg={12} xl={12}  ><br />
                    <Button value={"Submit"} variant={"contained"} style={{
                      // marginTop: "4%",
                      // marginLeft: "12%",
                      width: "92%",
                      backgroundColor: '#1C9AB7',
                      borderRadius: "20px 20px 20px 20px",
                      color: "#FFFFFF",
                      height: '45px'
                    }} dis={this.state.target.language_code && this.state.source.language_code && this.state.files.name ? false : true} onClick={this.handleSubmit} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>} style={{ width: '55%', marginLeft: "18%", marginTop: '4%', marginBottom: '9%', padding: "2.5% 2.5% 3% 2.5%", minWidth: "200px", }}
        />
      </div>

    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  translation: state.translation,
  supportLanguage: state.supportLanguage,
  langModel: state.langModel,
  feedbackQuestions: state.feedbackQuestions
});

const mapDispatchToProps = dispatch => bindActionCreators({
  APITransport,
  PdfTranslation: APITransport,
}, dispatch);
export default withRouter(
  withStyles(PdfUploadStyles)(connect(mapStateToProps, mapDispatchToProps)(doctranslate)));
