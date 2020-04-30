import React from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { blueGrey50, darkBlack } from "material-ui/styles/colors";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { translate } from "../../../../assets/localisation";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import IntractiveApi from "../../../../flux/actions/apis/intractive_translate";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      tgt: "",
      model: [
        {
          model_id: "56"
        }
      ],
      target:'',
      translateText:'',
      message: translate("intractive_translate.page.snackbar.message"),
      index: 0,
      i: 0,
      token: true
    };
  }

  handleSentence(value, token) {

    console.log("tid-----",this.state.submittedId)
    const splitValue = this.state.submittedId && this.state.submittedId.split("_");
    this.props.sentences &&
      this.props.sentences.length > 0 &&
      this.props.sentences.map((sentence, index) => {
        if (splitValue[0] === sentence._id) {
          console.log("val---", this.props.sentences[index]);
          if (
            (sentence.tokenized_sentences.length === 1 && Number(splitValue[1]) === 0) ||
            (Number(splitValue[1]) === 0 && value === -1) ||
            (Number(splitValue[1]) === sentence.tokenized_sentences.length - 1 && value> 0)
          ) {
            const val = `${this.props.sentences[index + value]._id  }_${  this.props.sentences[index + value].tokenized_sentences[0].sentence_index}`;
            
              !this.state.clickedSentence && this.props.handleSenetenceOnClick(val,false);


            
            this.setState({
              target: this.props.sentences[index + value].tokenized_sentences[0].target,
              source: this.props.sentences[index + value].tokenized_sentences[0].src,
              taggedSource:this.props.sentences[index + value].tokenized_sentences[0].tagged_src,
              taggedTarget:this.props.sentences[index + value].tokenized_sentences[0].tagged_tgt,
              translateText:'',
              clickedSentence: false
            });
          } else if (sentence.tokenized_sentences.length >= splitValue[1] && splitValue[1] >= 0) {
            const ind = Number(splitValue[1]) + value;

            console.log("index-----",ind)

            const val = `${this.props.sentences[index]._id  }_${  this.props.sentences[index].tokenized_sentences[ind].sentence_index}`;
              !this.state.clickedSentence && this.props.handleSenetenceOnClick(val,false);
              console.log("sajishsssss")
            this.setState({
              target: this.props.sentences[index].tokenized_sentences[ind].target,
              source: this.props.sentences[index].tokenized_sentences[ind].src,
              taggedSource:this.props.sentences[index].tokenized_sentences[ind].tagged_src,
              taggedTarget:this.props.sentences[index].tokenized_sentences[ind].tagged_tgt,
              token: false,
              translateText:'',
              clickedSentence:false
            });
          }
        }
      });
  }

  handleUpdate(){
    
  }

  handleSubmit() {
    let res = "";
    const { APITransport } = this.props;

    if (this.state.translateText) {
      res = this.handleCalc(this.state.translateText);
    }
    const apiObj = new IntractiveApi(this.state.source, res, this.state.model);
    if (this.state.source && res) {
      APITransport(apiObj);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.intractiveTrans !== this.props.intractiveTrans) {
      console.log("-------------",this.props.intractiveTrans)
      this.setState({
        disable: false,
        token: false,
        target: this.props.intractiveTrans && this.props.intractiveTrans.length > 0 && this.props.intractiveTrans[0].tgt,
        taggedSource:this.props.intractiveTrans && this.props.intractiveTrans.length > 0 && this.props.intractiveTrans[0].tagged_src,
              taggedTarget:this.props.intractiveTrans && this.props.intractiveTrans.length > 0 && this.props.intractiveTrans[0].tagged_tgt,
       
      });
      this.focusDiv("focus");
    }
  }

  focusDiv(val) {
    if (val === "focus") {
      this.textInput.focus();
    } else {
      this.textInput.blur();
    }
  }

  handleCalc(value) {
    const temp = value.split(" ");
    const tagged_tgt = this.state.taggedTarget.split(" ");
    const tagged_src = this.state.taggedSource.split(" ");


    const tgt = this.state.target && this.state.target.split(" ");
    const src = this.state.source && this.state.source.split(" ");
    const resultArray = [];
    let index;

    console.log("values",this.state.target)

    temp.map(item => {
      if (item !== " ") {
        const ind = tgt.indexOf(item, resultArray.length);
        const arr = [item, `${item},`, `${item}.`];
        let src_ind = -1;
        arr.map((el, i) => {
          if (src_ind === -1) {
            src_ind = src.indexOf(el);
            index = i;
          }
          return true;
        });
        if (ind !== -1) {
          resultArray.push(tagged_tgt[ind]);
        } else if (src_ind !== -1) {
          if (index > 0) {
            const tem = tagged_src[src_ind];
            resultArray.push(tem.slice(0, tem.length - 1));
          } else {
            resultArray.push(tagged_src[src_ind]);
          }
        } else {
          resultArray.push(item);
        }
      } else {
        resultArray.push(item);
      }
      return true;
    });
    return resultArray.join(" ");
  }

  keyPress(event) {
    if (event.keyCode === 9) {
      console.log("-----",event.keyCode)
      if (this.state.disable && this.state.translateText) {
        console.log("10",event.keyCode)
        const apiObj = new IntractiveApi(this.state.source, this.handleCalc(event.target.value), this.state.model);
        this.props.APITransport(apiObj);
        this.setState({ disable: false });
      } else {
        console.log("11",event.keyCode)
        let temp;
        const prefix = this.state.target && this.state.target.split(" ");
        const translate = this.state.translateText && this.state.translateText.split(" ");

        const result = translate && translate.filter(value => value !== "");
        if (prefix && result && prefix.length > result.length) {
          if (result[result.length - 1] !== " ") {
            result.push(prefix[result.length]);
          } else {
            result[result.length - 1] = prefix[result.length];
          }

          temp = result.join(" ");
          event.preventDefault();
        } else if (prefix && !result) {
          temp = prefix[0];
          event.preventDefault();
        }

        this.setState({
          translateText: temp,
          disable: false
        });
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.submittedId !== nextProps.submittedId) {
      return {
        sentenceId: nextProps.sentenceId,
        indexValue: nextProps.indexValue,
        blockData: nextProps.blockData,
        blockIndex: nextProps.blockIndex,
        submittedId: nextProps.submittedId,
        clickedSentence: nextProps.clickedSentence

      };
      
    }
    return null;
  }

  handleTextClick(test) {
    console.log("sajish");
  }

  handleTextChange(key, event) {
    const space = event.target.value.endsWith(" ");
    console.log("space",space)
    if (this.state.target && space) {
      if (this.state.target.startsWith(event.target.value) && this.state.target.includes(event.target.value, 0)) {
      } else {
        const res = this.handleCalc(event.target.value);
        const apiObj = new IntractiveApi(this.state.source, res, this.state.model);
        this.props.APITransport(apiObj);
        this.focusDiv("blur");
        this.setState({
          disable: true
        });
      }
    }

    if (!event.target.value) {
      console.log("test");
      const apiObj = new IntractiveApi(this.state.source, event.target.value, this.state.model);
      this.props.APITransport(apiObj);
      this.focusDiv("blur");
    }
    this.setState({
      [key]: event.target.value,
      disable: true
    });
  }

  render() {
    this.state.clickedSentence && this.handleSentence(0);
    return (
      <Paper elevation={2} style={{ height: "98%", paddingBottom: "10px" }}>
        <Typography value="" variant="h6" gutterBottom style={{ paddingTop: "10px", marginLeft: "4%" }}>
          Anuvaad Model
        </Typography>
        <div>
          <textarea
            style={{
              width: "87%",
              margin: "10px 10px 10px 4%",
              padding: "15px",
              height: "25vh",
              fontFamily: '"Source Sans Pro", "Arial", sans-serif',
              fontSize: "18px"
            }}
            className="noter-text-area"
            rows="10"
            disabled
            value={this.state.target}
            placeholder="select sentence from target or press next.."
            cols="50"
            onChange={event => {
              this.handleTextChange("translateText", event);
            }}
          />
        </div>
        <Typography value="" variant="h6" gutterBottom style={{ marginLeft: "4%" }}>
          Edit to update the anuvaad model memory
        </Typography>
        <div>
          <textarea
            style={{
              width: "87%",
              margin: "10px 10px 10px 4%",
              padding: "15px",
              height: "25vh",
              fontFamily: '"Source Sans Pro", "Arial", sans-serif',
              fontSize: "18px"
            }}
            className="noter-text-area"
            rows="10"
            value={this.state.translateText}
            ref={textarea => {
              this.textInput = textarea;
            }}
            placeholder="type here.."
            cols="50"
            onClick={event => {
              this.handleTextClick("clicked");
            }}
            onChange={event => {
              this.handleTextChange("translateText", event);
            }}
            onKeyDown={this.keyPress.bind(this)}
          />
        </div>
        <Grid container spacing={8} style={{ marginLeft: "5%" }}>
          <Grid item xs={4} sm={4} lg={4} xl={4}>
            <Button
              style={{ fontWeight: "bold", width: "100%" }}
              color="primary"
              disabled={(this.props.sentences[0]._id === this.state.submittedId.split("_")[0])}
              onClick={event => {
                this.handleSentence(-1);
              }}
            >
              {" "}
              <ChevronLeftIcon size="large" />
              &nbsp;Previous Line
            </Button>
          </Grid>
          <Grid item xs={3} sm={3} lg={3} xl={3}>
            <Button
              style={{ fontWeight: "bold", width: "100%" }}
              color="primary"
              onClick={event => {
                this.handleSubmit();
              }}
            >
              {" "}
              &nbsp;save
            </Button>
          </Grid>
          <Grid item xs={3} sm={3} lg={4} xl={4}>
            <Button
              color="primary"
              disabled={(this.props.sentences[this.props.sentences.length-1]._id === this.state.submittedId.split("_")[0])}
              onClick={event => {
                this.handleSentence(1);
              }}
              style={{ fontWeight: "bold", width: "100%" }}
            >
              Next Line&nbsp;
              <ChevronRightIcon size="large" />{" "}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  intractiveTrans: state.intractiveTrans
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Editor));
