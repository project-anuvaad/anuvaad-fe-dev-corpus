import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import TabDetals from "./WorkspaceDetailsTab";
import StepDetals from "./TockenExtractionSteps";
import FileUpload from "../../../components/web/common/FileUpload";
import history from "../../../../web.history";
import FetchWorkspaceDetails from "../../../../flux/actions/apis/fetchworkspacedetails";

class SentenceExtraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      activeStep: 2
    };
  }

  componentDidMount() {
    const { APITransport } = this.props;
    const api = new FetchWorkspaceDetails(this.props.match.params.session_id);
    APITransport(api);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchWorkspaceDetails !== this.props.fetchWorkspaceDetails) {
      this.setState({ workspaceDetails: this.props.fetchWorkspaceDetails.data });
    }
  }

  handleClick = () => {
    this.setState({
      activeStep: 3
    });
  };

  handleChange = (key, event) => {
    this.setState({
      activeStep: 3,
      [key]: event.target.files[0],
      configName: key == "configFile" ? event.target.files[0].name : this.state.configName,
      csvName: key == "csvFile" ? event.target.files[0].name : this.state.csvName
    });
  };

  render() {
    return (
      <div>
        <TabDetals activeStep={this.state.value} style={{ marginLeft: "3%", marginRight: "10%", marginTop: "40px" }} />
        <Paper style={{ marginLeft: "3%", marginRight: "10%", marginTop: "3%", paddingTop: "10px", paddingBottom: "3%" }} elevation={4}>
          <StepDetals workSpace={this.props.match.params.name} activeStep={this.state.activeStep} />
          <Grid container spacing={24} style={{ marginTop: "3%", marginLeft: "12%" }}>
            <Grid item xs={4} sm={4} lg={4} xl={4} style={{ marginTop: "10px" }}>
              <Typography gutterBottom variant="title" component="h2">
                Extracted sentences :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={7} sm={7} lg={7} xl={7} style={{ marginTop: "30px" }}>
              <Grid container spacing={8}>
                <Grid item xs={1} sm={1} lg={1} xl={1} />

                <Grid item xs={4} sm={4} lg={4} xl={4}>
                  <a
                    href={`${process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "http://auth.anuvaad.org"}/download/${
                      this.state.workspaceDetails ? this.state.workspaceDetails.sentence_file : ""
                    }`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleClick}
                      style={{ width: "85%", height: "56px", marginTop: "-30px" }}
                    >
                      Download & View
                    </Button>{" "}
                  </a>
                </Grid>

                <Grid item xs={4} sm={4} lg={4} xl={4}>
                  <Typography gutterBottom variant="title" component="h2" style={{ marginTop: "-20px" }}>
                    Found {this.state.workspaceDetails ? this.state.workspaceDetails.sentence_count : 0} sentences
                  </Typography>
                </Grid>
              </Grid>
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
  fetchWorkspaceDetails: state.fetchWorkspaceDetails
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SentenceExtraction));
