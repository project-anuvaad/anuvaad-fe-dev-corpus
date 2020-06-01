import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles, Typography } from "@material-ui/core";
import ThemeDefault from "../../theme/web/theme-default";

import LoginStyles from "../../styles/web/LoginStyles";
import Grid from '@material-ui/core/Grid';
import ForgotPasswordApi from "../../../flux/actions/apis/forgotpassword";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import history from "../../../web.history";
import TextField from '../../components/web/common/TextField';
import Link from '@material-ui/core/Link';
import Snackbar from "../../components/web/common/Snackbar";

class UpdatePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        }
    }


    handleInputReceived = prop => event => {
        this.setState({ [prop]: event.target.value });
    };


    handleSubmit(e) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.email.match(mailformat)) {
            let { APITransport } = this.props;
            let apiObj = new ForgotPasswordApi(this.state.email);
            APITransport(apiObj);
        } else {
            alert('Please provide valid email')
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.forgotpassword !== this.props.forgotpassword) {
            this.setState({ message: 'Successfully sent forgot password link. Please check your email for setting  password', open: true, firstName: '', lastName: '', email: '', password: '', confirmPassword: '', termsAndCondition: '' })
        }

    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={ThemeDefault}>

                <div>
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={4} lg={5} xl={5} >
                            <img src="Anuvaad.png" width="100%" alt="" />
                        </Grid>
                        <Grid item xs={12} sm={8} lg={7} xl={7} style={{ backgroundColor: '#f1f5f7' }} >
                            <Typography align='center' style={{ marginTop: '30%', marginBottom: '5%', fontSize: '33px', fontfamily: 'Trebuchet MS, sans-serif', color: '#003366' }}>
                                Forgot Password</Typography>
                            <FormControl align='center' fullWidth >

                                <TextField id="outlined-required" type="email" placeholder={"Email/Username*"}
                                    margin="normal" varient="outlined" style={{ width: '50%', marginBottom: '2%', backgroundColor: 'white' }}
                                    onChange={this.handleInputReceived('email')}
                                    value={this.state.email}
                                />
                            </FormControl>
                            <FormControl align='center' fullWidth>
                                <Button
                                    disabled={!this.state.email}
                                    variant="contained" aria-label="edit" style={{
                                        width: '50%', marginBottom: '2%', marginTop: '2%',
                                        backgroundColor: this.state.email ? '#1ca9c9' : 'gray', color: 'white',
                                    }} onClick={this.handleSubmit.bind(this)}>
                                    Sign Up
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {this.state.open && (
                        <Snackbar
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            open={this.state.open}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            variant="success"
                            message={this.state.message}
                        />
                    )}
                </div>

            </MuiThemeProvider>

        );
    }
}
const mapStateToProps = state => ({
    forgotpassword: state.forgotpassword
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
        )(UpdatePassword)
    )
);