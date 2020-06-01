import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles, Typography } from "@material-ui/core";
import ThemeDefault from "../../theme/web/theme-default";

import LoginStyles from "../../styles/web/LoginStyles";
import Grid from '@material-ui/core/Grid';
import SignupApi from "../../../flux/actions/apis/signup";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import history from "../../../web.history";
import TextField from '../../components/web/common/TextField';
import Link from '@material-ui/core/Link';

class SetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            password: "",
            confirmPassword: "",


        }

    }
    handleInputReceived = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    handleSubmit(e) {
        e.preventDefault();
        if (this.handleValidation('password') && this.handleValidation('confirmPassword')) {
            if (this.state.password !== this.state.confirmPassword) {
                alert('Password and confirm password did not match')
            } else {
                alert('Please provide valid details')
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={ThemeDefault}>

                <div>
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={4} lg={5} xl={5} >
                            <img src="Anuvaad.png" width="100%" height="925px" alt="" />
                        </Grid>
                        <Grid item xs={12} sm={8} lg={7} xl={7} style={{ backgroundColor: '#f1f5f7' }} >
                            <Typography align='center' style={{ marginTop: '30%', marginBottom: '5%', fontSize: '33px', fontfamily: 'Trebuchet MS, sans-serif	', color: '#003366' }}>Set Password</Typography>
                            <FormControl align='center' fullWidth >

                                <FormControl align='center' fullWidth>
                                    <TextField value={this.state.password} id="outlined-required" type="password" placeholder={"Enter password*"}
                                        margin="normal" varient="outlined" style={{ width: '50%', marginBottom: '2%', backgroundColor: 'white' }}
                                        onChange={this.handleInputReceived('password')}
                                    />                </FormControl>
                                <FormControl align='center' fullWidth>
                                    <TextField value={this.state.confirmPassword} id="outlined-required" type="password" placeholder={"Re-enter password*"}
                                        margin="normal" varient="outlined" style={{ width: '50%', marginBottom: '2%', backgroundColor: 'white' }}
                                        onChange={this.handleInputReceived('confirmPassword')}
                                    />
                                </FormControl>
                            </FormControl>
                            <FormControl align='center' fullWidth>
                                <Button
                                    disabled={!this.state.confirmPassword}
                                    variant="contained" aria-label="edit" style={{
                                        width: '50%', marginBottom: '2%', marginTop: '2%',
                                        backgroundColor: this.state.termsAndCondition ? '#1ca9c9' : 'gray', color: 'white',
                                    }} onClick={this.handleSubmit.bind(this)}>
                                    Create Password
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>

            </MuiThemeProvider>

        );
    }
}
const mapStateToProps = state => ({
    signup: state.signup
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            APITransport: APITransport
        },
        dispatch
    );
export default withRouter(
    withStyles(LoginStyles)(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(SetPassword)
    )
);