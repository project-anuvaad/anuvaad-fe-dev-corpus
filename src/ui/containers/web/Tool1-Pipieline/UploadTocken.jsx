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

class ApplyToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      processData: 'Press "Next" to extract sentences',
      activeStep: 1
    };
  }

  handleSubmit() {
    history.push(`${process.env.PUBLIC_URL}/sentence-extraction`);
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
            
            <Grid item xs={3} sm={3} lg={3} xl={3} style={{ marginTop: "30px" }}>
              <Typography gutterBottom variant="title" component="h2">
                Positive tokens :
              </Typography>
              <br />
            </Grid>
              <Grid item xs={7} sm={7} lg={7} xl={7}>
                <Grid container spacing={8}>
                  <Grid item xs={3} sm={3} lg={3} xl={3}>
                    <FileUpload accept=".csv" buttonName="Upload" handleChange={this.handleChange.bind(this)} name="csvFile" />
                  </Grid>

                  <Grid item xs={4} sm={4} lg={3} xl={3}>
                    <TextField
                      value={this.state.configName}
                      id="outlined-name"
                      disabled
                      margin="normal"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={1} sm={1} lg={1} xl={1}>
                    <Typography gutterBottom variant="title" component="h2" style={{ marginTop: "30px", marginLeft: "15%" }}>
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
                  <FileUpload accept=".csv" buttonName="Upload" handleChange={this.handleChange.bind(this)} name="csvFile" />
                </Grid>

                <Grid item xs={4} sm={4} lg={3} xl={3}>
                  <TextField
                    value={this.state.configName}
                    id="outlined-name"
                    disabled
                    margin="normal"
                    variant="outlined"
                    style={{  width: "100%" }}
                  />
                </Grid>
                <Grid item xs={1} sm={1} lg={1} xl={1}>
                  <Typography gutterBottom variant="title" component="h2" style={{ marginTop: "30px", marginLeft: "15%" }}>
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

            <Grid item xs={4} sm={4} lg={4} xl={4} style={{ marginTop: "56px" }}>
              <Typography variant="subtitle" color="inherit" style={{ textAlign: "justify", color: "#ACACAC", width: "80%", marginLeft: "2px" }}>
                {this.state.processData}
              </Typography>
              <br />
            </Grid>
            <Grid item xs={7} sm={7} lg={7} xl={7} style={{ marginTop: "40px",marginLeft:'30px' }}>
              <Button variant="contained" color="primary" style={{ width: "60%", height: "56px" }} onClick={this.handleSubmit.bind(this)}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplyToken));
