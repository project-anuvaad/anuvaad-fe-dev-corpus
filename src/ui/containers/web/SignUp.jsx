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
          <div className={classes.signUpContainer}>
            <Paper className={classes.paper}>
              <form method="post">
              <Typography style={{marginTop:'3%', marginBottom:'8%', fontSize:'24px'}}>Create New Account</Typography>
                <FormControl fullWidth>
                <TextField value={"First Name"} id="outlined-required"
              margin="normal" varient="outlined" style={{width:'100%', marginBottom:'4%'}}
              />
                  
                </FormControl>
                <FormControl fullWidth>
                <TextField value={"Last Name"} id="outlined-required"
              margin="normal" varient="outlined" style={{width:'100%', marginBottom:'4%'}}
              />
                  
                </FormControl>
                <FormControl fullWidth>
                <TextField value={"mail"} id="outlined-required"
              margin="normal" varient="outlined" style={{width:'100%', marginBottom:'4%'}}
              />
                  
                </FormControl>
                <FormControl fullWidth>
                <TextField value={"password"} id="outlined-required" type="password"
              margin="normal" varient="outlined"  style={{width:'100%', marginBottom:'4%'}}
              />                </FormControl>
                <div>
                  

                <FormControlLabel
                    control={
                      <Checkbox
                        className={classes.checkRemember.className}
                        labelclassName={classes.checkRemember.labelclassName}
                        iconclassName={classes.checkRemember.iconclassName}
                      />
                    }
                    label="I have read the Terms and Conditions"
                  />
                  <Button variant="contained"  color="secondary" aria-label="edit" style={{width:'100%', marginBottom:'4%', marginTop:'4%'}}>
                    Sign Up Now
                  </Button>
                  <Grid container spacing={24} style={{ marginTop:'5%'}}>
                <Grid item xs={6} sm={6} lg={6} xl={6}>
                  <Typography >Have an account?</Typography>
                  </Grid>
                  <Grid item xs={2} sm={2} lg={2} xl={2}>
                  <Link onClick={() => {{history.push("/signup")}}}>SignIn</Link>
                  </Grid>
                  </Grid>
          
                  {/* </Link> */}
                </div>
              </form>
            </Paper>

           
            <div className={classes.buttonsDiv} />
          </div>
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
