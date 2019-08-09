import { grey500, white } from 'material-ui/styles/colors';

const Newcorpus = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit,
    width: '100%'
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis:40,
    height:'30%',
    marginLeft: theme.spacing.unit*-0.1,
    marginRight: theme.spacing.unit,
    marginBottom:'10px'

  },
  CorpusContainer: {
    minWidth: 720,
    maxWidth: 700,
    height: 'auto',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto',
    marginLeft:'24%',
    flexWrap: 'wrap',
  },
  createButton: {
  justifyContent: 'center',
},

label:{
  paddingLeft:'30%',
  paddingRight:'3%'
},
typography:{
  marginLeft:"5%",
  marginTop:'3%'
},

button: {
  justifyContent: 'center',
  left: theme.spacing.unit*12,
  marginBottom:'2%',
  marginTop:'5%'
  ,
  width:'220px'
},
buttons: {
  justifyContent: 'center',
  left: theme.spacing.unit*16,
  marginBottom:'2%',
  marginTop:'5%',
  width:'220px'
},

  paper: {
    padding: 25,
    marginTop:'20px',
    overflow: 'auto',
    width: 'auto%',
    
    height:'65%'
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10
  },
  flatButton: {
    color: grey500
  },
  checkRemember: {
    style: {
      float: 'left',
      maxWidth: 180,
      paddingTop: 5
    },
    labelStyle: {
      color: grey500
    },
    iconStyle: {
      color: grey500,
      borderColor: grey500,
      fill: grey500
    }
  },
  loginBtn: {
    float: 'right'
  },
  btn: {
    background: '#4f81e9',
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13
  }
});


export default Newcorpus;
