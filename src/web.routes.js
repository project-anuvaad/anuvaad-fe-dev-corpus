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
import createcorpus from "./ui/containers/web/UploadBenchmark";
import newcorpus from "./ui/containers/web/Newcorpus";
import Corp from "./ui/containers/web/ViewCorpus";
import Benchmark from "./ui/containers/web/Benchmark";
import history from "./web.history";
import Home from "./ui/containers/web/Home";
import Translate from "./ui/containers/web/Translate";
import UserProfile from "./ui/containers/web/UserProfile";
import ViewTranslations from "./ui/containers/web/ViewTranslations";
import DashboardTamil from "./ui/containers/web/DashboardTamil";
import GradeViewCorpus from "./ui/containers/web/GradeViewCorpus";
import BenchmarkGrade from "./ui/containers/web/BenchmarkGrade";
import QnA from "./ui/containers/web/QnA";
import GraderReport from "./ui/containers/web/GraderReport";
import GraderTranslate from "./ui/containers/web/SentenceTranslate";
import FileTranslate from "./ui/containers/web/GraderTranslate";
import ComparisonReport from "./ui/containers/web/ComparisonReport";
const PrivateRoute = ({ component: Component, userRoles, title, authenticate, ...rest }) => (


  <Route {...rest} render={props => (authenticate(userRoles) ? <Layout component={Component} title={title} {...props} /> : <Redirect to={`${process.env.PUBLIC_URL}/logout`} />)} />

);

class AppRoutes extends React.Component {
  authenticateUser = (allowedRoles) => {
    let count = 0;
    const token = localStorage.getItem("token");
    if(localStorage.getItem("roles")){
    const userRoles = JSON.parse(localStorage.getItem("roles"))
    if (token) {
      if (allowedRoles && Array.isArray(allowedRoles)) {
        allowedRoles.map((allowedRole) => {
          userRoles.map((userRole) => {
            if (userRole == allowedRole) {
              count = count + 1
            }
          })
        })
        if (count > 0) {
          return true;
        }
      }
      else {
        return true;
      }
    }
    return false;
  }else{
    alert('Something Went wrong. Please try again')
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
            <PrivateRoute path={`${process.env.PUBLIC_URL}/profile`} title="Profile" component={UserProfile} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/dashboard`} title="Translate" component={DashboardTamil} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/view-corpus/:basename`} title="Corpus Details" userRoles={['grader', 'dev']} component={GradeViewCorpus} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/fetch-benchmark-sentences/:basename/:modelid`} title="Benchmark" userRoles={['grader', 'dev']} component={BenchmarkGrade} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/graderreport`} title="Grader Report"  component={GraderReport} userRoles={['admin']} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/comparison-report`} title="Comparison Report"  component={ComparisonReport} userRoles={['admin']} authenticate={this.authenticateUser} />
            
            <PrivateRoute path={`${process.env.PUBLIC_URL}/benchmarktranslate`} userRoles={['analyzer']} component={FileTranslate} title="File Upload" authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/texttranslate`} userRoles={['analyzer']} component={GraderTranslate} title="Translate" authenticate={this.authenticateUser} />

            <PrivateRoute path={`${process.env.PUBLIC_URL}/view-translations/:basename`} component={ViewTranslations} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/corpus`} component={Corp} title="Corpus List" userRoles={['grader', 'dev']} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/benchmark`} component={Benchmark} userRoles={['grader', 'dev']} title="Benchmark" authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/parallel-corpus/:basename`} title="Corpus Details" userRoles={['editor', 'dev']} component={Corpus} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/translations`} component={Translations} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/translate`} component={Translate} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/qna`} title="Q&A" component={QnA} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/newcorpus`} title="Parallel Corpus" userRoles={['dev']} component={newcorpus} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/create-corpus`} title="Create Corpus" userRoles={['dev']} component={createcorpus} authenticate={this.authenticateUser} />
            
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
