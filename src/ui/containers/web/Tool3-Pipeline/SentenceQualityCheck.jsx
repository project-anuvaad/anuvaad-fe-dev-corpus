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
import Link from "@material-ui/core/Link";
import Select from "@material-ui/core/Select";
import Snackbar from "../../../components/web/common/Snackbar";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import TabDetals from "./WorkspaceDetailsTab";
import history from "../../../../web.history";
import FileUpload from "../../../components/web/common/FileUpload";
import FetchLanguage from "../../../../flux/actions/apis/fetchlanguage";
import ProcessingWorkspace from "./ProcessingWorkspace";
import MTProcessWorkspace from "../../../../flux/actions/apis/createworkspace";

class SentenceQualityCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      target: "",
      selectedWorkspaces: [],
      workspaceName: "",
      sourceLanguage: [],
      language: [],
      step: 1,
      message1: 'Process started, This might be long running operation, kindly look the status of your workspace under "Processing Workspace" tab',
      csvData:
        '"Accept and Next", will qualify current sentence pair by replacing target sentence with the eligible token. This action makes current sentence pair as "good sentence pair". This means HT step will be skipped for this sentence pair',
      processData: 'Press "Next" to select relevant input workspaces'
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  handleSubmit() {
    const { APITransport } = this.props;
    console.log(this.state.workspaceName, this.state.target.language_code);
    if (this.state.workspaceName && this.state.target.language_code) {
      this.setState({
        step: 2
      });
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
            <Grid item xs={4} sm={4} lg={4} xl={4}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "65%", paddingTop: "30px" }}>
                Enter workspace name :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={8} sm={8} lg={8} xl={8}>
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

            <Grid item xs={4} sm={4} lg={4} xl={4}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "65%", paddingTop: "30px" }}>
              Found sentences :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={8} sm={8} lg={8} xl={8}>
              <TextField
                value={this.state.sentenceDetails}
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

            <Grid item xs={4} sm={4} lg={4} xl={4}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "65%", paddingTop: "30px" }}>
              Source sentence :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={8} sm={8} lg={8} xl={8}>
              <TextField
                value={this.state.source}
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

            <Grid item xs={4} sm={4} lg={4} xl={4}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "65%", paddingTop: "30px" }}>
              Target sentence :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={8} sm={8} lg={8} xl={8}>
              <TextField
                value={this.state.target}
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

            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <Typography
                variant="subtitle2"
                color="inherit"
                style={{ textAlign: "center", color: "#ACACAC", marginRight: "28%", marginTop: "40px" }}
              >
                {this.state.csvData}
              </Typography>
              </Grid>

            <Grid item xs={5} sm={5} lg={5} xl={5}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "70%",marginLeft:'40px', marginTop: "3%", height: "56px" }}
                onClick={this.handleSubmit.bind(this)}
              >
                Ignore and Next
              </Button>
              </Grid>
              <Grid item xs={5} sm={5} lg={5} xl={5}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "70%", marginTop: "3%", height: "56px" }}
                onClick={this.handleSubmit.bind(this)}
              >
                Accept and Next
              </Button>
              </Grid>
            
          </Grid>
        </Paper>
        
        {this.state.open && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.open}
            autoHideDuration={3000}
            onClose={this.handleClose}
            variant="success"
            message={this.state.message1}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  configUplaod: state.configUplaod
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SentenceQualityCheck));
