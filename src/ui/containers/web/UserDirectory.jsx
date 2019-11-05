import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from "@material-ui/core/Snackbar";
import AddIcon from '@material-ui/icons/Add';
import Active from '@material-ui/icons/Check';
import MUIDataTable from "mui-datatables";
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import UserDirectoryList from "../../../flux/actions/apis/userdirectory";
import APITransport from '../../../flux/actions/apitransport/apitransport';
import UserDelete from "../../../flux/actions/apis/userdelete";
import MySnackbarContentWrapper from "../../components/web/common/Snackbar";
import DeleteUser from "../../components/web/common/DeleteUser";
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import UserUpdate from "./UserUpdate";
import Button from "@material-ui/core/Button";
var file = "";
class UserDirectory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: [],
            apiCalled: false,
            hindi: [],
            english: [],
            hindi_score: [],
            english_score: [],
            file: {},
            corpus_type: 'single',
            hindiFile: {},
            englishFile: {},
            open: false,
            value: '',
            filename: '',
            snack: false,
            message: '',
            user:{},
            newUser: false,
            loginUser: localStorage.getItem('userDetails').split(" ")[0]

        }
    }

    handleCancel=()=>{
        this.setState({openValue:false})
      }

      handleClickOpen = (name, status) => {
          console.log(name)
        const { APITransport } = this.props;
         const apiObj = new UserDelete(name,status);
         APITransport(apiObj);
        this.setState({ open: false, showLoader: true })
        const apiObj1 = new UserDirectoryList();
        APITransport(apiObj1)
        var a = 
        this.setState({ showLoader: true, message: this.state.name + (this.state.status === "DELETE" ? " user deactivated successfully!" : " user activated successfully!" )})
        setTimeout(() => { this.setState({ snack: true }) }, 700)
        return false;
    };

    componentDidMount() {
        const { APITransport } = this.props;
        const apiObj = new UserDirectoryList();
        APITransport(apiObj);
        this.setState({ showLoader: true })
    }

    componentDidUpdate(prevProps, nexpProps) {
        if (prevProps.userList !== this.props.userList) {
            this.setState({ userList: this.props.userList,
            count: this.props.count })
        }
    }
    handleClick=(rowData)=>{
        rowData[1]!== this.state.loginUser?
        this.setState({openValue:true,user:rowData, newUser: rowData[0] ? false : true})
        :''
        console.log(this.state.newUser)

    }


    handleSubmit = (value, name, status) => {
        
        this.setState({
            open: true,
            value, name, status
            
        });
    }
   

    handleClose=()=>{
        
        this.setState({open:false, snack:false})
    }

    render() {
       
        const columns = [
            {
                name: "id",
                label: "id",
                options: {
                    display: 'excluded',
                }
            },
            {
                name: "username",
                label: "Username",
                options: {
                    filter: true,
                    sort: true,
                    sortDirection: 'asc',
                }
            },
            {
                name: "firstname",
                label: "First Name",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "lastname",
                label: "Last Name",
                options: {
                    display: 'excluded',
                }
            },
            
            {
                

            name: "email",
            label: "Email ID",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "roles",
            label: "Roles",
            options: {
                display: 'excluded',
            }
        },

        {
            name: "Roles",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    if (tableMeta.rowData) {
                        return (
                            <div style={{ width: '120px' }}>
                               {tableMeta.rowData[5] ? tableMeta.rowData[5].join(', '):''} </div>
                        );
                    }

                }
            }
        },
        {
            name: "isActive",
            label: "Active",
            options: {
                display: 'excluded',
            }
        },

        {
            name: "Action",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    if (tableMeta.rowData) {
                        return (
                            <div >
                        {tableMeta.rowData[1]!== this.state.loginUser ? 
                        <Button variant="contained"  onClick={(event) => { this.handleSubmit(tableMeta.rowData[0], tableMeta.rowData[1], tableMeta.rowData[7] ? "DELETE":"ACTIVE" )}} color={tableMeta.rowData[7] ? "":'primary'} aria-label="edit" style={{ width: '170px',marginLeft:'-13%', marginBottom: '4%', marginTop: '4%' }}>
                            {tableMeta.rowData[7] ?  "Deactivate": "Activate" }
                        </Button> :''}
                              </div>   
                        );
                    }

                }
            }
        }

        
        ];

        const options = {
            filterType: 'checkbox',
            download: false,
            print: false,
            fixedHeader: true,
            filter: false,
            selectableRows: 'none',
            rowsPerPage : 10,
            
            onRowClick: rowData => this.handleClick(rowData)
        };

        console.log("user",this.state.user)
            const val = this.state.openValue? 8 : 12
        return (
            <div>
                
                <Fab variant="extended" color="secondary" aria-label="Add" style={{  marginLeft :this.state.newUser ? "1":"-2.5%" ,marginTop: '1%' }} onClick={() => this.handleClick([])}>
                    <AddIcon /> Add User
                </Fab>
                <Grid container spacing={24} style={{ padding: 24 }}>
          <Grid item xs={val} sm={val} lg={val} xl={val}>
                <div style={{ marginLeft:val==8 ? '-6%': '-4%', marginRight: '3%', marginTop: '10px' }}>
                    <MUIDataTable title={"User Management"} data={this.state.userList} columns={columns} options={options} />
                </div>
                </Grid>
                <Grid item xs={4} sm={4} lg={4} xl={4}>
                
                <UserUpdate userDetails={this.state.user} openValue={this.state.openValue} handleCancel={this.handleCancel} newUser= {this.state.newUser}/>
                
                </Grid>
                
                </Grid>

                {this.state.open &&
                <DeleteUser value={this.state.value} name={this.state.name} handleClickOpen= {this.handleClickOpen} open={this.state.open} status={this.state.status}/>
                }
               

                {this.state.snack && this.state.message &&
                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={this.state.snack} onClose={this.handleClose} autoHideDuration={3000} >
                        <MySnackbarContentWrapper
                            onClose={this.handleClose}
                            variant="success"
                            message={this.state.message} />
                    </Snackbar>
                }
            </div>

        );
    }
}

const mapStateToProps = state => ({
    user: state.login,
    apistatus: state.apistatus,
    userList: state.userList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    APITransport,
    CreateCorpus: APITransport,
}, dispatch);


export default withRouter((connect(mapStateToProps, mapDispatchToProps)(UserDirectory)));
