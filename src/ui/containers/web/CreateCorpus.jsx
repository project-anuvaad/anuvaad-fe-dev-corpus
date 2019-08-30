import React from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import CreateCorpus from "../../../flux/actions/apis/createcorpus";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../../components/web/common/snackbar";
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core";
import NewCorpusStyle from "../../styles/web/Newcorpus";
import Input from "@material-ui/core/Input";
import history from "../../../web.history";



import {DropzoneArea} from 'material-ui-dropzone';
import Select from '../../components/web/common/Select';
import Stepper from "../../components/web/common/Stepper";
import { white, blueGrey50,darkBlack } from "material-ui/styles/colors"


class Createcorpus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            add_name:'',
            doamin:'',
            text: '',
            language:'',
            apiCalled: false,
            
           
            file:[],
            
            
            comment:'',
            open: false,
            message:'Corpus added successfully',
            token: false,
           
            val:0,
            warning:''
            
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.apistatus.progress !== this.props.apistatus.progress) {
            (this.setState({
                token:true,
                open:true
                }) ,
                setTimeout(()=>{history.push(`${process.env.PUBLIC_URL}/corpus`)},2000))}

          
        }
    


    handleTextChange(key, event) {
        this.setState({
            [key]: event.target.value
        })
    }

    handleSelectChange = event => {
        console.log(event.target.name,event.target.value)
        this.setState({ [event.target.name]: event.target.value });
      };

    handleFileChange = (e) => {
        if (e.target.files[0]) {
            this.setState({
                file: e.target.files[0],
            });
        }
    }

    handleMultiFileChange = (e) => {
        if (e.target.files[0]) {
            this.setState({
                [e.target.name]: e.target.files[0],
            });
        }
    }

    handleSource = (files) => {
      
      this.setState({
        file: files
      });
    }

    
      
    

    
          
    
      validate=()=>{
          
        let nameError="";
        let domainError="";
        let commentError="";
        let languageError='';
        if(!this.state.add_name){
            nameError="Name shouldn't be empty"
        }
        if(!this.state.domain){
        domainError="Domain shouldn't be empty"
        }
        if(!this.state.comment){
            commentError="Comment Shouldn't be empty"
        }
        if(!this.state.language){
            languageError="Language shouldn't be empty"
        }
        this.setState({
            nameError, domainError, commentError,languageError
        })
          if(nameError || domainError || commentError || languageError){   
          }
          else{
          return true;
          }

      }

      
    
      
    
      handleBack = () => {
       
          history.push(`${process.env.PUBLIC_URL}/corpus`)   
      };
    
      handleSubmit() {
        console.log("file",this.state.file, "hindifile",this.state.hindiFile,"eng", this.state.englishFile, this.state.corpus_type, this.state.add_name, this.state.domain,this.state.comment)
        const isValid=this.validate();
        if(isValid){
        const { APITransport } = this.props;
        const apiObj = new CreateCorpus(this.state.file,this.state.add_name, this.state.domain,this.state.language,this.state.comment,this.state.language,);
        APITransport(apiObj);
        this.setState({showLoader:true}) 
        }
    }

    render() {

      const { classes } = this.props;
        return (
             <Paper className={classes.paper} elevation={2}>
                 <Typography gutterBottom variant="title" component="h2" style={{marginTop:'-3.7%',paddingLeft:'40%',background:blueGrey50,paddingTop:'25px',paddingBottom:'16px',marginLeft:'-2.3%',marginRight:'-2.3%'}}>
                    Create Corpus
                </Typography><br/>
<div style={{Top:"5px",PaddingBottom:"5px"}}>
<FormControl fullWidth >
            <InputLabel htmlFor="Add Name">Output Corpusname*</InputLabel>
            <Input id="name" required  onChange={(event) => {this.handleTextChange('add_name', event)}} />
            <span style={{color:'red'}}>{this.state.nameError}</span>
            </FormControl>
            </div>
        
        <FormControl fullWidth>
            <InputLabel htmlFor="Domain">Domain*</InputLabel>
            <Input id="domain" required onChange={(event) => {this.handleTextChange('domain', event)}} />
            <span style={{color:'red'}}>{this.state.domainError}</span>
        </FormControl>
        <FormControl fullWidth>
            <InputLabel htmlFor="Comment">Language*</InputLabel>
            <Input id="comment" required onChange={(event) => {this.handleTextChange('language', event)}} />
            <span style={{color:'red'}}>{this.state.languageError}</span>
        </FormControl>
        <FormControl fullWidth>
            <InputLabel htmlFor="Comment">Description*</InputLabel>
            <Input id="comment" required  onChange={(event) => {this.handleTextChange('comment', event)}} />
            <span style={{color:'red'}}>{this.state.commentError}</span>
        </FormControl><br/><br/>

        <DropzoneArea Dropzoneiles=""
        onDrop={this.handleSource} id="source" showPreviewsInDropzone={true} acceptedFiles={['.txt']} dropzoneText="Please Add/Drop txt file here" filesLimit={1}
        ></DropzoneArea>

<Button variant="contained" color="primary" className={classes.button} onClick={this.handleBack}> Cancel </Button>
<Button variant="contained" color="primary" className={classes.buttons} onClick={this.handleSubmit.bind(this) }>Submit</Button>
                            
                
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={this.state.open} autoHideDuration={6000}>
                            <MySnackbarContentWrapper
                                onClose={this.handleClose}
                                variant="success"
                                message= {this.state.message} />
                            </Snackbar>
            </Paper>

        );
    }
}

const mapStateToProps = state => ({
    user: state.login,
    apistatus: state.apistatus,
    corpus: state.corpus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
    CreateCorpus: APITransport,
}, dispatch);


export default withRouter(withStyles(NewCorpusStyle)(connect(mapStateToProps, mapDispatchToProps)(Createcorpus)));
