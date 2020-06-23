import { grey500, white } from 'material-ui/styles/colors';

const PdfUploadStyles = theme => ({
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
    marginTop:'6%',
    minWidth: "5%",
    align:'center',
    marginLeft:"40%",
    fontfamily: 'Trebuchet MS, sans-serif	',
     color: '#003366' 
    

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
    width: "60%",
    minWidth: "200px",
    marginTop: "3%",
    padding: "2% 2% 4% 2%",
    marginLeft: "15%",
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


export default PdfUploadStyles;
