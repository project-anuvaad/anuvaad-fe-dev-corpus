import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MUIDataTable from "mui-datatables";
import { Button } from "@material-ui/core";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import FetchWorkspace from "../../../../flux/actions/apis/fetchworkspace";


class ProcessingWorkspace extends React.Component {
  intervalID;

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      page: 0,
      rowsPerPage: 10,
      serverSideFilterList: [],
      filters: [],
      workspaces: []
    };
  }

  componentDidMount() {
    this.handleFetchWorkspace();
    // this.intervalID = setInterval(this.handleFetchWorkspace, 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  handleFetchWorkspace = () => {
    const { APITransport } = this.props;
    const apiObj = new FetchWorkspace(this.state.rowsPerPage, this.state.page + 1, "PROCESSED", "");
    APITransport(apiObj);
    this.setState({ showLoader: true });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.fetchWorkspace !== this.props.fetchWorkspace) {
      this.setState({ workspaces: this.props.fetchWorkspace.data, count: this.props.fetchWorkspace.count });
    }
  }

  handleReset = val => {
    const { APITransport } = this.props;
    const apiObj = new FetchWorkspace(this.state.rowsPerPage, this.state.page + 1, "PROCESSED", "", val);
    APITransport(apiObj);
    this.setState({ filter: val });
  };

  changePage = (page, rowsPerPage) => {
    const { APITransport } = this.props;
    const apiObj = new FetchWorkspace(rowsPerPage, page + 1, "PROCESSED", "");
    APITransport(apiObj);
    this.setState({ page, rowsPerPage });
  };

  handleFilterSubmit = filterList => () => {
    console.log(filterList);
    clearTimeout(this.intervalID);
    const apiObj = new FetchWorkspace(this.state.rowsPerPage, this.state.page + 1, "PROCESSED", "", filterList);
    this.props.APITransport(apiObj);
    this.setState({ filter: filterList });
  };



  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const columns = [
      {
        name: "title",
        label: "Workspace",
        options: {
          filter: true,
          sort: true,
          filterList: this.state.filters[0]
        }
      },
      {
        name: "session_id",
        label: "id",
        options: {
          display: "excluded",
          filter: false
        }
      },
      {
        name: "step",
        label: "step",
        options: {
          filter: false,
          display: "excluded"
        }
      },
      {
        name: "status",
        label: "Status",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "sentence_count",
        label: "Sentence Count",
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: "username",
        label: "Created By",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "created_at",
        label: "Created At",
        options: {
          filter: false,
          sort: false
        }
      }
    ];

    const options = {

      filterType: "checkbox",
      download: false,
      print: false,
      search: false,
      filter: false,
      viewColumns: false,
      responsive: 'scrollMaxHeight',
      selectableRows: "multiple",
      // rowsSelected: this.state.selectedWorkspaces,
      serverSide: true,
      count: this.state.count,
      selectableRowsHeader: false,
      page: this.state.page / this.state.rowsPerPage,
      disableToolbarSelect: true,
      onFilterDialogOpen: () => {
        clearTimeout(this.intervalID);
      },

      rowsSelected: this.state.rowsSelected,
      onRowsSelect: (rowsSelected, allRows) => {
        // console.log(rowsSelected, allRows);
        let selectedItems = []
        this.setState({ rowsSelected: allRows.map(row => row.dataIndex) });
        if (allRows && allRows.length > 0) {
          allRows.map((selected) => {
                selectedItems.push(this.state.workspaces[selected.index])
              })
            }
            this.setState({selectedWorkspaces : selectedItems})
            if (this.props.handleWorkspaceSelected) {
              this.props.handleWorkspaceSelected(selectedItems)
            }
          
      },

      onFilterDialogClose: () => { },
      onFilterChange: (column, filterList, type, reset) => {
        if (type === "reset") {
          this.handleReset("");
        }
      },
      customFilterDialogFooter: filterList => (
        <div style={{ marginTop: "40px" }}>
          <Button color="primary" variant="contained" onClick={this.handleFilterSubmit(filterList[0])}>
            Apply Filters
          </Button>
        </div>
      ),
      onTableChange: (action, tableState) => {
        switch (action) {
          case "changePage":
            this.changePage(tableState.page, tableState.rowsPerPage);
            break;

          case "changeRowsPerPage":
            this.changePage(tableState.page, tableState.rowsPerPage);
            break;
        }
      }
    };

    return (
      <div>

        <div style={{ marginRight: "28%", marginTop: "40px" }}>
          <MUIDataTable data={this.state.workspaces} columns={columns} options={options} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  fetchWorkspace: state.fetchWorkspace
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProcessingWorkspace));
