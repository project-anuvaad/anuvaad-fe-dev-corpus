import login from './umc/login';
import qna from './qna';
import automl from './automl';
import nmt from './nmt';
import nmtsp from './nmtsp';
import corpus from './corpus';
import benchmark from './benchmark';
import apistatus from './apistatus/apistatus';
import corp from './corp';
import translations from './translations';
import translation_sentences from './translation_sentences';
import sentences from './sentences';

export default {
    login,
    answers: qna,
    automl,
    nmt,
    nmtsp,
    benchmark,
    corpus,
    apistatus,
    corp,
    sentences,
    translations,
    translation_sentences
};
