import React from "react";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import FetchBenchmark from "../../../flux/actions/apis/benchmark";
import { withStyles } from "@material-ui/core/styles";
import NewCorpusStyle from "../../styles/web/Newcorpus";
import Typography from "@material-ui/core/Typography";

import CreateCorpus from "./CreateCorpus";
import SearchIcon from "@material-ui/icons/Search";
import UploadFile from "@material-ui/icons/CloudUpload";
import InputBase from "@material-ui/core/InputBase";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import ScrollArea from "react-scrollbar";
const styles = theme => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    marginTop: "500px",
    marginRight: theme.spacing.unit * 2,
    marginLeft: "300px",
    width: "100%"
  },
  searchIcon: {
    marginTop: "500px",
    marginLeft: "30px",
    height: "100%",

    pointerEvents: "none",
    alignItems: "center",
    justifyContent: "center"
  }
});
class GarderTranslate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: [],
      apiCalled: false,
      hindi: [],
      english: [],
      hindi_score: [],
      english_score: [],
      file: {},
      corpus_type: "single",
      hindiFile: {},
      englishFile: {},
      role: JSON.parse(localStorage.getItem("roles")),
      sentences: [],
      createBenchmark: false
    };
  }

  componentDidMount() {
    const { APITransport } = this.props;
    const apiObj = new FetchBenchmark();
    APITransport(apiObj);
    this.setState({ showLoader: true });
  }

  handleFetchSentence(e, index, basename) {
    
    if (e.target.textContent) {
      this.setState({ value: e.target.textContent, index, base: basename });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchBenchmark !== this.props.fetchBenchmark) {
      console.log(this.props.fetchBenchmark);
      this.setState({ name: this.props.fetchBenchmark });
    }

    if (prevProps.sentences !== this.props.sentences) {
      console.log("props----", this.props.sentences);
      this.setState({
        sentences: this.props.sentences
      });
    }
  }

  handleSubmit=()=>{
      console.log("clicked")
      this.setState({
          createBenchmark: true
      })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={3} sm={3} lg={3} xl={3} style={{marginLeft:'-115px'}}>
            
              <div>
                <div
                  style={{
                    marginBottom: "68px",
                    
                    marginTop: "-20px",
                    minWidth: "100px",
                    minHeight: '84vh',
                    backgroundColor: "#F3F3F8"
                  }}
                >
                  <TextField
                    style={{ marginLeft: "53px", paddingLeft: "30px", width: "77%", paddingTop: "30px" }}
                    id="input-with-icon-textfield"
                   
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      )
                    }}
                  />

                  <ScrollArea>
                    {this.state.name.map((i, index) => {
                      console.log("i", i);
                      return (
                        <div
                          style={{
                            backgroundColor: "#F3F3F8",
                            color: this.state.value === i.name && index == this.state.index ? "#CB1E60" : "black",
                            marginLeft: "53px",
                            paddingLeft: "30px",
                            paddingTop: "30px",
                            paddingBottom: "10px",
                            cursor: "pointer",
                            fontWeight: this.state.value === i.name && index == this.state.index ? "bold" : "normal"
                          }}
                          key={index}
                        >
                          <div
                            onClick={e => {
                              this.handleFetchSentence(e, index, i.basename);
                            }}
                          >
                            {i.name}
                            <br />
                          </div>
                        </div>
                      );
                    })}
                  </ScrollArea>
                </div>
                <div>
                  <Button
                    onClick = {this.handleSubmit}
                    variant="contained"
                    style={{
                      width: "23.3%",
                      marginLeft: "53px",
                      height: 96,
                      backgroundColor: "#CB1E60",
                      margin: 0,
                      top: "auto",
                      left: 20,
                      bottom: 2,

                      position: "fixed",
                      paddingLeft: "30px",
                      color: "white"
                    }}
                  >
                    <UploadFile fontSize="large" />
                    &nbsp;&nbsp;&nbsp;Upload Training Data
                    
                  </Button>
                </div>
              </div>
            
          </Grid>

          <Grid item xs={8} sm={8} lg={8} xl={8} style={{position:"fixed", marginLeft:'20%'}}>
            {this.state.base}
            {!this.state.base && this.state.createBenchmark ? (
              <CreateCorpus/>
            ) : (
              <div>
                
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  fetchBenchmark: state.fetchBenchmark,
  sentences: state.sentences
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
    )(GarderTranslate)
  )
);
