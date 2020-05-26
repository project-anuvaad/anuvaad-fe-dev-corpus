import React from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import { translate } from "../../../../assets/localisation";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import IntractiveApi from "../../../../flux/actions/apis/intractive_translate";
import Dialog from "../../../components/web/common/SimpleDialog";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      tgt: "",
      checkedB: true,
      target: "",
      translateText: "",
      message: translate("intractive_translate.page.snackbar.message"),
      indexValue: 0,
      i: 0,
      apiToken: false,
      token: true, value: 0
    };
  }

  handleSuperSave(target, taggedTarget) {

    const splitValue = this.state.submittedId && this.state.submittedId.split("_");

    console.log("splitvalue",splitValue)
    const temp = this.state.scriptSentence;
    let value = []
    if (this.props.superScriptToken) {
      this.state.scriptSentence.map((sentence, index) => {
        if (splitValue[0] === sentence._id) {
          temp[index].tokenized_sentences.map((sentence,i) =>{
           
            if(sentence.sentence_index===Number(splitValue[1])){
              (sentence.target = `${this.state.superIndex} ${target}`);
              (sentence.tagged_tgt = taggedTarget);
            }
          })
          value = temp[index];
        }
        console.log(value)
        return true;
      });
    }
    this.setState({ scriptSentence: temp, apiToken: true });
    return value;

  }



  handleApiCall() {
    const temp = this.handleSuperSave(this.state.checkedB ? this.state.target : this.state.translateText, this.state.taggedTarget);
    if (this.state.checkedB) {
      this.handleSubmit();
    } else if (this.props.superScriptToken && this.state.superIndex) {
      this.props.handleScriptSave(this.state.translateText, this.state.superIndex);
      console.log("---",temp)
      this.props.hadleSentenceSave(false, temp);
      this.setState({ target: this.state.translateText })
    } else {
      this.props.handleSave(
        this.state.translateText,
        this.state.indexValue,
        this.state.submittedId,
        this.state.sentenceIndex,
        this.state.keyValue,
        this.state.cellValue,
        this.handleCalc(this.state.translateText)
      );

      this.setState({ target: this.state.value === 0 ? this.state.translateText : this.state.target, value: 0, apiToken: false })
      this.state.value !== 0 && this.handleSentence(this.state.value)

    }
    this.setState({
      targetDialog: this.state.checkedB ? this.state.target : this.state.translateText
    })
  }

  handleSwitchChange = () => {
    this.setState({ checkedB: !this.state.checkedB, sentences: [] });
  };

  handleSuperScript() {
    const splitValue = this.state.submittedId && this.state.submittedId.split("_");

    if (this.state.scriptSentence && Array.isArray(this.state.scriptSentence) && this.state.scriptSentence.length > 0) {
      this.state.scriptSentence.map((sentence, index) => {
        if (splitValue[0] === sentence._id) {
          const temp = sentence.tokenized_sentences[splitValue[1]];
          this.setState({
            clickedSentence: false,
            target: temp.target ? temp.target.substr(temp.target.indexOf(" ") + 1) : "",
            targetDialog: temp.target ? temp.target.substr(temp.target.indexOf(" ") + 1) : "",
            source: temp.src,
            superIndex: temp.target ? temp.target.substr(0, temp.target.indexOf(" ")) : "",
            taggedSource: temp.tagged_src,
            taggedTarget: temp.tagged_tgt,
            translateText: "",
            checkedB: true
          });
        }
        return true;
      });
    }
  }

  handleClose() {
    this.setState({
      open: false
    })
    this.handleSentence(this.state.value)
  }

  handleDialogSave() {
    this.setState({
      open: false
    })
    this.handleApiCall()
  }


  handleDialog(value) {

    if ((this.state.targetDialog !== this.state.target || (this.state.target !== this.state.translateText && !this.state.checkedB && this.state.translateText)) && value !== 0 && this.state.target) {
      this.setState({ open: true, value })
    }
    else {
      this.handleSentence(value)
    }

  }
  handleSentence(value) {
    const splitValue = this.state.submittedId && this.state.submittedId.split("_");
    this.props.sentences &&
      this.props.sentences.length > 0 &&
      this.props.sentences.map((sentence, index) => {
        if (splitValue[0] === sentence._id) {
          let sentenceIndex;
          console.log("sid-----",this.props.sentences[index].tokenized_sentences)

         if( sentence.tokenized_sentences && Array.isArray(sentence.tokenized_sentences) && sentence.tokenized_sentences.length > 0){
          sentence.tokenized_sentences.map((sentence,i) =>{
           
            if(sentence.sentence_index===Number(splitValue[1])){
                sentenceIndex = i;
            }
          })
         }
          if (
            (sentence.tokenized_sentences.length === 1 && sentenceIndex === 0) ||
            (sentenceIndex === 0 && value === -1) ||
            (sentenceIndex === sentence.tokenized_sentences.length - 1 && value > 0)
          ) {
            if (this.props.sentences[index + value].is_footer && this.props.sentences.length >= index + 1 + 2 * value) {
              value = 2 * value;
            }
            const val = `${this.props.sentences[index + value]._id}_${this.props.sentences[index + value].tokenized_sentences[0].sentence_index}`;

            !this.state.clickedSentence && this.props.handleSenetenceOnClick(val, false, null, value === 0 ? null : true);

            if (this.props.sentences[index + value].is_table && value !== 0) {
              const blockId = `${this.props.sentences[index + value]._id}_${this.props.sentences[index + value].table_items[0][0].sentence_index}`;
              this.props.handleCellOnClick(
                this.props.sentences[index + value]._id,
                blockId,
                this.props.sentences[index + value].table_items[0][0],
                "true",
                null,
                value === 0 ? null : true
              );
            }
            this.setState({
              target: this.props.sentences[index + value].tokenized_sentences[0].target,
              targetDialog: this.props.sentences[index + value].tokenized_sentences[0].target,
              source: this.props.sentences[index + value].tokenized_sentences[0].src,
              taggedSource: this.props.sentences[index + value].tokenized_sentences[0].tagged_src,
              taggedTarget: this.props.sentences[index + value].tokenized_sentences[0].tagged_tgt,
              translateText: "",
              indexValue: index + value,
              clickedSentence: false,
              keyValue: "",
              cellValue: "",
              sentenceIndex,
              checkedB: true
            });
          } else if (sentence.tokenized_sentences.length >=  sentenceIndex&& sentenceIndex >= 0) {
            const ind =  sentenceIndex + value;
            const val = `${this.props.sentences[index]._id}_${this.props.sentences[index].tokenized_sentences[ind].sentence_index}`;
            !this.state.clickedSentence && this.props.handleSenetenceOnClick(val, false, null, value === 0 ? null : true);
            if (sentence.is_table) {
              for (const key in sentence.table_items) {
                for (const cell in sentence.table_items[key]) {
                  if (sentence.table_items[key][cell].sentence_index === ind) {
                    const blockId = `${sentence._id}_${sentence.table_items[key][cell].sentence_index}`;
                    this.props.handleCellOnClick(sentence._id, blockId, sentence.table_items[key][cell], "true", null, value === 0 ? null : true);
                    this.setState({ keyValue: key, cellValue: cell, checkedB: true });
                  }
                }
              }
            }
            this.setState({
              target: this.props.sentences[index].tokenized_sentences[ind].target,
              source: this.props.sentences[index].tokenized_sentences[ind].src,
              targetDialog: this.props.sentences[index].tokenized_sentences[ind].target,
              taggedSource: this.props.sentences[index].tokenized_sentences[ind].tagged_src,
              taggedTarget: this.props.sentences[index].tokenized_sentences[ind].tagged_tgt,
              token: false,
              translateText: "",
              indexValue: index,
              clickedSentence: false,
              checkedB: true,
              sentenceIndex
            });
          }
        }

        return true;
      });
    this.props.superScriptToken && this.handleSuperScript();
  }

  handleTextSelectChange(event) {
    this.setState({ translateText: event.target.value });
  }

  handleSubmit() {
    let res = "";
    const { APITransport } = this.props;
    if (this.state.translateText) {
      res = this.handleCalc(this.state.translateText);
    }
    const apiObj = new IntractiveApi(this.state.source, res, this.props.modelDetails);
    if (this.state.source && res) {
      APITransport(apiObj);
    }
  }

  componentDidUpdate(prevProps) {

    if (prevProps.sentences !== this.props.sentences) {
      this.setState({target:''})
    }
    if (prevProps.intractiveTrans !== this.props.intractiveTrans) {
      if (this.state.apiToken) {
        if (this.props.superScriptToken && this.state.superIndex) {
          this.props.handleScriptSave(
            this.props.intractiveTrans && this.props.intractiveTrans.length > 0 && this.props.intractiveTrans[0],
            this.state.superIndex
          );
          const temp =
            this.props.intractiveTrans &&
            this.props.intractiveTrans.length > 0 &&
            this.handleSuperSave(this.props.intractiveTrans[0].tgt, this.props.intractiveTrans[0].tagged_tgt);

          this.props.hadleSentenceSave(false, temp);
        } else {
          this.props.handleSave(
            this.props.intractiveTrans && this.props.intractiveTrans.length > 0 && this.props.intractiveTrans[0],
            this.state.indexValue,
            this.state.submittedId,
            this.state.sentenceIndex,

            this.state.keyValue,
            this.state.cellValue,

          );
          this.state.value !== 0 && this.handleSentence(this.state.value)
        }
        this.setState({
          targetDialog: this.props.intractiveTrans && this.props.intractiveTrans.length > 0 && this.props.intractiveTrans[0].tgt, value: 0
        })
      }
      this.setState({
        disable: false,
        token: false,
        apiToken: false,
        target: this.props.intractiveTrans && this.props.intractiveTrans.length > 0 && this.props.intractiveTrans[0].tgt,
        taggedSource: this.props.intractiveTrans && this.props.intractiveTrans.length > 0 && this.props.intractiveTrans[0].tagged_src,
        taggedTarget: this.props.intractiveTrans && this.props.intractiveTrans.length > 0 && this.props.intractiveTrans[0].tagged_tgt
      });
      this.focusDiv("focus");
    }
    if (prevProps.clickedCell !== this.props.clickedCell) {
      this.setState({
        target: this.props.clickedCell.target,
        taggedSource: this.props.clickedCell.tagged_src,
        taggedTarget: this.props.clickedCell.tagged_tgt
      });
    }
    if (prevProps.submittedId !== this.props.submittedId) {
      this.handleSentence(0);
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
            if (src_ind > tagged_src.length - 1) {
              src_ind = tagged_src.length - 1
            }
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
    if (event.keyCode === 9 && this.state.checkedB) {
      if (this.state.disable && this.state.translateText) {
        const apiObj = new IntractiveApi(this.state.source, this.handleCalc(event.target.value), this.props.modelDetails);
        this.props.APITransport(apiObj);
        this.setState({ disable: false });
      } else {
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
        blockData: nextProps.blockData,
        blockIndex: nextProps.blockIndex,
        submittedId: nextProps.submittedId,
        clickedSentence: nextProps.clickedSentence,
        sentences: nextProps.sentences
      };
    }
    if (prevState.scriptSentence !== nextProps.scriptSentence) {
      return {
        scriptSentence: nextProps.scriptSentence
      };
    }
    return null;
  }

  handleTextChange(key, event) {
    const space = event.target.value.endsWith(" ");
    if (this.state.target && space) {
      if (this.state.target.startsWith(event.target.value) && this.state.target.includes(event.target.value, 0)) {
      } else {
        const res = this.handleCalc(event.target.value);
        const apiObj = new IntractiveApi(this.state.source, res, this.props.modelDetails);
        this.props.APITransport(apiObj);
        this.focusDiv("blur");
        this.setState({
          disable: true
        });
      }
    }

    if (!event.target.value) {
      this.setState({ target: this.state.targetDialog })
    }
    this.setState({
      [key]: event.target.value,
      disable: true
    });
  }

  render() {
    return (
      <Paper elevation={2} style={{ height: "98%", paddingBottom: "10px" }}>
        <Toolbar>
          <Typography value="" variant="h6" gutterBottom style={{ flex: 1, paddingTop: "10px" }}>
            {this.state.checkedB ? translate('dashbord.page.title.anuvaadModel') : "Recommended Sentence"}
          </Typography>
          {!this.state.checkedB &&

            <Button size="small" color="primary" onClick={event => {
              this.setState({ tag: true, translateText: this.state.target });
              setTimeout(() => {
                this.setState({ tag: false });
              }, 3000);
            }}>
              {this.state.tag ? "copied" : "copy"}&nbsp;
</Button>

          }
        </Toolbar>
        <Typography value="" variant="h6" gutterBottom />
        <div>
          <textarea
            style={{
              width: "87%",
              resize: "none",
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
            placeholder={translate('intractive_translate.page.textarea.anuvaadModelPlaceholder')}
            cols="50"
            onChange={event => {
              this.handleTextSelectChange(event);
            }}
          />
        </div>

        <Toolbar>
          <Typography value="" variant="h6" gutterBottom style={{ flex: 1, paddingTop: "10px" }}>
            {this.state.checkedB ? translate('intractive_translate.page.main.title') : "Manual Translate"}
          </Typography>
          <Switch
            checked={this.state.checkedB}
            onChange={() => {
              this.handleSwitchChange();
            }}
            value="checkedB"
            color="primary"
          />
        </Toolbar>

        <div>
          <textarea
            style={{
              width: "87%",
              resize: "none",
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
            placeholder={
              this.state.checkedB
                ? translate('intractive_translate.page.textarea.targetPlaceholder')
                : translate('intractive_translate.page.textarea.updateManuallyPlaceholder')
            }
            cols="50"
            onChange={event => {
              this.state.checkedB ? this.handleTextChange("translateText", event) : this.handleTextSelectChange(event);
            }}
            onKeyDown={this.keyPress.bind(this)}
          />
        </div>
        <Grid container spacing={8} style={{ marginLeft: "5%" }}>
          <Grid item xs={4} sm={4} lg={4} xl={4}>
            <Button
              style={{ fontWeight: "bold", width: "100%" }}
              color="primary"
              disabled={this.props.sentences[0]._id === this.state.submittedId.split("_")[0] || this.props.superScriptToken}
              onClick={event => {
                this.handleDialog(-1);
              }}
            >
              {" "}
              <ChevronLeftIcon size="large" />
              &nbsp;{translate('common.page.label.previousLine')}
            </Button>
          </Grid>
          <Grid item xs={3} sm={3} lg={3} xl={3}>
            <Button
              style={{ fontWeight: "bold", width: "100%" }}
              color="primary"
              onClick={event => {
                 this.handleApiCall();
              }}
            >
              {" "}
              &nbsp;{translate('common.page.button.save')}
            </Button>
          </Grid>
          <Grid item xs={3} sm={3} lg={4} xl={4}>
            <Button
              color="primary"
              disabled={
                this.props.sentences[this.props.sentences.length - 1]._id === this.state.submittedId.split("_")[0] || this.props.superScriptToken
              }
              onClick={event => {
                 this.handleDialog(1);
              }}
              style={{ fontWeight: "bold", width: "100%" }}
            >
              {translate('common.page.label.nextLine')}&nbsp;
              <ChevronRightIcon size="large" />{" "}
            </Button>
          </Grid>
        </Grid>
        {this.state.open && <Dialog message="Do you want to save the changes ? " handleSubmit={this.handleDialogSave.bind(this)} handleClose={this.handleClose.bind(this)} open={true} title="Save" status={this.state.value} />}
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
