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
import Paper from '../../components/web/common/Paper';
import Select from '../../components/web/common/SimpleSelect';
import Typography from '../../components/web/common/Typography';
import { blueGrey50 } from "material-ui/styles/colors"


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

    return (
      <div>
        <Paper value={
          <div>

            <Typography value='Document Translator' variant="h5" gutterBottom="true" style={{ paddingLeft: '30%', paddingTop: '3%', paddingBottom: '4%', background: blueGrey50, marginBottom: '3%', color: '#233466' }} />

            <Grid container spacing={4} >
              <DropZone handleChange={this.handleChange} supportFile={['.docx']} />
              <Grid item xs={8} sm={8} lg={8} xl={8}>
                <Typography value='Select source language' variant="title" gutterBottom="true" style={{ marginLeft: '22%', paddingTop: '48px' }} />
              </Grid>
              <Grid item xs={3} sm={3} lg={4} xl={4}><br /><br />
                <Select id={"outlined-age-simple"} MenuItemValues={this.handleSource(this.state.modelLanguage, this.state.language)} handleChange={this.handleSelectChange} value={this.state.source} name="source" style={{ marginRight: '30%', marginBottom: '5%', marginTop: '4%' }} />
              </Grid>
            </Grid><br /><br />
            <Grid container spacing={2}>
              <Grid item xs={8} sm={8} lg={8} xl={8}>
                <Typography value='Select target language' variant="title" gutterBottom="true" style={{ marginLeft: '22%', paddingTop: '13px', marginBottom: '15%' }} /><br />
              </Grid>
              <Grid item xs={3} sm={3} lg={3} xl={3}>
                <Select id={"outlined-age-simple"} MenuItemValues={this.state.source.language_code ? this.handleTarget(this.state.modelLanguage, this.state.language, this.state.source.language_code) : []} handleChange={this.handleSelectChange} value={this.state.target} name="target" style={{ minWidth: 120, marginLeft: '10%', marginTop: '30' }} />
              </Grid>
            </Grid>


            <Button value={"Submit"} variant={"contained"} dis={this.state.target.language_code && this.state.source.language_code && this.state.files.name ? false : true} onClick={this.handleSubmit} 
            style={{ marginLeft: '3%', width: '95%',height:'45px', backgroundColor: "#1C9AB7", color: "#FFFFFF", borderRadius: "20px 20px 20px 20px" }} />
            {/* }}  */}
          </div>} style={{ width: '40%', marginLeft: '26%', marginTop: '2%', paddingBottom: '1%', minWidth: '450px' }}
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
export default (connect(mapStateToProps, mapDispatchToProps)(doctranslate));
