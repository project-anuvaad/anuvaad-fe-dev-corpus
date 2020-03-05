import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import FetchPdf from "../../../flux/actions/apis/fetchpdf";
import ViewIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import history from "../../../web.history";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import NewCorpusStyle from "../../styles/web/Newcorpus";
import Typography from "@material-ui/core/Typography";
import MUIDataTable from "mui-datatables";
import Toolbar from "@material-ui/core/Toolbar";
import GradeIcon from "@material-ui/icons/Grade";

import { translate } from '../../../assets/localisation';
import DeleteOutlinedIcon from '@material-ui/icons/AlarmAdd';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/BorderColor";
import DeleteIcon from '@material-ui/icons/AlarmAdd';
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
    const { APITransport } = this.props;
    const apiObj = new FetchPdf();
    APITransport(apiObj);
    this.setState({ showLoader: true });
  }

  handleClick = rowData => {
    
    history.push(`${process.env.PUBLIC_URL}/parallel-corpus/5dc55650-1a61-404f-a886-f256cd443974`);
    
  };

  componentDidUpdate(prevProps) {
    if (prevProps.corp !== this.props.corp) {
      this.setState({ name: this.props.corp });
    }
  }

  render() {
    const columns = [
      {
        name: "basename",
        label: translate('common.page.label.basename'),
        options: {
          display: "excluded"
        }
      },
      {
        name: "process_name",
        label: translate('viewCorpus.page.label.fileName'),
        options: {
          filter: true,
          sort: true
        }
      },

      {
        name: "status",
        label: translate("common.page.table.status"),
        options: {
          filter: true,
          sort: true
        }
      },

      {
        name: "created_on",
        label: translate('common.page.label.timeStamp') ,
        options: {
          filter: true,
          sort: true,
          sortDirection: "desc"
        }
      },

      {
        name: "Action",
        label: translate('common.page.label.action'),
        options: {
            filter: true,
            sort: false,
            empty: true,

            customBodyRender: (value, tableMeta, updateValue) => {
                if (tableMeta.rowData) {
                    return (
                        <div style={{ width: '240px', marginLeft: '-20px' }}>

<Tooltip title={translate('viewCorpus.title.viewSentence')}>
                      <EditIcon
                        style={{ width: "24", height: "24", cursor: "pointer", marginLeft: "10%", marginRight: "8%" }}
                        onClick={() => {
                          history.push(`${process.env.PUBLIC_URL}/parallel-corpus/` + tableMeta.rowData[0]);
                        }}
                      >
                        {" "}
                      </EditIcon>
                    </Tooltip>
                            { <Tooltip title={translate('viewTranslate.page.title.downloadSource')}><IconButton color="secondary" component="a" ><DeleteOutlinedIcon /></IconButton></Tooltip> }
                            {<Tooltip title={translate('viewTranslate.page.title.downloadTranslate')}><IconButton color="primary" component="a"><DeleteOutlinedIcon /></IconButton></Tooltip> }
                            {/* {<Tooltip title="View"><IconButton style={{ width: "24", height: "24",cursor:'pointer', marginLeft:'10%',marginRight:'8%' }} onClick={()=>{history.push('/view-doc/'+tableMeta.rowData[0])} } > </IconButton></Tooltip>} */}
                            {<Tooltip title={translate('common.page.label.delete')}><IconButton color="primary" component="span" onClick={(event) => { this.handleSubmit(tableMeta.rowData[0], tableMeta.rowData[1]) }} ><DeleteIcon> </DeleteIcon></IconButton></Tooltip>}
                            
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
          noMatch: translate('gradeReport.page.muiNoTitle.sorryRecordNotFound')
        },
        toolbar: {
          search: translate('graderReport.page.muiTable.search'),
          viewColumns: translate('graderReport.page.muiTable.viewColumns')
        },
        pagination: {
          rowsPerPage: translate('graderReport.page.muiTable.rowsPerPages'),
        }
      },
      filterType: "checkbox",
      onRowClick: rowData => this.handleClick(rowData),
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
          <Typography variant="title" color="inherit" style={{ flex: 1 }}></Typography>
          {this.state.role.includes("dev") ? (
            <Button
              variant="extendedFab"
              color="primary"
              style={{ marginRight: 0 }}
              aria-label="Add"
              onClick={() => {
                history.push(`${process.env.PUBLIC_URL}/newcorpus`);
              }}
            >
              <AddIcon /> {translate('commonCorpus.page.button.corpus')}
            </Button>
          ) : (
            ""
          )}
        </Toolbar>
        <div style={{ marginLeft: "-4%", marginRight: "3%", marginTop: "40px" }}>
          <MUIDataTable title={translate('common.page.title.document')} data={this.state.name} columns={columns} options={options} />
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

export default withRouter(
  withStyles(NewCorpusStyle)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(PdfUpload)
  )
);
