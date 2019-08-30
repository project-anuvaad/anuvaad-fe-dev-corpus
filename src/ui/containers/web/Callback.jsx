import React from "react";
import { withRouter } from "react-router-dom";
import history from "../../../web.history";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import UserAuth from "../../../flux/actions/apis/userprofile";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


class Callback extends React.Component {

    componentDidUpdate(prevProps){
        if(prevProps.userProfile !==this.props.userProfile){
            if (this.props.userProfile.isActive) {
                localStorage.setItem('userDetails', this.props.userProfile.firstname + ' ' + this.props.userProfile.lastname)
                localStorage.setItem('userProfile', JSON.stringify(this.props.userProfile))
                if (this.props.userProfile.roles === null) {
                  localStorage.setItem("roles", JSON.stringify(["editor"]))
                }
                else {
                  localStorage.setItem("roles", JSON.stringify(this.props.userProfile.roles))
                }
                history.push(`${process.env.PUBLIC_URL}/corpus`)
              }
        }
    }

    componentDidMount() {
        let hash = this.props.location.hash.split('&')
        console.log("hash",hash)
        hash.map((h) => {
            if (h.indexOf('access_token') > 0) {
                localStorage.setItem('token', h.split('access_token=')[1])
                let api = new UserAuth()
                this.props.APITransport(api);
                // history.push(`${process.env.PUBLIC_URL}/corpus`)
            }
            else if (h.indexOf('error') > 0) {
                localStorage.removeItem('token')
                history.push(`${process.env.PUBLIC_URL}/logout`)
            }
        })
    }

    render() {
        return (
            <div>Redirecting Please wait..</div>
        );
    }
}

const mapStateToProps = state => ({
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
  )((Callback));
