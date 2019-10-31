import React, {Component} from 'react'
import AppBarButton from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
class AppBar extends Component{


    render(){
        var {base}=this.props
        return (
<AppBarButton position="static" >
                <Toolbar>
                <Typography variant="h6" color="inherit" style={{marginLeft: "5%",  flex: 1 }}>
                    Total Sentence : {this.props.count}
                  </Typography>
                  <Typography variant="h6" color="inherit" style={{ marginRight: "20%", flex: 1 }}>
                    Number of sentence pending : {this.props.pending}
                  </Typography>
                </Toolbar>
              </AppBarButton>

        )}}



export default AppBar;