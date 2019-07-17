import React from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import FetchCorpus from "../../../flux/actions/apis/corp";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import history from "../../../web.history";
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import NewCorpusStyle from "../../styles/web/Newcorpus";
import Typography from '@material-ui/core/Typography';


class Corp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: [],
            apiCalled: false,
            hindi: [],
            english: [],
            hindi_score: [],
            english_score: [],
            file: {},
            corpus_type: 'single',
            hindiFile: {},
            englishFile: {}
        }
    }

    componentDidMount() {

        const { APITransport } = this.props;
        const apiObj = new FetchCorpus();
        APITransport(apiObj);


    }

    componentDidUpdate(prevProps) {
        if (prevProps.corp !== this.props.corp) {
            this.setState({ name: this.props.corp })

        }
    }

    render() {

        const { user, classes, location } = this.props;

        return (
            
            <Grid container spacing={24} style={{ padding: 24 }}>
                <Grid item xs={12} sm={12} lg={12} xl={12}>
                        <Typography variant="title" gutterBottom>
                            Corpus List
                        </Typography>
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="right"
                    >
                        <Grid item xs={1} sm={1} lg={1} xl={1}style={{maxWidth:'7%'}}>
                            <Button variant="extendedFab" color="primary" style={{marginRight:0}}aria-label="Add" onClick={() => { history.push(`${process.env.PUBLIC_URL}/newcorpus`) }}>
                                <AddIcon /> Corpus
                        </Button>

                        </Grid>
                    </Grid>
                    </Grid>

                    
                    
                        <Grid item xs={12} sm={12} lg={12} xl={12}>
                            {this.props.apistatus.progress ? <CircularProgress /> :
                                <Paper>
                                    <Table >
                                        <TableHead>
                                            <TableRow>

                                                <TableCell align="right">Name</TableCell>
                                                <TableCell align="right">Domain</TableCell>
                                                <TableCell align="right">Created On</TableCell>
                                                <TableCell align="right">Comment</TableCell>
                                                <TableCell align="right">Sentences</TableCell>
                                                <TableCell align="right">Status</TableCell>
                                                <TableCell align="right">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.name && Array.isArray(this.state.name) && this.state.name.map((row) => (
                                                <TableRow key={row.created_on}>
                                                    <TableCell align="right">{row.name}</TableCell>
                                                    <TableCell align="right">{row.domain}</TableCell>
                                                    <TableCell align="right">{row.created_on.split(',')[0]}</TableCell>
                                                    <TableCell align="right">{row.comment}</TableCell>
                                                    <TableCell align="right">{row.no_of_sentences}</TableCell>
                                                    <TableCell align="right">{row.status}</TableCell>
                                                    <TableCell align="right">{row.status == 'COMPLETED' ? <Button variant="contained" onClick={()=>{history.push(`${process.env.PUBLIC_URL}/parallel-corpus/`+row.basename)}} color="secondary" aria-label="edit">
                                                        View
                                                     </Button> : ''}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            }
                        </Grid>
                    </Grid>
                
        );
    }
}

const mapStateToProps = state => ({
    user: state.login,
    apistatus: state.apistatus,
    corp: state.corp,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
    CreateCorpus: APITransport,
}, dispatch);


export default withRouter(withStyles(NewCorpusStyle)(connect(mapStateToProps, mapDispatchToProps)(Corp)));
