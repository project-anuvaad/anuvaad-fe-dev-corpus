import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import FetchBenchmarkCompareModel from "../../../flux/actions/apis/fetchenchmarkcomparemodel";
import Pagination from "material-ui-flat-pagination";
import Grid from "@material-ui/core/Grid";
import Grader from "../../components/web/common/Grader";

class BenchmarkGrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputStatus: "ALL",
      apiCall: false,
      pending: null,
      PendingpageNumber: 1,
      AllPageNumber: 1,
      score: {},
      apiCalled: false,
      sentences: [],
      pageCount: 1,
      status: "",
      page: 0,
      offset: 0,
      tocken: false,

      TableHeaderValues: ["Source Sentence", "Target Sentence", "Machine translated reference", "Grade"],

      role: JSON.parse(localStorage.getItem("roles"))
    };
  }

  componentDidMount() {


    console.log("sajish")
    let api = new FetchBenchmarkCompareModel(
      this.props.base,
      this.state.pageCount,
      1
    );
    this.props.APITransport(api);

  }

  handleChangePage(event, offset) {

    this.setState({ offset, sentences: [] })

    if (this.state.base) {
      let api = new FetchBenchmarkCompareModel(
        this.state.base,

        this.state.pageCount,
        offset + 1,
        this.state.inputStatus
      );
      this.props.APITransport(api);
    }
  };

  handleFetchBenchmark(base) {
    console.log("sajish")
    let api = new FetchBenchmarkCompareModel(
      this.state.base,
      this.state.pageCount,
      1
    );
    this.props.APITransport(api);
  }




  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.base !== prevState.base) {


      return {

        base: nextProps.base,
        apiCall: true

      };

    }
    else return null;
  }

  componentDidUpdate(prevProps) {

    if (prevProps.base !== this.state.base) {
      this.setState({ base: this.state.base })
      let api = new FetchBenchmarkCompareModel(
        this.props.base,
        this.state.pageCount,
        this.state.offset + 1,
        this.state.inputStatus
      );
      this.props.APITransport(api);
    }

    if (prevProps.fetchBenchmarkCompareModel !== this.props.fetchBenchmarkCompareModel) {

      console.log(this.props.fetchBenchmarkCompareModel)
      this.setState({
        apiCall: false,
        sentenceCancel: prevProps.fetchBenchmarkCompareModel.data,
        sentences: this.props.fetchBenchmarkCompareModel.data,
        count: this.props.fetchBenchmarkCompareModel.count,
        score: this.props.fetchBenchmarkCompareModel.sum,
        pending: this.props.fetchBenchmarkCompareModel.pending
      });


    }
  }

  onStarClick(nextValue, prevValue, name, index) {
    let sentences = this.state.sentences
    sentences[index][name] = nextValue
    this.setState({ sentences: sentences });
    console.log(this.state.sentences);
  }



  render() {
    return (
      <div>
        <Grid container spacing={4} style={{ padding: "20px" }}>
          {this.state.sentences.map((value, i) => {
            var val = i == 0 ? "A" : "B";
            return <Grid item xs={6} sm={6} lg={6} xl={6}>
              <Grader title={"Model " + val} index={i} description={value.target} handleStarClick={this.onStarClick.bind(this)} data={value} handleStarClick={this.onStarClick.bind(this)} handleStarClick={this.onStarClick.bind(this)} meaning={"rating"} structure={"context_rating"} vocabulary={"spelling_rating"} />
            </Grid>
          })}
        </Grid>
        {/*  */}
        {this.state.sentences && this.state.sentences.length > 0 && 
        <Pagination
          align="right"
          limit={1}
          offset={this.state.offset}
          centerRipple={true}
          total={this.state.count}
          onClick={(event, offset) => {
            this.handleChangePage(event, offset);
          }}
        />
      }

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  corpus: state.corpus,
  sentences: state.sentences,
  fetchBenchmarkCompareModel: state.fetchBenchmarkCompareModel,
  updateGrade: state.updateGrade
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
  )(BenchmarkGrade)
);
