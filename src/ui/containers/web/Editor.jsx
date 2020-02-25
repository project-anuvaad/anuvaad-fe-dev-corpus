import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core";
import ReactQuill from "react-quill";
import FetchModels from "../../../flux/actions/apis/fetchenchmarkmodel";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import "react-quill/dist/quill.snow.css";

const styles = {
  editor: {
    width: "80%"
  }
};



class Editor1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: false, value: "", isFocus: false, text: '<p>The intermediary who fails to comply with the direction issued under sub-section (1) shall be punished with an imprisonment for a term which may extend to seven years and shall also be liable to fine</p><p>The intermediary who fails to comply with the direction issued under sub-section (1) shall be punished with an imprisonment for a term which may extend to seven years and shall also be liable to fine</p>' };
  }

  componentDidMount() {
    const { APITransport } = this.props;
    const api = new FetchModels(1573290229, 17, 1, 1);
    APITransport(api);
    this.setState({ showLoader: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchBenchmarkModel !== this.props.fetchBenchmarkModel) {
      console.log("-----", this.props.fetchBenchmarkModel.data);
      this.setState({
        sentences: this.props.fetchBenchmarkModel.data,
        count: this.props.fetchBenchmarkModel.count
      });
    }
  }

  handleSelected = (event, text) => {
    console.log("---sajish", this.reactQuillRef.getEditor());

    const quillRef = this.reactQuillRef.getEditor();
    const range = quillRef.getSelection();
    const position = range ? range.index : 0;
    quillRef.insertText(position, text);
  };

  handleChange(value) {
    console.log("---", this.state.text);

    this.setState({ text: value });
  }

  keyPress(e) {
    if (e.keyCode === 9) {
      const { APITransport } = this.props;
      const api = new FetchModels(1573290229, 17, 5, 1);
      APITransport(api);
      this.setState({ token: true });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div
        onClick={() => {
          this.setState({ token: false });
        }}
      >
        <div
          style={{
            marginLeft: "14%",
            marginTop: "5%",
            width: "70%",
            marginBottom:'50%'
          }}
        >
          <ReactQuill
            className={classes.editor}
            ref={el => {
              this.reactQuillRef = el;
            }}
            modules={Editor1.modules}
            value={this.state.text}
            onKeyDown={this.keyPress.bind(this)}
            onChange={this.handleChange.bind(this)}
            theme={'snow'}
          />

          <div>{this.state.text}</div>
        </div>
      </div>
    );
  }
}

Editor1.modules = {
  toolbar: [
    [ { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ indent: "-1" }, { indent: "+1" }],
    ["direction", { align: [] }],
    ["link"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  fetchBenchmarkModel: state.fetchBenchmarkModel,
  benchmarkTranslate: state.benchmarkTranslate
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Editor1)));
