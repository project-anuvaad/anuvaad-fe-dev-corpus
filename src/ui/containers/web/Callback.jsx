import React from "react";
import { withRouter } from "react-router-dom";
import history from "../../../web.history";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import UserAuth from "../../../flux/actions/apis/userprofile";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { translate } from '../../../assets/localisation';

class Callback extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.userProfile !== this.props.userProfile) {
      if (this.props.userProfile.isActive) {
        localStorage.setItem("userDetails", this.props.userProfile.firstname + " " + this.props.userProfile.lastname);
        localStorage.setItem("userProfile", JSON.stringify(this.props.userProfile));
        if (this.props.userProfile.roles === null) {
          localStorage.setItem("roles", JSON.stringify(["editor"]));
        } else {
          localStorage.setItem("roles", JSON.stringify(this.props.userProfile.roles));
        }
        var role = JSON.parse(localStorage.getItem('roles'));
        if (role && Array.isArray(role) && role.includes('analyzer')) {
          history.push(`${process.env.PUBLIC_URL}/benchmarktranslate`);
        }
        else if (role && Array.isArray(role) && role.includes('admin')) {
          history.push(`${process.env.PUBLIC_URL}/comparison-report`);
        }
        else if (role && Array.isArray(role) && role.includes('user')) {
          history.push(`${process.env.PUBLIC_URL}/translate`);
        }
        else {
          history.push(`${process.env.PUBLIC_URL}/dashboard`);
        }
      }
    }
  }

  componentDidMount() {
    let hash = this.props.location.hash.split("&");
    hash.map(h => {
      if (h.indexOf("access_token") > 0) {
        localStorage.setItem("token", h.split("access_token=")[1]);
        let api = new UserAuth();
        this.props.APITransport(api);
        // history.push(`${process.env.PUBLIC_URL}/corpus`)
      } else if (h.indexOf("error") > 0) {
        localStorage.removeItem("token");
        history.push(`${process.env.PUBLIC_URL}/logout`);
      }
    });
  }

  render() {
    return <div>{translate('common.page.text.rediecting')}</div>;
  }
}

const mapStateToProps = state => ({
  apistatus: state.apistatus,
  userProfile: state.userProfile
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
)(Callback);
