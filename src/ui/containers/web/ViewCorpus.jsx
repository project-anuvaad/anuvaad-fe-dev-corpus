import React from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import FetchCorpus from "../../../flux/actions/apis/corp";
import ViewIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import history from "../../../web.history";
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import NewCorpusStyle from "../../styles/web/Newcorpus";
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import Toolbar from '@material-ui/core/Toolbar';


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
            englishFile: {},
            role: JSON.parse(localStorage.getItem('roles'))
        }
    }

    componentDidMount() {
        console.log("editor---",this.state.role[0])
        const { APITransport } = this.props;
        const apiObj = new FetchCorpus();
        APITransport(apiObj);
        this.setState({showLoader:true})


    }

    componentDidUpdate(prevProps) {
        if (prevProps.corp !== this.props.corp) {
            this.setState({ name: this.props.corp })

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
                label: "File Name",
                options: {
                 filter: true,
                 sort: true,
                }
            },

            {
             name: "domain",
             label: "Domain",
             options: {
              filter: true,
              sort: false,
             }
            },
            {
                name: "no_of_sentences",
                label: "Sentences",
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
                name: "comment",
                label: "Comment",
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
                name: "Action",
                options: {
                    filter: true,
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {   
                        if(tableMeta.rowData){
                            return (
                                <div style={{width:'90px'}}>
                                     {tableMeta.rowData[4] == 'COMPLETED' ? <Tooltip title="View"><ViewIcon style={{ width: "24", height: "24",cursor:'pointer', marginLeft:'10%',marginRight:'8%' }} onClick={()=>{this.state.role[0]=="editor" ? history.push(`${process.env.PUBLIC_URL}/parallel-corpus/`+tableMeta.rowData[0]):(this.state.role[0]=="grader"? history.push(`${process.env.PUBLIC_URL}/view-corpus/`+tableMeta.rowData[0]):'')} } > </ViewIcon></Tooltip>: ''} 
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
            filter:false,
            selectableRows:'none'
        };

        return (
            <div>

<Toolbar style={{marginLeft:"-5.4%",marginRight:'1.5%',marginTop:'20px'}}>

							
						<Typography variant="title" color="inherit" style={{flex: 1}}>
						
						</Typography>
                        {this.state.role[0]!=="grader" ? 
                        <Button variant="extendedFab" color="primary" style={{marginRight:0}}aria-label="Add" onClick={() => { history.push(`${process.env.PUBLIC_URL}/newcorpus`) }}>
                                <AddIcon /> Corpus
                        </Button>:''}
                        </Toolbar>
            
              

                    
                    <div style={{marginLeft: '-4%', marginRight: '3%', marginTop: '40px'}}>
                    <MUIDataTable  title={"Documents"} data={this.state.name} columns={columns} options={options}/>
                </div>
                  </div>  
                
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
