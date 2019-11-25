import React from "react";
import CONFIG from "../../../configs/apigw";
import history from "../../../web.history";

class Home extends React.Component {
  state = {
    showLoader: false
  };
  componentDidMount() {
    this.setState({ showLoader: true });
    history.push(`${process.env.PUBLIC_URL}/callback`)
  }

  render() {
    return <div>Redirecting Please wait..</div>;
  }
}

export default Home;
