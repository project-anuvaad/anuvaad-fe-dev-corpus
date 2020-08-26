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
import DashboardTamil from "./ui/containers/web/Dashboard";
import AnuvaadGame from "./ui/containers/web/AnuvaadGame";
import GradeViewCorpus from "./ui/containers/web/GradeViewCorpus";
import BenchmarkGrade from "./ui/containers/web/BenchmarkGrade";
import QnA from "./ui/containers/web/QnA";
import GraderReport from "./ui/containers/web/GraderReport";
import GraderTranslate from "./ui/containers/web/SentenceTranslate";
import FileTranslate from "./ui/containers/web/GraderTranslate";
import ComparisonReport from "./ui/containers/web/ComparisonReport";
import ExistingWorkspaceDetails from "./ui/containers/web/Tool1-Pipeline/ExtractionSteps";
import ExtractionSteps from "./ui/containers/web/Tool1-Pipeline/NewSentenceExtraction";
import NewSentenceExtraction from "./ui/containers/web/Tool1-Pipeline/NewSentenceExtraction";
import PdfTranslate from "./ui/containers/web/PdfTranslate";
import EditTranslate from "./ui/containers/web/EditTranslate";
import ViewTranslate from "./ui/containers/web/ViewTranslate";
import UserDirectory from "./ui/containers/web/UserDirectory";
import ViewDoc from "./ui/containers/web/ViewDoc";
import AnuvaadEditor from "./ui/containers/web/AnuvaadEditor";
import Editor from "./ui/containers/web/Editor";
import AnuvaadModels from "./ui/containers/web/TextModels";
import AddQuestion from "./ui/containers/web/AddQuestion";
import TranslatePresident from "./ui/containers/web/TranslateJudgement";
import DataPipeline from "./ui/containers/web/DataPipeline";
import TPresident from "./ui/containers/web/TPresident";
import ExistingWorkspace from "./ui/containers/web/Tool1-Pipeline/ExistingWorkspace";
import SentenceExtraction from "./ui/containers/web/Tool1-Pipeline/SentenceExtraction";
import Tool2SentenceExtraction from "./ui/containers/web/Tool2-Pipeline/SentenceExtraction";
import Tool3SentenceExtraction from "./ui/containers/web/Tool3-Pipeline/SentenceExtraction";
import Tool4SentenceExtraction from "./ui/containers/web/Tool4-Pipeline/SentenceExtraction";
import TockenExtraction from "./ui/containers/web/Tool1-Pipeline/TockenExtraction";
import ApplyTocken from "./ui/containers/web/Tool1-Pipeline/ApplyTocken";
import UploadTocken from "./ui/containers/web/Tool1-Pipeline/UploadTocken";
import Tool2ExistingWorkspace from "./ui/containers/web/Tool2-Pipeline/ExistingWorkspace";
import Tool3ExistingWorkspace from "./ui/containers/web/Tool3-Pipeline/ExistingWorkspace";
import Tool4ExistingWorkspace from "./ui/containers/web/Tool4-Pipeline/ExistingWorkspace";
import CreateWorkspace from "./ui/containers/web/Tool2-Pipeline/CreateWorkspace";
import DataSource from "./ui/containers/web/Tool1-Pipeline/DataSource";
import Stage3DataPipelineDownload from "./ui/containers/web/Tool3-Pipeline/DataPipelineDownload";
import DataPipelineDownload from "./ui/containers/web/Tool2-Pipeline/DataPipelineDownload";
import SentenceQualityCheck from "./ui/containers/web/Tool3-Pipeline/SentenceQualityCheck";
import Tool3CreateWorkspace from "./ui/containers/web/Tool3-Pipeline/CreateWorkspace";
import Tool4CreateWorkspace from "./ui/containers/web/Tool4-Pipeline/CreateWorkspace";
import DownloadSentence from "./ui/containers/web/Tool2-Pipeline/DownloadSentence";
import WorkspaceDetails from "./ui/containers/web/Tool2-Pipeline/WorkspaceDetails";
import Tool3WorkspaceDetails from "./ui/containers/web/Tool3-Pipeline/WorkspaceDetails";
import Tool3CreateDataSource from "./ui/containers/web/Tool3-Pipeline/CreateDataSource";
import Tool2CreateDataSource from "./ui/containers/web/Tool2-Pipeline/CreateDataSource";
import Tool4WorkspaceDetails from "./ui/containers/web/Tool4-Pipeline/WorkspaceDetails";
import Tool3DataSource from "./ui/containers/web/Tool3-Pipeline/DataSource";
import Tool4DataSource from "./ui/containers/web/Tool4-Pipeline/DataSource";
import Stage2DataSource from "./ui/containers/web/Tool2-Pipeline/DataSource";
import FeedbackForm from "./ui/containers/web/FeedbackForm";
import PdfUpload from "./ui/containers/web/PdfUpload";
import PdfToDoc from "./ui/containers/web/PdfToDoc";
import ViewPdf from "./ui/containers/web/ViewPdfFile";
import Signup from "./ui/containers/web/SignUp";
import Activate from "./ui/containers/web/Activate";
import IntractiveTranslate from "./ui/containers/web/IntractiveTranslation";
import InteractiveEditor from "./ui/containers/web/Interactive-Editor/InteractiveEditor";
import InteractiveEditorDemo from "./ui/containers/web/Interactive-Editor/InteractiveEditorDemo";
import PdfSentence from "./ui/containers/web/PdfSentence";
import InteractivePreview from "./ui/containers/web/Interactive-Editor/Preview"
import { translate } from '../src/assets/localisation';
import UpdatePassword from './ui/containers/web/UpdatePassword';
import SetPassword from './ui/containers/web/SetPassword';
import pdfFileEditor from './ui/containers/web/Interactive-Editor/PdfFileEditor';
import InteractivePdfFile from './ui/containers/web/Interactive-Editor/InteractivePdfFile';
import DocumentEditor from './ui/containers/web/Interactive-Editor/DocumentEditor';
import FileUpload from './ui/containers/web/Interactive-Editor/FileUpload';
import ViewDocument from './ui/containers/web/ViewDocument';



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
              exact
              path={`${process.env.PUBLIC_URL}/anuvaad-translate`}
              userRoles={["user"]}
              forDemo
              drawer
              title={translate('webroutes.page.title.anuvaadTranslate')}
              component={TPresident}
              authenticate={this.authenticateUser}
              currentMenu="anuvaad-translates"
            />

            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/translate`}
              dontShowLoader
              forDemo
              title={translate('webroutes.page.title.suvas')}
              userRoles={["user"]}
              component={TranslatePresident}
              authenticate={this.authenticateUser}
              currentMenu="translate"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/profile`}
              title={translate('webroutes.page.title.profile')}
              component={UserProfile}
              authenticate={this.authenticateUser}
              currentMenu="profile"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/dashboard`}
              title={translate('dashboard.page.heading.title')}
              component={DashboardTamil}
              authenticate={this.authenticateUser}
              currentMenu="dashboard"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/anuvaad-wheel`}
              drawer
              title="Anuvaad Game"
              component={AnuvaadGame}
              authenticate={this.authenticateUser}
              currentMenu="anuvaad-wheel"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/pdf-to-doc`}
              title={translate('webroutes.page.title.pdfToDoc')}
              component={PdfToDoc}
              authenticate={this.authenticateUser}
              currentMenu="pdf-to-doc"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/pdf-upload`}
              userRoles={["user", "grader", "dev", "editor", "interactive-editor"]}
              title={translate('webroutes.page.title.pdfSentences')}
              component={PdfUpload}
              authenticate={this.authenticateUser}
              currentMenu="pdf-upload"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/view-pdf`}
              dontShowLoader
              title={translate('webroutes.page.title.pdfList')}
              component={ViewPdf}
              authenticate={this.authenticateUser}
              currentMenu="view-pdf"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/pdf-sentence/:session_id`}
              title={translate('webroutes.page.title.pdfSentences')}
              component={PdfSentence}
              authenticate={this.authenticateUser}
              currentMenu="pdf-sentence"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/anuvaad-game`}
              drawer
              title="Anuvaad Game"
              component={AnuvaadGame}
              authenticate={this.authenticateUser}
              currentMenu="anuvaad-game"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/view-corpus/:basename`}
              title={translate('webroutes.page.title.corpusDetails')}
              userRoles={["grader", "dev"]}
              component={GradeViewCorpus}
              authenticate={this.authenticateUser}
              currentMenu="view-corpus"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/activate/:uid/:rid`}
              title="Activate"
              authenticate={() => true}
              component={Activate}
              drawer
              dontShowHeader={true}
              currentMenu="activate"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/fetch-benchmark-sentences/:basename/:modelid`}
              title={translate('webroutes.page.title.benchmark')}
              userRoles={["grader", "dev"]}
              component={BenchmarkGrade}
              authenticate={this.authenticateUser}
              currentMenu="benchmark"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/graderreport`}
              title={translate('webroutes.page.title.graderReport')}
              component={GraderReport}
              userRoles={["admin"]}
              authenticate={this.authenticateUser}
              currentMenu="graderreport"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/comparison-report`}
              title={translate('common.page.title.comparisonReport')}
              component={ComparisonReport}
              userRoles={["admin"]}
              authenticate={this.authenticateUser}
              currentMenu="comparison-report"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/benchmarktranslate`}
              userRoles={["analyzer"]}
              component={FileTranslate}
              title={translate('webroutes.page.title.fileUpload')}
              authenticate={this.authenticateUser}
              currentMenu="benchmarktranslate"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/texttranslate`}
              userRoles={["analyzer"]}
              component={GraderTranslate}
              title={translate('dashboard.page.heading.title')}
              authenticate={this.authenticateUser}
              currentMenu="texttranslate"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/interactive-pdf`}
              userRoles={["editor", "dev", "grader", "interactive-editor"]}
              component={InteractivePdfFile}
              title={translate('dashboard.page.heading.title')}
              authenticate={this.authenticateUser}
              currentMenu="texttranslate"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/interactive-document/:fileid`}
              userRoles={["editor", "dev", "grader", "interactive-editor"]}
              component={DocumentEditor}
              title={translate('dashboard.page.heading.title')}
              authenticate={this.authenticateUser}
              currentMenu="texttranslate"
            />

