import React from "react";
import { Route, Redirect, Switch, Router } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Login from "./ui/containers/web/Login";
import Logout from "./ui/containers/web/Logout";
import Layout from "./ui/containers/web/Layout";
import Callback from "./ui/containers/web/Callback";

import NotFound from "./ui/containers/web/NotFound";


import Corpus from "./ui/containers/web/Corpus";
import Translations from "./ui/containers/web/Translations";
import newcorpus from "./ui/containers/web/Newcorpus";
import Corp from "./ui/containers/web/ViewCorpus";
import history from "./web.history";
import Home from "./ui/containers/web/Home";


import Translate from "./ui/containers/web/Translate";
import ViewTranslations from "./ui/containers/web/ViewTranslations";
import DashboardTamil from "./ui/containers/web/DashboardTamil";
import GradeViewCorpus from "./ui/containers/web/GradeViewCorpus";

const PrivateRoute = ({ component: Component, authenticate, ...rest }) => (
  <Route {...rest} render={props => (authenticate() ? <Layout component={Component} {...props} /> : <Redirect to={{ pathname: "/" }} />)} />
);

class AppRoutes extends React.Component {
  authenticateUser = () => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <Router history={history} basename={'/dev'}>
        <div>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
            <Route exact path={`${process.env.PUBLIC_URL}/callback`} component={Callback} />
            <Route exact path={`${process.env.PUBLIC_URL}/logout`} component={Logout} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/dashboard-tamil`} component={DashboardTamil} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/parallel-corpus/:basename`} component={Corpus} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/view-translations/:basename`} component={ViewTranslations} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/corpus`} component={Corp} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/view-corpus/:basename`} component={GradeViewCorpus} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/translations`} component={Translations} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/translate`} component={Translate} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/newcorpus`} component={newcorpus} authenticate={this.authenticateUser} />
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

export default connect(
  mapStateToProps,
  null
)(AppRoutes);
