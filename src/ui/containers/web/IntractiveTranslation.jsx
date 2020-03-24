import React from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import FetchModel from "../../../flux/actions/apis/fetchmodel";
import FetchLanguage from "../../../flux/actions/apis/fetchlanguage";
import Select from "../../components/web/common/Select";
import NMT from "../../../flux/actions/apis/nmt";
import AutoML from "../../../flux/actions/apis/auto_ml";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import NewOrders from "../../components/web/dashboard/NewOrders";
import { translate } from "../../../assets/localisation";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      edit: false,
      apiCalled: false,
      autoMlText: "",
      nmtText: [],
      nmtTextSP: [],
      tocken: false,
      source: "",
      target: "",
      modelLanguage: [],
      language: [],
      model: [],
      showSplitted: false
    };
  }

  componentDidMount() {
    this.setState({
      autoMlText: "",
      nmtText: [],
      nmtTextSP: []
    });

    const { APITransport } = this.props;
    const apiObj = new FetchLanguage();
    APITransport(apiObj);
    this.setState({ showLoader: true });
    const apiModel = new FetchModel();
    APITransport(apiModel);
    this.setState({ showLoader: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.automl !== this.props.automl) {
      if (this.props.automl.text && this.props.automl.text.message === "Daily Limit Exceeded") {
        this.setState({
          autoMlText: this.props.automl.text.message
        });
      } else {
        this.setState({
          autoMlText: this.props.automl.text
        });
      }
    }

    if (prevProps.nmt !== this.props.nmt) {
      this.setState({
        nmtText: this.props.nmt,
        update: true
      });
    }

    if (prevProps.nmtsp !== this.props.nmtsp) {
      this.setState({
        nmtTextSP: this.props.nmtsp.text
      });
    }

    if (prevProps.supportLanguage !== this.props.supportLanguage) {
      this.setState({
        language: this.props.supportLanguage
      });
    }

    if (prevProps.langModel !== this.props.langModel) {
      this.setState({
        modelLanguage: this.props.langModel
      });
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleClear() {
    this.setState({
      text: "",
      nmtText: "",
      autoMlText: "",
      source: "",
      target: "",
      model: [],
      update: false,
      edit: false
    });
  }

  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value, model: [] });
  };

  handleSource(modelLanguage, supportLanguage) {
    const result = [];
    modelLanguage.map(item => supportLanguage.map(value => (item.source_language_code === value.language_code ? result.push(value) : null)));
    const value = new Set(result);
    const source_language = [...value];
    return source_language;
  }

  handleTarget(modelLanguage, supportLanguage, sourceLanguage) {
    const result = [];
    modelLanguage.map(item => {
      item.source_language_code === sourceLanguage &&
        supportLanguage.map(value => (item.target_language_code === value.language_code ? result.push(value) : null));
      return true;
    });
    const value = new Set(result);
    const target_language = [...value];
    return target_language;
  }

  handleSubmit(role) {
    const model = [];
    const { APITransport, NMTApi } = this.props;
    this.state.modelLanguage.map(item =>
      item.target_language_code === this.state.target && item.source_language_code === this.state.source && model.length < 1 && item.is_primary
        ? model.push(item)
        : []
    );
    const apiObj = new AutoML(this.state.text, this.state.source, this.state.target);
    const nmt = new NMT(this.state.text, model, true, this.state.target, this.state.showSplitted);
    if (!this.state.update && !this.state.edit) {
      NMTApi(nmt);
      this.setState({
        autoMlText: "",
        nmtText: "",
        apiCalled: true
      });
    } else if (this.state.update && !this.state.edit) {
      this.setState({
        edit: true,
        update: false
      });
    } else if (this.state.edit) {
      alert("Api is in progress");
    }
  }

  handleUpdate() {
    this.setState({
      edit: true
    });
  }

  render() {
    const role = JSON.parse(localStorage.getItem("roles"));
    return (
      <div>
        <Paper style={{ marginLeft: "25%", width: "50%", marginTop: "4%" }}>
          <Typography variant="h5" style={{ color: darkBlack, background: blueGrey50, paddingLeft: "40%", paddingBottom: "12px", paddingTop: "8px" }}>
            {translate("dashboard.page.heading.title")}
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={2} sm={4} lg={8} xl={8}>
              <Typography value="" variant="title" gutterBottom style={{ marginLeft: "12%", paddingTop: "9.5%" }}>
                {translate("common.page.label.sourceLang")}{" "}
              </Typography>
            </Grid>

            <Grid item xs={1} sm={2} lg={4} xl={4}>
              <br />
              <br />
              <Select
                id="outlined-age-simple"
                selectValue="language_code"
                MenuItemValues={this.handleSource(this.state.modelLanguage, this.state.language)}
                handleChange={this.handleSelectChange}
                value={this.state.source}
                name="source"
                style={{ marginRight: "30%", marginBottom: "5%", marginTop: "4%" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={2} sm={4} lg={8} xl={8}>
              <Typography value="" variant="title" gutterBottom style={{ marginLeft: "12%", paddingTop: "9.5%" }}>
                {translate("common.page.label.targetLang")}&nbsp;
              </Typography>
            </Grid>
            <Grid item xs={1} sm={2} lg={4} xl={4}>
              <br />
              <br />
              <Select
                id="outlined-age-simple"
                selectValue="language_code"
                MenuItemValues={this.state.source ? this.handleTarget(this.state.modelLanguage, this.state.language, this.state.source) : []}
                handleChange={this.handleSelectChange}
                value={this.state.target}
                name="target"
                style={{ marginRight: "30%", marginBottom: "5%", marginTop: "4%", marginLeft: "10%" }}
              />
            </Grid>
          </Grid>

          <div style={{ marginLeft: "5%" }}>
            <Grid container spacing={24} style={{ padding: 24 }}>
              <Grid item xs={12} sm={12} lg={12} xl={12}>
                <div>
                  <textarea
                    style={{ width: "85%", padding: "2%", fontFamily: '"Source Sans Pro", "Arial", sans-serif', fontSize: "21px" }}
                    className="noter-text-area"
                    rows="3"
                    value={this.state.text}
                    placeholder="Enter sentence here"
                    cols="50"
                    onChange={event => {
                      this.handleTextChange("text", event);
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          {this.state.edit && (
            <div style={{ marginLeft: "5%" }}>
              <Grid container spacing={24} style={{ padding: 24 }}>
                <Grid item xs={12} sm={12} lg={12} xl={12}>
                  <div>
                    <textarea
                      style={{ width: "85%", padding: "2%", fontFamily: '"Source Sans Pro", "Arial", sans-serif', fontSize: "21px" }}
                      className="noter-text-area"
                      rows="3"
                      value={this.state.translateText}
                      placeholder="Enter correct sentence"
                      cols="50"
                      onChange={event => {
                        this.handleTextChange("translateText", event);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          )}
          {this.state.nmtText[0] && (
            <div>
              <NewOrders title={translate("dashbord.page.title.anuvaadModel")} data={this.state.nmtText}/>
            </div>
          )}

          <Grid container spacing={24} style={{ padding: 24 }}>
            <Grid item xs={6} sm={6} lg={6} xl={6}>
              <Button
                variant="contained"
                onClick={this.handleClear.bind(this)}
                color="primary"
                aria-label="edit"
                style={{ marginLeft: "10%", width: "80%", marginBottom: "4%", marginTop: "4%", marginRight: "5%" }}
              >
                {translate("common.page.button.clear")}
              </Button>
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6}>
              <Button
                variant="contained"
                onClick={this.handleSubmit.bind(this, role)}
                color="primary"
                aria-label="edit"
                style={{ width: "80%", marginBottom: "4%", marginTop: "4%" }}
              >
                {this.state.update ? "Edit" : this.state.edit ? translate("common.page.button.save") : translate("common.page.button.submit")}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  automl: state.automl,
  nmt: state.nmt,
  nmtsp: state.nmtsp,
  supportLanguage: state.supportLanguage,
  langModel: state.langModel
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      APITransport,
      NMTApi: APITransport,
      NMTSPApi: APITransport,
      MODELApi: APITransport
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
