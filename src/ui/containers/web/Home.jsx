import React from "react";
import CONFIG from '../../../configs/apigw'

class Home extends React.Component {
  state = {
    
    showLoader:false
  };
    componentDidMount(){
      this.setState({showLoader:true})
        window.location.href = CONFIG.BASE_URL+CONFIG.AUTH_ENDPOINT+'?'+CONFIG.RESPONSE_TYPE+'&'+CONFIG.CLIENT_ID+'&'+CONFIG.REDIRECT_URI+'&'+CONFIG.RETURN_TO
    }

  render() {
    return (
      <div>Redirecting Please wait..</div>
    );
  }
}


export default Home;
