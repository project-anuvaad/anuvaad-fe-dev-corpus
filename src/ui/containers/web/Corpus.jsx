import React from 'react';
import { withRouter } from 'react-router-dom';
import ReadMoreAndLess from 'react-read-more-less';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCollapsingTable from 'react-collapsing-table'
import APITransport from '../../../flux/actions/apitransport/apitransport';
import Filter from "@material-ui/icons/FilterList";
import FetchSentences from "../../../flux/actions/apis/sentences";
import UpdateSentences from "../../../flux/actions/apis/update_sentences";
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CSVLink, CSVDownload } from "react-csv";
import SaveIcon from '@material-ui/icons/Check';
import Accept from '@material-ui/icons/Spellcheck';
import Close from '@material-ui/icons/Close';
import TablePagination from "@material-ui/core/TablePagination";
import EditIcon from '@material-ui/icons/Edit';
import Input from "@material-ui/core/Input";
import Pagination from "material-ui-flat-pagination";
import Select from '../../com:qponents/web/common/Select';
import Tooltip from '@material-ui/core/Tooltip';
import UpdateSentencesStatus from "../../../flux/actions/apis/update-sentenses-status";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
var rows = [
    { id: 1, firstName: 'Paul', lastName: 'Darragh', id: 1, firstName: 'Paul', lastName: 'Darragh'}
  ]
  var columns = [
    { accessor: 'firstName', label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150, },
    { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, position: 2, minWidth: 150, },
  ]


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
            downloadData:[],
            pageCount:5,
            status:'',
            AcceptColor:'blue',
            EditColor:'blue',
            CloseColor:'blue',
            page:0,
            stat:'PENDING',
            lock:false,
            anchorEl:'',
            inputStatus:'',
            backColor:'Grey',
            MenuItemValues:['ALL','ACCEPTED',"REJECTED","EDITED","PENDING","PROCESSING"]  
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
            let api = new FetchSentences(this.props.match.params.basename,this.state.pageCount,1)
            this.props.APITransport(api);
        }

    }

    handleChangePage = (event, page) => {
        
        this.setState({ page,lock:false});
        if (this.props.match.params.basename) {
        let api = new FetchSentences(this.props.match.params.basename,this.state.pageCount,page+1,this.state.inputStatus)
            this.props.APITransport(api);
            
        }

      };

      handleFilter = (inputStatus) => {
        
        this.setState({ anchorEl: null})
        this.setState({inputStatus})
        if (this.props.match.params.basename) {
        let api = new FetchSentences(this.props.match.params.basename,this.state.pageCount,1,inputStatus)
            this.props.APITransport(api);
            
        }
        

      };
       


      handleSelectChange = event => {
        this.setState({ pageCount: event.target.value,page:0 });
            let api = new FetchSentences(this.props.match.params.basename,event.target.value,1,this.state.inputStatus)
            this.props.APITransport(api);
      };


    componentDidUpdate(prevProps) {
        if (prevProps.corpus !== this.props.corpus) {
            this.setState({
                hindi: this.props.corpus.hindi,
                english: this.props.corpus.english
            })
        }
        if (prevProps.sentences !== this.props.sentences) {
            this.setState({
                
                sentences: this.props.sentences.data,
                sentenceCancel: this.props.sentences.data,
                count:this.props.sentences.count
            })
        }
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

    handleEditButton(index) {
        let sentences = this.state.sentences
        sentences[index].isEditable = true
        console.log("type",typeof(sentences))
        this.setState({            
            sentences: sentences,           
        })
    }

    handleActionButton(index,action) {
        
        let sentences = this.state.sentences;
        let color1=''
        sentences[index].isEditable = false
        sentences[index].status=action === "ACCEPTED" ? 'ACCEPTED':(action==='REJECTED'?'REJECTED':'')
        this.setState({backColor:'green'})
        
        this.setState({
            
            sentences: sentences,
            status:action,
            download: false,
            lock:false
        })

        if(!action){
            console.log("success")
            let api = new FetchSentences(this.props.match.params.basename,this.state.pageCount,this.state.page+1,this.state.inputStatus)
            this.props.APITransport(api);
         
        }
        else{

            
        let api = new UpdateSentencesStatus(sentences[index])
            this.props.APITransport(api);
        }
    }

    
    

    handleSaveButton(index) {
        
        let sentences = this.state.sentences
        console.log('value',sentences)
        sentences[index].isEditable = false,
        sentences[index].status= "EDITED"
        this.setState({
            lock:false,
            sentences: sentences,
            
            download: false
        })
        let api = new UpdateSentences(sentences[index])
            this.props.APITransport(api);
    }


    handleTextChange(value, index, key){
        let sentences = this.state.sentences
        sentences[index][key] = value
        this.setState({
            sentences: sentences
        })
    }

    handleSelect(event){
        this.setState({ anchorEl: event.currentTarget });
      };
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
      handleColor(color){
          let color1='grey'
          console.log(color)
           return color=='ACCEPTED' ? 'green' : (color=='EDITED'?'#2c6b96':(color=="REJECTED"?"red":(color=="PROCESSING"?'#f1de7f':(color=="PENDING"?'grey':''))))
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
                <TableRow key={index} hover={true} selected={true} >
                    <TableCell component="th" scope="row" whiteSpace= 'nowrap'>
                        {row.isEditable ? <Input id="email" style={{width:'100%'}} multiline rowsMax="4" floatingLabelText="E-mail" value={row.source} onChange={(event) => { this.handleTextChange(event.target.value, index, 'source') }} /> :<ReadMoreAndLess
                ref={this.ReadMore}
                className="read-more-content"
                charLimit={150}
                readMoreText="Read more"
                readLessText=""
            >
                {this.colorValidate(row.source,row.source_ocr_words)}
            </ReadMoreAndLess>}
                    </TableCell>
                    <TableCell >
                        {row.isEditable ? <Input id="email" style={{width:'100%'}} multiline rowsMax="4" floatingLabelText="E-mail" value={row.target} onChange={(event) => { this.handleTextChange(event.target.value, index, 'target') }}/> : <ReadMoreAndLess
                ref={this.ReadMore}
                className="read-more-content"
                charLimit={150}
                readMoreText="Read more"
                readLessText=""
            >
                {this.colorValidate(row.target,row.target_ocr_words)}
            </ReadMoreAndLess>}
                    </TableCell>
                    <TableCell >
                    <ReadMoreAndLess
                ref={this.ReadMore}
                className="read-more-content"
                charLimit={150}
                readMoreText="Read more"
                readLessText=""
            >
                 {row.translation}
            </ReadMoreAndLess>
                       
                    </TableCell>

                    <TableCell align="left">
                {row.alignment_accuracy === 'GAPFILLER\n' || row.alignment_accuracy === 'GALECHURCH\n' ? 
                    <span variant="fab" style={{ width: '35px', height: '35px',borderRadius:'50%',display: 'inline-block', backgroundColor:'red'}}/> 
                        : 
                        (row.alignment_accuracy === 'BLEU\n' ? <span style={{ width: '35px', height: '35px',borderRadius:'50%',display: 'inline-block', backgroundColor:'yellow'}}>    </span>
                        :null)}
            </TableCell>
                    
                     <TableCell>
                        {row.isEditable ? <div> 

                            
                             
                            <Tooltip title="Save" leaveDelay={0}><SaveIcon style={{ cursor: 'pointer',marginRight:'5px', color:'green', fontSize:'30px' }} onClick={() => {
                            this.handleSaveButton(index)
                        }} /></Tooltip>
                        <Tooltip title="Revert" leaveDelay={0}><Close style={{ cursor: 'pointer',marginRight:'5px' , color:'red'}} onClick={() => {
                            this.handleActionButton(index,'')
                        }} /></Tooltip> </div>:
                        <div style={{width:'95px'}}>
                            
                            <Tooltip title="Accept" leaveDelay={0}><Accept style={{ cursor: 'pointer',marginRight:'5px' , color:"green"}} onClick={() => {
                                {this.state.lock ?'': this.handleActionButton(index,"ACCEPTED")}
                                
                            }} />
                            </Tooltip>
                            <Tooltip title="Edit" leaveDelay={0}><EditIcon style={{ cursor: 'pointer',marginRight:'5px' ,color:'#335995'}} onClick={() => {
                                {this.state.lock ?'' : this.handleEditButton(index)}
                            }} /></Tooltip>
                            <Tooltip title="Reject" leaveDelay={0}><Close style={{ cursor: 'pointer',marginRight:'5px' , color:"red"}} onClick={() => {
                                {this.state.lock ?'' :this.handleActionButton(index,"REJECTED")}
                            }} /></Tooltip>
                            </div>
                        }
                    </TableCell> 

                    
                    <TableCell >
                         
                        
                   
                        <div style={{backgroundColor:this.handleColor(row.status), width:'105px',paddingTop:'7px',textAlign:'center',paddingBottom:'7px',color:'white'}}>{row.status}</div>
                    </TableCell>
                    
                </TableRow>
            ))}
        </TableBody>

        return (
            <div>

<Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >



{this.state.MenuItemValues.map((item) => (
                        <MenuItem value={item}  onClick={()=>{this.handleFilter({item})}}>{item}</MenuItem>
                  ))}
          
        </Menu>
                
                {this.state.download ? <CSVDownload data={this.state.downloadData} target="_blank" /> : ''}
                <Grid container spacing={24} style={{ padding: 5 }}>
                    <Grid item xs={12} sm={12} lg={12} xl={12} style={{marginLeft:'-4%',marginTop:'20px'}}>
                        <Typography variant="title" gutterBottom>
                            Corpus Details
                        </Typography>
                                <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="right"
                        >
                            
                        </Grid>
                    </Grid>

                    
                    <Grid item xs={12} sm={12} lg={12} xl={12} style={{marginLeft:'-4%'}}>
                            <Paper >

                            <TablePagination
        component="nav"
        page={this.state.page}
        rowsPerPageOptions={[5, 10, 25,50,100]}
        rowsPerPage={this.state.pageCount}
        count={this.state.count}
        onChangePage={this.handleChangePage}

        
          onChangeRowsPerPage={this.handleSelectChange}
      />


                            <Divider/>
                                <Table >
                                    <TableHead>
                                        <TableRow>
                                            
                                            
                                            <TableCell width="27%">Source</TableCell>
                                            <TableCell width="27%">Target</TableCell>
                                            <TableCell width="27%">Machine translated reference </TableCell>
                                            <TableCell align="right">Accuracy</TableCell>
                                            <TableCell width="10%">Action</TableCell>
                                            <TableCell width="10%"><div>Status <Filter onClick={(event) => {
                                this.handleSelect(event)}}/></div></TableCell>
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
    CreateCorpus: APITransport,
}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Corpus));