<PrivateRoute
              path={`${process.env.PUBLIC_URL}/document-upload`}
              userRoles={["editor", "dev", "grader", "interactive-editor"]}
              component={FileUpload}
              title={translate('dashboard.page.heading.title')}
              authenticate={this.authenticateUser}
              currentMenu="texttranslate"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/view-translations/:basename`}
              component={ViewTranslations}
              authenticate={this.authenticateUser}
              currentMenu="view-translations"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/corpus`}
              component={Corp}
              title={translate('webroutes.page.title.corpusList')}
              userRoles={["grader", "dev"]}
              authenticate={this.authenticateUser}
              currentMenu="corpus"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/benchmark`}
              component={Benchmark}
              userRoles={["grader", "dev"]}
              title={translate('webroutes.page.title.benchmark')}
              authenticate={this.authenticateUser}
              currentMenu="benchmark"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/parallel-corpus/:basename`}
              title={translate('webroutes.page.title.corpusDetails')}
              userRoles={["editor", "dev"]}
              component={Corpus}
              authenticate={this.authenticateUser}
              currentMenu="corpus"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/translations`}
              component={Translations}
              authenticate={this.authenticateUser}
              currentMenu="translations"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/translate-v1`}
              component={Translate}
              authenticate={this.authenticateUser}
              currentMenu="translate-v1"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/upload-audio`}
              component={UploadAudio}
              authenticate={this.authenticateUser}
              currentMenu="upload-audio"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/qna`}
              title={translate('webroutes.page.title.q&a')}
              userRoles={["editor"]}
              component={QnA}
              authenticate={this.authenticateUser}
              currentMenu="qna"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/signup`}
              title="Sign up"
              authenticate={() => true}
              component={Signup}
              drawer
              dontShowHeader={true}
              currentMenu="signup"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/forgot-password`}
              title="Forgot Password"
              authenticate={() => true}
              component={UpdatePassword}
              drawer
              dontShowHeader={true}
              currentMenu="forgot-password"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/set-password/:uid/:rid`}
              title="Set Password"
              authenticate={() => true}
              component={SetPassword}
              drawer
              dontShowHeader={true}
              currentMenu="set-password"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/newcorpus`}
              title={translate('webroutes.page.title.parallelCorpus')}
              userRoles={["dev"]}
              component={newcorpus}
              authenticate={this.authenticateUser}
              currentMenu="newcorpus"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/create-corpus`}
              title={translate('common.page.label.createCorpus')}
              userRoles={["dev"]}
              component={createcorpus}
              authenticate={this.authenticateUser}
              currentMenu="create-corpus"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/doctranslate`}
              title={translate('webroutes.page.title.translateFile')}
              component={PdfTranslate}
              userRoles={["editor", "user"]}
              authenticate={this.authenticateUser}
              currentMenu="doctranslate"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/userdirectory`}
              title={translate('webroutes.page.title.userDirectory')}
              component={UserDirectory}
              userRoles={["admin"]}
              authenticate={this.authenticateUser}
              currentMenu="userdirectory"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/edittranslate`}
              title={translate('webroutes.page.title.documentView')}
              component={EditTranslate}
              userRoles={["notactive"]}
              authenticate={this.authenticateUser}
              currentMenu="edittranslate"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/viewtranslate`}
              title={translate('common.page.title.document')}
              component={ViewTranslate}
              userRoles={["editor", "user"]}
              authenticate={this.authenticateUser}
              currentMenu="viewtranslate"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/view-doc/:basename`}
              title={translate('webroutes.page.title.documentDetails')}
              component={ViewDoc}
              userRoles={["editor"]}
              authenticate={this.authenticateUser}
              currentMenu="view-doc"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/feedback`}
              title={translate('webroutes.page.title.addFeedbackQuestion')}
              userRoles={["admin"]}
              component={AddQuestion}
              authenticate={this.authenticateUser}
              currentMenu="feedback"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/existing-workspace`}
              dontShowLoader
              title={translate('webroutes.page.title.stage1Toolchain')}
              userRoles={["dev"]}
              component={ExistingWorkspace}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/workspace-details`}
              dontShowLoader
              title={translate('webroutes.page.title.stage1Toolchain')}
              userRoles={["dev"]}
              component={ExistingWorkspaceDetails}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/apply-token/:name/:session_id`}
              title={translate('webroutes.page.title.stage1Toolchain')}
              userRoles={["dev"]}
              component={ApplyTocken}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/data-pipeline-tools`}
              title={translate('webroutes.page.title.dataPipeLine')}
              userRoles={["dev"]}
              component={DataPipeline}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/upload-token/:name/:session_id`}
              title={translate('webroutes.page.title.stage1Toolchain')}
              userRoles={["dev"]}
              component={UploadTocken}
              authenticate={this.authenticateUser}
              currentMenu="upload-token"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/sentence-extraction/:name/:session_id`}
              title={translate('webroutes.page.title.stage1Toolchain')}
              userRoles={["dev"]}
              component={SentenceExtraction}
              authenticate={this.authenticateUser}
              currentMenu="sentence-extraction"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/new-extraction`}
              title={translate('webroutes.page.title.stage1Toolchain')}
              userRoles={["dev"]}
              component={NewSentenceExtraction}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/token-extraction`}
              title={translate('webroutes.page.title.stage1Toolchain')}
              userRoles={["dev"]}
              component={TockenExtraction}
              authenticate={this.authenticateUser}
              currentMenu="token-extraction"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/sentence-extraction`}
              title={translate('webroutes.page.title.stage1Toolchain')}
              userRoles={["dev"]}
              component={ExtractionSteps}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage2/download-sentence`}
              title={translate('webroutes.page.title.stage2Toolchain')}
              userRoles={["dev"]}
              component={DownloadSentence}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage2/existing-workspace`}
              dontShowLoader
              title={translate('webroutes.page.title.stage2Toolchain')}
              userRoles={["dev"]}
              component={Tool2ExistingWorkspace}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage3/existing-workspace`}
              dontShowLoader
              title={translate('webroutes.page.title.stage3Toolchain')}
              userRoles={["dev"]}
              component={Tool3ExistingWorkspace}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage2/sentence-extraction/:name/:session_id`}
              title={translate('webroutes.page.title.stage2Toolchain')}
              userRoles={["dev"]}
              component={Tool2SentenceExtraction}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage3/sentence-extraction/:name/:session_id`}
              title={translate('webroutes.page.title.stage3Toolchain')}
              userRoles={["dev"]}
              component={Tool3SentenceExtraction}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage4/sentence-extraction/:name/:session_id`}
              title={translate('webroutes.page.title.stage4Toolchain')}
              userRoles={["dev"]}
              component={Tool4SentenceExtraction}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage2/workspace-details`}
              dontShowLoader
              title={translate('webroutes.page.title.stage2Toolchain')}
              userRoles={["dev"]}
              component={WorkspaceDetails}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage3/create-workspace`}
              title={translate('webroutes.page.title.stage3Toolchain')}
              userRoles={["dev"]}
              component={Tool3CreateWorkspace}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage4/create-workspace`}
              title={translate('webroutes.page.title.stage4Toolchain')}
              userRoles={["dev"]}
              component={Tool4CreateWorkspace}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage3/sentence-qaulity/:name/:session_id`}
              title={translate('webroutes.page.title.stage3Toolchain')}
              userRoles={["dev"]}
              component={SentenceQualityCheck}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage3/workspace-details`}
              dontShowLoader
              title={translate('webroutes.page.title.stage3Toolchain')}
              userRoles={["dev"]}
              component={Tool3WorkspaceDetails}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage4/workspace-details`}
              dontShowLoader
              title={translate('webroutes.page.title.stage4Toolchain')}
              userRoles={["dev"]}
              component={Tool4WorkspaceDetails}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage2/create-workspace`}
              title={translate('webroutes.page.title.stage2Toolchain')}
              userRoles={["dev"]}
              component={CreateWorkspace}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage2/create-datasource`}
              title="STAGE 2, DATASOURCE"
              userRoles={["dev"]}
              component={Tool2CreateDataSource}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage3/create-datasource`}
              title="STAGE 3, DATASOURCE"
              userRoles={["dev"]}
              component={Tool3CreateDataSource}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage4/create-datasource`}
              title="STAGE 4, DATASOURCE"
              userRoles={["dev"]}
              component={Tool3CreateDataSource}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage2/datasource/:name/:session_id`}
              title={translate('webroutes.page.title.stage2dataSource')}
              userRoles={["dev"]}
              component={DataPipelineDownload}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage4/existing-workspace`}
              dontShowLoader
              title={translate('webroutes.page.title.stage4Toolchain')}
              userRoles={["dev"]}
              component={Tool4ExistingWorkspace}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/datasource`}
              title={translate('webroutes.page.title.stage1dataSource')}
              userRoles={["dev"]}
              component={DataSource}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/feedback-form/:page`}
              title={translate('webroutes.page.title.feedbackForm')}
              component={FeedbackForm}
              authenticate={this.authenticateUser}
              currentMenu="feedback-form"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage3/datasource/:name/:session_id`}
              title={translate('webroutes.page.title.stage3dataSource')}
              userRoles={["dev"]}
              component={Stage3DataPipelineDownload}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage2/datasource`}
              dontShowLoader
              title={translate('webroutes.page.title.stage2dataSource')}
              userRoles={["dev"]}
              component={Stage2DataSource}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage3/datasource`}
              dontShowLoader
              title={translate('webroutes.page.title.stage3dataSource')}
              userRoles={["dev"]}
              component={Tool3DataSource}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/anuvaad-editor`}
              title="Anuvaad Editor"
              dontShowLoader
              userRoles={["dev"]}
              component={AnuvaadEditor}
              authenticate={this.authenticateUser}
              currentMenu="anuvaad-editor"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/editor`}
              title="Editor"
              dontShowLoader
              userRoles={["dev"]}
              component={Editor}
              authenticate={this.authenticateUser}
              currentMenu="editor"
            />

            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/anuvaad-models`}
              title="Anuvaad Editor"
              userRoles={["dev"]}
              component={AnuvaadModels}
              authenticate={this.authenticateUser}
              currentMenu="anuvaad-models"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/interactive-translate`}
              title={translate('webroutes.page.title.anuvaadEditor')}
              userRoles={["editor", "dev", "interactive-editor", "grader"]}
              component={IntractiveTranslate}
              authenticate={this.authenticateUser}
              currentMenu="interactive-translate"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/interactive-editor/:fileid`}
              title={"Document Translate"}
              userRoles={["editor", "dev", "grader", "interactive-editor"]}
              component={InteractiveEditor}
              authenticate={this.authenticateUser}
              currentMenu="view-pdf"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/interactive-editor-demo/:fileid`}
              title={translate('webroutes.page.title.anuvaadEditor')}
              userRoles={["editor", "dev", "grader", "interactive-editor"]}
              component={InteractiveEditorDemo}
              authenticate={this.authenticateUser}
              currentMenu="view-pdf"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/interactive-preview/:fileid`}
              title={translate('webroutes.page.title.anuvaadEditor')}
              userRoles={["editor", "dev", "interactive-editor"]}
              component={InteractivePreview}
              authenticate={this.authenticateUser}
              currentMenu="view-pdf"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/stage4/datasource`}
              dontShowLoader
              title={translate('webroutes.page.title.stage4dataSource')}
              userRoles={["dev"]}
              component={Tool4DataSource}
              authenticate={this.authenticateUser}
              currentMenu="data-pipeline-tools"
            />
            <PrivateRoute
              path={`${process.env.PUBLIC_URL}/pdf-file-editor`}
              title={translate('webroutes.page.title.anuvaadEditor')}
              userRoles={["editor", "dev", "grader", "interactive-editor"]}
              component={pdfFileEditor}
              authenticate={this.authenticateUser}
              currentMenu="view-pdf"
            />
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
