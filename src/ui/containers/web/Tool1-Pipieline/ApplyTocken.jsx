import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import APITransport from '../../../../flux/actions/apitransport/apitransport';
import TabDetals from "./WorkspaceDetailsTab";
import StepDetals from "./TockenExtractionSteps";
import Paper from "@material-ui/core/Paper";

import history from "../../../../web.history";
import FetchWorkspaceDetails from "../../../../flux/actions/apis/fetchworkspacedetails";


class ApplyToken extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value:1,
            processData: 'Press "Next" to extract sentences',
            activeStep:1,
            workspaceDetails:''
            
        }
    }


    componentDidMount() {
        console.log( this.props.match.params.session_id)
        const { APITransport } = this.props;
        let api = new FetchWorkspaceDetails(
            this.props.match.params.session_id,
          );
          APITransport(api);
      }

      componentDidUpdate(prevProps) {
        if (prevProps.fetchWorkspaceDetails !== this.props.fetchWorkspaceDetails) {
          console.log(this.props.fetchWorkspaceDetails)
          this.setState({ workspaceDetails: this.props.fetchWorkspaceDetails});
        }
      }

    handleSubmit() {
        history.push(`${process.env.PUBLIC_URL}/upload-token`);
      }

    handleChange = (key, event) => {
        console.log(event.target.files[0], key);
        this.setState({
          [key]: event.target.files[0],
          configName: key == "configFile" ? event.target.files[0].name : this.state.configName,
          csvName: key == "csvFile" ? event.target.files[0].name : this.state.csvName
        });
      };

    render() {

      
        return (
              <div>
                <TabDetals  activeStep={this.state.value} style={{ marginLeft: "3%", marginRight: "10%", marginTop: "40px"}}/>
                <Paper style={{ marginLeft: "3%", marginRight: "10%", marginTop: "3%", paddingTop: "10px", paddingBottom: "3%" }} elevation={4}>
                <StepDetals workSpace={this.props.match.params.name} activeStep={this.state.activeStep}/>
                <Grid container spacing={24} style={{ marginTop: "3%", marginLeft: "12%" }}>
            <Grid item xs={5} sm={5} lg={5} xl={5}>
              <Typography gutterBottom variant="title" component="h2" >
              Positive tokens :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6} >
            <Grid container spacing={8}>
                <Grid item xs={4} sm={4} lg={4} xl={4} style={{  marginTop: "-27px" }}>
                <Button variant="contained" color="primary" style={{ width: "85%", marginTop: "6%", height: "56px" }}>
                    Download & View
                  </Button>
                </Grid>

                <Grid item xs={6} sm={6} lg={6} xl={6}>
                <Typography gutterBottom variant="title" component="h2" >
              Found 0 tokens
              </Typography>
                </Grid>
              </Grid>
              </Grid>
            <Grid item xs={5} sm={5} lg={5} xl={5} style={{  marginTop: "40px" }}>
              <Typography gutterBottom variant="title" component="h2" >
              Negative tokens :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6}  style={{  marginTop: "40px" }} >
            <Grid container spacing={8}>
                <Grid item xs={4} sm={4} lg={4} xl={4} style={{  marginTop: "-27px" }}>
                <Button variant="contained" color="primary" style={{ width: "85%", marginTop: "6%", height: "56px" }}>
                    Download & View
                  </Button>
                </Grid>

                <Grid item xs={6} sm={6} lg={6} xl={6}>
                <Typography gutterBottom variant="title" component="h2" >
              Found 0 tokens
              </Typography>
                </Grid>
              </Grid>
              </Grid>

              <Grid item xs={5} sm={5} lg={5} xl={5}style={{ marginTop: "56px"}}>
              <Typography
                variant="subtitle1"
                color="inherit"
                style={{ textAlign: "justify", color: "#ACACAC",  width: "80%", marginLeft: "2px" }}
              >
                {this.state.processData}
              </Typography>
              <br />
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6} style={{ marginTop: "40px"}}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "60%", height: "56px" }}
                onClick={this.handleSubmit.bind(this)}
              >
                Next
              </Button>
            </Grid>
            </Grid>
                </Paper>
                
            </div>

        );
    }
}

const mapStateToProps = state => ({
    user: state.login,
    apistatus: state.apistatus,
    fetchWorkspaceDetails: state.fetchWorkspaceDetails,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
    CreateCorpus: APITransport,
}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplyToken));