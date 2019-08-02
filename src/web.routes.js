import React from "react";
import { Route, Redirect, Switch, Router } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Login from "./ui/containers/web/Login";
import Layout from "./ui/containers/web/Layout";

import NotFound from "./ui/containers/web/NotFound";


import Corpus from "./ui/containers/web/Corpus";
import Translations from "./ui/containers/web/Translations";
import newcorpus from "./ui/containers/web/Newcorpus";
import Corp from "./ui/containers/web/ViewCorpus";
import history from "./web.history";


import Translate from "./ui/containers/web/Translate";
import ViewTranslations from "./ui/containers/web/ViewTranslations";
import DashboardTamil from "./ui/containers/web/DashboardTamil";

const PrivateRoute = ({ component: Component, authenticate, ...rest }) => (
  <Route {...rest} render={props => (authenticate ? <Layout component={Component} {...props} /> : <Redirect to={{ pathname: "/" }} />)} />
);

class AppRoutes extends React.Component {
  authenticateUser = () => {
    const { user } = this.props;
    const token = localStorage.getItem("token");
    // if (user.token || token) {
      return true;
    // }
    // return false;
  };

  render() {
    return (
      <Router history={history} basename={'/dev'}>
        <div>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Login} />
           
            <PrivateRoute path={`${process.env.PUBLIC_URL}/dashboard-tamil`} component={DashboardTamil} authenticate={this.authenticateUser()} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/parallel-corpus/:basename`} component={Corpus} authenticate={this.authenticateUser()} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/view-translations/:basename`} component={ViewTranslations} authenticate={this.authenticateUser()} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/corpus`} component={Corp} authenticate={this.authenticateUser()} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/translations`} component={Translations} authenticate={this.authenticateUser()} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/translate`} component={Translate} authenticate={this.authenticateUser()} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/newcorpus`} component={newcorpus} authenticate={this.authenticateUser()} />
           
            
            <PrivateRoute path={`${process.env.PUBLIC_URL}/*`} component={NotFound} authenticate={this.authenticateUser()} />
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
