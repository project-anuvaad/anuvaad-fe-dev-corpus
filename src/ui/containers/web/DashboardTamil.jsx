import React from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NewOrders from "../../components/web/dashboard/NewOrders";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import AutoML from "../../../flux/actions/apis/auto_ml";
import NMT from "../../../flux/actions/apis/nmt";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { white, blueGrey50, darkBlack } from "material-ui/styles/colors";
import Select from "../../components/web/common/Select";
import FetchLanguage from "../../../flux/actions/apis/fetchlanguage";
import FetchModel from "../../../flux/actions/apis/fetchmodel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SelectModel from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TranslateSentence from "../../components/web/dashboard/TranslateSentence";
import Chip from "@material-ui/core/Chip";
import { Tooltip } from "@material-ui/core";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
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
      checkedMachine: false,
      checkedSubwords: false,
      showSplitted: false
    };
  }

  componentDidMount() {
    this.setState({
      autoMlText: "",
      nmtText: [],
      nmtTextSP: []
    });

    const { APITransport, MODELApi } = this.props;
    const apiObj = new FetchLanguage();
    APITransport(apiObj);
    this.setState({ showLoader: true });
    const apiModel = new FetchModel();
    APITransport(apiModel);
    this.setState({ showLoader: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.automl !== this.props.automl) {
      this.setState({
        autoMlText: this.props.automl.text
      });
    }

    if (prevProps.nmt !== this.props.nmt) {
      this.setState({
        nmtText: this.props.nmt
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
      checkedMachine: false,
      checkedSubwords: false,
      showSplitted: false
    });
  }

  handleSelectModelChange = event => {
    this.setState({ model: event.target.value });
  };

  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value, model: [] });
  };

  handleSource(modelLanguage, supportLanguage) {
    var result = [];
    modelLanguage.map(item => supportLanguage.map(value => (item.source_language_code === value.language_code ? result.push(value) : null)));
    var value = new Set(result);
    var source_language = [...value];
    return source_language;
  }

  handleTarget(modelLanguage, supportLanguage, sourceLanguage) {
    var result = [];
    modelLanguage.map(item => {
      item.source_language_code === sourceLanguage
        ? supportLanguage.map(value => (item.target_language_code === value.language_code ? result.push(value) : null))
        : "";
    });
    var value = new Set(result);
    var target_language = [...value];
    return target_language;
  }

  handleModel(modelLanguage, source, target) {
    var result = [];
    modelLanguage.map(item => {
      item.source_language_code === source && item.target_language_code === target ? result.push(item) : null;
    });
    return result;
  }

  handleDelete = data => () => {
    this.setState(state => {
      const chipData = [...state.model];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      this.setState({ model: chipData });
    });
  };

  handleSubmit(role) {
    var model = [];
    const { APITransport, NMTApi } = this.props;
    role.includes("dev")
      ? this.state.modelLanguage.map(item =>
          item.target_language_code === this.state.target &&
          item.source_language_code === this.state.source &&
          this.state.model.includes(item.model_name)
            ? model.push(item)
            : []
        )
      : this.state.modelLanguage.map(item =>
          item.target_language_code === this.state.target && item.source_language_code === this.state.source && model.length < 1 && item.is_primary
            ? model.push(item)
            : []
        );
    const apiObj = new AutoML(this.state.text, this.state.source, this.state.target);
    const nmt = new NMT(this.state.text, model, true, this.state.target, this.state.showSplitted);
    NMTApi(nmt);
    this.state.checkedMachine ? APITransport(apiObj) : "";
    this.setState({
      showLoader: true,
      autoMlText: "",
      nmtText: "",
      apiCalled: true
    });
  }

  render() {
    var role = JSON.parse(localStorage.getItem("roles"));
    return (
      <div>
        <Paper style={{ marginLeft: "25%", width: "50%", marginTop: "4%" }}>
          <Typography variant="h5" style={{ color: darkBlack, background: blueGrey50, paddingLeft: "40%", paddingBottom: "12px", paddingTop: "8px" }}>
            Translate
          </Typography>
          <Grid container spacing={8}>
            <Grid item xs={8} sm={8} lg={8} xl={8}>
              <Typography value="" variant="title" gutterBottom={true} style={{ marginLeft: "12%", paddingTop: "9.5%" }}>
                Please select source language{" "}
              </Typography>
            </Grid>

            <Grid item xs={3} sm={3} lg={3} xl={3}>
              <br />
              <br />
              <Select
                id={"outlined-age-simple"}
                selectValue="language_code"
                MenuItemValues={this.handleSource(this.state.modelLanguage, this.state.language)}
                handleChange={this.handleSelectChange}
                value={this.state.source}
                name="source"
                style={{ marginRight: "30%", marginBottom: "5%", marginTop: "4%" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={8}>
            <Grid item xs={8} sm={8} lg={8} xl={8}>
              <Typography value="" variant="title" gutterBottom={true} style={{ marginLeft: "12%", paddingTop: "9.5%" }}>
                Please select target language &nbsp;
              </Typography>
            </Grid>
            <Grid item xs={3} sm={3} lg={3} xl={3}>
              <br />
              <br />
              <Select
                id={"outlined-age-simple"}
                selectValue="language_code"
                MenuItemValues={this.state.source ? this.handleTarget(this.state.modelLanguage, this.state.language, this.state.source) : []}
                handleChange={this.handleSelectChange}
                value={this.state.target}
                name="target"
                style={{ marginRight: "30%", marginBottom: "5%", marginTop: "4%", marginLeft: "10%" }}
              />
            </Grid>
          </Grid>
          {role.includes("dev") && (
            <Grid container spacing={8}>
              <Grid item xs={8} sm={8} lg={8} xl={8}>
                <Typography value="" variant="title" gutterBottom={true} style={{ marginLeft: "12%", paddingTop: "9.5%" }}>
                  Please select model{" "}
                </Typography>
              </Grid>
              <Grid item xs={3} sm={3} lg={3} xl={3}>
                <br />
                <br />

                <SelectModel
                  id="select-multiple-chip"
                  multiple={true}
                  style={{ minWidth: 160, align: "right", maxWidth: 160 }}
                  value={this.state.model}
                  onChange={this.handleSelectModelChange}
                  renderValue={selected => selected.join(", ")}
                  input={<OutlinedInput name={this.state.model} id="select-multiple-checkbox" />}
                >
                  {this.state.source && this.state.target
                    ? this.handleModel(this.state.modelLanguage, this.state.source, this.state.target).map(item => (
                        <Tooltip
                          placement="right"
                          enterDelay={200}
                          key={item.model_id}
                          value={item.model_name}
                          title={item.description ? item.description : "NA"}
                        >
                          <MenuItem key={item.model_id} value={item.model_name}>
                            {item.model_name}
                          </MenuItem>
                        </Tooltip>
                      ))
                    : []}
                  >
                </SelectModel>
                <br />
              </Grid>
              {role.includes("dev") && (
                <div style={{ marginLeft: "8%", paddingTop: "10px" }}>
                  {this.state.model.map(value => (
                    <Chip key={value} label={value} onDelete={this.handleDelete(value)} style={{ marginLeft: "5px", marginTop: "8px" }} />
                  ))}
                </div>
              )}
            </Grid>
          )}
          <div style={{ marginLeft: "40px" }}>
            <Grid container spacing={24} style={{ padding: 24 }}>
              <Grid item xs={12} sm={12} lg={12} xl={12}>
                <TextField
                  value={this.state.text}
                  id="standard-multiline-static"
                  placeholder="Enter Text Here ......"
                  style={{ width: "96%" }}
                  multiline
                  onChange={event => {
                    this.handleTextChange("text", event);
                  }}
                />
              </Grid>

              <FormControlLabel
                style={{ marginLeft: "0%", width: role.includes("dev") ? "26%" : "60%", marginRight: "5%" }}
                control={
                  <Checkbox
                    color="default"
                    checked={this.state.checkedMachine}
                    value="checkedMachine"
                    onChange={this.handleChange("checkedMachine")}
                  />
                }
                label="Machine Translated"
              />
              {role.includes("dev") && (
                <FormControlLabel
                  style={{ marginLeft: "0%", width: "23%", marginRight: "5%" }}
                  control={
                    <Checkbox color="default" checked={this.state.showSplitted} value="showSplitted" onChange={this.handleChange("showSplitted")} />
                  }
                  label="Show , splitted"
                />
              )}
              {role.includes("dev") && (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="default"
                      checked={this.state.checkedSubwords}
                      value="checkedSubwords"
                      onChange={this.handleChange("checkedSubwords")}
                    />
                  }
                  label="Input and Output Subwords"
                />
              )}

              <Button
                variant="contained"
                onClick={this.handleClear.bind(this)}
                color="primary"
                aria-label="edit"
                style={{ marginLeft: "1.3%", width: "44%", marginBottom: "4%", marginTop: "4%", marginRight: "5%" }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                onClick={this.handleSubmit.bind(this, role)}
                color="primary"
                aria-label="edit"
                style={{ width: "44%", marginBottom: "4%", marginTop: "4%" }}
              >
                Submit
              </Button>
            </Grid>
          </div>
          {this.state.nmtText[0] && (
            <div>
              <NewOrders title="Anuvaad Model" data={this.state.nmtText} status={this.state.checkedSubwords} />
            </div>
          )}
          {this.state.checkedMachine && this.state.autoMlText && this.state.nmtText && (
            <TranslateSentence title="Machine Translated" data={this.state.autoMlText} />
          )}
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
