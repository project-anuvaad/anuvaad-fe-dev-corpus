import React from "react";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../../components/web/common/Header";
import GlobalStyles from "../../styles/web/styles";
import Spinner from "../../components/web/common/Spinner";
// import Theme from "../../theme/web/theme-red";
import Theme from '../../theme/web/theme-default';
import APITransport from "../../../flux/actions/apitransport/apitransport";
import history from "../../../web.history";
import UserAuth from "../../../flux/actions/apis/userprofile";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        userName: '',
    }}
 
  renderSpinner() {
    if (this.props.apistatus.progress) {
      return <Spinner />;
    }
  }

  componentDidMount() {
    console.log('layout')
        let api = new UserAuth()
        this.props.APITransport(api);
    

}

  componentDidUpdate(prevProps){
    
    if(prevProps.apistatus !== this.props.apistatus){
      if(this.props.apistatus.unauthrized){
        history.push("/logout")
      }
    }

    if(prevProps.userProfile !== this.props.userProfile){
      if(this.props.userProfile.isActive)
      localStorage.setItem('userDetails',this.props.userProfile.firstname+' '+this.props.userProfile.lastname)
      localStorage.setItem('userProfile',JSON.stringify(this.props.userProfile))
      if(this.props.userProfile.roles===null){
        localStorage.setItem("roles",JSON.stringify(["editor"]))
      }
       else{
        localStorage.setItem("roles",JSON.stringify(this.props.userProfile.roles))
       }
      this.setState({userName: localStorage.getItem('userDetails')})
    }
    
  }

  render() {
    const { classes, theme, title} = this.props;
    
    const Component = this.props.component; // eslint-disable-line
    return (
      
      <MuiThemeProvider theme={Theme}>
        {this.state.userName&&
        <div className={classes.root}>
        {this.renderSpinner()}
        
          <Header classes={classes} theme={theme} title={title} />
          <div className={classes.container}>

            <Component />
          </div>
          
        
        </div>}
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  userProfile:state.userProfile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(GlobalStyles(Theme), { withTheme: true })(App));
