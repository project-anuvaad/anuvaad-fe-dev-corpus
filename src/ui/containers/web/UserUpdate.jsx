import React from 'react';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import SelectModel from '@material-ui/core/Select';
import MySnackbarContentWrapper from "../../components/web/common/Snackbar";
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Updatepassword from "../../../flux/actions/apis/updateadminpassword";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { white, blueGrey50,darkBlack } from "material-ui/styles/colors";
import UserRolesList from "../../../flux/actions/apis/userroles";
import AddUser from "../../../flux/actions/apis/adduser";
import APITransport from '../../../flux/actions/apitransport/apitransport';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class UserUpdate extends React.Component {
  constructor(props) {
    
    super(props);
    
    this.state = {
      userid: "",
      firstname: "",
      lastname:'',
      email:'',
      open:'',
      userDetails:[],
      userpassword:'',
      value: false

    };
  }

  handleCancel=()=>{
    this.setState({open:false})
  }

  componentDidMount(){
    const { APITransport } = this.props;
    const apiObj = new UserRolesList();
    APITransport(apiObj);
    this.setState({ showLoader: true })

  }


  handleSubmit = () => {
    var model = '';
    
      const { APITransport } = this.props;
      const apiObj = new AddUser(this.state.userid, this.state.firstname, this.state.lastname, this.state.userpassword,this.state.email, this.state.roles);
      APITransport(apiObj);
      this.setState({ showLoader: true })
      
      setTimeout(()=>{this.setState({value:true})}, 1000);
      
    
  }

  handlePasswordSubmit = (id) => {
    
    
      const { APITransport } = this.props;
      const apiObj = new Updatepassword(id,this.state.userpassword);
      APITransport(apiObj);
      this.setState({ showLoader: true })
      
      setTimeout(()=>{this.setState({value:true})}, 1000);
      
    
  }



  componentDidUpdate(prevProps, nexpProps) {
    if (prevProps.userRoles !== this.props.userRoles) {
        this.setState({ userRoles: this.props.userRoles,value : false
         })
    }

}

handleClickShowPassword = () => {
  this.setState(state => ({ showPassword: !state.showPassword }));
};

handleSelectModelChange= event => {
    
  this.setState({ roles: event.target.value });
  console.log(this.state.roles)
};

handleDelete = data => () => {
  this.setState(state => {
    const chipData = [...state.roles];
    const chipToDelete = chipData.indexOf(data);
    chipData.splice(chipToDelete, 1);
    this.setState({roles:chipData})
  });
};
  


  static getDerivedStateFromProps(nextProps, prevState){
    
    if(nextProps.userDetails && nextProps.userDetails  && nextProps.userDetails !== prevState.userDetails){
      console.log(nextProps.userDetails,prevState.userDetails)

      return { userDetails: nextProps.userDetails,
        
        userid:nextProps.userDetails[1],
        firstname: nextProps.userDetails[2],
        lastname: nextProps.userDetails[3],
        email:nextProps.userDetails[4],
        roles : nextProps.userDetails[5],
        value : false

      };
      
   }
   else return null;
 }

  handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value
    })
  }
    render() {
      var { openValue, handleCancel, newUser,userDetails } = this.props;
      var {userDetails}  = this.state;
        return (
          <div style={{position:'fixed'}}>
          {openValue &&
          <Paper style={{marginTop:"10px",marginRight:'30px', marginLeft:'-20px'}}>
            <Typography gutterBottom variant="title"  component="h2" style={{background:blueGrey50,paddingLeft:"35%",paddingTop:'13px',paddingBottom:'13px', width: '65%', marginBottom: '4%'}}>
            {newUser ?  "Add New User" : "Password Update"}
                </Typography><br/>
            <form method="post">

              <FormControl fullWidth>
                <TextField  id="standard-name" InputProps={{
          readOnly: userDetails[1]? true:false,
        }}  label="UserId" value={this.state.userid? this.state.userid : '' } required type="text"  onChange={(event) => { this.handleTextChange('userid', event) }}
                  margin="normal" varient="outlined" style={{ marginLeft:'5%', width: '90%', marginBottom: '4%' }}
                />

              </FormControl>
              <FormControl fullWidth>
                <TextField id={this.state.firstname} label="First Name" InputProps={{ readOnly: userDetails[1]? true:false}} placeholder={"First Name"} required value={this.state.firstname ? this.state.firstname : ''} type="text"  onChange={(event) => { this.handleTextChange('firstname', event) }}
                  margin="normal" varient="outlined" style={{ marginLeft:'5%', width: '90%', marginBottom: '4%' }}
                />

              </FormControl>
              <FormControl fullWidth>
                <TextField  label="Last Name" InputProps={{ readOnly: userDetails[1]? true:false}} value={this.state.lastname ? this.state.lastname : ''} required id="outlined-required" type="text" onChange={(event) => { this.handleTextChange('lastname', event) }}
                  margin="normal" varient="outlined" style={{ marginLeft:'5%', width: '90%', marginBottom: '4%' }}
                />                </FormControl>
              <FormControl style={{ marginLeft:'5%', width: '90%', marginBottom: '4%' }}>
          <InputLabel htmlFor="adornment-password">Password* (min 6 char)</InputLabel>
          <Input
           
            id="adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}

            value={this.state.userpassword}
            onChange={(event) => { this.handleTextChange('userpassword', event) }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
<FormControl fullWidth>
                <TextField label="Email ID" value={this.state.email ? this.state.email : ''} InputProps={{ readOnly: userDetails[1]? true:false}}  id="outlined-required" type="text" onChange={(event) => { this.handleTextChange('email', event) }}
                  margin="normal" varient="outlined" style={{ marginLeft:'5%', width: '90%', marginBottom: '4%' }}
                />                </FormControl>

<Grid container spacing={8} >
            <Grid item xs={6} sm={6} lg={6} xl={6}>
<Typography value='' variant="title" gutterBottom={true} style={{ marginLeft: '12%', marginTop:'12px' }} >Select Role </Typography>
            </Grid>

            <Grid item xs={4} sm={4} lg={4} xl={4}>
<SelectModel id="select-multiple-chip"
                disabled=  {userDetails[1]? true:false}
                multiple={true}
                style={{minWidth: 160,align:'right',maxWidth: 160}}
                value={this.state.roles? this.state.roles : []}
                onChange={this.handleSelectModelChange}
                renderValue={selected => selected.join(', ')}
                input={<OutlinedInput name={this.state.roles} id="select-multiple-checkbox" />} >
                  {this.state.userRoles  ?
                   this.state.userRoles.map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  )):[]}>

            </SelectModel><br/>
            
            

            </Grid>
            {!userDetails[1]&&
            <Grid item xs={12} sm={12} lg={12} xl={12} style={{ marginLeft:'5%', width: '90%', marginBottom: '4%' }}>
            {this.state.roles && this.state.roles.map(value => (
                  <Chip key={value} label={value}  onDelete={this.handleDelete(value)} />
                ))
            }
            </Grid>
            }
            </Grid>
                <span style={{ marginLeft: '20%', color: 'red' }}>{this.state.message}</span>
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={this.state.open} autoHideDuration={6000}>
                  <MySnackbarContentWrapper
                    onClose={this.handleClose}
                    variant="success"
                    message={this.state.messageSnack} />
                </Snackbar>
                
                  <Button variant="contained" onClick={() => {handleCancel(false)}} color="primary" aria-label="edit" style={{ width: '40%',marginLeft:'-13%', marginBottom: '4%', marginTop: '4%' }}>
                    Cancel
                </Button>
                {!userDetails[1]?
                  <Button variant="contained" disabled={userDetails[1]? (this.state.userpassword.length>5 ?false :true ): (this.state.firstname && this.state.lastname && this.state.userid && this.state.email ? false : true)} onClick={this.handleSubmit} color="primary" aria-label="edit" style={{ width: '40%', marginBottom: '4%', marginTop: '4%',marginLeft:'5%' }}>
                     Add
                </Button>:
                <Button variant="contained" disabled={userDetails[1]? (this.state.userpassword.length>5 ?false :true ): (this.state.firstname && this.state.lastname && this.state.userid && this.state.email ? false : true)} onClick={() => {this.handlePasswordSubmit(userDetails[0])}} color="primary" aria-label="edit" style={{ width: '40%', marginBottom: '4%', marginTop: '4%',marginLeft:'5%' }}>
                    Update
                </Button>}
                </form>
                {this.state.value ? handleCancel(false): ''}
                </Paper>
          }
          </div>
          
        
);
}
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  userRoles: state.userRoles,
  addUser: state.addUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
  APITransport,
  CreateCorpus: APITransport,
}, dispatch);


export default withRouter((connect(mapStateToProps, mapDispatchToProps)(UserUpdate)));

