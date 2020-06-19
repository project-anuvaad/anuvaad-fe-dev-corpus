import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles, Typography } from "@material-ui/core";
import ThemeDefault from "../../theme/web/theme-default";

import LoginStyles from "../../styles/web/LoginStyles";
import Grid from '@material-ui/core/Grid';
import SetPasswordApi from "../../../flux/actions/apis/setpassword";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import history from "../../../web.history";
import TextField from '../../components/web/common/TextField';
import Snackbar from "../../components/web/common/Snackbar";
import { translate } from "../../../assets/localisation";

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
        if (this.state.password.length < 6) {
            alert(translate('setPassword.page.alert.minPasswordLength'))
        }
        else if (this.state.password !== this.state.confirmPassword) {
            alert(translate('common.page.alert.passwordDidNotMatch'))
        } else {
            let { APITransport } = this.props;
            let apiObj = new SetPasswordApi(this.props.match.params.uid, this.props.match.params.rid, this.state.password);
            APITransport(apiObj);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.setpassword !== this.props.setpassword) {
            this.setState({ message: translate('setPassword.page.message.passwordResetSuccessfull'), open: true })
            setTimeout(() => {
                history.push(`${process.env.PUBLIC_URL}/logout`)
            }, 4000)
        }
    }

    render() {
        return (
            <MuiThemeProvider theme={ThemeDefault}>

                <div>
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={4} lg={5} xl={5} >
                            <img src="/Anuvaad.png" width="100%"  height="925px" alt="" />
                        </Grid>
                        <Grid item xs={12} sm={8} lg={7} xl={7} style={{ backgroundColor: '#f1f5f7' }} >
                            <Typography align='center' style={{ marginTop: '30%', marginBottom: '5%', fontSize: '33px', fontfamily: 'Trebuchet MS, sans-serif	', color: '#003366' }}>{translate('setPassword.page.label.password')}</Typography>
                            <FormControl align='center' fullWidth >

                                <FormControl align='center' fullWidth>
                                    <TextField value={this.state.password} id="outlined-required" type="password" placeholder={translate('setPassword.page.placeholder.enterPassword')}
                                        margin="normal" varient="outlined" style={{ width: '50%', marginBottom: '2%', backgroundColor: 'white' }}
                                        onChange={this.handleInputReceived('password')}
                                    />                </FormControl>
                                <FormControl align='center' fullWidth>
                                    <TextField value={this.state.confirmPassword} id="outlined-required" type="password" placeholder={translate('setPassword.page.placeholder.reEnterPassword')}
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
                                        backgroundColor: this.state.confirmPassword ? '#1ca9c9' : 'gray', color: 'white',
                                    }} onClick={this.handleSubmit.bind(this)}>
                                    {translate('setPassword.page.label.createPassword')}
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
    setpassword: state.setpassword
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