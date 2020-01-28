import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlinedIcon from '@material-ui/icons/VerticalAlignBottom';
import UploadIcon from '@material-ui/icons/VerticalAlignTop';
import MUIDataTable from "mui-datatables";
import FileUpload from "../../components/web/common/FileUploadWithIcon";
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import DeleteFile from "../../../flux/actions/apis/deletefile";
import UploadTranslatedFile from "../../../flux/actions/apis/uploadTranslatedFile";
import FetchTranslations from "../../../flux/actions/apis/fetchtranslation";
import APITransport from '../../../flux/actions/apitransport/apitransport';
import history from "../../../web.history";
import MySnackbarContentWrapper from "../../components/web/common/Snackbar";
import Timer from "../../components/web/common/CountDown";
import ProgressBar from "../../components/web/common/ProgressBar";
import Fab from '@material-ui/core/Fab';
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Snackbar from "../../components/web/common/Snackbar";

var file = "";
class ViewTranslate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fetchtranslation: [],
            apiCalled: false,
            hindi: [],
            english: [],
            hindi_score: [],
            english_score: [],
            file: {},
            corpus_type: 'single',
            hindiFile: {},
            englishFile: {},
            open: false,
            value: '',
            filename: '',
            snack: false,
            message: ''

        }
        this.handleTranslatedUpload = this.handleTranslatedUpload.bind(this)
    }

    componentDidMount() {
        const { APITransport } = this.props;
        const apiObj = new FetchTranslations();
        APITransport(apiObj);
        this.setState({ showLoader: true })

    }

    handleSubmit = (value, filename) => {
        file = value;
        this.setState({
            open: true,
            value, filename
        });
    }

    handleRefresh() {
        const { APITransport } = this.props;
        const apiObj = new FetchTranslations();
        APITransport(apiObj);
        this.setState({ showLoader: true })
    }

    handleClickOpen = (basename) => {
        const { APITransport } = this.props;
        const apiObj = new DeleteFile(basename);
        APITransport(apiObj);
        this.setState({ open: false, showLoader: true })
        
        this.setState({ showLoader: true, message: this.state.filename + " file deleted successfully!" })
        setTimeout(() => { this.setState({ snack: true }) }, 700)
        return false;
    };

    handleClose = () => {
        this.setState({ open: false, snack: false });
    };

    handleTranslatedUpload(event, basename) {
        const { APITransport } = this.props;
        const api = new UploadTranslatedFile(basename, event.target.files[0])
        APITransport(api);
    }

    componentDidUpdate(prevProps, nexpProps) {
        if (prevProps.fetchtranslation !== this.props.fetchtranslation) {
            this.setState({ fetchtranslation: this.props.fetchtranslation })
        }
        if (prevProps.uploadTranslated !== this.props.uploadTranslated) {
            this.componentDidMount()
        }
        if (prevProps.deletefile !== this.props.deletefile) {
            this.setState({snack:true })
            const apiObj1 = new FetchTranslations();
        this.props.APITransport(apiObj1)
            setTimeout(() => { this.setState({ snack: false }) }, 700)
        }


    }

    render() {


        const columns = [
            {
                name: "basename",
                label: "basename",
                options: {
                    display: 'excluded',
                }
            },
            {
                name: "name",
                label: "Transfer Files",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "created_on",
                label: "Timestamp",
                options: {
                    filter: true,
                    sort: true,
                    sortDirection: 'asc'
                }
            },

            {
                name: "sourceLang",
                label: "Source Language",
                options: {
                    filter: true,
                    sort: true,
                }
            },

            {
                name: "targetLang",
                label: "Target Language",
                options: {
                    filter: true,
                    sort: true,
                }
            },

            {
                name: "status",
                label: "Status",
                options: {
                    display: 'excluded',
                }
            },

            {
                name: "eta",
                label: "ETA",
                options: {
                    display: 'excluded',
                }
            }, {
                name: "translate_uploaded",
                label: "Translateuploaded",
                options: {
                    display: 'excluded',
                }
            },



            {
                name: "Status",
                options: {
                    filter: true,
                    sort: false,
                    empty: true,
                   
                    customBodyRender: (value, tableMeta, updateValue) => {
                        if (tableMeta.rowData) {
                            const result = tableMeta.rowData[6] * 1000 - (Date.now() - new Date(tableMeta.rowData[2]));
                            return (

                                <div style={{ width: '120px' }}>
                                    {(tableMeta.rowData[5] !== 'COMPLETED' && tableMeta.rowData[6]) ? (result > 0 ? <div> <ProgressBar val={result} eta={tableMeta.rowData[6] * 1000} handleRefresh={this.handleRefresh.bind(this)}></ProgressBar> <Timer val={result} handleRefresh={this.handleRefresh.bind(this)} /> </div> : tableMeta.rowData[5]) : tableMeta.rowData[5]}

                                </div>
                            );
                        }

                    }
                }
            },
            {
                name: "Action",
                options: {
                    filter: true,
                    sort: false,
                    empty: true,

                   customBodyRender: (value, tableMeta, updateValue) => {
                        if (tableMeta.rowData) {
                            return (
                                <div style={{ width: '180px', marginLeft: '-20px' }}>
                                    {tableMeta.rowData[5] === 'COMPLETED' ? <Tooltip title="Download"><IconButton color="primary" component="a" href={(process.env.REACT_APP_DOWNLOAD_URL ? process.env.REACT_APP_DOWNLOAD_URL : 'http://auth.anuvaad.org') + "/download-docx?filename=" + tableMeta.rowData[0] + '_t.docx'}><DeleteOutlinedIcon /></IconButton></Tooltip> : ''}
                                    {/* {tableMeta.rowData[5] == 'COMPLETED' ? <Tooltip title="View"><ViewIcon style={{ width: "24", height: "24",cursor:'pointer', marginLeft:'10%',marginRight:'8%' }} onClick={()=>{history.push('/view-doc/'+tableMeta.rowData[0])} } > </ViewIcon></Tooltip>: ''}  */}
                                    {tableMeta.rowData[5] === 'COMPLETED' ? <Tooltip title="Delete"><IconButton color="primary" component="span" onClick={(event) => { this.handleSubmit(tableMeta.rowData[0], tableMeta.rowData[1]) }} ><DeleteIcon> </DeleteIcon></IconButton></Tooltip> : ''}
                                    {tableMeta.rowData[5] === 'COMPLETED' ? <Tooltip title="Upload"><FileUpload  id={tableMeta.rowData[0]} icon={<UploadIcon />} iconStyle={tableMeta.rowData[7] ? { color: 'green' } : null} accept=".docx" handleChange={(name, event) => this.handleTranslatedUpload(event, tableMeta.rowData[0])} /></Tooltip> : ''}

                                </div>
                            );
                        }

                    }
                }
            }
        ];

        const options = {
            filterType: 'checkbox',
            download: false,
            print: false,
            filter: false,
            selectableRows: 'none',
            customSort: (data, colIndex, order) => { return data.sort((a, b) => { if (colIndex === 2 ) { return (new Date(a.data[colIndex]) < new Date(b.data[colIndex]) ? -1: 1 ) * (order === 'desc' ? 1 : -1); } else { return (a.data[colIndex] < b.data[colIndex] ? -1: 1 ) * (order === 'desc' ? 1 : -1); } }); }
            
        };

        return (
            <div>
                <Toolbar style={{ marginLeft: "-5.4%", marginRight: "1.5%", marginTop: "20px" }}>
                    <Typography variant="title" color="inherit" style={{ flex: 1 }}></Typography>
                    <Fab variant="extended" color="primary" aria-label="Add" style={{ marginLeft: '-4%', marginTop: '1%' }} onClick={() => { history.push("/doctranslate") }}>
                        <AddIcon /> Translate
                </Fab>
                </Toolbar>

                <div style={{ marginLeft: '-4%', marginRight: '3%', marginTop: '40px' }}>
                    <MUIDataTable title={"Documents"} data={this.state.fetchtranslation} columns={columns} options={options} />
                </div>

                {this.state.open &&
                    <Dialog
                        open={this.state.open}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">
                            Delete
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Are you sure you want to delete {this.state.filename} file?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">No</Button>
                            <Button onClick={(event) => { this.handleClickOpen(file) }} color="primary">Yes</Button>
                        </DialogActions>
                    </Dialog>
                }


{this.state.snack && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            variant="success"
            message={this.state.message}
          />
        )}
                
            </div>

        );
    }
}

const mapStateToProps = state => ({
    user: state.login,
    apistatus: state.apistatus,
    fetchtranslation: state.fetchtranslation,
    uploadTranslated: state.uploadTranslated,
    deletefile : state.deletefile
});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
    CreateCorpus: APITransport,
}, dispatch);


export default withRouter((connect(mapStateToProps, mapDispatchToProps)(ViewTranslate)));
