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
     
     
      tgt:'',
      model:  [
        {
          model_id: "56"
        }
      ],
      message: translate("intractive_translate.page.snackbar.message"),
      index:0
    };
  }


  handleSentence(index,val){
      console.log(index)
      if(index<0){
          alert("this is first sentence")

      }
      else if(index>this.props.sentences.length){
        alert("finished")
      }else{
        const apiObj1 = new IntractiveApi(
            this.props.sentences[index].text,
          "",
         this.state.model
        );
       this.props.APITransport(apiObj1);
        this.setState({
            text: this.props.sentences[index].text,
          
          index:val ?index+1: index,
          
        });
    

      }
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.intractiveTrans !== this.props.intractiveTrans) {
      console.log(this.props.intractiveTrans);
      this.setState({
        nmtText: this.props.intractiveTrans,
        disable: false,
        tgt : this.state.intractiveTrans && this.state.intractiveTrans.length>0 && this.state.intractiveTrans[0]
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
    console.log("vallll---", value);
    const temp = value.split(" ");
    const tagged_tgt = this.state.nmtText[0].tagged_tgt.split(" ");
    const tagged_src = this.state.nmtText[0].tagged_src.split(" ");
    const tgt = this.state.nmtText[0].tgt.split(" ");
    const src = this.state.text && this.state.text.split(" ");
    const resultArray = [];
    let index;

    temp.map(item => {
      if (item !== " ") {
        const ind = tgt.indexOf(item, resultArray.length);
        console.log(item);
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
          console.log(src_ind, index);
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
    console.log(event);
    if (event.keyCode === 9) {
      if (this.state.disable && this.state.translateText) {
        const apiObj = new IntractiveApi(this.state.text, this.handleCalc(event.target.value), this.state.model);
        this.props.APITransport(apiObj);
        this.setState({ disable: false });
      } else {
        let temp;
        const prefix = this.state.nmtText[0] && this.state.nmtText[0].tgt.split(" ");
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

  handleTextChange(key, event) {
    const space = event.target.value.endsWith(" ");
    if (this.state.nmtText[0] && space) {
      if (this.state.nmtText[0].tgt.startsWith(event.target.value) && this.state.nmtText[0].tgt.includes(event.target.value, 0)) {
      } else {
        const res = this.handleCalc(event.target.value);
        const apiObj = new IntractiveApi(this.state.text, res, this.state.model);
        this.props.APITransport(apiObj);
        this.focusDiv("blur");
        this.setState({
          disable: true
        });
      }
    }

    if (!event.target.value) {
      console.log("test");
      const apiObj = new IntractiveApi(this.state.text, event.target.value, this.state.model);
      this.props.APITransport(apiObj);
      this.focusDiv("blur");
    }
    this.setState({
      [key]: event.target.value,
      disable: true
    });
  }

  render() {
      console.log(this.props.sentences&&this.props.sentences[0]&&this.state.index===0&&this.props.sentences[0])
    this.props.sentences &&this.state.index===0&& this.handleSentence(0, true)
    return (
      <Paper elevation={2} style={{ height: "100%", paddingBottom: "10px" }}>
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
            value={this.state.nmtText &&this.state.nmtText[0] && this.state.nmtText[0].tgt}
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
            onChange={event => {
              this.handleTextChange("translateText", event);
            }}
            onKeyDown={this.keyPress.bind(this)}
          />
        </div>
        <Grid container spacing={2} style={{ marginLeft: "5%" }}>
          <Grid item xs={4} sm={4} lg={4} xl={4}>
            <Button style={{ fontWeight:'bold',width:'100%'}} color="primary" onClick={event => {
              this.handleSentence(this.state.index-1,false);
            }}>
              {" "}
              <ChevronLeftIcon size="large" />
              &nbsp;Previous Line
            </Button>
          </Grid>
          <Grid item xs={3} sm={3} lg={3} xl={3}>
            <Button style={{ fontWeight:'bold',width:'100%'}} color="primary" onClick={event => {
              this.handleSentence(this.state.index-1,false);
            }}>
              {" "}
              
              &nbsp;save
            </Button>
          </Grid>
          <Grid item xs={3} sm={3} lg={4} xl={4}>
            <Button color="primary" onClick={event => {
              this.handleSentence(this.state.index+1,false);
            }} style={{ fontWeight:'bold',width:'100%'}}>
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
  intractiveTrans: state.intractiveTrans,
  

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
