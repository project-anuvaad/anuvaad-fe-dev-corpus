import React from "react";
import { Route, Redirect, Switch, Router } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
import QnA from "./ui/containers/web/QnA";

const PrivateRoute = ({ component: Component, userRoles,title, authenticate, ...rest }) => (
  
  
  <Route {...rest} render={props => ( authenticate(userRoles) ? <Layout component={Component} title={title} {...props} /> : <Redirect to={`${process.env.PUBLIC_URL}/logout`} />)} />

);

class AppRoutes extends React.Component {
  authenticateUser = (userRoles) => {
    let count=0;
    const token = localStorage.getItem("token");
    const allowedRoles = JSON.parse(localStorage.getItem("roles"))
    
    if(token) {
      if(userRoles && Array.isArray(userRoles)){

        userRoles.map((userRole)=>{
          allowedRoles.map((allowedRole)=>{
            console.log("role",userRole,allowedRole)
            if(userRole==allowedRole)
              {
                  count=count+1
              } 
          })
        })

        if(count===allowedRoles.length){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        return true;
      } 
    }
    
    else {
      return false;
    }
  }

  render() {
    const roles = localStorage.getItem("roles");
    return (
      <Router history={history} basename={'/dev'}>
        <div>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
            <Route exact path={`${process.env.PUBLIC_URL}/callback`} component={Callback} />
            <Route exact path={`${process.env.PUBLIC_URL}/logout`} component={Logout} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/dashboard-tamil`} title="Translator" component={DashboardTamil}  authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/view-corpus/:basename`} title="Corpus Details" userRoles={['grader']} component={GradeViewCorpus} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/view-translations/:basename`} component={ViewTranslations} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/corpus`} component={Corp} title="Corpus List" authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/parallel-corpus/:basename`} title="Corpus Details"  userRoles={['editor']} component={Corpus} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/translations`} component={Translations} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/translate`} component={Translate} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/qna`} title="Q&A" component={QnA} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/newcorpus`} title="Create Corpus"  userRoles={['editor']} component={newcorpus} authenticate={this.authenticateUser} />
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
