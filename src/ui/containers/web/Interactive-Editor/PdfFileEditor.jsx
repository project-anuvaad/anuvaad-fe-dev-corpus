import React from "react";
import { withRouter } from "react-router-dom";
import FetchDoc from "../../../../flux/actions/apis/fetchdocsentence";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import Paper from "@material-ui/core/Paper";
import SourceView from "./SourceView";
import Data from "./Data.json";
class PdfFileEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentences: "",
      sourceSupScripts: "",
      targetSupScripts: "",
      header: "",
      sentences:Data.data
    };
  }

//   componentDidMount() {
//     const { APITransport } = this.props;
//     const apiObj = new FetchDoc("d72923e7-5a92-4e9e-93bc-3d1d89e73b5d");
//     APITransport(apiObj);
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.fetchPdfSentence !== this.props.fetchPdfSentence) {
//       const temp = this.props.fetchPdfSentence.data;
//       console.log(temp);
//       this.setState({
//         sentences: temp
//       });
//     }
//   }
  render() {
    let yAxis = 0;
    let height = 100;
    let style = {
      marginLeft: "20%",
      width: this.state.sentences && this.state.sentences[0].page_width + "px",
      maxHeight: this.state.collapseToken ? window.innerHeight - 100 : window.innerHeight - 100,
      position: "relative",
      overflowY: "scroll",
      height: this.state.sentences && this.state.sentences[0].page_height + "px",
    };
    return (
      <div style={style}>
        {this.state.sentences &&
          this.state.sentences.map(sentence => {
            yAxis = parseInt(sentence.y) + (parseInt(sentence.page_no) - 1) * parseInt(sentence.page_height)+height;
            return <SourceView sentence={sentence} yAxis={yAxis} width={sentence.width ? sentence.width:"400px"} />;
          })}
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
