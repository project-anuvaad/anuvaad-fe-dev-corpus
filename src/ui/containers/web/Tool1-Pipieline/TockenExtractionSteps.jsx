import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import TabDetals from "./WorkspaceDetailsTab";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import Stepper from "../../../components/web/common/Stepper";

class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      steps: ["Token extraction", "Apply token", "Sentence Extraction"],
      activeStep: 1
    };
  }

  render() {
    return (
      <div>
        <Stepper steps={this.state.steps} activeStep={this.props.activeStep} alternativeLabel style={{ marginTop: "3%",marginRight:'3%' }}/>
        <Grid container spacing={24} style={{  marginLeft: "12%" }}>
          <Grid item xs={5} sm={5} lg={5} xl={5}>
            <Typography gutterBottom variant="title" component="h2" style={{ width: "65%", paddingTop: "30px" }}>
              Workspace name :
            </Typography>
            <br />
          </Grid>
          <Grid item xs={6} sm={6} lg={6} xl={6}>
            <TextField
              value={this.props.workSpace}
              disabled
              id="outlined-name"
              margin="normal"
              onChange={event => {
                this.handleTextChange("workspaceName", event);
              }}
              variant="outlined"
              style={{ width: "60%" }}
            />
          </Grid>
        </Grid>
        
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Steps));
