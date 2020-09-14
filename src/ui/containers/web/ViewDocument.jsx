import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MUIDataTable from "mui-datatables";
import Toolbar from "@material-ui/core/Toolbar";
import NewCorpusStyle from "../../styles/web/Newcorpus";
import history from "../../../web.history";
import FetchDocument from "../../../flux/actions/apis/fetch_document";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import { translate } from "../../../assets/localisation";
import Timer from "../../components/web/common/CountDown";
import ProgressBar from "../../components/web/common/ProgressBar";
import Spinner from "../../components/web/common/Spinner";

class ViewDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: [],
      apiCalled: false,
      hindi: [],
      english: [],
      hindi_score: [],
      english_score: [],
      file: {},
      corpus_type: "single",
      hindiFile: {},
      englishFile: {},
      role: JSON.parse(localStorage.getItem("roles"))
    };
  }

  componentDidMount() {
    this.handleRefresh(true)
  }

  handleClick = rowData => {
    history.push(`${process.env.PUBLIC_URL}/interactive-document/${rowData[2]}/${rowData[5]}`);
    // history.push(`${process.env.PUBLIC_URL}/interactive-document/${rowData[4]}/${rowData[5]}`);
  };


  handleRefresh(value) {
    const { APITransport } = this.props;
    const apiObj = new FetchDocument();
    APITransport(apiObj);
    value && this.setState({ showLoader: true });
  }


  componentDidUpdate(prevProps) {
    if (prevProps.fetchDocument !== this.props.fetchDocument) {
      var arr=[]

      this.props.fetchDocument.map(value=>{
        var b = {}
        b["status"] = value.status;
          b["job"] = value.jobID;
          b["name"] = value.input.jobName? value.input.jobName: value.input.files[0].name;
          b["id"] = value.output && (value.output[0].hasOwnProperty('outputFilePath') ? value.output[0].outputFilePath : value.output[0].outputFile);
          b["inputFile"] = value.taskDetails && value.taskDetails.length>0 && value.taskDetails[0].output && value.taskDetails[0].output.length>0 && value.taskDetails[0].output[0].outputFile;
        
        arr.push(b)
      })
     this.setState({ name: arr , showLoader: false});
    }
  }

  render() {
    const columns = [
      {
        name: "jobID",
        label: translate("common.page.label.basename"),
        options: {
          display: "excluded"
        }
      },
      {
        name: "status",
        label: translate("viewCorpus.page.label.fileName"),
        options: {
          
          display: "excluded"
        }
      },
      {
        name: "job",
        label: "Job ID",
        options: {
          filter: true,
          sort: true,
          sortDirection: "desc"
          
        }
      },

      {
        name: "name",
        label: "Filename",
        options: {
          filter: true
        }
      },

      {
        name: "id",
        label: "id",
        options: {
          display: "excluded"
        }
      },
      {
        name: "inputFile",
        label: "inputFile",
        options: {
          display: "excluded"
        }
      },

    
      {
        name: "status",
        label: translate('common.page.table.status'),
        options: {
          filter: true,
          sort: false,
          empty: true,

          customBodyRender: (value, tableMeta, updateValue) => {
            if (tableMeta.rowData) {

              
              return (

                <div style={{ width: '120px' }}>

                  {(tableMeta.rowData[1] !== 'COMPLETED' && tableMeta.rowData[1] !== 'FAILED') ? <ProgressBar token={true} val={1000} eta={2000 * 1000} handleRefresh={this.handleRefresh.bind(this)}></ProgressBar> : tableMeta.rowData[1]}

                </div>
              );
            }

          }
        }
      }
      
      
    ];

    const options = {
      textLabels: {
        body: {
          noMatch: translate("gradeReport.page.muiNoTitle.sorryRecordNotFound")
        },
        toolbar: {
          search: translate("graderReport.page.muiTable.search"),
          viewColumns: translate("graderReport.page.muiTable.viewColumns")
        },
        pagination: {
          rowsPerPage: translate("graderReport.page.muiTable.rowsPerPages")
        }
      },
      filterType: "checkbox",
      onRowClick: rowData => (rowData[1] === "COMPLETED" ) && this.handleClick(rowData),
      download: false,
      expandableRowsOnClick: true,
      print: false,
      fixedHeader: true,
      filter: false,
      selectableRows: "none"
    };

    return (
      <div>
        <Toolbar style={{ marginLeft: "-5.4%", marginRight: "1.5%", marginTop: "20px" }}>
          <Typography variant="title" color="inherit" style={{ flex: 1 }} />
          {this.state.role.includes("dev") || this.state.role.includes("grader") || this.state.role.includes("user") || this.state.role.includes("interactive-editor") ? (
            <Button
            color="primary"
              variant="extendedFab"

              style={{
                marginRight: 0
              }}
              aria-label="Add"
              onClick={() => {
                history.push(`${process.env.PUBLIC_URL}/document-upload`);
              }}
            >
              {/* <AddIcon /> */}
              <img src="upload.svg"
                style={{
                  marginRight: '5px',
                  height: '16px'
                }}
                alt="" />
              {translate("common.page.button.upload")}
            </Button>
          ) : (
              ""
            )}
        </Toolbar>
        <div style={{ marginLeft: "3%", marginRight: "3%", marginTop: "2%", marginBottom: '5%' }}>
        {!this.state.showLoader && <MUIDataTable title={translate("common.page.title.document")} data={this.state.name} columns={columns} options={options} />}
        </div>
        {this.state.showLoader && < Spinner/>}
      </div>
      
    );
    
  }
  
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  corp: state.corp,
  fetchDocument: state.fetchDocument
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(withStyles(NewCorpusStyle)(connect(mapStateToProps, mapDispatchToProps)(ViewDocument)));
