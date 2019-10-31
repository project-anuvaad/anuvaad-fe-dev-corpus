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
import GraderViewBenchmark from "./GraderViewBenchmark";
import CreateBenchmark from "./UploadBenchmark";
import SearchIcon from "@material-ui/icons/Search";
import UploadFile from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import ScrollArea from "react-scrollbar";
const styles = theme => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    marginTop: "500px",
    marginRight: theme.spacing.unit * 2,
    marginLeft: "300px",
    width: "100%",
    open1: true
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
      file: {},
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
      console.log("sajish")
    
    if (e.target.textContent) {
      this.setState({ value: e.target.textContent,sentences:[], index, base: basename });
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
          createBenchmark: true, base:'', value:'',open1:true
      })
  }

  render() {
    const { base } = this.props;

    console.log(base)

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={3} sm={3} lg={3} xl={3} style={{marginLeft:'-130px'}}>
            
              <div>
                <div
                  style={{
                    marginBottom: "68px",
                    width:'90%',
                    marginTop: "-20px",
                    minWidth: "100px",
                    minHeight: '84vh',
                    paddingBottom:'40px',
                    backgroundColor: "#F3F3F8"
                  }}
                >
                 <Typography variant="h6" color="inherit"style={{ paddingTop: "40px",marginLeft:'15%' }} ><b>Benchmark List</b><br/></Typography>

                  <ScrollArea>
                    {this.state.name.map((i, index) => {
                      console.log("i", i);
                      return (
                        <div
                          style={{
                            backgroundColor: "#F3F3F8",
                            color: this.state.value === i.name && index == this.state.index ? "#CB1E60" : "black",
                            marginLeft: "20px",
                            paddingLeft: "50px",
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
                      width: "21.2%",
                      marginLeft: "-53px",
                      height: 96,
                      backgroundColor: "#CB1E60",

                      margin: 0,
                      top: "auto",
                      left: 0,
                      bottom: 2,

                      position: "fixed",
                      paddingLeft: "30px",
                      color: "white"
                    }}
                  >
                    <UploadFile fontSize="large" />
                    &nbsp;&nbsp;&nbsp;Upload Benchmark
                    
                  </Button>
                </div>
              </div>
            
          </Grid>

          <Grid item xs={8} sm={8} lg={8} xl={8} style={{position:"fixed", marginLeft:'20%'}}>
            
            {!this.state.base && this.state.createBenchmark ? (
              <CreateBenchmark open1={this.state.open1}/>
            ) : this.state.base ? (
              <div>
                <GraderViewBenchmark base={this.state.base}/>
              </div>
            ):''}
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
