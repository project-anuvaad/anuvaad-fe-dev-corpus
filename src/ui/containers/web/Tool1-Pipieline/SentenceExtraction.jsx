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

class SentenceExtraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,

      activeStep: 2
    };
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
        <TabDetals activeStep={this.state.value} style={{ marginLeft: "3%", marginRight: "10%", marginTop: "40px" }} />
        <Paper style={{ marginLeft: "3%", marginRight: "10%", marginTop: "3%", paddingTop: "10px", paddingBottom: "3%" }} elevation={4}>
          <StepDetals activeStep={this.state.activeStep} />
          <Grid container spacing={24} style={{ marginTop: "3%", marginLeft: "12%" }}>
            <Grid item xs={5} sm={5} lg={5} xl={5} style={{ marginTop: "10px" }}>
              <Typography gutterBottom variant="title" component="h2">
                Negative tokens :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6} style={{ marginTop: "10px" }}>
              <Grid container spacing={8}>
                <Grid item xs={4} sm={4} lg={4} xl={4} style={{ marginTop: "-30px" }}>
                  <Button variant="contained" color="primary" style={{ width: "85%", marginTop: "6%", height: "56px" }}>
                    Download & View
                  </Button>
                </Grid>

                <Grid item xs={6} sm={6} lg={6} xl={6}>
                  <Typography gutterBottom variant="title" component="h2">
                    Found 0 tokens
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
  corpus: state.corpus
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
