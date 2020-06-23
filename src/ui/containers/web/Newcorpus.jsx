import React from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import CreateCorpus from "../../../flux/actions/apis/corpus";
import Snackbar from "../../components/web/common/Snackbar";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core";
import NewCorpusStyle from "../../styles/web/Newcorpus";
import Input from "@material-ui/core/Input";
import history from "../../../web.history";
import { DropzoneArea } from 'material-ui-dropzone';
import Select from "@material-ui/core/Select";
import Stepper from "../../components/web/common/Stepper";
import {  blueGrey50 } from "material-ui/styles/colors"
import MenuItem from '@material-ui/core/MenuItem';
import { translate } from '../../../assets/localisation';


class Newcorpus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      add_name: '',
      doamin: '',
      text: '',
      apiCalled: false,
      hindi: '',
      english: '',
      hindi_score: [],
      english_score: [],
      file: {},
      MenuItemValues: ['English'],
      MenuItargettemValues: ['Hindi'],
      corpus_type: 'single',
      hindiFile: [],
      englishFile: [],
      comment: '',
      open: false,
      message: translate('commonCorpus.page.text.corpusAdded'),
      token: false,
      activeStep: 0,
      val: 0,
      warning: '',
      openSnack: false

    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.apistatus.progress !== this.props.apistatus.progress) {
      (this.setState({
        token: true,
        open: true
      })

      )
    }


  }



  handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value
    })
  }

  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFileChange = (e) => {
    if (e.target.files[0]) {
      this.setState({
        file: e.target.files[0],
      });
    }
  }

  handleMultiFileChange = (e) => {
    if (e.target.files[0]) {
      this.setState({
        [e.target.name]: e.target.files[0],
      });
    }
  }

  handleSource = (files) => {
    this.setState({
      englishFile: files
    });
  }

  handleTarget = (files) => {
    this.setState({
      hindiFile: files
    });

  }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <div>
          <Grid container spacing={8} >
            <Grid item xs={8} sm={8} lg={8} xl={8}>
              <Typography value='' variant="title" style={{ marginLeft: '12%', paddingTop: '14%' }} >{translate('common.page.label.sourceLang')}</Typography>

            </Grid>
            <Grid item xs={3} sm={3} lg={2} xl={2}><br /><br />
              <Select
                style={{ minWidth: 120, align: 'right' }}
                value={this.state.english}
                onChange={this.handleSelectChange}
                input={
                  <OutlinedInput name='english' id="outlined-age-simple" />
                }
              >
                {this.state.MenuItemValues.map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
              </Select>


            </Grid>
          </Grid><br />
          {this.state.val > 1 ?
            <DropzoneArea
              onDrop={this.handleSource} showPreviewsInDropzone={true} style={{ marginTop: '0%' }} acceptedFiles={['.pdf']} dropzoneText={translate('common.page.label.addDropFile')} filesLimit={1}
            ></DropzoneArea> : ''
          }

          <DropzoneArea
            onDrop={this.handleSource} showPreviewsInDropzone={true} style={{ marginTop: '0%' }} acceptedFiles={['.pdf']} dropzoneText={translate('common.page.label.addDropFile')} filesLimit={1}
          ></DropzoneArea>
        </div>


      case 1:
        return <div>
          <Grid container spacing={8} >
            <Grid item xs={8} sm={8} lg={8} xl={8}>
              <Typography value='' variant="title" gutterBottom="true" style={{ marginLeft: '5%', paddingTop: '14%' }} >{translate('common.page.label.targetLang')}</Typography>

            </Grid>
            <Grid item xs={3} sm={3} lg={2} xl={2}><br /><br />

              <Select
                style={{ minWidth: 120, align: 'right' }}
                value={this.state.hindi}
                onChange={this.handleSelectChange}
                input={
                  <OutlinedInput name='hindi' id="outlined-age-simple" />
                }
              >
                {this.state.MenuItargettemValues.map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
              </Select>

            </Grid>
          </Grid><br />
          <DropzoneArea Dropzoneiles=""
            onDrop={this.handleTarget} id="source" showPreviewsInDropzone={true} acceptedFiles={['.pdf']} dropzoneText={translate('common.page.label.addDropFile')} filesLimit={2}
          ></DropzoneArea>
        </div>;

      case 2:

        return <div ><FormControl fullWidth>
          <InputLabel htmlFor="Add Name">{translate('newCorpus.page.text.outputFilename')}</InputLabel>
          <Input id="name" required onChange={(event) => { this.handleTextChange('add_name', event) }} />
          <div style={{ color: 'red' }}>{this.state.nameError}</div>
        </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="Domain">{translate('newCorpus.page.text.domain')}</InputLabel>
            <Input id="domain" onChange={(event) => { this.handleTextChange('domain', event) }} />
            <div style={{ color: 'red' }}>{this.state.domainError}</div>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="Comment">{translate('newCorpus.page.text.comment')}</InputLabel>
            <Input id="comment" onChange={(event) => { this.handleTextChange('comment', event) }} />
            <div style={{ color: 'red' }}>{this.state.commentError}</div>
          </FormControl>
        </div>;
      default:
        return translate('newCorpus.page.text.tryAgain');
    }
  }

  validate = () => {

    let nameError = "";
    let domainError = "";
    let commentError = "";
    if (!this.state.add_name) {
      nameError = translate('common.page.error.nameError')
    }
    if (!this.state.domain) {
      domainError = translate('common.page.error.domainError')
    }
    if (!this.state.comment) {
      commentError = translate('common.page.error.commentError')
    }
    this.setState({
      nameError, domainError, commentError
    })
    if (nameError || domainError || commentError) {
    }
    else {
      return true;
    }
  }

  handleNext = () => {
    if (this.state.activeStep === 0 && this.state.englishFile.name && this.state.english) {
      this.setState(state => ({
        activeStep: 1,
        warning: ''
      }));
    } else if (this.state.hindiFile.name && this.state.hindi) {
      this.setState(state => ({
        activeStep: 2,
        warning: ''
      }));
    }
    else {
      this.setState({
        warning: translate('common.page.label.pageWarning')
      })

    }
  };

  handleBack = () => {
    if (this.state.activeStep === 0) {
      history.push(`${process.env.PUBLIC_URL}/corpus`)
    }

    else {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
      }));
    }

  };

  handleSubmit() {
    const isValid = this.validate();
    if (isValid) {
      const { APITransport } = this.props;
      const apiObj = new CreateCorpus(this.state.file, this.state.hindiFile, this.state.englishFile, this.state.hindi, this.state.english, this.state.corpus_type, this.state.add_name, this.state.domain, this.state.comment);
      APITransport(apiObj);
      this.setState({ showLoader: true })
      setTimeout(() => { this.setState({ openSnack: true }) }, 10000)
      setTimeout(() => { history.push(`${process.env.PUBLIC_URL}/corpus`) }, 12000)
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.CorpusContainer}>

        <Paper className={classes.paper} elevation={2}>
          <Typography gutterBottom variant="title" component="h2" style={{ marginTop: '-3.7%', paddingLeft: '35%', background: blueGrey50, paddingTop: '13px', paddingBottom: '13px', marginLeft: '-4%', marginRight: '-3.7%' }}>
            {translate('newCorpus.page.text.createCorpus')}
          </Typography><br />
          <Stepper steps={["Add Source file", 'Add target file', 'Add file details']} activeStep={this.state.activeStep} alternativeLabel></Stepper>


          {this.state.activeStep === 3 ? (
            <div>
              <Typography >{translate('newCorpus.page.text.allStepsCompleted')}</Typography>

            </div>
          ) : (
              <div>
                <Typography >{this.getStepContent(this.state.activeStep)}</Typography>
              </div>
            )}
          <form method="post">
          </form>

          <Button variant="contained" color="primary" className={classes.button1} onClick={this.handleBack}> {this.state.activeStep === 0 ? translate('common.page.button.cancel') : translate('common.page.button.back')} </Button>
          <Button variant="contained" color="primary" className={classes.btns} onClick={this.state.activeStep === 2 ? this.handleSubmit.bind(this) : this.handleNext}> {this.state.activeStep === 2 ? translate('common.page.label.createCorpus') : translate('common.page.button.next')}</Button>
          <div style={{ color: 'red', marginLeft: "30%" }}>{this.state.warning}</div>
        </Paper>

        {this.state.openSnack &&
          <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={this.state.open} autoHideDuration={6000}

            onClose={this.handleClose}
            variant="success"
            message={this.state.message} />}

      </div>

    );
  }
}
const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  corpus: state.corpus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  APITransport,
  CreateCorpus: APITransport,
}, dispatch);
export default withRouter(withStyles(NewCorpusStyle)(connect(mapStateToProps, mapDispatchToProps)(Newcorpus)));
