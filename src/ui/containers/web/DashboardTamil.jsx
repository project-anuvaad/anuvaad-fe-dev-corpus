import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NewOrders from '../../components/web/dashboard/NewOrders';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import AutoML from "../../../flux/actions/apis/auto_ml";
import NMT from "../../../flux/actions/apis/nmt";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { white, blueGrey50,darkBlack } from "material-ui/styles/colors"
import Select from '../../components/web/common/Select';
import FetchLanguage from "../../../flux/actions/apis/fetchlanguage";
import FetchModel from "../../../flux/actions/apis/fetchmodel";

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      apiCalled: false,
      autoMlText: '',
      nmtText: [],
      nmtTextSP: [],
      tocken: false,
      source:'',
      target:'',
      modelLanguage:[],
      language:[],
      model:''
    }
  }

  componentDidMount() {
    this.setState({
      autoMlText: '',
      nmtText: [],
      nmtTextSP: []
    })

    const { APITransport,MODELApi } = this.props;
        const apiObj = new FetchLanguage();
        APITransport(apiObj);
        this.setState({showLoader:true})

        const apiModel = new FetchModel();
        APITransport(apiModel);



        this.setState({showLoader:true})
        

  }

  componentDidUpdate(prevProps) {
    if (prevProps.automl !== this.props.automl) {
      this.setState({
        autoMlText: this.props.automl.text,
      })
    }

    if (prevProps.nmt !== this.props.nmt) {
      this.setState({
        nmtText: this.props.nmt.text,
      })
    }

    if (prevProps.nmtsp !== this.props.nmtsp) {
      this.setState({
        nmtTextSP: this.props.nmtsp.text,
      })
    }

    if (prevProps.supportLanguage !== this.props.supportLanguage) {
      this.setState({
        language: this.props.supportLanguage
      })
    }

    if (prevProps.langModel !== this.props.langModel) {
      this.setState({
        modelLanguage: this.props.langModel
      })
    }
  }

  handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value
    })
  }
  handleClear() {
    this.setState({
      text:'',
      autoMlText:'',
      source:'',
      target:''
    })
  }

  handleSelectChange = event => {
    
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSource(modelLanguage,supportLanguage){
    
    var result =[];
    modelLanguage.map((item) => 
      supportLanguage.map((value)=>(
        item.source_language_code===value.language_code?
        result.push(value):null
      )))
      var value = new Set(result);
      var source_language= [...value]
    return source_language;
  }

  handleTarget(modelLanguage,supportLanguage,sourceLanguage){

    var result =[];
    modelLanguage.map((item) => 
    {item.source_language_code===sourceLanguage?
      supportLanguage.map((value)=>(
        item.target_language_code===value.language_code?
        result.push(value):null
      )):''})
      var value = new Set(result);
      var target_language= [...value]
    return target_language;
      
  }

  handleSubmit() {
    
    var model='';
    const { APITransport, NMTApi, NMTSPApi } = this.props;
    this.state.modelLanguage.map((item) =>(
        item.target_language_code === this.state.target &&  item.source_language_code === this.state.source?
          model= item :''))
    const apiObj = new AutoML(this.state.text, this.state.source, this.state.target);
    const nmt = new NMT(this.state.text, model, true,this.state.target);
    
    APITransport(apiObj);
    NMTApi(nmt)
    this.setState({
      autoMlText:'',
      nmtText:'',
      apiCalled: true
    })
  }

  render() {
    return (
      <div>
        <Paper style={{marginLeft:'25%',width:'50%',marginTop:'5%'}}>
        <Typography variant="h5" style={{ color: darkBlack, background:blueGrey50, paddingLeft:'40%', paddingBottom:'12px',paddingTop:'8px'}} >Translator</Typography>
        <Grid container spacing={4} >
            <Grid item xs={8} sm={8} lg={8} xl={8}>
          <Typography value='' variant="title" gutterBottom="true" style={{ marginLeft: '12%', paddingTop: '9.5%' }} >Please select source language :</Typography>
        
        </Grid>
        <Grid item xs={3} sm={3} lg={2} xl={2}><br/><br/>
            <Select id={"outlined-age-simple"} MenuItemValues={this.handleSource(this.state.modelLanguage,this.state.language)} handleChange={this.handleSelectChange} value={this.state.source} name="source" style={{marginRight: '30%', marginBottom: '5%',marginTop: '4%'}} />
            </Grid>
            </Grid>
            <Grid container spacing={4} >
            <Grid item xs={8} sm={8} lg={8} xl={8}>
          <Typography value='' variant="title" gutterBottom="true" style={{ marginLeft: '12%', paddingTop: '9.5%' }} >Please select target language :</Typography>
        
        </Grid>
        <Grid item xs={3} sm={3} lg={2} xl={2}><br/><br/>
            <Select id={"outlined-age-simple"} MenuItemValues={this.state.source ? this.handleTarget(this.state.modelLanguage,this.state.language,this.state.source):[]} handleChange={this.handleSelectChange} value={this.state.target} name="target" style={{marginRight: '30%', marginBottom: '5%',marginTop: '4%'}} />
            </Grid>
            </Grid>
        <div style={{marginLeft:'40px'}}>
        <Grid container spacing={24} style={{ padding: 24 }}>
          <Grid item xs={12} sm={12} lg={12} xl={12}>
            <TextField
            value={this.state.text}
              id="standard-multiline-static"
              placeholder = "Enter Text Here ......"
              style={{ width: '96%' }}
              multiline
              marginLeft="normal"
              onChange={(event) => {
                this.handleTextChange('text', event)
              }}
            />
          </Grid>
          <Button variant="contained"  onClick={this.handleClear.bind(this)} color="primary" aria-label="edit" style={{marginLeft:'1.3%',width:'44%', marginBottom:'4%', marginTop:'4%',marginRight:'5%'}}>
                    Clear
                  </Button>
                <Button variant="contained" onClick={this.handleSubmit.bind(this)} color="primary" aria-label="edit" style={{width:'44%', marginBottom:'4%', marginTop:'4%'}}>
                    Submit
                  </Button>
        </Grid>
        </div>
        {this.state.autoMlText && this.state.nmtText &&
        <div>
        
          
            <NewOrders title="Machine Translated" data={[this.state.autoMlText]} />
            <NewOrders title="Anuvaad Model" data={this.state.nmtText} />
            </div>
        }
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  automl: state.automl,
  nmt: state.nmt,
  nmtsp: state.nmtsp,
  supportLanguage: state.supportLanguage,
  langModel: state.langModel
});

const mapDispatchToProps = dispatch => bindActionCreators({
  APITransport,
  NMTApi: APITransport,
  NMTSPApi: APITransport,
  MODELApi: APITransport
}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
