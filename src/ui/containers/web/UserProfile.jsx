import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Fab from "@material-ui/core/Fab";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Updatepassword from "../../../flux/actions/apis/updatepassword";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import history from "../../../web.history";
import MySnackbarContentWrapper from "../../components/web/common/Snackbar";
import { translate } from "../../../assets/localisation";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: "",
      newpassword: "",
      repassword: "",
      status: "",
      open: false,
      messageSnack: "",
      lang: localStorage.getItem(`lang${JSON.parse(localStorage.getItem("userProfile")).id}`),

      userDetails: JSON.parse(localStorage.getItem("userProfile"))
    };
  }

  componentDidMount() {
    this.setState({
      autoMlText: "",
      nmtText: [],
      nmtTextSP: [],
      message: ""
    });
  }

  handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleReset = () => {
    this.setState({ drawer: true });
  };

  handleCancel = () => {
    this.setState({
      message: ""
    });
    this.setState({ drawer: false });
  };

  handleClose = () => {
    history.push(`${process.env.PUBLIC_URL}/corpus`);
  };

  validateForm() {
    return this.state.oldpassword.length > 3 && this.state.newpassword.length > 5 && this.state.repassword === this.state.newpassword;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updatePasswordstatus !== this.props.updatePasswordstatus) {
      if (this.props.updatePasswordstatus.http.status === 400) {
        this.setState({
          message: translate("userProfile.page.message.TryAgain"),
          status: this.props.updatePasswordstatus.http.status
        });
      } else if (this.props.updatePasswordstatus.http.status === 200) {
        this.setState({
          open: true,
          messageSnack: translate("userProfile.page.message.passwordChangeSuccessLogin"),
          status: this.props.updatePasswordstatus.http.status
        });

        setTimeout(() => {
          history.push(`${process.env.PUBLIC_URL}/logout`);
        }, 3000);
      }

      this.setState({
        status: this.props.updatePasswordstatus.why,
        oldpassword: "",
        newpassword: "",
        repassword: ""
      });
    }
  }

  handleSubmit = () => {
    if (this.state.oldpassword.length > 3) {
      if (this.state.newpassword.length > 5) {
        if (this.state.repassword === this.state.newpassword) {
          if (this.state.repassword !== this.state.oldpassword) {
            this.setState({
              message: ""
            });
            const apiObj = new Updatepassword(
              this.state.userDetails.id,
              this.state.userDetails.username,
              this.state.oldpassword,
              this.state.newpassword
            );
            this.props.APITransport(apiObj);
            this.setState({ showLoader: true });
            // setTimeout(()=>{history.push("{this.handleClose();history.push(`${process.env.PUBLIC_URL}/logout`)}")},200
          } else {
            this.setState({
              message: translate("userProfile.page.message.passwordMismatchAlert")
            });
          }
        } else {
          this.setState({
            message: translate("userProfile.page.message.passwordSameAlert")
          });
        }
      } else {
        this.setState({
          message: translate("userProfile.page.message.passwordTooShortAlert")
        });
      }
    } else {
      this.setState({
        message: translate("userProfile.page.message.enterCorrectPasswordAlert")
      });
    }
  };

  handleChangeLanguage(event) {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    localStorage.setItem(`lang${userProfile.id}`, event.target.value);
    this.setState({
      lang: event.target.value
    });
    window.location.reload();
  }

  render() {
    let useRole = []
    this.state.userDetails.roles && Array.isArray(this.state.userDetails.roles) && this.state.userDetails.roles.length> 0 && this.state.userDetails.roles.map((item, value) => {
      useRole.push(item); value !== this.state.userDetails.roles.length - 1 && useRole.push(", ")
      return true;
    });
    return (
      <div>
        <Paper style={{ marginLeft: "23%", width: "46%", marginTop: "5%" }}>
          <Typography variant="h5" style={{ color: darkBlack, background: blueGrey50, paddingLeft: "40%", paddingBottom: "12px", paddingTop: "8px" }}>
            {translate("common.page.label.myProfile")}{" "}
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={5} sm={5} lg={5} xl={5}>
              <Typography value="" variant="title" gutterBottom="true" style={{ marginLeft: "12%", paddingTop: "10.5%" }}>
                {translate("common.page.label.firstName")}{" "}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6}>
              <br />
              <br />
              <Typography value="" variant="title" gutterBottom="true" style={{ marginLeft: "12%", textTransform: "capitalize" }}>
                {" "}
                {this.state.userDetails.firstname}{" "}
              </Typography>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={5} sm={5} lg={5} xl={5}>
                <Typography value="" variant="title" gutterBottom="true" style={{ marginLeft: "12%", paddingTop: "11%" }}>
                  {translate("common.page.label.lastName")}{" "}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} lg={6} xl={6}>
                <br />
                <br />
                <Typography value="" variant="title" gutterBottom="true" style={{ marginLeft: "12%", textTransform: "capitalize" }}>
                  {" "}
                  {this.state.userDetails.lastname}{" "}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={5} sm={5} lg={5} xl={5}>
                <Typography value="" variant="title" gutterBottom="true" style={{ marginLeft: "12%", paddingTop: "11%" }}>
                  {translate("common.page.label.email")}{" "}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} lg={6} xl={6}>
                <br />
                <br />
                <Typography value="" variant="title" gutterBottom="true" style={{ marginLeft: "12%", marginTop: "-1%" }}>
                  {" "}
                  {this.state.userDetails.email}{" "}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={5} sm={5} lg={5} xl={5}>
                <Typography value="" variant="title" gutterBottom="true" style={{ marginLeft: "12%", paddingTop: "11%" }}>
                  {translate("profile.page.label.role")}{" "}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} lg={6} xl={6}>
                <br />
                <br />
                <Typography value="" variant="title" gutterBottom="true" style={{ marginLeft: "12%", marginTop: "-1%" }}>
                  {" "}
                  [{useRole}]{" "}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={5} sm={5} lg={5} xl={5}>
                <Typography value="" variant="title" gutterBottom="true" style={{ marginLeft: "12%", paddingTop: "11%" }}>
                  {translate("common.page.label.selectLanguage")}{" "}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} lg={6} xl={6}>
                <br />
                <br />

                <Select
                  gutterBottom="true"
                  name="selectlanguage"
                  style={{ marginLeft: "12%", marginTop: "-1%", minWidth: 120 }}
                  id="outlined-age-simple"
                  value={this.state.lang}
                  onChange={this.handleChangeLanguage.bind(this)}
                  input={<OutlinedInput name="english" id="outlined-age-simple" />}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="hi">हिंदी</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Grid>
          <div style={{ marginLeft: "90%", paddingBottom: "20px" }}>
            <Tooltip title={translate("userProfile.page.placeholder.resetPassword")}>
              <Fab aria-haspopup="true" onClick={this.handleReset} color="primary" size="medium">
                <AccountCircle />
              </Fab>
            </Tooltip>
          </div>
        </Paper>

        {this.state.drawer ? (
          <Dialog
            open={this.state.drawer}
            onClose={this.handleClose}
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth
            aria-labelledby="form-dialog-title"
          >
            <Typography
              variant="h5"
              style={{ color: darkBlack, background: blueGrey50, paddingLeft: "28%", paddingBottom: "12px", paddingTop: "8px" }}
            >
              {translate("userProfile.page.label.changePassword")}
            </Typography>

            <DialogContent>
              <DialogContentText />
              <br />

              <form method="post">
                <FormControl fullWidth>
                  <TextField
                    placeholder={translate("userProfile.page.placeholder.oldPassword")}
                    error
                    value={this.state.oldpassword}
                    required
                    type="password"
                    onChange={event => {
                      this.handleTextChange("oldpassword", event);
                    }}
                    margin="normal"
                    varient="outlined"
                    style={{ width: "100%", marginBottom: "4%" }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    id={this.state.newpassword}
                    placeholder={translate("userProfile.page.placeholder.newPassword")}
                    required
                    value={this.state.newpassword}
                    type="password"
                    onChange={event => {
                      this.handleTextChange("newpassword", event);
                    }}
                    margin="normal"
                    varient="outlined"
                    style={{ width: "100%", marginBottom: "4%" }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    placeholder={translate("userProfile.page.placeholder.confirmPassword")}
                    value={this.state.repassword}
                    required
                    id="outlined-required"
                    type="password"
                    onChange={event => {
                      this.handleTextChange("repassword", event);
                    }}
                    margin="normal"
                    varient="outlined"
                    style={{ width: "100%", marginBottom: "4%" }}
                  />{" "}
                </FormControl>
                <div>
                  <span style={{ marginLeft: "20%", color: "red" }}>{this.state.message}</span>
                  <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={this.state.open} autoHideDuration={6000}>
                    <MySnackbarContentWrapper onClose={this.handleClose} variant="success" message={this.state.messageSnack} />
                  </Snackbar>
                  <DialogActions style={{ marginRight: "22px" }}>
                    <Button
                      variant="contained"
                      onClick={this.handleCancel}
                      color="primary"
                      aria-label="edit"
                      style={{ width: "50%", marginBottom: "4%", marginTop: "4%" }}
                    >
                      {translate("common.page.button.cancel")}
                    </Button>
                    <Button
                      variant="contained"
                      disabled={!(this.state.oldpassword && this.state.newpassword && this.state.repassword)}
                      onClick={this.handleSubmit}
                      color="primary"
                      aria-label="edit"
                      style={{ width: "50%", marginBottom: "4%", marginTop: "4%" }}
                    >
                      {translate("common.page.button.submit")}
                    </Button>
                  </DialogActions>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  automl: state.automl,
  nmt: state.nmt,
  nmtsp: state.nmtsp,
  updatePasswordstatus: state.updatePasswordstatus
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      NMTApi: APITransport,
      NMTSPApi: APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));
