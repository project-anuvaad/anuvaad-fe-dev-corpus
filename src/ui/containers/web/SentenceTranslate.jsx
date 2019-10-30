import { Form, TextArea } from "semantic-ui-react";

import React from "react";
import { withRouter } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import NewCorpusStyle from "../../styles/web/Newcorpus";
import history from "../../../web.history";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Models from "./Models";
class SentenceTranslate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false
    };
  }

  componentDidMount() {
    this.setState({
      hindi: []
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.apistatus !== this.props.apistatus) {
      this.setState({ showLoader: true });
      setTimeout(() => {
        history.push(`${process.env.PUBLIC_URL}/translations`);
      }, 3000);
    }
  }

  handleSelectChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFileChange = e => {
    if (e.target.files[0]) {
      this.setState({
        file: e.target.files[0]
      });
    }
  };

  handleSelechange = event => {
    this.setState({ pageCount: event.target.value, offset: 0 });
  };

  handleSubmit() {
    console.log(this.state.source, this.state.target, this.state.text);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h5" color="inherit" style={{ marginTop: "20px" }}>
          <b>Translate Text</b>
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={6} lg={6} xl={6}>
            <Form style={{ marginTop: "30px" }}>
              <AppBar position="static">
                <Toolbar>
                  <Select
                    width="100%"
                    value={this.state.source}
                    style={{ background: "white", fill: "white", width: "150px" }}
                    onChange={event => {
                      this.handleSelectChange("source", event);
                    }}
                    displayEmpty
                  >
                    <MenuItem value={"english"}>English</MenuItem>
                    <MenuItem value={"hindi"}>Hindi</MenuItem>
                  </Select>

                  <Typography variant="h6" color="inherit" style={{ marginLeft: "20%", flex: 1 }}>
                    Translate to
                  </Typography>

                  <Select
                    width="100%"
                    style={{ background: "white", marginRight: "50px", width: "150px" }}
                    value={this.state.target}
                    onChange={event => {
                      this.handleSelectChange("target", event);
                    }}
                    displayEmpty
                  >
                    <MenuItem value={"english"}>English</MenuItem>
                    <MenuItem value={"hindi"}>Hindi</MenuItem>
                  </Select>
                </Toolbar>
              </AppBar>
              <TextArea
                placeholder="Enter the text to translate"
                value={this.state.text}
                onChange={event => {
                  this.handleSelectChange("text", event);
                }}
                style={{ minWidth: "99.3%",maxWidth:'99.3%', minHeight: "162px",maxHeight: "162px", fontSize: "20px" }}
              />
            </Form>
          </Grid>
          <Grid item xs={6} sm={6} lg={6} xl={6} style={{ marginBottom: "5%", paddingTop: "180px" }}>
            {/* <Button variant="contained" color="primary" className={classes.button} onClick={() => { history.push(`${process.env.PUBLIC_URL}/translations`) }}>Cancel</Button> */}
            <Button variant="contained" color="primary" className={classes.buttons} onClick={this.handleSubmit.bind(this)}>
              Translate
            </Button>
          </Grid>
        </Grid>
        <Models />
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

export default withRouter(
  withStyles(NewCorpusStyle)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SentenceTranslate)
  )
);
