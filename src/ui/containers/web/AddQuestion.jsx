import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { blueGrey50 } from "material-ui/styles/colors";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "../../components/web/common/Snackbar";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import history from "../../../web.history";
import ConfigUpload from "../../../flux/actions/apis/configupload";

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionType: "",
      question: "",
      questionTypeList: ["Rating", "Yes/No"],
      message1: "Question added successfully",
      values: [],
      res:[]
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.createWorkspaceDetails !== this.props.createWorkspaceDetails) {
      this.setState({
        open: true
      });
      setTimeout(() => {
        history.push(`${process.env.PUBLIC_URL}/stage2/datasource`);
      }, 3000);
    }
  }

  handleTextChange( event, i) {
    console.log(event.target,i )
  const values = [...this.state.values];
  const res=[...this.state.res];
  values[i] = event.target.value;
  var data = this.state.res.length>=i+1? this.state.res[i]:{};
  data["question"] = event.target.value;
  res[i]=(data);
  this.setState({ values,  res});
  

}

  handleSelectChange = (event,i) => {
      const res=[...this.state.res];
      console.log(this.state.res)
      

      
var data = this.state.res.length>=i+1? this.state.res[i]:{};
data["type"] = event.target.value;
res[i]=(data);
      
    
    
    this.setState({ res });
  };

  addClick() {
      console.log(this.state.values)
    this.setState(prevState => ({ values: [...prevState.values, ""] }));
  }

  form() {
    return this.state.values.map((el, i) => (
      <Grid container spacing={24} style={{ marginTop: "1 %", marginLeft: "12%" }}>
        <Grid item xs={5} sm={5} lg={5} xl={5}>
          <Typography gutterBottom variant="title" component="h2" style={{ width: "65%", paddingTop: "30px" }}>
            Enter Question :
          </Typography>
          <br />
        </Grid>
        <Grid item xs={6} sm={6} lg={6} xl={6}>
          <TextField
            value={el||''}
            required
            multiline
            type="text"
            id="outlined-name"
            margin="normal"
            onChange={event => {
              this.handleTextChange(event, i);
            }}
            variant="outlined"
            style={{ width: "60%" }}
          />
        </Grid>

        <Grid item xs={5} sm={5} lg={5} xl={5}>
          <Typography gutterBottom variant="title" component="h2" style={{ width: "80%", paddingTop: "25px" }}>
            Question Type : &emsp;&emsp;{" "}
          </Typography>
          <br />
        </Grid>
        <Grid item xs={6} sm={6} lg={6} xl={6} style={{ height: "56px" }}>
          <Select
            style={{ width: "60%", marginTop: "5px" }}
            value={this.state.res && this.state.res[i] && this.state.res[i].type? this.state.res[i].type:''}
            onChange={event => {
                this.handleSelectChange(event, i);
              }}
            
            input={<OutlinedInput name="questionType" id="outlined-age-simple" />}
          >
            {this.state.questionTypeList.map(item => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    ));
  }

  handleSubmit() {
    

      console.log(this.state.res);
    
  }

  render() {
    return (
      <div>
        {/* <Toolbar style={{  marginRight: "8.5%", marginTop: "20px",marginBottom:'15px' }}>
          <Typography variant="title" color="inherit" style={{ flex: 1 }}></Typography>
          
            <Button
              variant="extendedFab"
              color="primary"
              
              onClick={() => {
                history.push(`${process.env.PUBLIC_URL}/stage2/datasource`);
              }}
            >
              <BackIcon /> Back
            </Button>
        </Toolbar> */}

        <Paper style={{ marginLeft: "3%", marginRight: "10%", marginTop: "1%", paddingTop: "5px", paddingBottom: "3%" }} elevation={4}>
          <Typography
            gutterBottom
            variant="title"
            component="h2"
            style={{
              marginTop: "-.7%",
              paddingLeft: "44%",
              background: blueGrey50,
              paddingTop: "25px",
              paddingBottom: "16px"
            }}
          >
            Add Questions
          </Typography>
          <br />
          {this.form()}
          <Grid container spacing={24} style={{ marginTop: "1 %", marginLeft: "12%" }}>
            <Grid item xs={5} sm={5} lg={5} xl={5}>
              <Typography
                variant="subtitle2"
                color="inherit"
                style={{ textAlign: "justify", color: "#ACACAC", marginTop: "10%", width: "80%", marginLeft: "2px" }}
              />
              <br />
            </Grid>

            <Grid item xs={2} sm={2} lg={2} xl={2}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "80%", marginTop: "6%", height: "56px" }}
                onClick={this.addClick.bind(this)}
              >
                Add
              </Button>
            </Grid>
            {this.state.res.length>0 &&
            <Grid item xs={2} sm={2} lg={2} xl={2}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "81%", marginTop: "6%", height: "56px" }}
                onClick={this.handleSubmit.bind(this)}
              >
                Submit
              </Button>
            </Grid>
  }
          </Grid>
        </Paper>

        {this.state.open && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.open}
            autoHideDuration={3000}
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
  fetchDefaultConfig: state.fetchDefaultConfig,
  createWorkspaceDetails: state.createWorkspaceDetails
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddQuestion));
