

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
    fontfamily: 'sans-serif	',
     color: '#003366',
     fontWeight:'549'
    

  },
  typographySubHeader:{
    marginLeft:'38%',
    fontWeight:'450',
    color:'#000000'
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
    marginBottom:'5%',
    padding: "2% 2% 4% 2%",
    marginLeft: "15%",
    
    minHeight:'400px'
  },
  grid:{
    marginLeft: "4%" 
  },
  textfield:{
    width: '87%',
    marginLeft:"3%"
  },
  button: {
    marginTop: "5%",
    marginLeft: "5%",
    width: "90%",
    backgroundColor:'#1C9AB7',
    borderRadius:"20px 20px 20px 20px",
    color:"#FFFFFF"
  },
  dropZoneArea:{
    paddingTop: '80px',
    minHeight:'363px',
    height: "304px",
    borderColor:'#1C9AB7',
    backgroundColor: '#F5F9FA',
    border: '1px dashed #1C9AB7',
    fontColor:'#1C9AB7',
    "& svg":{color:'#1C9AB7',},
    "& p": {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      fontSize: "19px",
      color:'#1C9AB7',
      
    },


  }
  
 
  
});


export default PdfUploadStyles;
