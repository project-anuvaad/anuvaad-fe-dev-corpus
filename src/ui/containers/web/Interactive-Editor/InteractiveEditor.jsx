import React from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import "../../../styles/web/InteractiveEditor.css";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Toolbar from "@material-ui/core/Toolbar";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import DoneIcon from "@material-ui/icons/Done";
import { translate } from "../../../../assets/localisation";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import Editor from "./Editor";
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import FetchDoc from "../../../../flux/actions/apis/fetchdocsentence";
import history from "../../../../web.history";
class IntractiveTrans extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      collapseToken: false,
      gridValue: 4,
      message: translate("intractive_translate.page.snackbar.message")
    };
  }

  handleClick(value, gridValue) {
    this.setState({ collapseToken: value, gridValue });
  }

  handleBack() {
    history.push(`${process.env.PUBLIC_URL}/viewtranslate`);
  }

  componentDidMount() {
    const { APITransport } = this.props;
    const apiObj = new FetchDoc("b565656b-6919-4c8b-92bb-d1bba070f6a4");
    APITransport(apiObj);

  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchPdfSentence !== this.props.fetchPdfSentence) {
      console.log(this.props.fetchPdfSentence)
      this.setState({ sentences: this.props.fetchPdfSentence });
    }
  }

  render() {
    const { gridValue } = this.state;
    return (
      <div style={{ marginLeft: "-100px" }}>
        <Grid container spacing={8} style={{ padding: "0 24px 12px 24px" }}>
          <Grid item xs={12} sm={6} lg={2} xl={2} className= 'GridFileDetails'>
            <Button variant="outlined" size="large" onClick={event => {
                      this.handleBack();
                    }} color="primary" style={{ width: "100%",minWidth:'150px',fontSize:'90%',fontWeight:'bold' }}>
              <ChevronLeftIcon fontSize="large" /> &nbsp;&nbsp;Documents
            </Button>
          </Grid>
          <Grid item xs={false} sm={6} lg={8} xl={8} className= 'GridFileDetails'>
          
            <Button variant="outlined" size="large" className= 'GridFileDetails' style={{ width: "100%", pointerEvents: "none",fontSize:'90%', fontWeight:'bold' }}>
              <PlayArrowIcon fontSize="large" style={{color: 'grey'}}/> Source : English 
              <PlayArrowIcon fontSize="large" style={{color: 'grey'}}/> Target : Hindi
              <PlayArrowIcon fontSize="large" style={{color: 'grey'}}/> File name : 6251_2016_3_1501_19387_Judgement_06-Jan-2020 copy.docx
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} lg={1} xl={1}>
            <Button variant="outlined" size="large" color="primary" style={{ width: "100%",minWidth:'110px',fontSize:'90%' , fontWeight:'bold'}}>
              <VisibilityIcon fontSize="large" />
              &nbsp;&nbsp;Preview
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} lg={1} xl={1} >
            <Button variant="outlined" size="large" color="primary" style={{ width: "100%",minWidth:'55px',fontSize:'90%', fontWeight:'bold' }}>
              <DoneIcon fontSize="large" />&nbsp;&nbsp;Done
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={16} style={{ padding: "0 24px 24px 24px" }}>
          {!this.state.collapseToken ? (
            <Grid item xs={12} sm={6} lg={4} xl={4} className= 'GridFileDetails'>
              <Paper elevation={2} style={{ height: "100%", paddingBottom: "10px" }}>
                <Toolbar>
                  <Typography value="" variant="h6" gutterBottom style={{ paddingTop: "10px", flex: 1, marginLeft: "3%" }}>
                    Source
                  </Typography>
                  <Toolbar onClick={event => {
                      this.handleClick(true, 7);
                    }}>
                  <KeyboardBackspaceIcon style= {{cursor: "pointer"}}
                    color="primary"
                    
                  />
                  <Typography value="" variant="subtitle2" color="primary" style= {{cursor: "pointer"}}>
                    Collapse
                  </Typography>
                  </Toolbar>
                </Toolbar>
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={1} sm={1} lg={1} xl={1}>
              <Paper elevation={2} style={{ height: "50px", paddingBottom: "15px" }}>
              <Toolbar onClick={event => {
                  this.handleClick(false, 4);
                }} >
              <KeyboardTabIcon
                color="primary"
                style= {{cursor: "pointer"}}
              />  &nbsp;&nbsp;
              <Typography value="" variant="subtitle2" color="primary" style= {{cursor: "pointer"}}>
                Source
              </Typography>
              </Toolbar>
              </Paper>
            </Grid>
            
          )}
          <Grid item xs={12} sm={6} lg={4} xl={4} className= 'GridFileDetails'>
            <Paper elevation={2} style={{ height: "100%", paddingBottom: "10px" }}>
              <Typography value="" variant="h6" gutterBottom style={{ paddingTop: "10px", marginLeft: "3%" }}>
                Target
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} lg={gridValue} xl={gridValue}>
          {this.state.sentences && this.state.sentences[0]&& <Editor sentences = {this.state.sentences}/>}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  fetchPdfSentence: state.fetchPdfSentence
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      NMTApi: APITransport,
      NMTSPApi: APITransport,
      MODELApi: APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IntractiveTrans));
