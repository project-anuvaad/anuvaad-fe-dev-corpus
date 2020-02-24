import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Avatar, { ConfigProvider } from "react-avatar";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core";
import history from "../../../web.history";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import { translate } from "../../../assets/localisation";

const styles = {
  card: {
    width: "345px",
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.1)"
    }
  }
};

class DataPipeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 2,
      tools: [translate('dataPipeLine.page.tool.stage1'),translate('dataPipeLine.page.tool.stage2') ,translate('dataPipeLine.page.tool.stage3') ,translate('dataPipeLine.page.tool.stage4') ,translate('dataPipeLine.page.tool.stage5') , translate('dataPipeLine.page.tool.stage6'),translate('dataPipeLine.page.tool.stage7') ,translate('dataPipeLine.page.tool.stage8') ,translate('dataPipeLine.page.tool.stage9') ]
    };
  }

  handleClick = value => {
    if (value === translate('dataPipeLine.page.tool.stage1')) {
      history.push(`${process.env.PUBLIC_URL}/existing-workspace`);
    } else if (value === translate('dataPipeLine.page.tool.stage2')) {
      history.push(`${process.env.PUBLIC_URL}/stage2/existing-workspace`);
    } else if (value === translate('dataPipeLine.page.tool.stage3')) {
      history.push(`${process.env.PUBLIC_URL}/stage3/existing-workspace`);
    } else if (value === translate('dataPipeLine.page.tool.stage4')) {
      history.push(`${process.env.PUBLIC_URL}/stage4/existing-workspace`);
    } else {
      alert(translate("common.page.label.stillinprogress"));
    }
  };

  handleDataClick = value => {
    if (value === translate('dataPipeLine.page.tool.stage1')) {
      history.push(`${process.env.PUBLIC_URL}/datasource`);
    } else if (value === translate('dataPipeLine.page.tool.stage2')) {
      history.push(`${process.env.PUBLIC_URL}/stage2/datasource`);
    } else if (value === translate('dataPipeLine.page.tool.stage3')) {
      history.push(`${process.env.PUBLIC_URL}/stage3/datasource`);
    } else if (value === translate('dataPipeLine.page.tool.stage4')) {
      history.push(`${process.env.PUBLIC_URL}/stage4/datasource`);
    } else {
      alert(translate("common.page.label.stillinprogress"));
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={8}>
          <Grid container item xs={12} spacing={8} id="cardGrid" style={{ marginLeft: "8%", marginTop: "2%" }}>
            <React.Fragment>
              {this.state.tools.map((text, index) => (
                <Grid key={index} item xs={12} sm={4} className="slideUp" style={{ marginTop: "2%" }}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography variant="h5" component="h2" color="textSecondary" gutterBottom>
                        {text}
                      </Typography>
                      <ConfigProvider colors={["green", "green"]}>
                        <Avatar
                          onClick={() => {
                            this.handleDataClick(text);
                          }}
                          value={translate('datapipeline.page.label.datasource')}
                          size={150}
                          round="100px"
                          style={{ cursor: "pointer", styles }}
                        />
                      </ConfigProvider>
                      <ConfigProvider colors={["#003f5c", "#003f5c"]} style={{ marginLeft: "15px" }}>
                        <Avatar
                          onClick={() => {
                            this.handleClick(text);
                          }}
                          value= {translate('datapipeline.page.label.toolchain')}
                          size={150}
                          style={{ cursor: "pointer" }}
                        />
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

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(DataPipeline)));
