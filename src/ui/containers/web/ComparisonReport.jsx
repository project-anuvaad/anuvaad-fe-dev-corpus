import MUIDataTable from "mui-datatables";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import ComparisonDetailReport from "../../../flux/actions/apis/comparisonreport";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
class ComparisonReport extends React.Component {
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
      tocken: false
    };
  }

  handleClick = rowData => {
    this.setState({ tocken: true, graderReport: rowData[1] });
  };

  handleSubmit() {
    const { APITransport } = this.props;

    const apiObj = new ComparisonDetailReport(this.state.from_date, this.state.to_date);
    APITransport(apiObj);
    this.setState({ showLoader: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.graderReport !== this.props.graderReport) {
      this.setState({
        graderDetails: this.props.graderReport
      });
    }
  }
  handleClose = () => {
    this.setState({ tocken: false });
  };

  handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    const Table1columns = [
      {
        name: "_id",
        label: "Model",
        options: {
          filter: true,
          sort: true,
          sortDirection: "desc"
        }
      },

      {
        name: "record_unique",
        label: "record",
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
        label: "",
        options: {
          filter: true,
          sort: true
        }
      }
    ];

    var data =this.state.graderDetails
    const footerNames = ['Full Name', 'Job', 'Whereabouts', 'Age', 'Allowance'];
    const options1 = {
      filterType: "checkbox",
      download: false,
      print: false,
      fixedHeader: true,
      filter: false,
      selectableRows: "none",
      download: true,

      onDownload: (buildHead, buildBody, columns, data) =>
      buildHead(headerNames) ,
     
      onRowClick: !this.state.tocken ? rowData => this.handleClick(rowData) : ""
    };

    const Table2columns = [
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
          sortDirection: "desc"
        }
      },

      {
        name: "target",
        label: "Target",
        options: {
          filter: true,
          sort: true,
          sortDirection: "desc"
        }
      },

      {
        name: "rating",
        label: "Meaning of sentence",
        options: {
          filter: true,
          sort: true,
          sortDirection: "desc"
        }
      },

      {
        name: "context_rating",
        label: "Structure of sentence",
        options: {
          filter: true,
          sort: true,
          sortDirection: "desc"
        }
      },
      {
        name: "spelling_rating",
        label: "Vocabulary / Lexicon",
        options: {
          filter: true,
          sort: true,
          sortDirection: "desc"
        }

      }
    ];

    const headerNames = [
      {
        name: 'Category Name',
        download: true,
      },
      {
        name: 'Source',
        download: true,
      },
      {
        name: 'Target',
        download: true,
      },
      {
        name: 'Meaning of sentence',
        download: true,
      },
      {
        name: 'Structure of sentence',
        download: true,
      },
      {
        name: 'Vocabulary / Lexicon',
        download: true,
      },
    ];

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
              <MUIDataTable title={"Comparison Report"} data={this.state.graderDetails} columns={Table1columns} options={options1} />
            </div>
          </div>
        ) : (
          <div>
            <Toolbar style={{ marginLeft: "-5.4%", marginRight: "1.5%", marginTop: "20px" }}>
              <Typography variant="title" color="inherit" style={{ flex: 1 }}></Typography>
              <Fab
                variant="extended"
                color="primary"
                aria-label="Add"
                style={{ marginLeft: "-4%", marginTop: "1%" }}
                onClick={() => {
                  this.handleClose();
                }}
              >
                <CloseIcon /> Close
              </Fab>
            </Toolbar>

            <div style={{ marginLeft: "-4%", marginRight: "3%", marginTop: "40px" }}>
              <MUIDataTable
                title={"Comparison Report"}
                data={this.state.graderReport ? this.state.graderReport : ""}
                columns={Table2columns}
                options={options1}
              />
            </div>
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
  graderReport: state.comparisonreport
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
  )(ComparisonReport)
);
