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
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FetchWorkspaceDetails from "../../../../flux/actions/apis/fetchsearchreplacedetails";
import TextField from "@material-ui/core/TextField";

class SentenceExtraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      activeStep: 2,
      copied: false
    };
  }

  componentDidMount() {
    const { APITransport } = this.props;
    const api = new FetchWorkspaceDetails(this.props.match.params.session_id);
    APITransport(api);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchWorkspaceDetails !== this.props.fetchWorkspaceDetails) {

        console.log("result------",this.props.fetchWorkspaceDetails.data)
      this.setState({ workspaceDetails: this.props.fetchWorkspaceDetails.data, detail : this.props.fetchWorkspaceDetails.data.sentence_file_full_path });
    }
  }

  handleChange = (key, event) => {
    this.setState({
      activeStep: 3,
      [key]: event.target.files[0],
      configName: key === "configFile" ? event.target.files[0].name : this.state.configName,
      csvName: key === "csvFile" ? event.target.files[0].name : this.state.csvName
    });
  };

  render() {
      console.log("name",this.props)
    return (
      <div>
        <TabDetals activeStep={this.state.value} style={{ marginLeft: "3%", marginRight: "10%", marginTop: "40px" }} />
        <Paper style={{ marginLeft: "3%", marginRight: "10%", marginTop: "3%", paddingTop: "10px", paddingBottom: "3%" }} elevation={4}>
        <Grid container spacing={24} style={{ marginTop: "3%", marginLeft: "12%" }}>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <Typography gutterBottom variant="title" component="h2" style={{ width: "65%", paddingTop: "30px" }}>
                  Workspace name :
              </Typography>
                <br />
              </Grid>
              <Grid item xs={7} sm={7} lg={7} xl={7}>
                <TextField
                disabled
                  value={this.props.match.params.name} 
                  required
                  id="outlined-name"
                  margin="normal"
                  onChange={event => {
                    this.handleTextChange("workspaceName", event);
                  }}
                  variant="outlined"
                  style={{ width: "63%" }}
                />
              </Grid>
              </Grid>
          
          <Grid container spacing={24} style={{ marginTop: "3%", marginLeft: "12%" }}>
            <Grid item xs={4} sm={4} lg={4} xl={4} style={{ marginTop: "10px" }}>
              <Typography gutterBottom variant="title" component="h2">
                Extracted sentences :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={7} sm={7} lg={7} xl={7} style={{ marginTop: "30px" }}>
              <Grid container spacing={8}>
                
              
                <Grid item xs={4} sm={4} lg={4} xl={4}>
                  <a

                  
                    href={ `${process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "http://auth.anuvaad.org"}/download/${
                      this.state.workspaceDetails ? this.state.workspaceDetails.sentence_file : ""
                    }`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: "85%", height: "56px", marginTop: "-30px" }}
                    >
                      Download & View
                    </Button>{" "}
                  </a>
                </Grid>

                <Grid item xs={4} sm={4} lg={4} xl={4}>
                  <Typography gutterBottom variant="title" component="h2" style={{ marginTop: "-20px" }}>
                    Found {this.state.workspaceDetails && this.state.workspaceDetails.sentence_count} sentences
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={24} style={{ marginTop: "3%", marginLeft: "12%" }}>
            <Grid item xs={4} sm={4} lg={4} xl={4} style={{ marginTop: "10px" }}>
              <Typography gutterBottom variant="title" component="h2">
                File path :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={7} sm={7} lg={7} xl={7} >
              <Grid container spacing={8}>
                
              
                <Grid item xs={6} sm={6} lg={6} xl={6}>
                {this.state.workspaceDetails ? this.state.workspaceDetails.sentence_file_full_path : ""
                    }
                 
                </Grid>

                <Grid item xs={2} sm={2} lg={2} xl={2}style={{ marginTop: "30px" }}>
                <CopyToClipboard text={this.state.detail}
          onCopy={() => this.setState({copied: true})}>
                <Button
                      variant="contained"
                      color="primary"
                      style={{ width: "80%", height: "56px", marginTop: "-30px" }}
                    >
                      Copy
                    </Button>
                    
                    </CopyToClipboard>
                    
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
