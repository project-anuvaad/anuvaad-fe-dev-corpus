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
    padding:'2% 2% 3% 2%',
    minWidth: 720,
    maxWidth: 700,
    height: 'auto',
    left: 0,
    right: 0,
    marginLeft:'23%',
    flexWrap: 'wrap',
    marginBottom:"2%"
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
  left: theme.spacing.unit*22,
  marginBottom:'2%',
  marginTop:'5%'
  ,
  width:'220px'
},
buttons: {
  justifyContent: 'center',
  left: theme.spacing.unit*26,
  marginBottom:'2%',
  marginTop:'5%',
  width:'240px',
  marginLeft:'10%'
},

button1: {
  justifyContent: 'center',
  // left: theme.spacing.unit*12,
  marginBottom:'2%',
  marginTop:'5%',
  marginLeft:'3%',
  width:'44%',
  height:'43px',
  backgroundColor:"#1C9AB7",
   color:"#FFFFFF",
   borderRadius:"20px 20px 20px 20px",
},
btns: {
  justifyContent: 'center',
  left: theme.spacing.unit*6,
  marginBottom:'2%',
  marginTop:'5%',
  width:'44%',
  height:'43px',
  marginLeft:'0%',
  backgroundColor:"#1C9AB7",
   color:"#FFFFFF",
   borderRadius:"20px 20px 20px 20px",
},

  paper: {
    marginTop:'4%',
    overflow: 'auto',
    width: 'auto%',
    padding:'4% 4% 5% 4%',
  
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
    fontSize: 13,
  }
});


export default Newcorpus;
