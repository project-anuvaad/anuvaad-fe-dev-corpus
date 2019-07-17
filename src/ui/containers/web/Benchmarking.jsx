import React from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import Benchmark from "../../../flux/actions/apis/benchmark";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


class Benchmarking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            apiCalled: false,
            bleu: [],
            google: [],
            custom: [],
            file: {},
            corpus_type: 'TB',
            corpus_type_up: 'TB',
            hindiFile: {},
            englishFile: {}
        }
    }

    componentDidMount() {
        this.setState({
            bleu: [],
            google: [],
            custom: [],
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.benchmark !== this.props.benchmark) {
            this.setState({
                bleu : [this.props.benchmark.bleu],
                google: [this.props.benchmark.google],
                custom: [this.props.benchmark.custom],
            })
        }
    }

    handleTextChange(key, event) {
        this.setState({
            [key]: event.target.value
        })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleFileChange = (e) => {
        if (e.target.files[0]) {
            this.setState({
                file: e.target.files[0],
            });
        }
    }

    handleMultiFileChange = (e) => {
        if (e.target.files[0]) {
            this.setState({
                [e.target.name]: e.target.files[0],
            });
        }
    }

    handleSubmit() {
        window.open("http://52.40.71.62:3003/translator/download-src?type=" + this.state.corpus_type);
    }

    handleFileSubmit(){
        const { APITransport } = this.props;
        const apiObj = new Benchmark(this.state.file, this.state.corpus_type_up);
        APITransport(apiObj);
    }

    render() {
        return (
            <div>
                <Grid container spacing={24} style={{ padding: 24 }}>
                <Grid item xs={12} sm={12} lg={12} xl={12}>
                    <Typography component="h2" variant="display4" gutterBottom>
                        Select the type and download the file
                    </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} lg={2} xl={2}>
                        <FormControl style={{ width: '200px' }}>
                            <InputLabel htmlFor="corpus_type">Type</InputLabel>
                            <Select
                                value={this.state.corpus_type}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'corpus_type',
                                    id: 'corpus_type',
                                }}
                            >
                                <MenuItem value={'TB'}>Text Books</MenuItem>
                                <MenuItem value={'LC'}>Law Commission</MenuItem>
                                <MenuItem value={'Gen'}>General</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={9} sm={6} lg={3} xl={3}>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit.bind(this)}>
                            Download
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={24} style={{ padding: 24 }}>
                <Grid item xs={12} sm={12} lg={12} xl={12}>
                    <Typography component="h2" variant="display4" gutterBottom>
                        Upload the file to compare BLEU score (File format should be same as downloaded file)
                    </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} lg={2} xl={2}>
                        <FormControl style={{ width: '200px' }}>
                            <InputLabel htmlFor="corpus_type_up">Type</InputLabel>
                            <Select
                                value={this.state.corpus_type_up}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'corpus_type_up',
                                    id: 'corpus_type_up',
                                }}
                            >
                                <MenuItem value={'TB'}>Text Books</MenuItem>
                                <MenuItem value={'LC'}>Law Commission</MenuItem>
                                <MenuItem value={'Gen'}>General</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={6} lg={2} xl={2}>
                    <input type="file" onChange={this.handleFileChange.bind(this)} accept=".txt" />
                    </Grid>

                    <Grid item xs={9} sm={6} lg={3} xl={3}>
                        <Button variant="contained" color="primary" onClick={this.handleFileSubmit.bind(this)}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={24} style={{ padding: 24 }}>
                    <Grid item xs={12} sm={12} lg={12} xl={12}>
                        {this.props.apistatus.progress ? <CircularProgress /> :
                            <Paper >
                                <Table >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>FILE BLEU</TableCell>
                                            <TableCell align="right">GOOGLE BLEU</TableCell>
                                            <TableCell align="right">AI DEMO BLEU</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.bleu.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {row}
                                                </TableCell>
                                                <TableCell align="right">{this.state.google[index]}</TableCell>
                                                <TableCell align="right">{this.state.custom[index]}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        }
                    </Grid>
                </Grid>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login,
    apistatus: state.apistatus,
    benchmark: state.benchmark,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
    Benchmark: APITransport,
}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Benchmarking));
