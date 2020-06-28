import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/ArrowDropUpOutlined";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MUIDataTable from "mui-datatables";
import Toolbar from "@material-ui/core/Toolbar";
import NewCorpusStyle from "../../styles/web/Newcorpus";
import history from "../../../web.history";
import FetchPdf from "../../../flux/actions/apis/fetchpdf";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import { translate } from "../../../assets/localisation";
import Timer from "../../components/web/common/CountDown";
import ProgressBar from "../../components/web/common/ProgressBar";

class PdfUpload extends React.Component {
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
    this.handleRefresh()
  }

  handleClick = rowData => {
    history.push(`${process.env.PUBLIC_URL}/interactive-editor/${rowData[0]}`);
  };


  handleRefresh() {
    const { APITransport } = this.props;
    const apiObj = new FetchPdf();
    APITransport(apiObj);
    this.setState({ showLoader: true });
  }


  componentDidUpdate(prevProps) {
    if (prevProps.corp !== this.props.corp) {
      this.setState({ name: this.props.corp });
    }
  }

  render() {
    const columns = [
      {
        name: "session_id",
        label: translate("common.page.label.basename"),
        options: {
          display: "excluded"
        }
      },
      {
        name: "process_name",
        label: translate("viewCorpus.page.label.fileName"),
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "status",
        options: {
          display: 'excluded',
        }
      },

      {
        name: "eta",
        label: translate('viewTranslate.page.label.eta'),
        options: {
          display: 'excluded',
        }
      },

      {
        name: "source_lang",
        label: translate('common.page.label.source'),
        options: {
          filter: true,
          sort: true
        }
      },

      {
        name: "target_lang",
        label: translate('common.page.label.target'),
        options: {
          filter: true,
          sort: true
        }
      },

      {
        name: "Status",
        label: translate('common.page.table.status'),
        options: {
          filter: true,
          sort: false,
          empty: true,

          customBodyRender: (value, tableMeta, updateValue) => {
            if (tableMeta.rowData) {

              const result = tableMeta.rowData[3] * 1000 - (Date.now() - new Date(tableMeta.rowData[7]));
              return (

                <div style={{ width: '120px' }}>

                  {(tableMeta.rowData[2] === 'TRANSLATING' && tableMeta.rowData[3]) ? (result > 0 ? <div> <ProgressBar val={result} eta={tableMeta.rowData[3] * 1000} handleRefresh={this.handleRefresh.bind(this)}></ProgressBar> <Timer val={result} handleRefresh={this.handleRefresh.bind(this)} /> </div> : tableMeta.rowData[2]) : tableMeta.rowData[2] === 'PROCESSING' ? <ProgressBar token={true} val={result} eta={300 * 1000} handleRefresh={this.handleRefresh.bind(this)}></ProgressBar> : tableMeta.rowData[2]}

                </div>
              );
            }

          }
        }
      },

      {
        name: "created_on",
        label: translate("common.page.label.timeStamp"),
        options: {
          filter: true,
          sort: true,
          sortDirection: "desc"
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
      onRowClick: rowData => (rowData[2] === "COMPLETED" || rowData[2] === "TRANSLATING") && this.handleClick(rowData),
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
              variant="extendedFab"

              style={{
                marginRight: 0, backgroundColor: "#1C9AB7",
                color: "#FFFFFF"
              }}
              aria-label="Add"
              onClick={() => {
                history.push(`${process.env.PUBLIC_URL}/pdf-upload`);
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
        <div style={{ marginLeft: "4%", marginRight: "3%", marginTop: "2%", marginBottom: '5%' }}>
          <MUIDataTable title={translate("common.page.title.document")} data={this.state.name} columns={columns} options={options} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  corp: state.corp
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(withStyles(NewCorpusStyle)(connect(mapStateToProps, mapDispatchToProps)(PdfUpload)));
