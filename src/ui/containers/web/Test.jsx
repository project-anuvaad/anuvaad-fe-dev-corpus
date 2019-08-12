// MyApp.js
import React, { Component } from 'react';
import FileViewer from 'react-file-viewer';
import Dialog from "../../components/web/common/Dialog";
import htmlDocx from 'html-docx-js'
import { withRouter } from 'react-router-dom';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import HtmlToDoc from '../../../flux/actions/apis/html_to_doc';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import docx from './preview'
// import  from 'docx'

var fs = require('fs');

const file = 'input.docx'
const type = 'docx'

class MyComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            dialogOpen: false,
            node: null
        }
        this.handleSaveDoc = this.handleSaveDoc.bind(this)
    }

    componentDidMount() {
        this.src.addEventListener("click", this.handleTextSelect.bind(this));
        this.tgt.addEventListener("click", this.handleTextSelect.bind(this));
    }

    loadDocx() {
        var file = document.getElementById("files").files[0];
        var container = document.getElementById("doc-src");

        window.docx.renderAsync(file, container, null, { debug: true })
            .then(function (x) { console.log(x); });
    }

    loadDocxTgt() {
        var file = document.getElementById("files2").files[0];
        var container = document.getElementById("doc-tgt");

        window.docx.renderAsync(file, container, null, { debug: true })
            .then(function (x) { console.log(x); });
    }

    handleTextSelect() {
        var sel = window.getSelection();
        if(sel && sel.focusNode){
            this.setState({
                dialogOpen: true,
                node: sel.focusNode
            })
            // sel.focusNode.textContent = ''
        }
    }

    handleDialogSave(node, text){
        node.textContent = text
        this.setState({
            dialogOpen: false
        })
    }

    handleSaveDoc(){
        var container = document.getElementById("doc-src");
        console.log(container.innerHTML)
        this.Export2Doc(container)
        // let api = new HtmlToDoc(container.innerHTML)
        // this.props.APITransport(api)
        // var converted = htmlDocx.asBlob(container.outerHTML);
        // console.log(converted)
    }

    Export2Doc(element, filename = ''){
        // console.log(element.innerHTML)
        var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
        var postHtml = "</body></html>";
        var html = preHtml+'<p>Test</p>'+postHtml;
        console.log(html)
        var blob = new Blob( [html], {
            type: 'application/msword'
        });
        
        // Specify link url
        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
        
        // Specify file name
        filename = filename?filename+'.doc':'document.doc';
        
        // Create download link element
        var downloadLink = document.createElement("a");
    
        document.body.appendChild(downloadLink);
        
        // if(navigator.msSaveOrOpenBlob ){
        //     navigator.msSaveOrOpenBlob(blob, filename);
        // }else{
            // Create a link to the file
            downloadLink.href = url;
            
            // Setting the file name
            downloadLink.download = filename;
            
            //triggering the function
            downloadLink.click();
        // }
        
        document.body.removeChild(downloadLink);
    }

    render() {
        return (
            <div>
                <Dialog open={this.state.dialogOpen} node={this.state.node} handleClick={this.handleDialogSave.bind(this)}/>
                <div style={{ width: '100%', display: 'inline-block' }}>
                    <input id="files" type="file" id="files" accept=".docx" />    <button id="loadButton" onClick={this.loadDocx}>load</button>
                    <input id="files2" type="file" id="files2" accept=".docx" />    <button id="loadButton2" onClick={this.loadDocxTgt}>load</button>
                </div>
                <div id="doc-src" ref={elem => this.src = elem} style={{ width: '50%', display: 'inline-block' }}>
                </div>
                <div id="doc-tgt" ref={elem => this.tgt = elem} style={{ width: '50%', display: 'inline-block' }}>
                </div>
                <button id="saveDoc" onClick={this.handleSaveDoc}>Save</button>
            </div>
        );
    }

    onError(e) {
        console.log(e)
    }
}




const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
}, dispatch);


export default withRouter(connect(null, mapDispatchToProps)(MyComponent));
