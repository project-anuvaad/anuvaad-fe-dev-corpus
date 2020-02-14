import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core";
import MUIRichTextEditor from "mui-rte";
import Paper from "@material-ui/core/Paper";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import NewCorpusStyle from "../../styles/web/Newcorpus";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import FetchModels from "../../../flux/actions/apis/fetchenchmarkmodel";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';



class Editor1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "", theme: "snow", value:'testnpm install --save react-draft-wysiwyg draft-js' };
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {

    const { APITransport } = this.props;
    const api = new FetchModels(1573290229, 17,1,1);
    APITransport(api);
    this.setState({ showLoader: true })
  }

  componentDidUpdate(prevProps) {
    

    if (prevProps.fetchBenchmarkModel !== this.props.fetchBenchmarkModel) {
        console.log("-----",this.props.fetchBenchmarkModel.data)
      this.setState({
        sentences: this.props.fetchBenchmarkModel.data,
        count: this.props.fetchBenchmarkModel.count,
        value: this.props.fetchBenchmarkModel.data[0].source
      });
    }
  }
  


  handleClick=()=>{
    
      console.log("event,index,source")
  }
  onEditorTab=(data)=> {
    console.log("gg")
  }

  handleChange(data) {
    console.log(data);
  }

  onEditorStateChange(editorState){
      console.log(editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent())))
      this.setState({value: editorState})
    console.log(this.state.value)
  };

 

  handleSave(data) {
    console.log("data.Model.ImmutableData.EditorState");
  }

  render() {
    return (
      
          <CKEditor editor={ ClassicEditor } data={this.state.value} onChange={ ( event, editor ) => {
            const data = editor.getData();
            if (event.key === 'Enter'){
                console.log( {  editor, data } ); 
            }

            console.log(  event); 
            
                // console.log( { event, editor, data } );
            
            
        } } 
       
        style={{
          
          marginLeft:'12%',
          marginTop:'5%',
          width: "70%"
        }}/>

         

//         <Editor style={{minHeight: "600px",}}
//   value = {this.state.value}
//   toolbarClassName="toolbarClassName"
//   wrapperClassName="wrapperClassName"
//   editorClassName="editorClassName"
//   onEditorStateChange={this.onEditorStateChange.bind(this)}
//   mention={{
//     separator: ' ',
//     trigger: ' ',
//     suggestions: [
//       { text: 'APPLE onEditorStateChange={this.onEditorStateChange.bind(this)} ', value: 'APPLE onEditorStateChange={this.onEditorStateChange.bind(this)}'},
//       { text: 'BANANA', value: 'banana', url: 'banana' },
//       { text: 'CHERRY', value: 'cherry', url: 'cherry' },
//       { text: 'DURIAN', value: 'durian', url: 'durian' },
      
//     ],
//   }}
//   onTab={(event) => {console.log("event",event)}}
// />
      
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
