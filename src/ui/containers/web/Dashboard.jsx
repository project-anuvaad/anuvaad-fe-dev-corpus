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
import NMTSP from "../../../flux/actions/apis/nmtsp";
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      apiCalled: false,
      autoMlText: '',
      nmtText: [],
      nmtTextSP: [],
      modelType: 2,
    }
  }

  componentDidMount() {
    this.setState({
      autoMlText: '',
      nmtText: [],
      nmtTextSP: []
    })
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
  }

  handleTextChange(key, event) {
    console.log(event.target.value)
    this.setState({
      [key]: event.target.value
    })
  }

  handleSubmit() {
    const { APITransport, NMTApi, NMTSPApi } = this.props;

    const apiObj = new AutoML(this.state.text);
    const nmt = new NMT(this.state.text, this.state.modelType);
    // const nmtsp = new NMTSP(this.state.text);
    this.setState({
      nmtText: [],
      nmtTextSP: []
    })
    APITransport(apiObj);
    NMTApi(nmt)
    // NMTSPApi(nmtsp)
    this.setState({
      apiCalled: true
    })
  }

  render() {
    return (
      <div>
        <Grid container spacing={24} style={{ padding: 24 }}>
          <Grid item xs={12} sm={12} lg={6} xl={6}>
            <TextField
              id="standard-multiline-static"
              label="Hindi Sentence"
              style={{ width: '70%' }}
              multiline
              margin="normal"
              onChange={(event) => {
                this.handleTextChange('text', event)
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={6} xl={6}>
            <FormControl style={{ width: '100px' }}>
              <InputLabel htmlFor="modelType">Model</InputLabel>
              <Select
                value={this.state.modelType}
                onChange={(event) => {
                  this.handleTextChange('modelType', event)
                }}
                inputProps={{
                  name: 'modelType',
                  id: 'modelType',
                }}
              >
                <MenuItem value={3}>Old</MenuItem>
                <MenuItem value={4}>Subword</MenuItem>
                <MenuItem value={2}>Latest</MenuItem>
                <MenuItem value={5}>Latest v2</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={9} sm={6} lg={3} xl={3}>
            <Button variant="contained" color="primary" onClick={this.handleSubmit.bind(this)}>
              Submit
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={24} style={{ padding: 24 }}>
          <Grid item xs={9} sm={6} lg={6} xl={6}>
            {this.props.apistatus.progress ? <CircularProgress /> : <NewOrders title="Google" data={[this.state.autoMlText]} />}
          </Grid>
          <Grid item xs={9} sm={6} lg={6} xl={6}>
            {this.props.apistatus.progress ? <CircularProgress /> : <NewOrders title="Aanuvada Model" data={this.state.nmtText} />}
          </Grid>
          {/* <Grid item xs={9} sm={6} lg={6} xl={6}>
            {this.props.apistatus.progress ? <CircularProgress /> : <NewOrders title="Custom Model (Sentence Piece)" data={this.state.nmtTextSP} />}
          </Grid> */}
        </Grid>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  automl: state.automl,
  nmt: state.nmt,
  nmtsp: state.nmtsp
});

const mapDispatchToProps = dispatch => bindActionCreators({
  APITransport,
  NMTApi: APITransport,
  NMTSPApi: APITransport,
}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
