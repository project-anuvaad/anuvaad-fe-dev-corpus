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
import { ValidatorForm } from 'react-material-ui-form-validator';
// import {Link} from 'react-router';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles, Typography } from "@material-ui/core";
import ThemeDefault from "../../theme/web/theme-default";

import LoginStyles from "../../styles/web/LoginStyles";
import Grid from '@material-ui/core/Grid';
import SignupApi from "../../../flux/actions/apis/signup";
import ActivateUser from "../../../flux/actions/apis/activate_user";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import history from "../../../web.history";
import TextField from '../../components/web/common/TextField';
import Link from '@material-ui/core/Link';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Snackbar from "../../components/web/common/Snackbar";


class Activate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }



    handleInputReceived = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleSubmit() {
        if (this.handleValidation('firstName') && this.handleValidation('lastName') && this.handleValidation('email') && this.handleValidation('password') && this.handleValidation('confirmPassword')) {
            if (this.state.password !== this.state.confirmPassword) {
                alert('Password and confirm password did not match')
            } else {
                if (!this.state.termsAndCondition) {
                    alert('Please accept terms and condition')
                } else {
                    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if (this.state.email.match(mailformat)) {
                        let { APITransport } = this.props;
                        let apiObj = new SignupApi(this.state.email, this.state.firstName, this.state.lastName, this.state.password);
                        APITransport(apiObj);
                    } else {
                        alert('Please provide valid email')
                    }
                }
            }
        } else {
            alert('Please provide valid details')
        }

    }

    componentDidMount() {
        if (this.props.match.params.uid && this.props.match.params.rid) {
            const api = new ActivateUser(
                this.props.match.params.uid,
                this.props.match.params.rid
            );

            this.props.APITransport(api);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activate !== this.props.activate) {
            this.setState({ message: 'Account activation successfull, please relogin to continue', open: true })
            setTimeout(()=>{
                history.push(`${process.env.PUBLIC_URL}/logout`)
            },4000)
        }
    }

    handleValidation(key) {
        if (!this.state[key] || this.state[key].length < 2) {
            return false
        }
        return true
    }


    render() {
        const { user, classes, location } = this.props;
        return (
            <MuiThemeProvider theme={ThemeDefault}>
                <div>
                    <Grid container>
                        <Grid item xs={12} sm={4} lg={5} xl={5} >
                            <img src="/Anuvaad.png" width="100%" />
                        </Grid>
                        <Grid item xs={12} sm={8} lg={7} xl={7} style={{ backgroundColor: '#f1f5f7' }} >
                            {/* <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                            onError={errors => console.log(errors)}
                        > */}
                            <Typography align='center' style={{ marginTop: '45%', marginBottom: '5%', fontSize: '25px', fontfamily: 'Arial, Helvetica, sans-serif', color: '#003366' }}>Please wait while we are activating your account</Typography>
                        </Grid>
                    </Grid>
                    <div className={classes.buttonsDiv} />
                    {this.state.open && (
                        <Snackbar
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
    activate: state.activate
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
        )(Activate)
    )
);
