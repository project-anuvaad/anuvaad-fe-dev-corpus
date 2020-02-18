import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FetchModels from "../../../flux/actions/apis/fetchenchmarkmodel";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import NewCorpusStyle from "../../styles/web/Newcorpus";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";


const styles = {
    editor: {
      width: '80%',
    //   height: '60vh',
    //   minHeigth: '50vh',
    //   maxHeight:'60vh',
    //   marginBottom:'100px'
     
    },
  
   
  };
class Editor1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: false, value: "", isFocus: false, text: "" };
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
      const {classes} = this.props;
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
            width: "70%"
          }}
        >
          <ReactQuill className={classes.editor}
            ref={el => {
              this.reactQuillRef = el;
            }}
            value={this.state.text}
            onKeyDown={this.keyPress.bind(this)}
            onChange={this.handleChange.bind(this)}
          />

          {this.state.token && (
            <List component="nav" style={{ marginLeft: "30%", marginRight: "20%", marginTop: "-20px" }}>
              <Paper>
                {this.state.sentences.map((text, index) => (
                  <ListItem button onClick={event => this.handleSelected(event, text.source)} key={index}>
                    <ListItemText primary={text.source} />
                  </ListItem>
                ))}
              </Paper>
            </List>
          )}
        </div>
      </div>
    );
  }
}

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
