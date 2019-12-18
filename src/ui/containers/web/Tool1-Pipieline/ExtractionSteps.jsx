import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import MUIDataTable from "mui-datatables";
import FetchWorkspace from "../../../../flux/actions/apis/fetchworkspace";
import TabDetals from "./WorkspaceDetailsTab";
import history from "../../../../web.history";
import { timingSafeEqual } from "crypto";
class ExtractionWorkspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:2,
      page:0,
      rowsPerPage: 10                                                                                                                                                                                                                                   
    };
  }

  componentDidMount() {
    const { APITransport } = this.props;
    const apiObj = new FetchWorkspace(this.state.rowsPerPage,this.state.page+1,"PROCESSING");
    APITransport(apiObj);
    this.setState({ showLoader: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchWorkspace !== this.props.fetchWorkspace) {
      console.log("-----",this.props.fetchWorkspace)
      this.setState({ name: this.props.fetchWorkspace.data, count:this.props.fetchWorkspace.count});
    }
  }

  handleClick=(rowData)=>{
    console.log("=====",rowData)
    this.setState({workSpacename: rowData[0], id:rowData[1]})
    if(rowData[2]=="At Step2"){
      history.push(`${process.env.PUBLIC_URL}/Sentence-Extraction`+ "/" + rowData[0] + "/" + rowData[1])
    }
    else if(rowData[2]=="At Step1"){
      history.push(`${process.env.PUBLIC_URL}/apply-token`+ "/" + rowData[0] + "/" + rowData[1])
    }
    }
    




  changePage = (page, rowsPerPage) => {
      console.log("====",page, rowsPerPage)
    const { APITransport } = this.props;
    const apiObj = new FetchWorkspace(rowsPerPage,page+1,"PROCESSING");
    APITransport(apiObj);
    this.setState({ page:page,rowsPerPage });
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
            sort: true
          }
        },
        {
          name: "session_id",
          label: "id",
          options: {
              display: 'excluded',
          }
      },
        {
          name: "step",
          label: "Status",
          options: {
            filter: true,
            sort: true
          }
        },
    ]

    const options = {
        filterType: "checkbox",
        download: false,
        print: false,
        fixedHeader: true,
        filter: false,
        serverSide: true,
      count: this.state.count,
      selectableRows: 'none',
      page: this.state.page/this.state.rowsPerPage,
      onRowClick: rowData => this.handleClick(rowData),
      onTableChange: (action, tableState) => {
        console.log(action, tableState);

        switch (action) {
          case 'changePage':
            this.changePage(tableState.page, tableState.rowsPerPage);
            break;

            case 'changeRowsPerPage':
              this.changePage(tableState.page, tableState.rowsPerPage);
              break;
        
        }
      },
   
      };
  
    return (
      <div>
      <TabDetals activeStep={this.state.value} style={{ marginLeft: "-4%", marginRight: "3%", marginTop: "40px" }}/>
        <div style={{ marginLeft: "-4%", marginRight: "3%", marginTop: "40px" }}>
          <MUIDataTable title={"Processing Workspaces"} data={this.state.name} columns={columns} options={options} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExtractionWorkspace));