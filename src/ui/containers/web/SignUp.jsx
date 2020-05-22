import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
// import {Link} from 'react-router';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles, Typography } from "@material-ui/core";
import ThemeDefault from "../../theme/web/theme-default";

import LoginStyles from "../../styles/web/LoginStyles";
import Grid from '@material-ui/core/Grid';
import LoginAPI from "../../../flux/actions/apis/login";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import history from "../../../web.history";
import TextField from '../../components/web/common/TextField';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import AccountCircle from '@material-ui/icons/AccountCircle';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
   
  }

  

  /**
   * user input handlers
   * captures text provided in email and password fields
   */


  render() {
    const { user, classes, location } = this.props;
    return (
      <MuiThemeProvider theme={ThemeDefault}>
        <div>
      
          <Grid container spacing={12}>
              <Grid item xs={12} sm={4} lg={5} xl={5} >
              <img src="Anuvaad.png"  width="100%"/>
                </Grid>
              <Grid item xs={12} sm={8} lg={7} xl={7} align='center' style={{backgroundColor:'#f1f5f7'}} >
          
              <form method="post">
              <Typography style={{marginTop:'5%', marginBottom:'5%', fontSize:'33px',fontfamily: 'Gill Sans, sans-serif;',color:'#003366' }}>Sign Up</Typography>
                <FormControl  fullWidth>
               
                <TextField value={''} id="input-with-icon-textfield" placeholder={"Username"}
              margin="normal" varient="outlined" style={{width:'50%', marginBottom:'2%',backgroundColor:'white'}}
              />
               
               
                  
                </FormControl>
                <FormControl fullWidth>
                <TextField value={''} id="outlined-required" type="email" placeholder={"Email"}
              margin="normal" varient="outlined" style={{width:'50%', marginBottom:'2%',backgroundColor:'white'}}
              />
                  
                </FormControl>
                <FormControl fullWidth>
                <TextField value={''} id="outlined-required" placeholder={"Name"}
              margin="normal" varient="outlined" style={{width:'50%', marginBottom:'2%',backgroundColor:'white'}}
              />
                  
                </FormControl>
                <FormControl fullWidth>
                <TextField value={''} id="outlined-required" type="password" placeholder={"Password"}
              margin="normal" varient="outlined"  style={{width:'50%', marginBottom:'2%',backgroundColor:'white'}}
              />                </FormControl>
              <FormControl fullWidth>
                <TextField value={''} id="outlined-required" type="password" placeholder={"Confirm Password"}
              margin="normal" varient="outlined"  style={{width:'50%', marginBottom:'2%',backgroundColor:'white'}}
              />                </FormControl>
                
                  

                <FormControlLabel fullWidth
                    control={
                      <Checkbox
                        className={classes.checkRemember.className}
                        labelclassName={classes.checkRemember.labelclassName}
                        iconclassName={classes.checkRemember.iconclassName}
                        color= '#ffffff !important'
                      />
                    }
                    label={<div><span>I agree to the</span>
                    <Link href="tnc.html" > Privacy Policy</Link>
                    </div>}
                  />
                  <br/>
                  <Button variant="contained"   aria-label="edit" style={{width:'50%', marginBottom:'2%', marginTop:'2%',
                   backgroundColor:'#1ca9c9', color:'white'}}>
                    Sign Up
                  </Button>
                  {/* <Grid container spacing={24} >
                <Grid item xs={6} sm={6} lg={6} xl={6}> */}
                  <Typography >Already Signed up?
                  <Link onClick={() => {{history.push("/")}}}> Log In</Link></Typography>
                  {/* </Grid>
                  </Grid> */}
          
                  {/* </Link> */}
                  
            </form>
            <hr style={{height:'2px',borderwidth:'0',width:'70%',backgroundColor:' #D8D8D8', color:'#D8D8D8',border:'0'}}/>
            </Grid>
           </Grid>
            <div className={classes.buttonsDiv} />
        </div>
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = state => ({
  user: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransporter: APITransport
    },
    dispatch
  );

export default withRouter(
  withStyles(LoginStyles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SignUp)
  )
);
