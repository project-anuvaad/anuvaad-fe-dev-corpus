import React from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReadMoreAndLess from 'react-read-more-less';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import Menu from '@material-ui/core/Menu';
import UpdateSentencesGrade from "../../../flux/actions/apis/upgrade-sentence-grade";
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CSVLink, CSVDownload } from "react-csv";
import StarRatingComponent from 'react-star-rating-component';
import FetchBenchmarkModel from "../../../flux/actions/apis/fetchenchmarkmodel";
import { Tooltip } from '@material-ui/core';
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';

const theme = createMuiTheme();
class BenchmarkGrade extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputStatus:'ALL',
            pending: null,
            score:{},
            apiCalled: false,
            sentences: [],
            pageCount:5,
            status:'',
            page:0,
            offset:0,
            MenuItemValues:["All", "Pending"],
            TableHeaderValues:['Source Sentence','Target Sentence',"Machine translated reference","Grade"] ,
            TableHeaderDescription: ['Source Sentence','Target Sentence',"how good the contextual meaning of the sentence", "How well sequenced and properly framed the output is, given the meaning was conveyed", "Vocabulary/Lexicon- This  captures two things- first, proper words to express the meaning of those sentences, including correct proper nouns(names, places etc.). Secondly, it includes if the output contains more better words i.e a better synonym, this is helpful in relative comparison, when you want to give more weight to न्यायाधीश in comparison to जस्टिस","Structure of sentence grade(60%) 	Vocabulary / Lexicon grade(30%)	Meaning of sentence grade(10%)"],
            role: JSON.parse(localStorage.getItem('roles'))

        }
    }

    componentDidMount() {
       
        this.setState({TableHeaderValues:['Source Sentence','Target Sentence', "Meaning of sentence", "Structure of sentence","Vocabulary / Lexicon", "Aggregate score"]})
        if (this.props.match.params.basename && this.props.match.params.modelid) {
            let api = new FetchBenchmarkModel(this.props.match.params.basename,this.props.match.params.modelid, this.state.pageCount,1)
            this.props.APITransport(api);
        }

    }

    handleChangePage = (event, offset) => {
        
        this.setState({ offset,lock:false});
        if (this.props.match.params.basename) {
        let api = new FetchBenchmarkModel(this.props.match.params.basename,this.props.match.params.modelid,this.state.pageCount,offset+1,this.state.inputStatus)
            this.props.APITransport(api);
            
        }

      };

      handleStatusChange = event => {
        this.setState({ inputStatus: event.target.value });
            let api = new FetchBenchmarkModel(this.props.match.params.basename,this.props.match.params.modelid,this.state.pageCount,1,event.target.value)
            this.props.APITransport(api);
      };

      handleSelectChange = event => {
        this.setState({ pageCount: event.target.value,offset:0 });
            let api = new FetchBenchmarkModel(this.props.match.params.basename,this.props.match.params.modelid,event.target.value,1,this.state.inputStatus)
            this.props.APITransport(api);
      };


    componentDidUpdate(prevProps) {
        console.log("",this.props.updateGrade)
        if (prevProps.updateGrade !== this.props.updateGrade ) {

            let apivalue = new FetchBenchmarkModel(this.props.match.params.basename,this.props.match.params.modelid,this.state.pageCount,this.state.offset+1,this.state.inputStatus)
            this.props.APITransport(apivalue);

        }
            
       
        if (prevProps.fetchBenchmarkModel !== this.props.fetchBenchmarkModel ) {
            
            this.setState({
                sentences: this.props.fetchBenchmarkModel.data,
                sentenceCancel: this.props.fetchBenchmarkModel.data,
                count: this.props.fetchBenchmarkModel.count,
                score: this.props.fetchBenchmarkModel.sum,
                pending: this.props.fetchBenchmarkModel.pending,
            })
        }
    }

    handleStarClick(nextValue, prevValue, name) {
        let sentences = this.state.sentences
        sentences[name].rating = nextValue
        let api = new UpdateSentencesGrade(sentences[name],this.props.match.params.modelid)
            
            this.props.APITransport(api);
            
        this.setState({rating: nextValue});
      }

      handleSpellStarClick(nextValue, prevValue, name) {
        let sentences = this.state.sentences
        sentences[name].spelling_rating = nextValue
        let api = new UpdateSentencesGrade(sentences[name],this.props.match.params.modelid)
        
        this.props.APITransport(api);
        
        this.setState({spelling_rating: nextValue});
      }

      handleContextStarClick(nextValue, prevValue, name) {
        let sentences = this.state.sentences
        sentences[name].context_rating = nextValue
        let api = new UpdateSentencesGrade(sentences[name],this.props.match.params.modelid)
            
            this.props.APITransport(api);
            
        this.setState({context_rating: nextValue});
      }

      calculateScore(){
          return ((this.state.score.context_rating * 6 +  this.state.score.grammer_grade * 3 +   this.state.score.spelling_rating * 1 )/10)/(this.state.count-this.state.pending)*20
      }


    render() {
        
        const CorpusDetails= <TableBody>
            {this.state.sentences && Array.isArray(this.state.sentences) && this.state.sentences.map((row, index) => (
                <TableRow key={index} >
                        

                     <TableCell component="th" scope="row">
                     <ReadMoreAndLess
                            ref={this.ReadMore}
                            className="read-more-content"
                            
                            readMoreText="Read more"
                            readLessText="">
                            {row.source}
                        </ReadMoreAndLess>
                    </TableCell> 
                    <TableCell >
                    <ReadMoreAndLess
                            ref={this.ReadMore}
                            className="read-more-content"
                            
                            readMoreText="Read more"
                            readLessText=""
                        >
                            {row.target}
                        </ReadMoreAndLess>
                        
                    </TableCell>

                    <TableCell >
                    <div style={{width:'100px'}}>
                    <StarRatingComponent 
                        name={index}
                        starCount={5}
                        value={row.context_rating ? row.context_rating : 0}
                        onStarClick={this.handleContextStarClick.bind(this)}
                    />
                    </div>

                    </TableCell>
                     
                    
                    <TableCell >
                    <div style={{width:'100px'}}>
                    <StarRatingComponent 
                        name={index}
                        starCount={5}
                        value={row.rating ? row.rating : 0}
                        onStarClick={this.handleStarClick.bind(this)}
                    />
                    </div>

                    </TableCell>

                    <TableCell >
                    <div style={{width:'110px'}}>
                    <StarRatingComponent 
                        name={index}
                        starCount={5}
                        value={row.spelling_rating ? row.spelling_rating : 0}
                        onStarClick={this.handleSpellStarClick.bind(this)}
                    />
                    </div>

                    </TableCell>
                    
                      
                
                     
                        
                     <TableCell >
                    <div style={{width:'90px'}}>
                    { ((row.context_rating ? row.context_rating* 6 : 0) +(row.spelling_rating ? row.spelling_rating* 1 : 0) + (row.rating ? row.rating* 3 : 0))/10}
                    </div>

                    </TableCell>  
                
                    
                </TableRow>
            ))}
        </TableBody>

        return (
            <div>

                
                {this.state.download ? <CSVDownload data={this.state.downloadData} target="_blank" /> : ''}
                <Grid container spacing={24} style={{ padding: 5 }}>
                    <Grid item xs={12} sm={12} lg={12} xl={12} style={{marginLeft:'-4%',marginTop:'38px'}}>
                    <Toolbar style={{marginRight:'-1.2%'}}>							
<Typography variant="title" color="inherit" style={{flex: 1}}>
</Typography>
<Typography variant="h8" gutterBottom>
        Rows per page:&nbsp;&nbsp;&nbsp;&nbsp;
          <Select
          width = "50%"
            value={this.state.pageCount}
            onChange={this.handleSelectChange}
            displayEmpty
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            
          </Select>
          </Typography> 


</Toolbar>
                        <Paper >

                        <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container spacing={24} style={{ padding: 5 }}>
                    
        <Grid item xs={3} sm={3} lg={3} xl={3}>
            <Typography variant="title" color="inherit" style={{paddingBottom:'8px',paddingLeft:'15px',flex: 1}}>
            {this.state.pending==0 ? " Total Grade : " + this.calculateScore() :null }
</Typography>
</Grid>
                    <Grid item xs={3} sm={3} lg={3} xl={3}>
            <Typography variant="title" color="inherit" style={{paddingBottom:'8px',flex: 1}}>
                {this.state.count && "Number of sentences pending : "} {this.state.pending && this.state.pending}
</Typography>
</Grid>
<Grid item xs={3} sm={3} lg={2} xl={2}>
Status Filter :&nbsp;&nbsp;&nbsp;
<Select
          
            value={this.state.inputStatus}
            onChange={this.handleStatusChange}
            displayEmpty
          >
            <MenuItem value={"ALL"}>All</MenuItem>
            <MenuItem value={"PENDING"}>Pending</MenuItem>
            
            
          </Select>
                </Grid>
<Grid item xs={4} sm={4} lg={4} xl={4} >
           
        <Pagination
            
            align='right'
          limit={1}
          offset={this.state.offset}
          centerRipple={true}
          total={(this.state.inputStatus==="PENDING" ? this.state.pending : this.state.count)/this.state.pageCount}
          onClick={(event, offset) => {this.handleChangePage(event,offset)}}
        />
         </Grid>
         
            </Grid>
        
        </MuiThemeProvider>

                            <Divider/>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                    {this.state.TableHeaderValues.map((item,index) => {
                                        console.log("index value",this.state.TableHeaderDescription[index])
                                        return <Tooltip placement="top-start" enterDelay={200} key={"1"}  title={this.state.TableHeaderDescription[index]} ><TableCell width="45%">{item}</TableCell></Tooltip>
                                        
                                    })}       
                                    </TableRow>
                                </TableHead>
                                {CorpusDetails}
                            </Table>
                        </Paper>
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
    fetchBenchmarkModel: state.fetchBenchmarkModel,
    updateGrade:state.updateGrade
});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
    CreateCorpus: APITransport,
}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BenchmarkGrade));
