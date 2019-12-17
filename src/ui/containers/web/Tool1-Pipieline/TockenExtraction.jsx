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
import FileUpload from "../../../components/web/common/FileUpload";
import history from "../../../../web.history";

class TokenExtraction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value:1,
            steps:["Token extraction", "Apply token", "Extract sentences"],
            activeStep:0,
            processData: 'Press "Next" to goto Step 2'
            
        }
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
                <TabDetals activeStep={this.state.value} style={{ marginLeft: "3%", marginRight: "10%", marginTop: "40px"}}/>
                <Paper style={{ marginLeft: "3%", marginRight: "10%", marginTop: "3%", paddingTop: "10px", paddingBottom: "3%" }} elevation={4}>
                <StepDetals activeStep={this.state.activeStep}/>

                <Grid container spacing={24} style={{ marginTop: "3%", marginLeft: "12%" }}>
            <Grid item xs={5} sm={5} lg={5} xl={5}>
              <Typography gutterBottom variant="title" component="h2" >
              Extracted positive tokens :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6} >
            <Grid container spacing={8}>
                <Grid item xs={4} sm={4} lg={4} xl={4} style={{  marginTop: "-27px" }}>
                  <FileUpload accept=".csv" buttonName="Download" handleChange={this.handleChange.bind(this)} name="configFile" />
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
              Extracted negative tokens :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6}  style={{  marginTop: "40px" }} >
            <Grid container spacing={8}>
                <Grid item xs={4} sm={4} lg={4} xl={4} style={{  marginTop: "-27px" }}>
                  <FileUpload accept=".csv" buttonName="Download" handleChange={this.handleChange.bind(this)} name="configFile" />
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
                variant="subtitle"
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
    corpus: state.corpus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
    CreateCorpus: APITransport,
}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TokenExtraction));