import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Snackbar from "../../../components/web/common/Snackbar";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import TabDetals from "./WorkspaceDetailsTab";
import FetchSearch from "../../../../flux/actions/apis/fetchsearchreplace";
import FetchSearchReplace from "../../../../flux/actions/apis/sentencereplace";
import history from "../../../../web.history";


const styles = theme => ({
  card: {
    color: "#9C27B0",
    fontSize: 18
  }
});

class SentenceQualityCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      target: "",
      source: "",
      sentence: "",
      sentenceDetails: '',
      selectedWorkspaces: [],
      workspaceName: "",
      sourceLanguage: [],
      language: [],
      step: 1,
      count: 1,
      message1: 'Process started, This might be long running operation, kindly look the status of your workspace under "Processing Workspace" tab',
      csvData:
        '"Accept and Next", will qualify current sentence pair by replacing target sentence with the eligible token. This action makes current sentence pair as "good sentence pair". This means HT step will be skipped for this sentence pair',
      processData: 'Press "Next" to select relevant input workspaces'
    };
  }

  componentDidMount() {
    const { APITransport } = this.props;
    const apiObj = new FetchSearch(this.props.match.params.session_id);
    APITransport(apiObj);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchSearch !== this.props.fetchSearch) {
      console.log("result-----",this.props.fetchSearch)
      this.setState({ sentence: this.props.fetchSearch.data, count: this.props.fetchSearch.count});
    }

    if (prevProps.sentenceReplace !== this.props.sentenceReplace) {
      if (this.state.count !== 1) {
        const { APITransport } = this.props;
        const apiObj = new FetchSearch(this.props.match.params.session_id);
        APITransport(apiObj);
      } else {
        this.setState({ open: true, sentence: {}, message1: "Process completed Successfully" });
        setTimeout(() => {
          history.push(`${process.env.PUBLIC_URL}/stage3/existing-workspace`);
        }, 2000);
      }
    }
  }

  handleSubmit = (value, val) => {
    console.log(val);
    if (val) {
      value.accepted = true;
    }
    const { APITransport } = this.props;
    const apiObj = new FetchSearchReplace(value);
    APITransport(apiObj);
  };

  render() {
    const { classes } = this.props;
    console.log("params", this.props.match);
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
            <Grid item xs={8} sm={8} lg={8} xl={8}>
            <Card  style={{ width: "70%" }} className={classes.card}>
                    <CardContent>
                      {this.props.match.params.name}

                    </CardContent>
                  </Card>
            </Grid>

            <Grid item xs={2} sm={2} lg={2} xl={2}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "90%", paddingTop: "30px" }}>
                Found sentences :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={2} sm={2} lg={2} xl={2}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "65%", paddingTop: "30px" }}>
                {this.state.sentence.found_sentences && this.state.sentence.found_sentences +" / "+ this.state.sentence.total_sentences}
              </Typography>
              <br />
            </Grid>
            <Grid item xs={8} sm={8} lg={8} xl={8}>
            <Card  style={{ width: "70%" }} className={classes.card}>
                    <CardContent>
                     
                      {this.state.sentence.found_sentences && 'Source ngram : '+this.state.sentence.source_search+   ', Target ngram : '+this.state.sentence.target_search+', Replacement ngram : '+this.state.sentence.replace}
                      
                    
                    </CardContent>
                  </Card>
            </Grid>

            <Grid item xs={4} sm={4} lg={4} xl={4}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "65%", paddingTop: "30px" }}>
                Source sentence :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={8} sm={8} lg={8} xl={8}>

            <Card  style={{ width: "70%" }} className={classes.card}>
                    <CardContent>
                      
                      {this.state.sentence.source}
                      
                    
                    </CardContent>
                  </Card>
            </Grid>

            <Grid item xs={4} sm={4} lg={4} xl={4}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "65%", paddingTop: "30px" }}>
                Target sentence :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={8} sm={8} lg={8} xl={8}>
            <Card  style={{ width: "70%" }} className={classes.card}>
                    <CardContent>
                      
                      {this.state.sentence.target}
                      
                    
                    </CardContent>
                  </Card>
            </Grid>

            <Grid item xs={4} sm={4} lg={4} xl={4}>
              <Typography gutterBottom variant="title" component="h2" style={{ width: "65%", paddingTop: "30px" }}>
                Replaced sentence :
              </Typography>
              <br />
            </Grid>
            <Grid item xs={8} sm={8} lg={8} xl={8}>
            <Card  style={{ width: "70%" }} className={classes.card}>
                    <CardContent>
                {this.state.sentence.updated}
                      
                    
                    </CardContent>
                  </Card>
            </Grid>

            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <Typography
                variant="subtitle2"
                color="inherit"
                style={{ textAlign: "center", color: "#ACACAC", marginRight: "20%", marginTop: "10px" }}
              >
                {this.state.csvData}
              </Typography>
            </Grid>

            <Grid item xs={5} sm={5} lg={5} xl={5}>
              <Button
                variant="contained"
                color="primary"
                value="rejected"
                style={{ width: "80%", marginLeft: "40px", marginTop: "3%", height: "56px" }}
                onClick={event => {
                  this.handleSubmit(this.state.sentence, false);
                }}
              >
                {this.state.count > 1 ? "Ignore and Next": "Ignore"}
              </Button>
            </Grid>
            <Grid item xs={5} sm={5} lg={5} xl={5}>
              <Button
                variant="contained"
                value="accepted"
                color="primary"
                style={{ width: "80%", marginTop: "3%", height: "56px" }}
                onClick={event => {
                  this.handleSubmit(this.state.sentence, true);
                }}
              >
                { this.state.count > 1 ? "Accept and Next" : "Accept"}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {this.state.open && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.open}
            autoHideDuration={2000}
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
  configUplaod: state.configUplaod,
  fetchSearch: state.fetchSearch,
  sentenceReplace: state.sentenceReplace
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SentenceQualityCheck)));
