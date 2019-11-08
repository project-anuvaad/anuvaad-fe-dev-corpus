import React from "react";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../../components/web/common/Header";
import GlobalStyles from "../../styles/web/styles";
import Spinner from "../../components/web/common/Spinner";
// import Theme from "../../theme/web/theme-red";
import Snackbars from '../../components/web/common/Snackbar'
import Theme from "../../theme/web/theme-default";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import history from "../../../web.history";
import UserAuth from "../../../flux/actions/apis/userprofile";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
  }

  renderSpinner() {
    if (this.props.apistatus.progress) {
      return <Spinner />;
    }
  }

  renderMessage() {
    if (this.props.apistatus.message) {
      return <Snackbars message={this.props.apistatus.message} variant={this.props.apistatus.error ? 'error':'success'}/>;
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.apistatus !== this.props.apistatus) {
      if (this.props.apistatus.unauthrized) {
        history.push(`${process.env.PUBLIC_URL}/logout`);
      }
    }
  }

  render() {
    const { classes, theme, title } = this.props;

    const Component = this.props.component; // eslint-disable-line
    return (
      <MuiThemeProvider theme={Theme}>
        <div className={classes.root}>
          {this.renderSpinner()}

          <Header classes={{}} theme={theme} title={title} />
          <div className={classes.container}>
            <Component classes={{}}/>
          </div>
          {this.renderMessage()}
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  userProfile: state.userProfile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(GlobalStyles(Theme), { withTheme: true })(App));
