import React from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import CreateCorpus from "../../../flux/actions/apis/corpus";
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
import Snackbar from "@material-ui/core/Snackbar";
import {DropzoneArea} from 'material-ui-dropzone';
import Select from '../../components/web/common/Select';
import Stepper from "../../components/web/common/Stepper";
import { white, blueGrey50,darkBlack } from "material-ui/styles/colors"


class Newcorpus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            add_name:'',
            doamin:'',
            text: '',
            apiCalled: false,
            hindi: '',
            english: '',
            hindi_score: [],
            english_score: [],
            file: {},
            
            corpus_type: 'single',
            hindiFile: [],
            englishFile:[],
            comment:'',
            open: false,
            message:'Corpus added successfully',
            token: false,
            activeStep: 0,
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
      console.log("source",typeof(files))
      this.setState({
        englishFile: files
      });
    }

    handleTarget = (files) => {
      console.log("target",files)
      this.setState({
        hindiFile: files
      });
      
    }

    getStepContent=(stepIndex)=> {
        console.log(stepIndex)
        switch (stepIndex) {
          case 0:
            return <div>
            <Grid container spacing={4} >
            <Grid item xs={8} sm={8} lg={8} xl={8}>
          <Typography value='' variant="title" gutterBottom="true" style={{ marginLeft: '12%', paddingTop: '14%' }} >Please select source language :</Typography>
        
        </Grid>
        <Grid item xs={3} sm={3} lg={2} xl={2}><br/><br/>
            <Select id={"outlined-age-simple"} MenuItemValues={['English']} handleChange={this.handleSelectChange} value={this.state.english} name="english" style={{marginRight: '30%', marginBottom: '5%',marginTop: '4%'}} />
            </Grid>
            </Grid><br/>
            {this.state.val>1 ?
            <DropzoneArea 
        onDrop={this.handleSource} showPreviewsInDropzone={true} style={{marginTop:'0%'}} acceptedFiles={['.pdf']} dropzoneText="Please Add/Drop pdf file here" filesLimit={1}
        ></DropzoneArea>:''
            }
            
            <DropzoneArea 
        onDrop={this.handleSource} showPreviewsInDropzone={true} style={{marginTop:'0%'}} acceptedFiles={['.pdf']} dropzoneText="Please Add/Drop pdf file here" filesLimit={1}
        ></DropzoneArea>
                </div>
            
            
          case 1: 
            return <div>
            <Grid container spacing={4} >
            <Grid item xs={8} sm={8} lg={8} xl={8}>
          <Typography value='' variant="title" gutterBottom="true" style={{ marginLeft: '5%', paddingTop: '14%' }} >Please select Target language :</Typography>
        
        </Grid>
        <Grid item xs={3} sm={3} lg={2} xl={2}><br/><br/>
            <Select id={"outlined-age-simple"} MenuItemValues={["Tamil"]} handleChange={this.handleSelectChange} value={this.state.hindi} name="hindi" style={{marginRight: '30%', marginBottom: '5%',marginTop: '4%'}} />
            </Grid>
            </Grid><br/>
            <DropzoneArea Dropzoneiles=""
        onDrop={this.handleTarget} id="source" showPreviewsInDropzone={true} acceptedFiles={['.pdf']} dropzoneText="Please Add/Drop pdf file here" filesLimit={2}
        ></DropzoneArea>
                </div>;
  
          case 2: 
              
            return <div ><FormControl fullWidth>
            <InputLabel htmlFor="Add Name">Output filename*</InputLabel>
            <Input id="name" required  onChange={(event) => {this.handleTextChange('add_name', event)}} />
            <div style={{color:'red'}}>{this.state.nameError}</div>
            </FormControl>
        
        <FormControl fullWidth>
            <InputLabel htmlFor="Domain">Domain*</InputLabel>
            <Input id="domain"  onChange={(event) => {this.handleTextChange('domain', event)}} />
            <div style={{color:'red'}}>{this.state.domainError}</div>
        </FormControl>
        <FormControl fullWidth>
            <InputLabel htmlFor="Comment">Comment*</InputLabel>
            <Input id="comment"  onChange={(event) => {this.handleTextChange('comment', event)}} />
            <div style={{color:'red'}}>{this.state.commentError}</div>
        </FormControl>
    </div>;
          default:
            return 'Try Again !!!';
        }
    }
    
      validate=()=>{
          
        let nameError="";
        let domainError="";
        let commentError="";
        if(!this.state.add_name){
            nameError="Name shouldn't be empty"
        }
        if(!this.state.domain){
        domainError="Domain shouldn't be empty"
        }
        if(!this.state.comment){
            commentError="Comment Shouldn't be empty"
        }
        this.setState({
            nameError, domainError, commentError
        })
          if(nameError || domainError || commentError){   
          }
          else{
          return true;
          }

      }

      
    
      handleNext = () => {
        console.log(this.state.englishFile.name)
        if(this.state.activeStep===0 && this.state.englishFile.name && this.state.english){
        this.setState(state => ({
          activeStep: 1,
          warning:''
        }));
      } else if (this.state.hindiFile.name  && this.state.hindi){
        this.setState(state => ({
          activeStep: 2,
          warning:''
        }));}
      else{
        this.setState({warning:" * Fields shouldn't be empty "})
        
      }
      };
    
      handleBack = () => {
        if(this.state.activeStep===0){
          history.push(`${process.env.PUBLIC_URL}/corpus`)
        }

        else{
          this.setState(state => ({
            activeStep: state.activeStep - 1,
          }));
        }
          
      };
    
      handleSubmit() {
        console.log("file",this.state.file, "hindifile",this.state.hindiFile,"eng", this.state.englishFile, this.state.corpus_type, this.state.add_name, this.state.domain,this.state.comment)
        const isValid=this.validate();
        if(isValid){
        const { APITransport } = this.props;
        const apiObj = new CreateCorpus(this.state.file, this.state.hindiFile, this.state.englishFile, this.state.corpus_type, this.state.add_name, this.state.domain,this.state.comment);
        APITransport(apiObj);
        this.setState({showLoader:true}) 
        }
    }

    render() {

      const { classes } = this.props;
        return (
              <div className={classes.CorpusContainer}>
                
                <Paper className={classes.paper} elevation={2}>
                <Typography gutterBottom variant="title" component="h2" style={{marginTop:'-3.7%',paddingLeft:'35%',background:blueGrey50,paddingTop:'13px',paddingBottom:'13px',marginLeft:'-4%',marginRight:'-3.7%'}}>
                    Create Corpus List
                </Typography><br/>
                <Stepper steps={["Add Source file",'Add target file','Add file details']} activeStep={this.state.activeStep} alternativeLabel></Stepper>
                    

                    {this.state.activeStep === 3 ? (
          <div>
            <Typography >All steps completed</Typography>
            
          </div>
        ) : (
          <div>
            <Typography >{this.getStepContent(this.state.activeStep)}</Typography>
            </div>
        )}
<form method="post">
                          
                  </form>
                  
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleBack}> {this.state.activeStep === 0 ? "Cancel": "Back"} </Button>
                            <Button variant="contained" color="primary" className={classes.buttons} onClick={this.state.activeStep === 2 ? this.handleSubmit.bind(this) :this.handleNext}> {this.state.activeStep === 2 ? 'Create Corpus' :"Next"}</Button>
                            <div style={{color:'red' , marginLeft:"30%"}}>{this.state.warning}</div>
                </Paper>
                
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={this.state.open} autoHideDuration={6000}>
                            <MySnackbarContentWrapper
                                onClose={this.handleClose}
                                variant="success"
                                message= {this.state.message} />
                            </Snackbar>
            </div>

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


export default withRouter(withStyles(NewCorpusStyle)(connect(mapStateToProps, mapDispatchToProps)(Newcorpus)));
