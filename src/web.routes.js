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
import UploadAudio from "./ui/containers/web/UploadAudio";
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
import WorkspaceDetails from "./ui/containers/web/Tool1-Pipieline/ExtractionSteps";
import ExtractionSteps from "./ui/containers/web/Tool1-Pipieline/NewSentenceExtraction";
import NewSentenceExtraction from "./ui/containers/web/Tool1-Pipieline/NewSentenceExtraction";
import PdfTranslate from "./ui/containers/web/PdfTranslate";
import EditTranslate from "./ui/containers/web/EditTranslate";
import ViewTranslate from "./ui/containers/web/ViewTranslate";
import UserDirectory from "./ui/containers/web/UserDirectory";
import ViewDoc from "./ui/containers/web/ViewDoc";
import TranslatePresident from "./ui/containers/web/TranslateJudgement";
import DataPipeline from "./ui/containers/web/DataPipeline";
import TPresident from "./ui/containers/web/TPresident";
import ExistingWorkspace from "./ui/containers/web/Tool1-Pipieline/ExistingWorkspace";
import SentenceExtraction from "./ui/containers/web/Tool1-Pipieline/SentenceExtraction";
import TockenExtraction from "./ui/containers/web/Tool1-Pipieline/TockenExtraction";
import ApplyTocken from "./ui/containers/web/Tool1-Pipieline/ApplyTocken";
import UploadTocken from "./ui/containers/web/Tool1-Pipieline/UploadTocken";

const PrivateRoute = ({ component: Component, userRoles, title, drawer, showLogo, forDemo, dontShowLoader, authenticate, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticate(userRoles) ? (
        <Layout
          dontShowLoader={dontShowLoader}
          showLogo={showLogo}
          component={Component}
          title={title}
          forDemo={forDemo}
          drawer={drawer}
          {...props}
        />
      ) : (
        <Redirect to={`${process.env.PUBLIC_URL}/logout`} />
      )
    }
  />
);

const PresidentRoute = ({ component: Component, userRoles, title, authenticate, ...rest }) => (
  <Route {...rest} render={props => (authenticate(userRoles) ? <Component /> : <Redirect to={`${process.env.PUBLIC_URL}/logout`} />)} />
);

class AppRoutes extends React.Component {
  authenticateUser = allowedRoles => {
    let count = 0;
    const token = localStorage.getItem("token");
    if (localStorage.getItem("roles")) {
      const userRoles = JSON.parse(localStorage.getItem("roles"));
      if (token) {
        if (allowedRoles && Array.isArray(allowedRoles)) {
          allowedRoles.map(allowedRole => {
            userRoles.map(userRole => {
              if (userRole == allowedRole) {
                count += 1;
              }
            });
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
      alert("Something Went wrong. Please try again");
    
  };

  render() {
    const roles = localStorage.getItem("roles");
    return (
      <Router history={history} basename="/dev">
        <div>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
            <Route exact path={`${process.env.PUBLIC_URL}/callback`} component={Callback} />
            <Route exact path={`${process.env.PUBLIC_URL}/logout`} component={Logout} />

            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/anuvaad-translate`}
              userRoles={["user"]}
              forDemo
              drawer
              title="Anuvaad Translate"
              component={TPresident}
              authenticate={this.authenticateUser}
            />

            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/translate`}
              dontShowLoader
              forDemo
              title="SUVAS - Supreme Court Vidhik Anuvaad System"
              userRoles={["user"]}
              component={TranslatePresident}
              authenticate={this.authenticateUser}
            />

            <PrivateRoute path={`${process.env.PUBLIC_URL}/profile`} title="Profile" component={UserProfile} authenticate={this.authenticateUser} />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/dashboard`}
              showLogo
              title="SUVAS - Translate"
              component={DashboardTamil}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/view-corpus/:basename`}
              title="Corpus Details"
              userRoles={["grader", "dev"]}
              component={GradeViewCorpus}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/fetch-benchmark-sentences/:basename/:modelid`}
              title="Benchmark"
              userRoles={["grader", "dev"]}
              component={BenchmarkGrade}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/graderreport`}
              title="Grader Report"
              component={GraderReport}
              userRoles={["admin"]}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/comparison-report`}
              title="Comparison Report"
              component={ComparisonReport}
              userRoles={["admin"]}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/benchmarktranslate`}
              userRoles={["analyzer"]}
              component={FileTranslate}
              title="File Upload"
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/texttranslate`}
              userRoles={["analyzer"]}
              component={GraderTranslate}
              title="Translate"
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/view-translations/:basename`}
              component={ViewTranslations}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/corpus`}
              component={Corp}
              title="Corpus List"
              userRoles={["grader", "dev"]}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/benchmark`}
              component={Benchmark}
              userRoles={["grader", "dev"]}
              title="Benchmark"
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/parallel-corpus/:basename`}
              title="Corpus Details"
              userRoles={["editor", "dev"]}
              component={Corpus}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/translations`} component={Translations} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/translate-v1`} component={Translate} authenticate={this.authenticateUser} />
            <PrivateRoute path={`${process.env.PUBLIC_URL}/upload-audio`} component={UploadAudio} authenticate={this.authenticateUser} />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/qna`}
              title="Q&A"
              userRoles={["editor"]}
              component={QnA}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/newcorpus`}
              title="Parallel Corpus"
              userRoles={["dev"]}
              component={newcorpus}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/create-corpus`}
              title="Create Corpus"
              userRoles={["dev"]}
              component={createcorpus}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/doctranslate`}
              showLogo
              title="SUVAS - Translate File"
              component={PdfTranslate}
              userRoles={["editor", "user"]}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/userdirectory`}
              title="User Directory"
              component={UserDirectory}
              userRoles={["admin"]}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/edittranslate`}
              title="Document View"
              component={EditTranslate}
              userRoles={["notactive"]}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/viewtranslate`}
              showLogo
              title="SUVAS - Documents"
              component={ViewTranslate}
              userRoles={["editor", "user"]}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/view-doc/:basename`}
              title="Document Details"
              component={ViewDoc}
              userRoles={["editor"]}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/existing-workspace`}
              title="STAGE 1, TOOLCHAIN"
              userRoles={["dev"]}
              component={ExistingWorkspace}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/Workspace-details`}
              title="STAGE 1, TOOLCHAIN"
              userRoles={["dev"]}
              component={WorkspaceDetails}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/apply-token/:name/:session_id`}
              title="STAGE 1, TOOLCHAIN"
              userRoles={["dev"]}
              component={ApplyTocken}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/data-pipeline-tools`}
              title="DATA PIPELINE DASHBOARD"
              userRoles={["dev"]}
              component={DataPipeline}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/upload-token/:name/:session_id`}
              title="STAGE 1, TOOLCHAIN"
              userRoles={["dev"]}
              component={UploadTocken}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/sentence-extraction/:name/:session_id`}
              title="STAGE 1, TOOLCHAIN"
              userRoles={["dev"]}
              component={SentenceExtraction}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/new-extraction`}
              title="STAGE 1, TOOLCHAIN"
              userRoles={["dev"]}
              component={NewSentenceExtraction}
              authenticate={this.authenticateUser}
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/token-extraction`}
              title="STAGE 1, TOOLCHAIN"
              userRoles={["dev"]}
              component={TockenExtraction}
              authenticate={this.authenticateUser}
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/Sentence-Extraction`}
              title="STAGE 1, TOOLCHAIN"
              userRoles={["dev"]}
              component={ExtractionSteps}
              authenticate={this.authenticateUser}
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
