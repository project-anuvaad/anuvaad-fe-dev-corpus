import login from './umc/login';
import automl from './automl';
import nmt from './nmt';
import nmtsp from './nmtsp';
import corpus from './corpus';
import apistatus from './apistatus/apistatus';
import corp from './corp';
import translations from './translations';
import translation_sentences from './translation_sentences';
import sentences from './sentences';
import userProfile from './userprofile';

import uploadbenchmark from './uploadbenchmark';
import source_translate from './source-translate';
import supportLanguage from './fetchlanguages';
import langModel from './fetchmodel';
import fetchBenchmark from './benchmark';
import fetchBenchmarkModel from './fetchbenchmarkmodel';
import fetchBenchmarkCompareModel from './fetchbenchmarkcompares';
import updateGrade from './update-sentences-grade';
import graderReport from './graderreport';
import comparisonreport from './comparisonreport';
import benchmarkTranslate from './benchmarktranslate';
import translation from './translation';
import configUplaod from './configupload';
import workspaceDetails from './runexperiment';
import audio from './audio';

import fetchDefaultConfig from './fetchdefaultconfig';
import hindi from './hindi';
import marathi from './marathi';
import telugu from './telugu';
import tamil from './tamil';
import punjabi from './punjabi';
import malayalam from './malayalam';
import kannada from './kannada';
import gujarati from './gujarati';
import bengali from './bengali';

import fetchtranslation from './viewtranslate';

import deletefile from './delete';
import userList from './userdirectory';
import userRoles from './userroles';
import addUser from './adduser';
import fetchWorkspace from './fetchworkspace';
import fetchWorkspaceDetails from './fetchworkspacedetails';
import updatePasswordstatus from './updatepassword';
import createWorkspaceDetails from './createworkspace';
import uploadTokenValue from './uploadtoken';
import uploadTranslated from './uploadTranslatedFile';

export default {
    login,
    automl,
    nmt,
    nmtsp,
    corpus,
    apistatus,
    corp,
    sentences,
    translations,
    translation_sentences,
    source_translate,
    userProfile,
    updatePasswordstatus,
    supportLanguage,
    langModel,
    fetchBenchmark,
    fetchBenchmarkModel,
    updateGrade,
    graderReport,
    fetchBenchmarkCompareModel,
    benchmarkTranslate,
    comparisonreport,
    uploadbenchmark,
    translation,
    fetchtranslation,
    deletefile,
    updatePasswordstatus,
    audio,
    userList,
    userRoles,
    addUser,
    hindi,
    bengali,
    punjabi,
    malayalam,
    tamil,
    telugu,
    marathi,
    kannada,
    gujarati,
    configUplaod,
    workspaceDetails,
    fetchWorkspace,
    fetchWorkspaceDetails,
    uploadTokenValue,
    fetchDefaultConfig,
    uploadTranslated,
    createWorkspaceDetails
};
