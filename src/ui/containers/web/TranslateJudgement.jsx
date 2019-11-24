import React, { useState, useRef } from 'react';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppCard from '../../components/web/common/AppCard';
import Card from '../../components/web/Card';
import '../../styles/web/TranslatePresident.css';
import NewCorpusStyle from "../../styles/web/Newcorpus";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import NMT from "../../../flux/actions/apis/nmt_president";
import FetchLanguage from "../../../flux/actions/apis/fetchlanguage";
import FetchModel from "../../../flux/actions/apis/fetchmodel";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import C from '../../../flux/actions/constants'
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import SCImage from '../../../assets/icon.jpg'


const langs = [
  { label: 'Hindi', labelSecondary: 'हिन्दी', code: 'hi', type: C.HINDI, color: '#ff8000' },
  { label: 'Bengali', labelSecondary: 'বাংলা', code: 'bn', type: C.BENGALI, color: '#ff8000' },
  { label: 'Gujarati', labelSecondary: 'ગુજરાતી', code: 'gu', type: C.GUJARATI, color: '#ff8000' },
  { label: 'Kannada', labelSecondary: 'ಕನ್ನಡ', code: 'kn', type: C.KANNADA },
  { label: 'Malayalam', labelSecondary: 'മലയാളം', code: 'ml', type: C.MALAYALAM },
  { label: 'Marathi', labelSecondary: 'मराठी', code: 'mr', type: C.MARATHI },
  { label: 'Punjabi', labelSecondary: 'ਪੰਜਾਬੀ', code: 'pa', type: C.PUNJABI, color: '#008000' },
  { label: 'Tamil', labelSecondary: 'தமிழ்', code: 'ta', type: C.TAMIL, color: '#008000' },
  { label: 'Telugu', labelSecondary: 'తెలుగు', code: 'te', type: C.TELUGU, color: '#008000' }
];


class Translate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLayout: false,
      showLangLayout: false,
      model: [],
      langs: [],
      sentence: '',
      Hindi: true
    };
  }

  componentDidMount() {
    const apiObj = new FetchLanguage();
    this.props.APITransport(apiObj);
    const apiModel = new FetchModel();
    this.props.APITransport(apiModel);
  }

  componentDidUpdate(prevProps) {
    if (this.props[langs[0].label.toLowerCase()] !== prevProps[langs[0].label.toLowerCase()]) {
      langs.map((lang, index) => {
        if (index !== 0) {
          let model = this.getModelForLang(lang.code)
          let api = new NMT(this.state.sentence, model, false, null, true, lang.type);
          this.props.TranslateAPI(api);
        }
      })
    }
    langs.map((lang) => {
      if (this.props[lang.label.toLowerCase()] !== prevProps[lang.label.toLowerCase()]) {
        let opened = false
        langs.map((lang) => {
          console.log(lang.label)
          console.log(this.state[lang.label])
          if (this.state[lang.label] && lang.label !== 'Hindi') {
            opened = true
          }
        })
        this.setState({
          Hindi: this.props.hindi && !opened ? true : false,
          [lang.label.toLowerCase()]: this.props[lang.label.toLowerCase()]
        })
      }
    })
  }

  handleTextChange(key, event) {

    this.setState({
      [key]: event.target.value, val: true
    });
  }

  handleExpandClick = (key, body) => {
    langs.map((lang) => {

      if (lang.label == key) {
        this.setState({ [key]: !this.state[key] })
      }
      else {
        this.setState({ [lang.label]: false })
      }

    })
    this.setState(state => ({ [key]: !this.state[key], key, body }));



  };

  handleChange = () => {
    this.setState({ showZoom: true })
  }

  getModelForLang(lang_code) {
    let model = []
    this.props.langModel.length && this.props.langModel.map(item =>
      item.target_language_code === lang_code &&
      item.source_language_code === 'en' && item.is_primary &&
      model.push(item)
    )
    return model
  }

  handleOnClick = () => {
    this.setState({ showLayout: true })
    // langs.map((lang) => {
    let model = this.getModelForLang(langs[0].code)
    let api = new NMT(this.state.sentence, model, false, null, true, langs[0].type);
    this.props.TranslateAPI(api);
    // })

    setTimeout(() => {
      this.setState({ showLangLayout: true })
    }, 1500)
  }

  handleClose = () => {
    this.setState({ showLayout: false, showLangLayout: false, sentence: '' })
    langs.map((lang) => {

      this.setState({
        [lang.label.toLowerCase()]: null,
        [lang.label]: false

      })
    })

  }
  render() {
    return (
      <div className="App">
        {!this.state.showLayout ?
          <div>
            <textarea className='idbox' rows='5' cols='50' placeholder='Please enter English text to translate...' onChange={(event) => { this.handleTextChange('sentence', event) }} />
            <div >
              <Button onClick={this.handleSubmit}
                variant="contained" color="primary"
                style={{
                  width: '25%',
                  height: 50,

                }} onClick={this.state.sentence && this.handleOnClick.bind(this)}>Translate</Button>
                <img src={SCImage} style={{
                  width: '15%',
                  height: '80%',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }} />
            </div>
          </div> :
          (!this.state.showLangLayout && <div className={'fadeUp'}>
            <textarea className='idbox' rows='5' cols='50' placeholder='Please enter text here...' onChange={(event) => { this.handleTextChange('sentence', event) }} />
          </div>)
        }
        <div>
          {this.state.showLangLayout ?
            <Grid container spacing={16} style={{ paddingLeft: '1%' }}>
              <Grid container item xs={6} sm={6} lg={6} xl={6} spacing={1} style={{
                height: '92vh', marginLeft: '-3%', overflowX: "hidden",
                overflowY: "auto"
              }}>
                <Card bigsize header={"English"} body={this.state.sentence} style={{
                  display: "flex",
                  alignItems: "center", justifyContent: "right"
                }} />

                <Fab aria-label="Close" style={{
                  margin: "auto",
                  marginBottom: '10px',
                  display: "block", color: 'white'
                }} onClick={this.handleClose.bind(this)}>
                  <CloseIcon style={{ color: 'CB1E60' }} />
                </Fab>
              </Grid>


              <Grid container item xs={6} sm={6} lg={6} xl={6} spacing={1} style={{
                height: '92vh', float: "left",
                overflowX: "hidden",
                overflowY: "auto"
              }}>
                <React.Fragment>
                  {langs.map((lang, index) => {
                    return (<Grid item xs={12} sm={12} lg={12} xl={12} sm={9} className='slideUp'><AppCard cardKey={lang.label} header={lang.label+' - '+lang.labelSecondary} handleExpandClick={this.handleExpandClick.bind(this)} expanded={this.state[lang.label]} color={lang.color} body={this.state[lang.label.toLowerCase()] && this.state[lang.label.toLowerCase()] && Array.isArray(this.state[lang.label.toLowerCase()]) ? this.state[lang.label.toLowerCase()].map(function (elem) {
                      return elem.tgt + (index === 0 && elem.tgt.indexOf('।') < 0 && elem.tgt.indexOf('?') < 0 ? '। ' : ' ');
                    }) : ''} style={{ background: lang.color }} /></Grid>)
                  })}
                </React.Fragment>

              </Grid>


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
    )(Translate)
  )
);