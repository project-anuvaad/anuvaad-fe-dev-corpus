
import React , { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppCard from  '../../components/web/Card';
import '../../styles/web/TranslatePresident.css';
const langs = ['Bengali', 'Marathi', 'Malayalam', 'Hindi', 'Kannada', 'Gujurati', 'Tamil', 'Telugu', 'Punjabi'];

export default class TranslatePresident extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLayout: false,
      showLangLayout: false
    };
  }
  handleOnClick = () => {
    this.setState({ showLayout: true })
    setTimeout(() => {
      this.setState({ showLangLayout: true })
    }, 1000)
  }
  render() {
    return (
        <div className="App">
        {!this.state.showLayout ?
          <div>
            <textarea className='idbox' rows='5' cols='50' placeholder='We have many beautiful Languages' />
            <div >
              <Button style={{cursor:'pointer', color: 'white'}} id='button' type='submit' size='sm' onClick={this.handleOnClick}>Translate</Button>
            </div>
          </div> :
          (!this.state.showLangLayout && <div className={'fadeUp'}>
            <textarea className='idbox' rows='5' cols='50' placeholder='We have many beautiful Languages' />
          </div>)
        }
        <div>
          {this.state.showLangLayout ? 
            <Grid container spacing={4} style={{paddingLeft: '17%',paddingRight: '17%'}}>
              <Grid container item xs={12} spacing={1}>
                <Paper id='paper'>
                  <Typography id='title' color="white" gutterBottom style={{color: 'white'}}>
                    We have many beautiful languages
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
            </Grid>
           : null}
        </div>
      </div>
    )
  }
}


