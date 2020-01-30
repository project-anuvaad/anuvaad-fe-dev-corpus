import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { blueGrey50 } from "material-ui/styles/colors";
import StarRatings from "react-star-ratings";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FetchQuestions from "../../../flux/actions/apis/fetchquestions";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import Button from "@material-ui/core/Button";

class FeedbackForm extends React.Component {
  intervalID;

  constructor(props) {
    super(props);
    this.state = {
      value: "var",
      questionList: [],
      rating: 0
    };
  }

  componentDidMount() {
    const { APITransport } = this.props;
    const apiObj = new FetchQuestions();
    APITransport(apiObj);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.feedbackQuestions !== this.props.feedbackQuestions) {
      console.log("dddd---", this.props.feedbackQuestions);
      this.setState({ questionList: this.props.feedbackQuestions });
    }
  }

  handleSubmit() {
    
      console.log("please add question properly", this.state.questionList);
    
  }

  handleRadioChange = (i, event) => {
    console.log("---", event, i);
    const a = [...this.state.questionList];
    a[i].score = event.target.value;
    this.setState({ questionList: a });
  };

  changeRating(newRating, name) {
    const a = [...this.state.questionList];
    a[name].score = newRating;
    this.setState({ questionList: a });
  }

  form() {
    return this.state.questionList.map((el, i) => (
      <Grid container spacing={24} style={{ marginTop: "1 %", marginLeft: "12%" }} key={i}>
        <Grid item xs={5} sm={5} lg={5} xl={5}>
          <Typography gutterBottom variant="title" component="h2" style={{ width: "65%", paddingTop: "30px" }}>
            {el.question}
          </Typography>
          <br />
        </Grid>
        <Grid item xs={6} sm={6} lg={6} xl={6} style={{ paddingTop: "27px" }}>
          {el.type === "Rating" ? (
            <StarRatings
              rating={this.state.questionList[i].score ? this.state.questionList[i].score : 0}
              starRatedColor="red"
              name={i}
              changeRating={this.changeRating.bind(this)}
              numberOfStars={5}
            />
          ) : (
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="position"
                style={{ height: "20px" }}
                value={this.state.questionList[i].score && this.state.questionList[i].score}
                onChange={this.handleRadioChange.bind(this, i)}
                row
              >
                <FormControlLabel value="yes" control={<Radio style={{ color: "red",marginLeft:'10%'}} />} label="Yes" labelPlacement="end" />
                <FormControlLabel value="no" control={<Radio style={{ color: "red",marginLeft:'100%' }} />} label="No" labelPlacement="end" />
              </RadioGroup>
            </FormControl>
          )}
        </Grid>
      </Grid>
    ));
  }

  render() {
    console.log("gg", this.state.questionList);
    return (
      <div>
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
            FeedBack Form
          </Typography>
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

            
            
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "81%", marginTop: "6%", height: "56px" }}
                  onClick={this.handleSubmit.bind(this)}
                >
                  Submit
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
  fetchWorkspace: state.fetchWorkspace,
  feedbackQuestions: state.feedbackQuestions
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedbackForm));
