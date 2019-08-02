import React from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import CreateCorpus from "../../../flux/actions/apis/corpus";
import FetchSentences from "../../../flux/actions/apis/sentences";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CSVLink, CSVDownload } from "react-csv";

import SaveIcon from '@material-ui/icons/CheckCircle';
import Input from "@material-ui/core/Input";



class Corpus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            apiCalled: false,
            hindi: [],
            english: [],
            hindi_score: [],
            english_score: [],
            file: {},
            corpus_type: 'single',
            hindiFile: {},
            englishFile: {},
            sentences: [],
            download: false,
            downloadData:[]
        }
    }

    componentDidMount() {
        this.setState({
            hindi: [],
            english: [],
            hindi_score: [],
            english_score: [],
            file: {}
        })
        if (this.props.match.params.basename) {
            let api = new FetchSentences(this.props.match.params.basename)
            this.props.APITransport(api);
        }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.corpus !== this.props.corpus) {
            this.setState({
                hindi: this.props.corpus.hindi,
                hindi_score: this.props.corpus.hindi_scores,
                english: this.props.corpus.english,
                english_score: this.props.corpus.english_scores,
            })
        }
        if (prevProps.sentences !== this.props.sentences) {
            this.setState({
                sentences: this.props.sentences
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

    calculateOcrScore = (scores) => {
        let sum=0;
         sum= sum.reduce((x,y)=>(x+y))
        
        console.log(sum);
    }

    handleSubmit() {
        const { APITransport } = this.props;
        const apiObj = new CreateCorpus(this.state.file, this.state.hindiFile, this.state.englishFile, this.state.corpus_type);
        APITransport(apiObj);
    }

    handleEditButton(index) {
        let sentences = this.state.sentences
        sentences[index].isEditable = true
        this.setState({
            sentences: sentences
        })
    }

    handleSaveButton(index) {
        let sentences = this.state.sentences
        sentences[index].isEditable = false
        this.setState({
            sentences: sentences,
            download: false
        })
    }

    handleTextChange(value, index, key){
        let sentences = this.state.sentences
        sentences[index][key] = value
        this.setState({
            sentences: sentences
        })
    }

    handleDownload(){
        let sentences = this.state.sentences
        let downloadDataHeader = ['Hindi','English']
        let downloadData = []
        downloadData.push(downloadDataHeader)
        sentences.map((sentence)=>{
            let row = [sentence.source,sentence.target]
            downloadData.push(row)
        })
        this.setState({
            downloadData: downloadData,
            download: true,
        })
    }
    colorValidate=(e,ocrValue)=>{
        let splitRow;
        let word;
        let colorWord =[];
        console.log(ocrValue)
        if(ocrValue){
        splitRow= e.split(' ')
        for(word in ocrValue)
            if(ocrValue[word]>=85){  
             colorWord.push( <span><span>{splitRow[word]}</span><span>{" "}</span></span>)  
            }

            else if(ocrValue[word]>70 && ocrValue[word]<85){
                colorWord.push( <span><span style={{ backgroundColor: 'yellow' }}>{splitRow[word]}</span><span>{" "}</span></span>)
            }

            else if(ocrValue[word]<=70){
                colorWord.push( <span><span style={{ backgroundColor: 'red' }}>{splitRow[word]}</span><span>{" "}</span></span>)
            }
            return colorWord;
        }  
        return e;      
               
    }


    render() {
        const CorpusDetails= <TableBody>
            {this.state.sentences && Array.isArray(this.state.sentences) && this.state.sentences.map((row, index) => (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        {row.isEditable ? <Input id="email" multiline floatingLabelText="E-mail" value={row.source} onChange={(event) => { this.handleTextChange(event.target.value, index, 'source') }} /> : this.colorValidate(row.source,row.source_ocr_words)}
                    </TableCell>
                    <TableCell align="right">
                        {row.isEditable ? <Input id="email" multiline floatingLabelText="E-mail" value={row.target} onChange={(event) => { this.handleTextChange(event.target.value, index, 'target') }}/> : this.colorValidate(row.target,row.target_ocr_words)}
                    </TableCell>
            <TableCell align="right">
                {row.alignment_accuracy === 'GAPFILLER\n' || row.alignment_accuracy === 'GALECHURCH\n' ? 
                    <span variant="fab" style={{ width: '35px', height: '35px',borderRadius:'50%',display: 'inline-block', backgroundColor:'red'}}/> 
                        : 
                        (row.alignment_accuracy === 'BLEU\n' ? <span style={{ width: '35px', height: '35px',borderRadius:'50%',display: 'inline-block', backgroundColor:'yellow'}}>    </span>
                        :null)}
            </TableCell>
                    
                </TableRow>
            ))}
        </TableBody>

        return (
            <div>
                {this.state.download ? <CSVDownload data={this.state.downloadData} target="_blank" /> : ''}
                <Grid container spacing={24} style={{ padding: 24 }}>
                    <Grid item xs={12} sm={12} lg={12} xl={12}>
                        <Typography variant="title" gutterBottom>
                            Corpus Detail
                        </Typography>
                        

                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="right"
                        >
                            <Grid item xs={2} sm={2} lg={1} xl={1} style={{marginRight: '0%'}}>
                                <Button variant="extendedFab" color="primary" aria-label="Add" onClick={this.handleDownload.bind(this)}>
                                     Download
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <CSVDownload data={csvData} target="_blank" /> */}
                    <Grid item xs={12} sm={12} lg={12} xl={12}>
                        {this.props.apistatus.progress ? <CircularProgress /> :
                            <Paper >
                                <Table >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Hindi</TableCell>
                                            
                                            <TableCell align="right">English</TableCell>
                                            
                                            <TableCell align="right">Accuracy</TableCell>
                                            {/* <TableCell align="right">Edit</TableCell> */}
                                        </TableRow>
                                    </TableHead>
                                    {CorpusDetails}
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
    corpus: state.corpus,
    sentences: state.sentences,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
    CreateCorpus: APITransport,
}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Corpus));
