import React from "react";
import { withRouter } from "react-router-dom";
import FetchDoc from "../../../../flux/actions/apis/fetchdocsentence";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import Paper from "@material-ui/core/Paper";
import SourceView from "./SourceView";

class PdfFileEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentences: "",
      sourceSupScripts: "",
      targetSupScripts: "",
      header: ""
    };
  }

  componentDidMount() {
    const { APITransport } = this.props;
    const apiObj = new FetchDoc("d72923e7-5a92-4e9e-93bc-3d1d89e73b5d");
    APITransport(apiObj);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchPdfSentence !== this.props.fetchPdfSentence) {
      const temp = this.props.fetchPdfSentence.data;
      console.log(temp);
      this.setState({
        sentences: temp
      });
    }
  }
  render() {
    let yAxis;
    return (
      <div>
        <Paper style={{ marginLeft: "20%", width: this.state.sentences && this.state.sentences[0].page_width + "px" }}>
          {this.state.sentences &&
            this.state.sentences.map(sentence => {
              yAxis = parseInt(sentence.y_end) + (parseInt(sentence.page_no) - 1) * parseInt(sentence.page_height);

             return <SourceView sentence={sentence} y={yAxis} width={"200px"} height={"10px"} />;
            })}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetchPdfSentence: state.fetchPdfSentence
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PdfFileEditor));
