import React from "react";
import CONFIG from "../../../configs/apigw";
import { translate } from '../../../assets/localisation';
class Home extends React.Component {
  state = {
    showLoader: false
  };
  componentDidMount() {
    this.setState({ showLoader: true });
    window.location.href =
      CONFIG.BASE_URL +
      CONFIG.AUTH_ENDPOINT +
      "?" +
      CONFIG.RESPONSE_TYPE +
      "&" +
      CONFIG.CLIENT_ID +
      "&" +
      CONFIG.REDIRECT_URI +
      "&" +
      CONFIG.RETURN_TO;
  }

  render() {
    return <div>{translate('common.page.text.rediecting')}</div>;
  }
}

export default Home;
