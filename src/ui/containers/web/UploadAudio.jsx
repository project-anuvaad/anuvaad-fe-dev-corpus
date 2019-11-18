import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FetchLanguage from "../../../flux/actions/apis/fetchlanguage";
import FetchModel from "../../../flux/actions/apis/fetchmodel";
import AudioToText from "../../../flux/actions/apis/audio";
import APITransport from '../../../flux/actions/apitransport/apitransport';
import history from "../../../web.history";
import Button from "../../components/web/common/Button";
import { DropzoneArea } from 'material-ui-dropzone';
import Paper from '../../components/web/common/Paper';
import Select from '../../components/web/common/SimpleSelect';
import Typography from '../../components/web/common/Typography';
import { white, blueGrey50, darkBlack } from "material-ui/styles/colors"
import NewOrders from "../../components/web/dashboard/NewOrders";
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class UploadAudio extends React.Component {
    state = {
        source: "",
        target: '',
        name: "",
        files: [],
        activeStep: 0,
        steps: ['Add', 'Edit', 'Download'],
        property: false,
        showLoader: false
    };

    start = () => {
        if (this.state.isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {
                    this.setState({ isRecording: true });
                }).catch((e) => console.error(e));
        }
    };

    stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob)
                const file = new File(buffer, 'me-at-thevoice.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                });
                this.setState({ blobURL, isRecording: false, files: file });
            }).catch((e) => console.log(e));
    };


    componentDidMount() {
        const { APITransport } = this.props;
        const apiObj = new FetchLanguage();
        APITransport(apiObj);
        this.setState({ showLoader: true })
        const apiModel = new FetchModel();
        APITransport(apiModel);
        this.setState({ showLoader: true })
        navigator.mediaDevices.getUserMedia({ audio: true },
            () => {
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },
            () => {
                console.log('Permission Denied');
                this.setState({ isBlocked: true })
            },
        );
    }

    componentDidUpdate(prevProps) {

        if (prevProps.supportLanguage !== this.props.supportLanguage) {
            this.setState({
                language: this.props.supportLanguage
            })
        }

        if (prevProps.langModel !== this.props.langModel) {
            this.setState({
                modelLanguage: this.props.langModel
            })
        }
    }




    handleSelectChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChange = (files) => {
        this.setState({
            files: files
        });
    }

    handleSubmit = () => {
        var model = '';
        const { APITransport } = this.props;
        const apiObj = new AudioToText(this.state.files);
        APITransport(apiObj);
    }

    handleSource(modelLanguage, supportLanguage) {
        var result = [];
        if (modelLanguage && supportLanguage) {
            modelLanguage.map((item) =>
                supportLanguage.map((value) => (
                    item.source_language_code === value.language_code ?
                        result.push(value) : null
                )))
        }
        var value = new Set(result);
        var source_language = [...value]
        return source_language;
    }

    handleTarget(modelLanguage, supportLanguage, sourceLanguage) {
        var result = [];
        if (modelLanguage && supportLanguage) {
            modelLanguage.map((item) => {
                item.source_language_code === sourceLanguage ?
                    supportLanguage.map((value) => (
                        item.target_language_code === value.language_code ?
                            result.push(value) : null
                    )) : ''
            })
        }
        var value = new Set(result);
        var target_language = [...value]

        return target_language;

    }
    render() {

        return (
            <div>
                <Paper value={
                    <div>
                        <Typography value='Audio to Text' variant="h5" gutterBottom="true" style={{ paddingLeft: '30%', paddingTop: '3%', paddingBottom: '4%', background: blueGrey50, marginBottom: '3%' }} />

                        <Grid container spacing={4} >
                            <DropzoneArea
                                onDrop={this.handleChange} maxFileSize={20000000} style={{ marginTop: '20%' }} acceptedFiles={['.mp3', '.wav', '.flac']} dropzoneText="Drop audio file here or click here to locate the audi file(.mp3 or .wav or .flac)" filesLimit={1}
                            ></DropzoneArea>
                        </Grid><br /><br />
                        <Grid container spacing={4} >
                            <Grid item xs={6} sm={6} lg={6} xl={6} sm={6} style={{ textAlign: 'right' }}>
                                <Button value={"Record"} color={'secondary'} variant={"contained"} dis={this.state.isRecording} onClick={this.start} />
                            </Grid>
                            <Grid item xs={5} sm={5} lg={5} xl={5} sm={5} style={{ marginLeft: '2%' }}>
                                <Button value={"Stop"} color={'secondary'} variant={"contained"} onClick={this.stop} dis={!this.state.isRecording} />
                            </Grid>
                        </Grid>

                        <Button value={"Submit"} color={'secondary'} variant={"contained"} dis={this.state.files.name ? false : true} onClick={this.handleSubmit} style={{ width: '100%' }} />
                        {/* }}  */}
                        {this.props.audio && this.props.audio.length > 0 &&
                            <Typography value={'Text:' + this.props.audio} variant="h5" gutterBottom="true" style={{ paddingLeft: '20%', paddingTop: '3%', paddingBottom: '4%', background: blueGrey50 }} />
                        }
                    </div>} style={{ width: '40%', marginLeft: '26%', marginTop: '2%', paddingBottom: '1%', minWidth: '450px' }}
                />

            </div>

        );
    }
}

const mapStateToProps = state => ({
    apistatus: state.apistatus,
    audio: state.audio
});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
    PdfTranslation: APITransport,
}, dispatch);
export default (connect(mapStateToProps, mapDispatchToProps)(UploadAudio));
