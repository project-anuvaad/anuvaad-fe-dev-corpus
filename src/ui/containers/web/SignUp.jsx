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
          <Grid container spacing={8}>
            <Grid item xs={12} sm={4} lg={5} xl={5} >
              <img src="Anuvaad.png" width="100%" />
            </Grid>
            <Grid item xs={12} sm={8} lg={7} xl={7}  style={{ backgroundColor: '#f1f5f7' }} >
              <form  method="post">
                <Typography align='center' style={{ marginTop: '5%', marginBottom: '5%', fontSize: '33px', fontfamily: 'Trebuchet MS, sans-serif	', color: '#003366' }}>Sign Up</Typography>
                <FormControl align='center' fullWidth >

                  <TextField  value={''} id="input-with-icon-textfield" placeholder={"First name"}
                    margin="normal" varient="outlined" style={{ width: '50%', marginBottom: '2%', backgroundColor: 'white',fontSize:'20px' }}
                  />
                  </FormControl>
                  <FormControl align='center' fullWidth>
                  <TextField value={''} id="input-with-icon-textfield" placeholder={"Last name"}
                    margin="normal" varient="outlined" style={{ width: '50%', marginBottom: '2%', backgroundColor: 'white' }}
                  />
                </FormControl>
                <FormControl  align='center'fullWidth>
                  <TextField value={''} id="outlined-required" type="email" placeholder={"Email"}
                    margin="normal" varient="outlined" style={{ width: '50%', marginBottom: '2%', backgroundColor: 'white' }}
                  />
                </FormControl>
                <FormControl  align='center' fullWidth>
                  <TextField value={''} id="outlined-required" type="password" placeholder={"Enter password"}
                    margin="normal" varient="outlined" style={{ width: '50%', marginBottom: '2%', backgroundColor: 'white' }}
                  />                </FormControl>
                <FormControl align='center' fullWidth>
                  <TextField value={''} id="outlined-required" type="password" placeholder={"Re-enter password"}
                    margin="normal" varient="outlined" style={{ width: '50%', marginBottom: '2%', backgroundColor: 'white' }}
                  />
                </FormControl>
                <FormControlLabel fullWidth style={{marginLeft:'25%'}}
                  control={
                    <Checkbox
                      className={classes.checkRemember.className}
                      labelclassName={classes.checkRemember.labelclassName}
                      iconclassName={classes.checkRemember.iconclassName}
                      color='#ffffff !important'
                    />
                  }
                  label={<div><span>I agree to the</span>
                    <Link href="Anuvaad-TnC.html" > Privacy Policy</Link>
                  </div>}
                />
                <br />
                <FormControl align='center' fullWidth>
                <Button  variant="contained" aria-label="edit" style={{
                  width: '50%', marginBottom: '2%', marginTop: '2%',
                  backgroundColor: '#1ca9c9', color: 'white',
                }}>
                  Sign Up
                  </Button>
                  </FormControl>
                
                <Typography style={{marginLeft:'26%',marginBottom:'4%'}}>Already Signed up?
                  <Link onClick={() => { { history.push("/") } }}> Log In</Link></Typography>
               
              </form>
              <hr style={{ height: '2px', borderwidth: '0', width: '70%', backgroundColor: ' #D8D8D8', color: '#D8D8D8', border: '0',marginTop:'2%' }} />
              <Typography align='center' style={{ marginTop: '3%', fontfamily: 'Gill Sans, sans-serif;' }}>Enter the required details,you will receive a confirmation mail to your resgistered email id.<br />Please click on that to activate your account.</Typography>
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
