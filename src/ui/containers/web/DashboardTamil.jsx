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


class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      apiCalled: false,
      autoMlText: '',
      nmtText: [],
      nmtTextSP: []
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
    this.setState({
      [key]: event.target.value
    })
  }

  handleSubmit() {
    const { APITransport, NMTApi, NMTSPApi } = this.props;

    const apiObj = new AutoML(this.state.text, true, true);
    const nmt = new NMT(this.state.text, 7, true);
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
          <Grid item xs={12} sm={12} lg={12} xl={12}>
            <TextField
              id="standard-multiline-static"
              label="English Sentence"
              style={{ width: '70%' }}
              multiline
              margin="normal"
              onChange={(event) => {
                this.handleTextChange('text', event)
              }}
            />
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
