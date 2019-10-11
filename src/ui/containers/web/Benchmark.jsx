import React from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import FetchBenchmark from "../../../flux/actions/apis/benchmark";
import SelectModel from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import history from "../../../web.history";
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import NewCorpusStyle from "../../styles/web/Newcorpus";
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Toolbar from '@material-ui/core/Toolbar';
import GradeIcon from '@material-ui/icons/Grade';
import FetchLanguage from "../../../flux/actions/apis/fetchlanguage";
import Select from '../../components/web/common/Select';
import FetchModel from "../../../flux/actions/apis/fetchmodel";
import FetchBenchmarkModel from "../../../flux/actions/apis/fetchenchmarkmodel";

class Benchmark extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: [],
            apiCalled: false,
            hindi: [],
            english: [],
            hindi_score: [],
            english_score: [],
            modelLanguage:[],
            language:[],
            file: {},
            corpus_type: 'single',
            hindiFile: {},
            englishFile: {},
            role: JSON.parse(localStorage.getItem('roles'))
        }
    }

    componentDidMount() {
        const { APITransport } = this.props;
        const apiObj = new FetchBenchmark();
        const apiLang = new FetchLanguage();
        APITransport(apiObj);
        
        const apiModel = new FetchModel();
        APITransport(apiModel);
        
        APITransport(apiLang);
        


    }

    handleSelectChange = event => {
    
        this.setState({ [event.target.name]: event.target.value});
      };


    handleTarget(modelLanguage,supportLanguage,sourceLanguage){

        console.log("values",modelLanguage,supportLanguage,sourceLanguage)
        var result =[];
        var name="";

        supportLanguage.map((value)=>(
            value.language_name === sourceLanguage ? 
            name= value.language_code:''
          ))
          
        modelLanguage.map((item) => 
        {item.source_language_code == name?
          supportLanguage.map((value)=>(
            item.target_language_code===value.language_code?
            result.push(value):null
          )):''})
          var value = new Set(result);
          var target_language= [...value]
          
        return target_language;   
      }

      handleModel(modelLanguage,source,target){
        console.log(modelLanguage,source,target)
        var result =[];
        var name='';
        this.state.language.map((value)=>(
            value.language_name === source ? 
            name= value.language_code:''
          ))
        modelLanguage.map((item) => 
        {item.source_language_code===name && item.target_language_code===target?
          result.push(item):null})
          console.log(result)
          return result;
    
      }


      handleSubmit(row){
        this.setState({
            row:row})
        const { APITransport } = this.props;
        var model =''
        this.state.modelLanguage.map((item) =>(
            item.model_name === this.state.model ? 
            model= item:[])) 


            console.log(row,model.modelid)
            const apiObj = new FetchBenchmarkModel(row,model.model_id,5,1);
            APITransport(apiObj)
    this.setState({
      showLoader:true,
      modelid:model.model_id
    })

        
    
      }

    componentDidUpdate(prevProps) {
        if (prevProps.fetchBenchmark !== this.props.fetchBenchmark) {
            this.setState({ name: this.props.fetchBenchmark })

        }

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

          if (prevProps.fetchBenchmarkModel !== this.props.fetchBenchmarkModel) {
            console.log("modelid---",this.state.modelid)
            history.push(`${process.env.PUBLIC_URL}/fetch-benchmark-sentences/`+this.state.row+'/'+this.state.modelid)

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
                label: "Category",
                options: {
                 filter: true,
                 sort: true,
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
                name: "source_lang",
                label: "Source",
                options: {
                 filter: true,
                 sort: true,
                }
               },
               {
                name: "Target",
                
                options: {
                    filter: true,
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {   
                        if(tableMeta.rowData){
                            return (
                                 <Select id={"outlined-age-simple"} selectValue='language_code' MenuItemValues={tableMeta.rowData[3] ? this.handleTarget(this.state.modelLanguage,this.state.language,tableMeta.rowData[3]):[]} handleChange={this.handleSelectChange} value={this.state.target} name="target"  />
            
                            );
                        }
                
                    }
                }
               },

               {
                name: "Model",
                
                options: {
                    filter: true,
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {   
                        if(tableMeta.rowData){
                            return (
                                <SelectModel 
                style={{minWidth: 160,align:'right',maxWidth: 100}}
                name='model'
                value={this.state.model}
                onChange={this.handleSelectChange}
                input={<OutlinedInput name={this.state.model} id="outlined-age-simple" />} >
                  {tableMeta.rowData[3]&& this.state.target ?
                   this.handleModel(this.state.modelLanguage,tableMeta.rowData[3],this.state.target).map((item) => (
                    <MenuItem key={item.model_id} value={item.model_name}>{item.model_name}</MenuItem>
                  )):[]}>


            </SelectModel>
            
                            );
                        }
                
                    }
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
                                    <Tooltip title="Grade Sentence"><GradeIcon style={{ width: "24", height: "24",cursor:'pointer', marginLeft:'10%',marginRight:'8%' }} onClick={()=>{ this.handleSubmit(tableMeta.rowData[0])} } > </GradeIcon></Tooltip>
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

        <Toolbar style={{marginLeft:"-5.4%",marginRight:'1.5%'}}>	
						<Typography variant="title" color="inherit" style={{flex: 1}}>
						</Typography>
                        
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
    fetchBenchmark: state.fetchBenchmark,
    langModel: state.langModel,
    supportLanguage: state.supportLanguage,
    fetchBenchmarkModel:state.fetchBenchmarkModel

});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
    CreateCorpus: APITransport,
}, dispatch);


export default withRouter(withStyles(NewCorpusStyle)(connect(mapStateToProps, mapDispatchToProps)(Benchmark)));
