import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import FileUpload from "../../../components/web/common/FileUpload";
import Snackbar from "../../../components/web/common/Snackbar";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import TabDetals from "./WorkspaceDetailsTab";
import history from "../../../../web.history";
import ConfigUpload from "../../../../flux/actions/apis/configupload";
import RunExperiment from "../../../../flux/actions/apis/runexperiment";

class NewExtraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      configFile: "",
      csvFile: "",
      workspaceName: "",
      configName: "",
      csvName: "",
      value: 1,

      message: "Process started, This might be long running operation, kindly look the status of your workspace under Here",

      csvData:
        "Please upload CSV file containing paragraphs (check with development team about the file format). Start by download global configuration file and provide workspace name.",
      processData:
        'Press "Start processing" to run the workspace. This might be long running operation, kindly look the status of your workspace under "Processing Workspace" tab'
    };
  }

  readFileDataAsBinary(file) {

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsBinaryString(file);
    });
  }

  handleChange = (key, event) => {
    this.setState({
      configName: key == "configFile" ? event.target.files[0].name : this.state.configName,
      csvName: key == "csvFile" ? event.target.files[0].name : this.state.csvName
    });
    this.readFileDataAsBinary(event.target.files[0]).then((result, err) => {
      console.log(result)
      console.log(err)
      this.setState({
        [key]: result
      });
    })
    // this.setState({
    //   [key]: new Blob(event.target.files[0]),
    //   configName: key == "configFile" ? event.target.files[0].name : this.state.configName,
    //   csvName: key == "csvFile" ? event.target.files[0].name : this.state.csvName
    // });
  };

  handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value,
      name: key
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.configUplaod !== this.props.configUplaod) {
      this.setState({ files: this.props.configUplaod });

      if (this.props.configUplaod.length === 2) {
        const configFilepath =
          this.props.configUplaod[0].name == "configFile" ? this.props.configUplaod[0].data.filepath : this.props.configUplaod[1].data.filepath;
        const csvFilepath =
          this.props.configUplaod[0].name == "csvFile" ? this.props.configUplaod[0].data.filepath : this.props.configUplaod[1].data.filepath;

        const { APITransport } = this.props;

        const apiObj = new RunExperiment(this.state.workspaceName, configFilepath, csvFilepath);

        this.state.csvFile && APITransport(apiObj);
        this.setState({ showLoader: true });
      }
    }

    if (prevProps.workspaceDetails !== this.props.workspaceDetails) {
      this.setState({ open: true, workspaceName: "", configFile: "", csvFile: "", files: [], workspaceName: "", configName: "", csvName: "" });

      setTimeout(() => {
        history.push(`${process.env.PUBLIC_URL}/Workspace-details`);
      }, 3000);
      //
    }
  }

  handleSubmit() {
    if (this.state.workspaceName && this.state.configFile && this.state.csvFile) {
      const { APITransport } = this.props;

      const apiObj = new ConfigUpload(this.state.configFile, "configFile");
      this.state.configFile && APITransport(apiObj);
      const apiObj2 = new ConfigUpload(this.state.csvFile, "csvFile");
      this.state.csvFile && APITransport(apiObj2);
      this.setState({ showLoader: true });
    } else {
      alert("Fields should not be empty");
    }
    // history.push(`${process.env.PUBLIC_URL}/token-extraction`);
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
                Configuration file : &emsp;&emsp;{" "}
                <Link component="button" variant="body2">
                  Download global configuration
                </Link>
              </Typography>
              <br />
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6} style={{ marginTop: "-7px", height: "56px" }}>
              <Grid container spacing={8}>
                <Grid item xs={4} sm={4} lg={4} xl={4}>
                  <FileUpload accept=".yaml" buttonName="Upload" handleChange={this.handleChange.bind(this)} name="configFile" />
                </Grid>

                <Grid item xs={4} sm={4} lg={4} xl={4}>
                  <TextField value={this.state.configName} id="outlined-name" disabled margin="normal" variant="outlined" style={{ width: "80%" }} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <Typography
                variant="subtitle"
                color="inherit"
                style={{ textAlign: "justify", color: "#ACACAC", marginRight: "28%", marginTop: "40px" }}
              >
                {this.state.csvData}
              </Typography>
            </Grid>
            <Grid item xs={5} sm={5} lg={5} xl={5}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "65%", paddingTop: "30px" }}>
                CSV file :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6}>
              <Grid container spacing={8}>
                <Grid item xs={4} sm={4} lg={4} xl={4}>
                  <FileUpload accept=".csv" buttonName="Upload" handleChange={this.handleChange.bind(this)} name="csvFile" />
                </Grid>

                <Grid item xs={4} sm={4} lg={4} xl={4}>
                  <TextField value={this.state.csvName} id="outlined-name" disabled margin="normal" variant="outlined" style={{ width: "80%" }} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={5} sm={5} lg={5} xl={5}>
              <Typography
                variant="subtitle"
                color="inherit"
                style={{ textAlign: "justify", color: "#ACACAC", marginTop: "7%", width: "80%", marginLeft: "2px" }}
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
                Start processing
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {this.state.open && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            variant="success"
            message={this.state.message}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  configUplaod: state.configUplaod,
  workspaceDetails: state.workspaceDetails
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewExtraction));
