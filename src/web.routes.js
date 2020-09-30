import React from "react";
import { Route, Redirect, Switch, Router } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Logout from "./ui/containers/web/Logout";
import Layout from "./ui/containers/web/Layout";
import Callback from "./ui/containers/web/Callback";
import NotFound from "./ui/containers/web/NotFound";

import history from "./web.history";
import Home from "./ui/containers/web/Home";

import { translate } from '../src/assets/localisation';

import ViewDocument from './ui/containers/web/ViewDocument';

// import { jQuery, $ }  from 'jquery'
// import $t from '@project-sunbird/telemetry-sdk/index.js'



const PrivateRoute = ({ component: Component, userRoles, title, drawer, showLogo, forDemo, dontShowLoader, dontShowHeader, currentMenu, authenticate, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticate(userRoles) ? (
        <Layout
          dontShowLoader={dontShowLoader}
          currentMenu={currentMenu}
          showLogo={showLogo}
          component={Component}
          title={title}
          forDemo={forDemo}
          drawer={drawer}
          dontShowHeader={dontShowHeader}
          {...props}
        />
      ) : (
          <Redirect to={`${process.env.PUBLIC_URL}/logout`} />
        )
    }
  />
);

// const PresidentRoute = ({ component: Component, userRoles, title, authenticate, ...rest }) => (
//   <Route {...rest} render={props => (authenticate(userRoles) ? <Component /> : <Redirect to={`${process.env.PUBLIC_URL}/logout`} />)} />
// );

class AppRoutes extends React.Component {
  // componentDidMount(){
  //   this.initTelemetry()
  // }

  authenticateUser = allowedRoles => {
    let count = 0;
    const token = localStorage.getItem("token");
    if (localStorage.getItem("roles")) {
      const userRoles = JSON.parse(localStorage.getItem("roles"));
      if (token) {
        if (allowedRoles && Array.isArray(allowedRoles)) {
          allowedRoles.map(allowedRole => {
            userRoles.map(userRole => {
              if (userRole === allowedRole) {
                count += 1;
              }
              return true;
            });
            return true;
          });
          if (count > 0) {
            return true;
          }
        } else {
          return true;
        }
      }
      return false;
    }
    alert(translate('webroutes.page.alert.somethingWentWrongTryAgain'));
  };

  // initTelemetry() {
  //   $t.initialize({
  //     "pdata": {
  //       "id": "dev.anuvad",
  //       "ver": "1.0",
  //       "pid": "anuvad-web"
  //     },
  //     "env": "home",
  //     "channel": "XXXX",
  //     "did": "20d63257084c2dca33f31a8f14d8e94c0d939de4",
  //     "uid": "anonymous",
  //     "sid": "85e8a2c8-bb8e-4666-a21b-c29ec590d740",
  //     "batchsize": 5,
  //     "mode": "play",
  //     "endpoint": "/v3/telemetry",
  //     "dispatcher": {
  //       dispatch: function (data) {
  //         console.log(data);
  //       }
  //     }
  //   });

  //   console.log("is telemetry initialized: ", $t.isInitialized());
  //   $t.start(null, "xyz", "1.0", { mode: "session", duration: 2 });
  // }

  // interact() {
  //   $t.interact({ type: "CLICK", id: "btn_interact", pageid: "home" }, { context: { cdata: [{ type: "Doc", id: "123" }] } });
  // }

  render() {
    // const roles = localStorage.getItem("roles");
    return (
      <Router history={history} basename="/dev">
        <div>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
            <Route exact path={`${process.env.PUBLIC_URL}/callback`} component={Callback} />
            <Route exact path={`${process.env.PUBLIC_URL}/logout`} component={Logout} />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/view-document`}
              dontShowLoader
              title={"Document Translate"}
              userRoles={["editor", "dev", "grader", "interactive-editor"]}
              component={ViewDocument}
              authenticate={this.authenticateUser}
              currentMenu="view-document"
            />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/*`} component={NotFound} authenticate={this.authenticateUser} />
          </Switch>
        </div>
      </Router>
    );
  }
}

AppRoutes.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus
});

export default connect(mapStateToProps, null)(AppRoutes);
