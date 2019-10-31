import React from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Typography from "@material-ui/core/Typography";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import StarRatingComponent from "react-star-rating-component";

class Models extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: ""
    };
  }

  componentDidMount() {
    this.setState({ showLoader: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchBenchmark !== this.props.fetchBenchmark) {
      console.log(this.props.fetchBenchmark);
      this.setState({ Benchmark: this.props.fetchBenchmark });
    }
  }

  onStarClick(nextValue, prevValue, name) {
    console.log(name);
    this.setState({ [name]: nextValue });
    console.log(this.state.meaning);
  }

  render() {
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={6} lg={6} xl={6} style={{}}>
            <Typography variant="h6" color="inherit">
              <b>Model A</b>
            </Typography>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1, marginLeft: "20px", marginTop: "20px" }}>
                <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                  Meaning of sentence:
                </Typography>
              </div>
              <div style={{ flex: 1, marginRight: "150px" }}>
                <h1>
                  <StarRatingComponent name="meaning" starCount={5} value={this.state.meaning} onStarClick={this.onStarClick.bind(this)} />
                </h1>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1, marginLeft: "20px" }}>
                <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                  Structure/Grammar of Sentence:
                </Typography>
              </div>
              <div style={{ flex: 1, marginRight: "150px", marginTop: "-20px" }}>
                <h1>
                  <StarRatingComponent name="structure" starCount={5} value={this.state.structure} onStarClick={this.onStarClick.bind(this)} />
                </h1>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1, marginLeft: "20px" }}>
                <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                  Vocabulary / Lexicon:
                </Typography>
              </div>
              <div style={{ flex: 1, marginRight: "150px", marginTop: "-20px" }}>
                <h1>
                  <StarRatingComponent name="vocabulary" starCount={5} value={this.state.vocabulary} onStarClick={this.onStarClick.bind(this)} />
                </h1>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1, marginLeft: "20px" }}>
                <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                  Overal Grade:
                </Typography>
              </div>
              <div style={{ flex: 1, marginRight: "150px", marginTop: "-20px" }}>
                <h1>
                  {((this.state.meaning ? this.state.meaning * 6 : 0) +
                    (this.state.structure ? this.state.structure * 3 : 0) +
                    (this.state.vocabulary * 1 ? this.state.vocabulary : 0)) /
                    10}
                </h1>
              </div>
            </div>
          </Grid>
          <Grid item xs={6} sm={6} lg={6} xl={6}>
            <Typography variant="h6" color="inherit">
              <b>Model B</b>
            </Typography>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1, marginLeft: "20px", marginTop: "20px" }}>
                <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                  Meaning of sentence:
                </Typography>
              </div>
              <div style={{ flex: 1, marginRight: "150px" }}>
                <h1>
                  <StarRatingComponent name="bmeaning" starCount={5} value={this.state.bmeaning} onStarClick={this.onStarClick.bind(this)} />
                </h1>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1, marginLeft: "20px" }}>
                <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                  Structure/Grammar of Sentence:
                </Typography>
              </div>
              <div style={{ flex: 1, marginRight: "150px", marginTop: "-20px" }}>
                <h1>
                  <StarRatingComponent name="bstructure" starCount={5} value={this.state.bstructure} onStarClick={this.onStarClick.bind(this)} />
                </h1>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1, marginLeft: "20px" }}>
                <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                  Vocabulary / Lexicon:
                </Typography>
              </div>
              <div style={{ flex: 1, marginRight: "150px", marginTop: "-20px" }}>
                <h1>
                  <StarRatingComponent name="bvocabulary" starCount={5} value={this.state.bvocabulary} onStarClick={this.onStarClick.bind(this)} />
                </h1>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1, marginLeft: "20px" }}>
                <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                  Overal Grade:
                </Typography>
              </div>
              <div style={{ flex: 1, marginRight: "150px", marginTop: "-20px" }}>
                <h1>
                  {((this.state.bmeaning ? this.state.bmeaning * 6 : 0) +
                    (this.state.bstructure ? this.state.bstructure * 3 : 0) +
                    (this.state.bvocabulary * 1 ? this.state.bvocabulary : 0)) /
                    10}
                </h1>
              </div>
            </div>
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Models)
);
