import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "../../../components/web/common/Snackbar";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import TabDetals from "./WorkspaceDetailsTab";
import history from "../../../../web.history";
import Spinner from "../../../components/web/common/Spinner";
import Select from '../../../components/web/common/SimpleSelect';
import FetchLanguage from "../../../../flux/actions/apis/fetchlanguage";

import SaveWorkspace from "../../../../flux/actions/apis/createworkspace";
class CreateWorkspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: 1,
        target: "",
        workspaceName:'',

      csvData:
        "Please upload CSV file containing paragraphs (check with development team about the file format). Start by download global configuration file and provide workspace name.",
      processData: 'Press "Next" to select relevant input workspaces'
    };
  }

  
  componentDidMount() {
    const { APITransport } = this.props;
    const apiObj = new FetchLanguage();
    APITransport(apiObj);
    
  }

  componentDidUpdate(prevProps) {

    if (prevProps.supportLanguage !== this.props.supportLanguage) {
      console.log("sssss",this.props.supportLanguage)
      this.setState({
        language: this.props.supportLanguage
      })
    }

    if (prevProps.createWorkspaceDetails !== this.props.createWorkspaceDetails) {
      history.push(`${process.env.PUBLIC_URL}/stage2/processing-workspace`);
    }
  }
  

  handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value,
      name: key
    });
  }

  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 

  

  handleSubmit() {
    const { APITransport } = this.props;
    console.log(this.state.workspaceName  , this.state.target.language_code)
    if (this.state.workspaceName  && this.state.target.language_code) {
    
      const apiObj2 = new SaveWorkspace(this.state.workspaceName, this.state.target.language_code);
       APITransport(apiObj2);
      this.setState({ load: true });
    } else {
      alert("Fields should not be empty");
    }
  }

  render() {
    return (
      <div>
        <TabDetals activeStep={this.state.value} style={{ marginLeft: "3%", marginRight: "10%", marginTop: "40px" }} />
        <Paper style={{ marginLeft: "3%", marginRight: "10%", marginTop: "3%", paddingTop: "10px", paddingBottom: "3%" }} elevation={4}>
          <Grid container spacing={24} style={{ marginTop: "3%", marginLeft: "12%" }}>
            <Grid item xs={5} sm={5} lg={5} xl={5}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "65%", paddingTop: "30px" }}>
                Enter workspace name :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6}>
              <TextField
                value={this.state.workspaceName}
                required
                id="outlined-name"
                margin="normal"
                onChange={event => {
                  this.handleTextChange("workspaceName", event);
                }}
                variant="outlined"
                style={{ width: "60%" }}
              />
            </Grid>
            <Grid item xs={5} sm={5} lg={5} xl={5}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "80%", paddingTop: "25px" }}>
                Select source language : &emsp;&emsp;{" "}
              </Typography>
              <br />
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6} style={{ height: "56px" }}>
            <Select id={"outlined-age-simple"} MenuItemValues={ this.state.language } handleChange={this.handleSelectChange} value={this.state.target} name="target"/> 
            </Grid>
            

            <Grid item xs={5} sm={5} lg={5} xl={5}>
              <Typography
                variant="subtitle2"
                color="inherit"
                style={{ textAlign: "justify", color: "#ACACAC", marginTop: "10%", width: "80%", marginLeft: "2px" }}
              >
                {this.state.processData}
              </Typography>
              <br />
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "60%", marginTop: "6%", height: "56px" }}
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
  configUplaod: state.configUplaod,
  workspaceDetails: state.workspaceDetails,
  fetchDefaultConfig: state.fetchDefaultConfig,
  supportLanguage: state.supportLanguage,
  createWorkspaceDetails: state.createWorkspaceDetails
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateWorkspace));
