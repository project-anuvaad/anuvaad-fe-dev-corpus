import { grey500, white } from 'material-ui/styles/colors';

const DashboardStyles = theme => ({
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
  typographyHeader:{
    color: darkBlack, background: blueGrey50, paddingLeft: "40%", paddingBottom: "12px", paddingTop: "8px" 
    

  },
  typographySubHeader:{
    marginLeft:'38%'
  },

  typography: {
    marginLeft:"3%",
    marginTop:'4%',
    height:"18px",
    fontSize:"18px" 
    
  },
  select:{
    marginRight: "30%",
    width:"100%" ,
    
  },
 paper: {
    marginLeft: "25%", 
    width: "50%",
     marginTop: "4%"
  },
  grid:{
    marginLeft: "4%" 
  },
  textfield:{
    width: '87%',
    marginLeft:"3%"
  },
  button: {
    marginTop: "4%",
    marginLeft: "5%",
    width: "90%",
    backgroundColor:'#1C9AB7',
    borderRadius:"20px 20px 20px 20px",
    color:"#FFFFFF"
  },
  dropZoneArea:{
    minHeight:'385px',
    height: "304px"

  }
  
 
  
});


export default DashboardStyles;
