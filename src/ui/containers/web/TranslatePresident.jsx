
import React, { useState, useRef } from 'react';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from  '../../components/web/common/ZoomCard';

import AppCard from  '../../components/web/Card';
import '../../styles/web/TranslatePresident.css';
import NewCorpusStyle from "../../styles/web/Newcorpus";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import NMT from "../../../flux/actions/apis/nmt";
import FetchLanguage from "../../../flux/actions/apis/fetchlanguage";
import FetchModel from "../../../flux/actions/apis/fetchmodel";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import C from '../../../flux/actions/constants'
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';

const langs = [
  { label: 'Bengali', code: 'bn', type: C.BENGALI },
  { label: 'Gujarati', code: 'gu', type: C.GUJARATI },
  { label: 'Hindi', code: 'hi', type: C.HINDI },
  { label: 'Kannada', code: 'kn', type: C.KANNADA },
  { label: 'Malayalam', code: 'ml', type: C.MALAYALAM },
  { label: 'Marathi', code: 'mr', type: C.MARATHI },
  { label: 'Punjabi', code: 'pa', type: C.PUNJABI },
  { label: 'Tamil', code: 'ta', type: C.TAMIL },
  { label: 'Telugu', code: 'te', type: C.TELUGU }
];


class TranslatePresident extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLayout: false,
      showLangLayout: false,
      model: [],
      langs: []
    };
  }

  componentDidMount() {
    const apiObj = new FetchLanguage();
    this.props.APITransport(apiObj);
    const apiModel = new FetchModel();
    this.props.APITransport(apiModel);
  }

  componentDidUpdate(prevProps) {
    langs.map((lang) => {
      if (this.props[lang.label.toLowerCase()] !== prevProps[lang.label.toLowerCase()]) {
        this.setState({
          [lang.label.toLowerCase()]: this.props[lang.label.toLowerCase()]
        })
      }
    })
  }

  handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value, val : true
    });
  }

  handleChange=()=>{
    this.setState({ showZoom: true })
  }

  getModelForLang(lang_code) {
    let model = []
    this.props.langModel.map(item =>
      item.target_language_code === lang_code &&
      item.source_language_code === 'en' && item.is_primary &&
      model.push(item)
    )
    return model
  }

  handleOnClick = () => {
    this.setState({ showLayout: true })
    langs.map((lang) => {
      let model = this.getModelForLang(lang.code)
      let api = new NMT(this.state.sentence, model, false, null, false, lang.type);
      this.props.TranslateAPI(api);
    })

    setTimeout(() => {
      this.setState({ showLangLayout: true })
    }, 1000)
  }

  handleClose = () => {
    this.setState({ showLayout: false, showLangLayout: false, sentence: '' })
    langs.map((lang) => {
      this.setState({
        [lang.label.toLowerCase()]: null
      })
    })

  }
  render() {
    return (
      <div className="App">
        {!this.state.showLayout ?
          <div>
            <textarea className='idbox' rows='5' cols='50' placeholder='Please enter text here...' onChange={(event) => { this.handleTextChange('sentence', event) }} />
            <div >
              <Button onClick={this.handleSubmit}
                variant="contained" color="primary"
                style={{
                  width: '25%',
                  height: 50,

                }} onClick={this.handleOnClick.bind(this)}>Translate</Button>
            </div>
          </div> :
          (!this.state.showLangLayout && <div className={'fadeUp'}>
            <textarea className='idbox' rows='5' cols='50' placeholder='Please enter text here...' onChange={(event) => { this.handleTextChange('sentence', event) }} />
          </div>)
        }
        <div>
          {this.state.showLangLayout ?
            <Grid container spacing={4} style={{ paddingLeft: '17%', paddingRight: '17%' }}>
              <Grid container item xs={12} spacing={1}>
                <Paper id='paper'>
                  <Typography id='title' color="black" gutterBottom style={{ color: 'black' }}>
                    {this.state.sentence}
                  </Typography>
                </Paper>
              </Grid>
              <Grid container item xs={12} spacing={3} id='cardGrid'>
                <React.Fragment>
                  {langs.map((lang) => {
                    return (<Grid item xs={12} sm={4} className='slideUp'><AppCard header={lang.label} body={this.state[lang.label.toLowerCase()] && this.state[lang.label.toLowerCase()] && Array.isArray(this.state[lang.label.toLowerCase()]) ? this.state[lang.label.toLowerCase()][0].tgt : ''} style={{minHeight: "165px"
                     , margin: "20px"}}/></Grid>)
                  })}
                </React.Fragment>
              </Grid>

              <Fab aria-label="Close" style={{
                margin: "auto",
                display: "block", color: 'white'
              }} onClick={this.handleClose.bind(this)}>
                <CloseIcon style={{ color: 'CB1E60' }} />
              </Fab>
            </Grid>
           : null}


        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  nmt: state.nmt,
  supportLanguage: state.supportLanguage,
  langModel: state.langModel,
  hindi: state.hindi,
  bengali: state.bengali,
  punjabi: state.punjabi,
  malayalam: state.malayalam,
  tamil: state.tamil,
  telugu: state.telugu,
  marathi: state.marathi,
  kannada: state.kannada,
  gujarati: state.gujarati,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      TranslateAPI: APITransport
    },
    dispatch
  );

export default withRouter(
  withStyles(NewCorpusStyle)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(TranslatePresident)
  )
);


