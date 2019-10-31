import React from "react";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import UploadBenchmark from "../../../flux/actions/apis/uploadbenchmark";
// import Snackbar from "@material-ui/core/Snackbar";
// import MySnackbarContentWrapper from "../../components/web/common/snackbar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { withStyles } from "@material-ui/core";
import NewCorpusStyle from "../../styles/web/Newcorpus";
import Input from "@material-ui/core/Input";
import history from "../../../web.history";

import { DropzoneArea } from "material-ui-dropzone";


class UploadBenchmarkfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add_name: "",
      apiCalled: false,
      file: [],
      open: false,
      message: "Benchmark added successfully",
      token: false,
      open1: true,
      val: 0,
      warning: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.apistatus.progress !== this.props.apistatus.progress) {
      this.setState({
        add_name:'',
        file: [],
        source:'',
        open:true


      })
    }
  }

  handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleSelectChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleFileChange = e => {
    if (e.target.files[0]) {
      this.setState({
        file: e.target.files[0]
      });
    }
  };

  handleMultiFileChange = e => {
    if (e.target.files[0]) {
      this.setState({
        [e.target.name]: e.target.files[0]
      });
    }
  };

  handleSource = files => {
    this.setState({
      file: files, tocken: true
    });
  };

  

  handleBack = () => {
    this.setState({open1:false})
  };

  handleClose = () => {
    this.setState({ open: false, snack: false });
};

  handleSubmit() {

    const apiObj = new UploadBenchmark(
         this.state.file,
        this.state.add_name,
         this.state.source
       );
      this.props.APITransport(apiObj);
      this.setState({ showLoader: true, tocken: false });
    
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
     
      <div style={{marginLeft:'100px',marginTop:'60px'}}>
        
        <div style={{ Top: "15px", PaddingBottom: "5px" }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="Add Name">Benckmark filename*</InputLabel>
            <Input
            value={this.state.add_name}
            style={{width:'200%'}}
              id="name"
              required
              onChange={event => {
                this.handleTextChange("add_name", event);
              }}
            />
            <span style={{ color: "red" }}>{this.state.nameError}</span>
          </FormControl>
        </div>

        <br />
        <br />

        <AppBar position="static" style={{width:'200%'}}>
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
                    <MenuItem value={"English"}>English</MenuItem>
                    <MenuItem value={"Hindi"}>Hindi</MenuItem>
                  </Select>

                </Toolbar>
              </AppBar>
        <div style={{width:'200%'}}>
        <DropzoneArea
        style={{width:'200%'}}
          Dropzoneiles=""
          onDrop={this.handleSource}
          id="source"
          showPreviewsInDropzone={this.state.tocken}
          acceptedFiles={[".txt"]}
          dropzoneText="Please Add/Drop txt file here"
          filesLimit={1}
        ></DropzoneArea>
        </div>

        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleBack}>
          {" "}
          Cancel{" "}
        </Button>
        <Button variant="contained" color="primary" className={classes.buttons} onClick={this.handleSubmit.bind(this)}>
          Submit
        </Button>

        {/* <Snackbar style = {{marginTop:'50px'}}anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={this.handleClose} open={this.state.open} autoHideDuration={6000}>
          <MySnackbarContentWrapper onClose={this.handleClose} variant="success" message={this.state.message} />
        </Snackbar> */}
        </div>
        
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
    )(UploadBenchmarkfile)
  )
);
