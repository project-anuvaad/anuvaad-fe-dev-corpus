
import React , { useState, useRef } from 'react';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppCard from  '../../components/web/Card';
import '../../styles/web/TranslatePresident.css';
import NewCorpusStyle from "../../styles/web/Newcorpus";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import APITransport from "../../../flux/actions/apitransport/apitransport";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';  

const langs = ['Bengali', 'Marathi', 'Malayalam', 'Hindi', 'Kannada', 'Gujurati', 'Tamil', 'Telugu', 'Punjabi'];
                                                                                                          

class TranslatePresident extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLayout: false,
      showLangLayout: false
    };
  }

   handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }
  handleOnClick = () => {
    this.setState({ showLayout: true })
    setTimeout(() => {
      this.setState({ showLangLayout: true })
    }, 1000)
  }

  handleClose = () => {
    this.setState({ showLayout: false , showLangLayout: false, sentence:''})
    
  }
  render() {
    return (
        <div className="App">
        {!this.state.showLayout ?
          <div>
            <textarea className='idbox' rows='5' cols='50' placeholder='Please enter text here...' onChange={(event) => {this.handleTextChange('sentence', event)}}/>
            <div >
              <Button onClick = {this.handleSubmit}
                    variant="contained" color="primary"
                    style={{
                     width:'25%',
                      height: 50,
                      
                    }}  onClick={this.handleOnClick.bind(this)}>Translate</Button>
            </div>
          </div> :
          (!this.state.showLangLayout && <div className={'fadeUp'}>
           <textarea className='idbox' rows='5' cols='50' placeholder='Please enter text here...' onChange={(event) => {this.handleTextChange('sentence', event)}}/>
            </div>)
        }
        <div>
          {this.state.showLangLayout ? 
            <Grid container spacing={4} style={{paddingLeft: '17%',paddingRight: '17%'}}>
              <Grid container item xs={12} spacing={1}>
                <Paper id='paper'>
                  <Typography id='title' color="black" gutterBottom style={{color: 'black'}}>
                    {this.state.sentence}
                        </Typography>
                </Paper>
              </Grid>
              <Grid container item xs={12} spacing={3} id='cardGrid'>
                <React.Fragment>
                    {langs.map((lang)=>{
                        return (<Grid item xs={12} sm={4} className='slideUp'><AppCard text={lang}/></Grid>)
                    })}
                </React.Fragment>
              </Grid>

              <Fab  aria-label="Close" style={{margin:"auto",
  display:"block",color: 'white'}} onClick={this.handleClose.bind(this)}>
        <CloseIcon style={{color: 'CB1E60'}}/>
      </Fab>
            </Grid>
           : null}
        </div>
      </div>
    )
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

export default withRouter(
  withStyles(NewCorpusStyle)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(TranslatePresident)
  )
);


