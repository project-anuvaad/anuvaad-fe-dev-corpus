import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core";
import MUIRichTextEditor from "mui-rte";
import Paper from "@material-ui/core/Paper";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js";
import draftToMarkdown from "draftjs-to-markdown";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FetchModels from "../../../flux/actions/apis/fetchenchmarkmodel";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import NewCorpusStyle from "../../styles/web/Newcorpus";
import TextareaAutocomplete from 'react-textarea-autocomplete'
class Editor1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: false, value: "" };
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
        count: this.props.fetchBenchmarkModel.count,
        value: this.props.fetchBenchmarkModel.data[0].source
      });
    }
  }

  handleSelected=(text,index)=>{
      console.log(text,index)
      this.setState({value: this.state.value+text , token: false})
  }

  handleApiCall(data) {
    const { APITransport } = this.props;
    const api = new FetchModels(1573290229, 17, 5, 1);
    APITransport(api);
    this.setState({ token: true });
    
  }

  onEditorStateChange(editorState) {
    console.log(editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
    this.setState({ value: editorState });
    console.log(this.state.value);
  }

  handleSave(data) {
    console.log("data.Model.ImmutableData.EditorState");
  }

  render() {
    return (
      <div
        style={{
          marginLeft: "12%",
          marginTop: "5%",
          width: "70%"
        }}
      >
        <CKEditor style={{height:'40wv'}}
          editor={ClassicEditor}
          data={this.state.value}
          onChange={(event, editor) => {
            const data = editor.getData();

            editor.editing.view.document.on("keydown", (evt, data) => {
              console.log(data.keyCode);

              if (data.keyCode === 9) {
                this.handleApiCall(editor.getData());

                data.preventDefault();
                evt.stop();
              }
              else{
                this.setState({ token: false });
              }
            });
          }}
          
        />

        { this.state.token && 

<List component="nav" style ={{marginLeft:"30%",marginRight:"20%",marginTop:"-20px"}}>
{this.state.sentences.map((text, index) => (
<ListItem button onClick={() => this.handleSelected(text.source,index)} key ={index}>
  <ListItemText primary={text.source}/>
</ListItem>
))}



  

</List>


        }
        
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

export default withRouter(withStyles(NewCorpusStyle)(connect(mapStateToProps, mapDispatchToProps)(Editor1)));
