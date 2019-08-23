import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import APITransport from '../../../flux/actions/apitransport/apitransport';
import history from "../../../web.history";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { white, blueGrey50,darkBlack } from "material-ui/styles/colors"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        oldpassword:'',
        newpassword:'',
        repassword:'',
        
      userDetails: JSON.parse(localStorage.getItem('userProfile'))
    }
  }

  componentDidMount() {
    this.setState({
      autoMlText: '',
      nmtText: [],
      nmtTextSP: []
      
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.automl !== this.props.automl) {
      this.setState({
        autoMlText: this.props.automl.text,
      })
    }
    if (prevProps.nmt !== this.props.nmt) {
      this.setState({
        nmtText: this.props.nmt.text,
      })
    }
    if (prevProps.nmtsp !== this.props.nmtsp) {
      this.setState({
        nmtTextSP: this.props.nmtsp.text,
      })
    }
  }

  handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value
    })
  }
  handleClear() {
    console.log('clear')
    this.setState({
      text:'',
      autoMlText:'',
      source:'',
      target:'',
      drawer:false
    })
  }

  handleSelectChange = event => {
    
    this.setState({ [event.target.name]: event.target.value });
  };

  handleReset=()=> {
      this.setState({drawer:true})
  }
  handleCancel=()=> {
    this.setState({drawer:false})
}
handleClose=()=> {
    history.push(`${process.env.PUBLIC_URL}/corpus`)
}

  handleTextChange(key, event) {
    console.log(event.target.value)
    this.setState({
        [key]: event.target.value
    })
}

  
    
    
    handleSubmit = () => {
        const { APITransport } = this.props;
        // const apiObj = new Changepassword(this.state.oldpassword, this.state.newpassword, this.state.repassword);
        // APITransport(apiObj);
        this.setState({showLoader:true})
        // setTimeout(()=>{history.push("/")},2000)
        
      }

  render() {

    console.log(this.state.userDetails)
    return (
      <div>
        <Paper style={{marginLeft:'23%',width:'46%',marginTop:'5%'}}>
        <Typography variant="h5" style={{ color: darkBlack, background:blueGrey50, paddingLeft:'40%', paddingBottom:'12px',paddingTop:'8px'}} >My Profile </Typography>

            <Grid container spacing={4} >
            <Grid item xs={5} sm={5} lg={5} xl={5}>
          <Typography value='' variant="title" gutterBottom="true" style={{ marginLeft: '12%', paddingTop: '10.5%' }} >First Name </Typography>
        
        </Grid>
        <Grid item xs={6} sm={6} lg={6} xl={6}><br/><br/>
        <Typography value='' variant="title" gutterBottom="true" style={{ marginLeft: '12%',textTransform:'capitalize'}} > {this.state.userDetails.firstname}  </Typography>
        
             </Grid>
            <Grid container spacing={4} >
            <Grid item xs={5} sm={5} lg={5} xl={5}>
          <Typography value='' variant="title" gutterBottom="true" style={{ marginLeft: '12%', paddingTop: '11%' }} >Last Name </Typography>
        
        </Grid>
        <Grid item xs={6} sm={6} lg={6} xl={6}><br/><br/>
        <Typography value='' variant="title" gutterBottom="true" style={{ marginLeft: '12%',textTransform:'capitalize',}} > {this.state.userDetails.lastname}  </Typography>
        
             </Grid>
            </Grid>
            <Grid container spacing={4} >
            <Grid item xs={5} sm={5} lg={5} xl={5}>
          <Typography value='' variant="title" gutterBottom="true" style={{ marginLeft: '12%', paddingTop: '11%' }} >Email ID </Typography>
        
        </Grid>
        <Grid item xs={6} sm={6} lg={6} xl={6}><br/><br/>
        <Typography value='' variant="title" gutterBottom="true" style={{ marginLeft: '12%',marginTop:'-1%' }} > {this.state.userDetails.email}  </Typography>
        
             </Grid>
            </Grid>
            </Grid>
        <div style={{marginLeft:'90%',paddingBottom:'20px'}}>
        
                                <Tooltip title="Reset Password" disableTriggerFocus={true}>
                                    <Fab
									
									aria-haspopup="true"
									onClick={this.handleReset}
									color="primary"
									size="medium">
									<AccountCircle/>	
								</Fab>
                                </Tooltip>
								
        </div>
        </Paper>

        {this.state.drawer ?
                                <Dialog
                                open={this.state.drawer}
                                
                                onClose={this.handleClose}
                                disableBackdropClick
                                disableEscapeKeyDown
                                fullWidth
                                aria-labelledby="form-dialog-title">
                                    <Typography variant="h5" style={{ color: darkBlack, background:blueGrey50, paddingLeft:'28%', paddingBottom:'12px',paddingTop:'8px'}} >Change Password</Typography>
                                
                                    <DialogContent>
                                        <DialogContentText /><br/>
                                        
              <form method="post">
                <FormControl fullWidth>
                <TextField placeholder={'Old Password*'} type="password" id="outlined-required" onChange={(event) => {this.handleTextChange('oldpassword', event)}}
              margin="normal" varient="outlined" style={{width:'100%', marginBottom:'4%'}}
              />
                  
                </FormControl>
                <FormControl fullWidth>
                <TextField placeholder={"New Password*"} type="password" id="outlined-required" onChange={(event) => {this.handleTextChange('newpassword', event)}}
              margin="normal" varient="outlined" style={{width:'100%', marginBottom:'4%'}}
              />
                  
                </FormControl>
                <FormControl fullWidth>
                <TextField placeholder={"Confirm New Password*"} id="outlined-required" type="password" onChange={(event) => {this.handleTextChange('repassword', event)}}
              margin="normal" varient="outlined"  style={{width:'100%', marginBottom:'4%'}}
              />                </FormControl>
                <div>
                <DialogActions style={{marginRight:'22px'}}>
                <Button variant="contained"  onClick={this.handleCancel} color="primary" aria-label="edit" style={{width:'50%', marginBottom:'4%', marginTop:'4%'}}>
                    Cancel
                  </Button>
                <Button variant="contained" disabled={this.state.oldpassword && this.state.newpassword &&  this.state.repassword ? false : true} onClick={this.handleSubmit} color="primary" aria-label="edit" style={{width:'50%', marginBottom:'4%', marginTop:'4%'}}>
                    Change Password
                  </Button>
                                            
                                            </DialogActions>
                 


                  
                  
                </div>
              </form>
            

                                        
                                        
                                       
                                        </DialogContent>
                                        
                                </Dialog>:''
                            }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  automl: state.automl,
  nmt: state.nmt,
  nmtsp: state.nmtsp
});

const mapDispatchToProps = dispatch => bindActionCreators({
  APITransport,
  NMTApi: APITransport,
  NMTSPApi: APITransport,
}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));
