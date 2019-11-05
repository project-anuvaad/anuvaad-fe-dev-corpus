import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from "@material-ui/core/Snackbar";
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlinedIcon from '@material-ui/icons/VerticalAlignBottom';
import MUIDataTable from "mui-datatables";
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import DeleteFile from "../../../flux/actions/apis/deletefile";
import FetchTranslations from "../../../flux/actions/apis/fetchtranslation";
import APITransport from '../../../flux/actions/apitransport/apitransport';
import history from "../../../web.history";
import MySnackbarContentWrapper from "../../components/web/common/Snackbar";
import Fab from '@material-ui/core/Fab';

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

    handleClickOpen = (basename) => {
        const { APITransport } = this.props;
        const apiObj = new DeleteFile(basename);
        APITransport(apiObj);
        this.setState({ open: false, showLoader: true })
        const apiObj1 = new FetchTranslations();
        APITransport(apiObj1)
        this.setState({ showLoader: true, message: this.state.filename + " file deleted successfully!" })
        setTimeout(() => { this.setState({ snack: true }) }, 700)
        return false;
    };

    handleClose = () => {
        this.setState({ open: false, snack: false });
    };

    componentDidUpdate(prevProps, nexpProps) {
        if (prevProps.fetchtranslation !== this.props.fetchtranslation) {
            this.setState({ fetchtranslation: this.props.fetchtranslation })
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
                    sortDirection: 'desc'
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
                    filter: true,
                    sort: true,
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
                                <div style={{ width: '120px' }}>
                                    {tableMeta.rowData[5] === 'COMPLETED' ? <a href={(process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : 'http://documents.anuvaad.org') + "/corpus/download-docx?filename=" + tableMeta.rowData[0] + '_t.docx'}><Tooltip title="Download"><DeleteOutlinedIcon style={{ width: "24", height: "24", marginRight: '8%', color: 'black' }} /></Tooltip></a> : ''}
                                    {/* {tableMeta.rowData[5] == 'COMPLETED' ? <Tooltip title="View"><ViewIcon style={{ width: "24", height: "24",cursor:'pointer', marginLeft:'10%',marginRight:'8%' }} onClick={()=>{history.push('/view-doc/'+tableMeta.rowData[0])} } > </ViewIcon></Tooltip>: ''}  */}
                                    {tableMeta.rowData[5] === 'COMPLETED' ? <Tooltip title="Delete"><DeleteIcon style={{ width: "24", height: "24", cursor: 'pointer', marginLeft: '10%' }} onClick={(event) => { this.handleSubmit(tableMeta.rowData[0], tableMeta.rowData[1]) }}  > </DeleteIcon></Tooltip> : ''}
                                </div>
                            );
                        }

                    }
                }
            },
        ];

        const options = {
            filterType: 'checkbox',
            download: false,
            print: false,
            fixedHeader: true,
            filter: false,
            selectableRows: 'none'
        };

        return (
            <div>

                <Fab variant="extended" color="secondary" aria-label="Add" style={{ marginLeft: '-4%', marginTop: '1%' }} onClick={() => { history.push("/pdftranslate") }}>
                    <AddIcon /> Translate
                </Fab>

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

                {this.state.snack && this.state.message &&
                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={this.state.snack} onClose={this.handleClose} autoHideDuration={3000} >
                        <MySnackbarContentWrapper
                            onClose={this.handleClose}
                            variant="success"
                            message={this.state.message} />
                    </Snackbar>
                }
            </div>

        );
    }
}

const mapStateToProps = state => ({
    user: state.login,
    apistatus: state.apistatus,
    fetchtranslation: state.fetchtranslation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
    CreateCorpus: APITransport,
}, dispatch);


export default withRouter((connect(mapStateToProps, mapDispatchToProps)(ViewTranslate)));
