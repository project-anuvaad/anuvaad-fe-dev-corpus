import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import TabDetals from "./WorkspaceDetailsTab";
import StepDetals from "./TockenExtractionSteps";
import FileUpload from "../../../components/web/common/FileUpload";
import history from "../../../../web.history";
import ConfigUpload from "../../../../flux/actions/apis/configupload";
import UploadApiToken from "../../../../flux/actions/apis/uploadtoken";
import Snackbar from "../../../components/web/common/Snackbar";
import Spinner from "../../../components/web/common/Spinner";

class UploadToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      processData: 'Press "Next" to extract sentences',
      activeStep: 1,
      positiveToken: "",
      negativeToken: "",
      workspaceName: this.props.match.params.name,
      session_id: this.props.match.params.session_id,
      message: "Step 2 process started successfully ",
      load: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.configUplaod !== this.props.configUplaod) {
      this.setState({ files: this.props.configUplaod });

      if (this.props.configUplaod.length === 2) {
        const positiveFilepath =
          this.props.configUplaod[0].name == "positiveToken" ? this.props.configUplaod[0].data.filepath : this.props.configUplaod[1].data.filepath;
        const negativeFilepath =
          this.props.configUplaod[0].name == "negativeToken" ? this.props.configUplaod[0].data.filepath : this.props.configUplaod[1].data.filepath;

        const { APITransport } = this.props;
        console.log("----&&&&--", positiveFilepath, negativeFilepath);
        const apiObj = new UploadApiToken(this.state.session_id, this.state.workspaceName, positiveFilepath, negativeFilepath);

        APITransport(apiObj);
        this.setState({ showLoader: true });
      }
    }

    if (prevProps.uploadTokenValue !== this.props.uploadTokenValue) {
      this.setState({ open: true,load:false, files: [], negativeToken: "", positiveToken: "" });

      setTimeout(() => {
        history.push(`${process.env.PUBLIC_URL}/existing-workspace`);
      }, 3000);
    }
  }

  handleSubmit() {
    console.log("---", this.state.workspaceName, this.state.positiveToken, this.state.negativeToken);
    if (this.state.workspaceName && this.state.positiveToken && this.state.negativeToken) {
      const { APITransport } = this.props;
      console.log("upload", this.state.workspaceName, this.state.positiveToken, this.state.negativeToken);
      const apiObj = new ConfigUpload(this.state.positiveToken, "positiveToken");
      this.state.positiveToken && APITransport(apiObj);
      const apiObj2 = new ConfigUpload(this.state.negativeToken, "negativeToken");
      this.state.negativeToken && APITransport(apiObj2);
      this.setState({ showLoader: true,load: true });
    } else {
      alert("Please upload token file properly");
    }

    // history.push(`${process.env.PUBLIC_URL}/sentence-extraction`);
  }

  handleChange = (key, event) => {
    console.log("====", event.target.files[0].name, key);
    this.setState({
      [key]: event.target.files[0],
      positiveToken: key == "positiveToken" ? event.target.files[0].name : this.state.positiveToken,
      negativeToken: key == "negativeToken" ? event.target.files[0].name : this.state.negativeToken
    });
  };

  render() {
    return (
      <div>
        <TabDetals activeStep={this.state.value} style={{ marginLeft: "3%", marginRight: "10%", marginTop: "40px" }} />
        <Paper style={{ marginLeft: "3%", marginRight: "10%", marginTop: "3%", paddingTop: "10px", paddingBottom: "3%" }} elevation={4}>
          <StepDetals workSpace={this.props.match.params.name} activeStep={this.state.activeStep} />
          <Grid container spacing={24} style={{ marginTop: "1", marginLeft: "12%" }}>
            <Grid item xs={3} sm={3} lg={3} xl={3} style={{ marginTop: "30px" }}>
              <Typography gutterBottom variant="title" component="h2">
                Positive tokens :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={7} sm={7} lg={7} xl={7}>
              <Grid container spacing={8}>
                <Grid item xs={3} sm={3} lg={3} xl={3}>
                  <FileUpload accept=".csv" buttonName="Upload" handleChange={this.handleChange.bind(this)} name="positiveToken" />
                </Grid>

                <Grid item xs={4} sm={4} lg={3} xl={3}>
                  <TextField
                    value={this.state.positiveToken}
                    id="outlined-name"
                    disabled
                    margin="normal"
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={1} sm={1} lg={1} xl={1}>
                  <Typography gutterBottom variant="title" component="h2" style={{ marginTop: "30px", marginLeft: "15%", paddingLeft:"20%" }}>
                    or
                  </Typography>
                </Grid>

                <Grid item xs={3} sm={3} lg={3} xl={3} style={{ marginTop: "-21px" }}>
                  <br />
                  <br />
                  <Select style={{ width: "100%" }} input={<OutlinedInput id="outlined-age-simple" />}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3} sm={3} lg={3} xl={3} style={{ marginTop: "30px" }}>
              <Typography gutterBottom variant="title" component="h2">
                Negative tokens :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={7} sm={7} lg={7} xl={7}>
              <Grid container spacing={8}>
                <Grid item xs={3} sm={3} lg={3} xl={3}>
                  <FileUpload accept=".csv" buttonName="Upload" handleChange={this.handleChange.bind(this)} name="negativeToken" />
                </Grid>

                <Grid item xs={4} sm={4} lg={3} xl={3}>
                  <TextField
                    value={this.state.negativeToken}
                    id="outlined-name"
                    disabled
                    margin="normal"
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={1} sm={1} lg={1} xl={1}>
                  <Typography gutterBottom variant="title" component="h2" style={{ marginTop: "30px", marginLeft: "15%", paddingLeft: "20%" }}>
                    or
                  </Typography>
                </Grid>

                <Grid item xs={3} sm={3} lg={3} xl={3} style={{ marginTop: "-21px" }}>
                  <br />
                  <br />
                  <Select style={{ width: "100%" }} input={<OutlinedInput id="outlined-age-simple" />}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={3} sm={3} lg={3} xl={3} style={{ marginTop: "56px" }}>
              <Typography variant="subtitle" color="inherit" style={{ textAlign: "justify", color: "#ACACAC", width: "80%", marginLeft: "2px" }}>
                {this.state.processData}
              </Typography>
              <br />
            </Grid>

            <Grid item xs={7} sm={7} lg={7} xl={7}>
              <Grid container spacing={8}>
                <Grid item xs={3} sm={3} lg={3} xl={3} />
                <Grid item xs={8} sm={8} lg={8} xl={8} style={{ marginTop: "40px" }}>
                  <Button variant="contained" color="primary" style={{ width: "87%", height: "60px" }} onClick={this.handleSubmit.bind(this)}>
                    Next
                  </Button>
                </Grid>
              </Grid>
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
         {this.state.load && <Spinner/>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  configUplaod: state.configUplaod,
  uploadTokenValue: state.uploadTokenValue
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadToken));
