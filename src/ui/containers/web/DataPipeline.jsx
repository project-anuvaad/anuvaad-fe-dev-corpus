import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Avatar, { ConfigProvider } from "react-avatar";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import history from "../../../web.history";
import APITransport from "../../../flux/actions/apitransport/apitransport";

class DataPipeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 2,
      tools:["Stage 1","Stage 2","Stage 3","Stage 4","Stage 5","Stage 6","Stage 7","Stage 8","Stage 9"]
    };
  }

  handleClick = (value) => {
      console.log(value)
    if(value=="Stage 1"){
    history.push(`${process.env.PUBLIC_URL}/existing-workspace`);
    }
    else{

        alert("Still inprogress")
    }
  };

  render() {
    return (
      <div>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3} id="cardGrid" style={{ marginLeft: "8%", marginTop:'2%' }}>
            <React.Fragment>
            {this.state.tools.map((text, index) => (
                
              <Grid item xs={12} sm={4} className="slideUp" style={{ marginTop:'2%' }}>
                <Card style={{ width: "65%" }}>
                  <CardContent>
                    <Typography variant="h5" component="h2" color="textSecondary" gutterBottom>
                      {text}
                    </Typography>
                    <ConfigProvider colors={["green", "green"]}>
                      <Avatar onClick={() => { this.handleClick(text)}} value="DataSource" size={150} round="100px" />
                    </ConfigProvider>
                    <ConfigProvider colors={["#003f5c", "#003f5c"]} style={{ marginLeft: "15px" }}>
                      <Avatar onClick={() => { this.handleClick(text)}} value=" Toolchain " size={150} />
                    </ConfigProvider>
                  </CardContent>
                </Card>
              </Grid>
              
            ))}
            </React.Fragment>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  corpus: state.corpus
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      CreateCorpus: APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataPipeline));
