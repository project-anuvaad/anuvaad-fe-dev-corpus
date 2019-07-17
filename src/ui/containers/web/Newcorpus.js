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






class Newcorpus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            add_name:'',
            doamin:'',
            text: '',
            apiCalled: false,
            hindi: [],
            english: [],
            hindi_score: [],
            english_score: [],
            file: {},
            corpus_type: 'single',
            hindiFile: {},
            englishFile: {},
            comment:'',
            open: false,
            message:'Created corpus scuccessfully',
            token: false
            
        }
    }

    componentDidMount() {
        this.setState({
            hindi: [],
            english: [],
            hindi_score: [],
            english_score: [],
            file: {}
        })
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

    handleChange = event => {
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

    handleSubmit() {
        const isValid=this.validate();
        if(isValid){
        const { APITransport } = this.props;
        const apiObj = new CreateCorpus(this.state.file, this.state.hindiFile, this.state.englishFile, this.state.corpus_type, this.state.add_name, this.state.domain,this.state.comment);
        APITransport(apiObj); 
        }
    }
    
      validate=()=>{
        let nameError="";
        let domainError="";
        let commentError="";
        let hindiError="";
        let englishError="";
        if(!this.state.add_name){
            nameError="Name shouldn't be empty"
        }
        if(!this.state.domain){
        domainError="Domain shouldn't be empty"
        }
        if(!this.state.comment){
            commentError="Comment Shouldn't be empty"
        }
        if(!this.state.hindiFile.name){
            hindiError="Please attach hindi file"
        }
        if(!this.state.englishFile.name){
            englishError="Please attach english file"
        }

        this.setState({
            nameError, domainError, commentError,hindiError,englishError
        })
          if(nameError || domainError || commentError||hindiError||englishError){   
          }
          else{
          return true;
          }

      }

    render() {
      const { classes } = this.props;
        return (
              <div className={classes.CorpusContainer}>
                {this.state.token ? < CircularProgress/> :
                <Paper className={classes.paper} elevation={2}>
                <Typography gutterBottom variant="title" component="h2">
                    Create Corpus List
                </Typography>
                    <form method="post">

                      <FormControl fullWidth>
                        <InputLabel htmlFor="Add Name">Name*</InputLabel>
                        <Input id="name" required className={classes.textField} onChange={(event) => {this.handleTextChange('add_name', event)}} />
                        <div style={{color:'red'}}>{this.state.nameError}</div>
                        </FormControl>
                        
                        <FormControl fullWidth>
                          <InputLabel htmlFor="Domain">Domain*</InputLabel>
                        <Input id="domain" className={classes.textField} onChange={(event) => {this.handleTextChange('domain', event)}} />
                        <div style={{color:'red'}}>{this.state.domainError}</div>
                        </FormControl>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="Comment">Comment*</InputLabel>
                        <Input id="comment" className={classes.textField} onChange={(event) => {this.handleTextChange('comment', event)}} />
                        <div style={{color:'red'}}>{this.state.commentError}</div>
                        </FormControl><br/><br/><br/>

                        <Grid item xs={12} sm={12} lg={12} xl={12}>
                            <label>Hindi</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="file" className={classes.textField} name="hindiFile" onChange={this.handleMultiFileChange.bind(this)} accept=".pdf" />
                            <div style={{color:'red'}}>{this.state.hindiError}</div>
                        </Grid><br/><br/>

                        <Grid item xs={12} sm={12} lg={12} xl={12}>
                            <label>English</label>&nbsp;&nbsp;&nbsp;
                            <input type="file" name="englishFile" className={classes.textField} onChange={this.handleMultiFileChange.bind(this)} accept=".pdf" />
                            <div style={{color:'red'}}>{this.state.englishError}</div>
                        </Grid><br/><br/>
                          <Grid item xs={6} sm={6} lg={6} xl={6}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={()=>{history.push(`${process.env.PUBLIC_URL}/corpus`)}}> Cancel </Button>
                            <Button variant="contained" color="primary" className={classes.buttons}onClick={this.handleSubmit.bind(this)}> Create Corpus</Button>
                        </Grid>
                  </form>
                </Paper>
                }
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
