import "regenerator-runtime/runtime";
import 'core-js-pure/stable';
import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ConfigUpload from "../../../flux/actions/apis/pdffile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import PdfFileUpload from "../../../flux/actions/apis/pdffileupload";
import history from "../../../web.history";

const styles = theme => ({
    paper: {
        margin: "30%",
        width: "40%",
        minWidth: "20%",
        marginTop: "5%",
        padding: '2%',
        marginLeft: '22%'
    },
    typography: {
        textAlign: 'center',
        minWidth: '10%'
    },
    button: {
        marginTop: '4%',
        marginLeft: '20%',
        width: '60%',
    },
    
})



class PdfUpload extends Component {
    constructor() {
        super()
        this.state = {
            files: [],
            showComponent: false,
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        const { APITransport } = this.props;
        console.log("---files",this.state.files.length)
        if (this.state.files.length > 0) {
            const apiObj = new ConfigUpload(this.state.files);
       APITransport(apiObj);
        }
        else {
            alert("File not selected")
        }
    }

    renderApi(val) {
       
          const { APITransport } = this.props;
          console.log(this.state.filesPath)
          const apiObj = new PdfFileUpload(
            "test",
            val
          );
           APITransport(apiObj);
           setTimeout(() => {
            history.push(`${process.env.PUBLIC_URL}/view-pdf`);
          }, 2000);

          
        }
      

    componentDidUpdate(prevProps) {
        if (prevProps.pdfConfigUpload !== this.props.pdfConfigUpload) {
          this.setState({ filesPath: this.props.pdfConfigUpload.filepath});
          
          this.renderApi(this.props.pdfConfigUpload.filepath);
        }

       
    }

    readFileDataAsBinary(file) {

        console.log(file)
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
    
          reader.onload = event => {
            resolve(event.target.result);
          };
    
          reader.onerror = err => {
            reject(err);
          };
    
          reader.readAsBinaryString(file);
        });
      }
      handleDelete = () => {
        
          this.setState({
            files: []
          });
        }

   
    

    handleChange = (files) => {
        if(files.length>0)
        {
        this.readFileDataAsBinary(files[0]).then((result, err) => {
          this.setState({
            files: result
          });
        });}

   
    }
    render() {
        return (
            <Paper className={this.props.classes.paper}>
                <Grid container spacing={24} style={{ padding: 24 }}>
                    <Grid item xs={12} sm={12} lg={12} xl={12}>
                        <Typography value='' variant="h4" className={this.props.classes.typography} >Upload File</Typography>
                        <br /><br />
                    </Grid>
                    <DropzoneArea
                        showPreviewsInDropzone={true}
                        acceptedFiles={['.pdf']}
                        onChange={this.handleChange.bind(this)}
                        filesLimit={1}
                        dropzoneText={"Drag and drop a pdf file here or click"}
                        onDelete = {this.handleDelete.bind(this)}
                    ></DropzoneArea>
                    <Button variant="contained" color="primary" className={this.props.classes.button}
                        size="large"
                        onClick={this.handleSubmit.bind(this)}

                    >
                        SUBMIT
                </Button>
                </Grid>

            </Paper>
        )
    }
}


const mapStateToProps = state => ({
    pdfConfigUpload: state.pdfConfigUpload,
    pdfConfigUpload: state.pdfConfigUpload

  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        APITransport,
        CreateCorpus: APITransport
      },
      dispatch
    );
  
  export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PdfUpload)));




