import MUIDataTable from "mui-datatables";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import GraderReportDetails from "../../../flux/actions/apis/graderreport";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
class GraderReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchtranslation: [],
      apiCalled: false,
      hindi: [],
      english: [],
      hindi_score: [],
      english_score: [],
      file: {},
      corpus_type: "single",
      hindiFile: {},
      englishFile: {},
      open: false,
      value: "",
      filename: "",
      snack: false,
      message: "",
      tocken: false,
      tockenValue: false,
      categoryValue: false
    };
  }

  handleClickCategoryModel = rowData => {

    console.log("-----",rowData, rowData[1][0].category_name)
    this.setState({ categoryValue: true, categoryReport: rowData[1] });
  };

  handleClick = rowData => {

    
     this.setState({ tocken: true, graderReport: rowData[1] });
  };

  handleClickModel = rowData => {

    console.log("-----66666",rowData, rowData[1])
    rowData[4] && this.setState({ tockenValue: true, graderRecords: rowData[1] });
  };


  handleSubmit() {
    const { APITransport } = this.props;

    const apiObj = new GraderReportDetails(this.state.from_date, this.state.to_date);
    APITransport(apiObj);
    this.setState({ showLoader: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.graderReport !== this.props.graderReport) {
      this.setState({
        graderDetails: this.props.graderReport.data
      });
    }
  }
  handleClose = (value) => {

    console.log("va",value)
    this.setState({ [value]: false });
  };

  handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    const Table1columns = [
      {
        name: "username",
        label: "Username",
        options: {
          filter: true,
          sort: true,
          sortDirection: "desc"
        }
      },

      {
        name: "models",
        label: "Models",
        options: {
          display: "excluded"
        }
      },

      {
        name: "sentence_count",
        label: "Sentence Count",
        options: {
          filter: true,
          sort: true,
          sortDirection: "desc"
        }
      },
      {
        name: "word_count",
        label: "Word Count",
        options: {
          filter: true,
          sort: true
        }
      }
    ];

    const options1 = {
      filterType: "checkbox",
      download: false,
      print: false,
      fixedHeader: true,
      filter: false,
      selectableRows: "none",

      onRowClick: !this.state.tocken ? rowData => this.handleClick(rowData) : ""
    };

    const Table4columns = [
      {
        name: "category_name",
        label: "Category Name",
        options: {
          filter: true,
          sort: true,
          sortDirection: "desc"
        }
      },

      {
        name: "source",
        label: "Source",
        options: {
          filter: true,
          sort: true,
          
        }
      },

      {
        name: "target",
        label: "Target",
        options: {
          filter: true,
          sort: true,
          
        }
      },

      {
        name: "rating",
        label: "Meaning of sentence",
        options: {
          filter: true,
          sort: true,
          
        }
      },

      {
        name: "context_rating",
        label: "Structure of sentence",
        options: {
          filter: true,
          sort: true,
          
        }
      },
      {
        name: "spelling_rating",
        label: "Vocabulary / Lexicon",
        options: {
          filter: true,
          sort: true,
          
        }
      },
     

      {
        name: "name_accuracy_rating",
        label: "Names Accuracy",
        options: {
          display: this.state.categoryReport && this.state.categoryReport[0].category_name!=="Names Benchmark" ? "excluded" : 'true'
          
        }
      }
    ];

    const Table2columns = [
      {
        name: "model_name",
        label: "Model Name",
        options: {
          filter: true,
          sort: true,
          sortDirection: "desc"
        }
      },
      

      {
        name: "categories",
        label: "Categories",
        options: {
          display: "excluded"
        }
      },

      {
        name: "source_lang",
        label: "Source Language",
        options: {
          filter: true,
          sort: true,
        }
      }
      ,

      {
        name: "target_lang",
        label: "Target Language",
        options: {
          filter: true,
          sort: true,
        }
      }
      ,
      {
        name: "records_count",
        label: "Sentence Count",
        options: {
          filter: true,
          sort: true,
        }
      }
      


      
    ];

    const Table3columns = [
      {
        name: "category_name",
        label: "Category Name",
        options: {
          filter: true,
          sort: true,
          sortDirection: "desc"
        }
      },

      {
        name: "records",
        label: "Records",
        options: {
          display: "excluded"
        }
      }
      ,

      {
        name: "context_rating",
        label: "Context",
        options: {
          display: "excluded"
        }
      }
      ,
      {
        name: "name_accuracy_rating",
        label: "Names Accuracy",
        options: {
          display: "excluded"                                                                                                                                                                                                                                                                                                                                                                                                    
        }
      }
      ,
      {
        name: "rating",
        label: "Rating",
        options: {
          display: "excluded"                                                                                                                                                                                                                                                                                                                                                                                                      
        }
      }
      ,
      {
        name: "spelling_rating",
        label: "Spelling",
        options: {
          display: "excluded"                                                                                                                                                                                                                                                                                                                                                                                                     
        }
      }
      ,
            
            {
                name: "Total sentences",
                options: {
                    filter: true,
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        
                            return (
                                
                                <div style={{ width: '120px' }}>
                                     {tableMeta.rowData[1] ? tableMeta.rowData[1].length : 0 }
                                     
                                </div>
                            );
                        }

                    }
                
            },

            
            
            {
                name: "Aggregate score",
                options: {
                    filter: true,
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        
                            return (
                                
                                <div style={{ width: '120px' }}>
                                     {tableMeta.rowData[0] === "Names Benchmark" ? ( tableMeta.rowData[2] * 2 + tableMeta.rowData[3] * 6 + tableMeta.rowData[4]*1+tableMeta.rowData[5]*1) / 10 : tableMeta.rowData[0] === "SC Judgement Orders" ? (tableMeta.rowData[2] * 2 +  tableMeta.rowData[4]* 2 +tableMeta.rowData[5]* 6 ) / 10: (tableMeta.rowData[2] * 6 +  tableMeta.rowData[4]* 3 +tableMeta.rowData[5]* 1 ) / 10}
                                     
                                </div>
                            );
                        }

                    }
                
            },

      
    ];

    const options2 = {
      filterType: "checkbox",
      download: false,
      print: false,
      fixedHeader: true,
      filter: false,
      selectableRows: "none",

      onRowClick: !this.state.tockenValue ? rowData => this.handleClickModel(rowData) : !this.state.categoryValue ? rowData => this.handleClickCategoryModel(rowData):''
    };

    return (
      <div>
        {!this.state.tocken ? (
          <div>
            <Grid container spacing={24} style={{ padding: 5 }}>
              <Grid item xs={2} sm={2} lg={2} xl={2} style={{ marginLeft: "16%", marginTop: "38px" }}>
                <Typography variant="title" color="inherit">
                  From Date :
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} lg={2} xl={2} style={{ marginLeft: "-8%", marginTop: "20px", width: "40px" }}>
                <TextField
                  id={this.state.from_date}
                  value={this.state.from_date}
                  type="date"
                  onChange={event => {
                    this.handleTextChange("from_date", event);
                  }}
                  margin="normal"
                  varient="outlined"
                  style={{ marginLeft: "5%", width: "90%", marginBottom: "4%" }}
                />{" "}
              </Grid>

              <Grid item xs={2} sm={2} lg={2} xl={2} style={{ marginLeft: "2%", marginTop: "38px" }}>
                <Typography variant="title" color="inherit">
                  To Date :
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} lg={2} xl={2} style={{ marginLeft: "-8%", marginTop: "20px" }}>
                <TextField
                  id={this.state.to_date}
                  value={this.state.to_date}
                  type="date"
                  onChange={event => {
                    this.handleTextChange("to_date", event);
                  }}
                  margin="normal"
                  varient="outlined"
                  style={{ marginLeft: "5%", width: "90%", marginBottom: "4%" }}
                />
              </Grid>

              <Grid item xs={3} sm={3} lg={3} xl={3} style={{ marginLeft: "-8%", marginTop: "34px" }}>
                <Button
                  variant="contained"
                  onClick={event => {
                    this.handleSubmit();
                  }}
                  color={"primary"}
                  aria-label="edit"
                  style={{ width: "170px", marginLeft: "50%", marginBottom: "4%", marginTop: "1px" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
            <div style={{ marginLeft: "-4%", marginRight: "3%", marginTop: "40px" }}>
              <MUIDataTable title={"Grader Details"} data={this.state.graderDetails} columns={Table1columns} options={options1} />
            </div>
          </div>
        ) : (
          <div>
            
              <Fab
                variant="extended"
                color="primary"
                aria-label="Add"
                style={{ marginLeft: "-4%", marginTop: "1%" }}
                onClick={() => {
                  this.handleClose(this.state.categoryValue ?'categoryValue': this.state.tockenValue ? 'tockenValue': 'tocken');
                }}
              >
                <CloseIcon />{!this.state.categoryReport && !this.state.tockenValue && this.state.tocken ? "Close" : "Back" }
              </Fab>
            
                {!this.state.tockenValue ? 
            <div style={{ marginLeft: "-4%", marginRight: "3%", marginTop: "40px" }}>
              <MUIDataTable
                title={"Model Details"}
                data={this.state.graderReport ? this.state.graderReport : ""}
                columns={Table2columns}
                options={options2}
              />
            </div> : !this.state.categoryValue ?  

<div style={{ marginLeft: "-4%", marginRight: "3%", marginTop: "40px" }}>
<MUIDataTable
  title={"Category Details"}
  data={this.state.graderRecords ? this.state.graderRecords : ""}
  columns={Table3columns}
  options={options2}
/>
                </div>: <div style={{ marginLeft: "-4%", marginRight: "3%", marginTop: "40px" }}>
<MUIDataTable
  title={"Graded Records"}
  data={this.state.categoryReport ? this.state.categoryReport : ""}
  columns={Table4columns}
  options={options2}
/>
                </div> }
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  fetchtranslation: state.fetchtranslation,
  graderReport: state.graderReport
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GraderReport)
);
