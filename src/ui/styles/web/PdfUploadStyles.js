

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
  div:{
    display: 'flex', flexDirection: 'column', flex: 1, textAlign: 'center', alignItems: 'center'
  },
  typographyHeader:{
    paddingTop:'4%',
    minWidth: "5%",
   
    

  },
  typographySubHeader:{
  textAlign:'center',
    fontWeight:'450',
    color:'#000000'
  },

  typography: {
    marginLeft:"2%",
    marginTop:'2%',
    height:"18px"
    
  },
  select:{
    // marginRight: "30%",
    width:"100%" ,
    height:'40px',
    
  },
 paper: {
    width: "60%",
    minWidth: "200px",
    marginTop: "3%",
    marginBottom:'6%',
    padding: "3% 3% 3% 3%",
    // marginLeft: "15%",
    
    minHeight:'400px'
  },
  grid:{
    marginLeft: "5.5%" 
  },
  textfield:{
    width: '87.9%',
    marginLeft:"2.3%"
  },
  span:{
    
  },
  button: {
    marginTop: "6%",
    marginLeft: "2.7%",
    width: "87.6%",
    backgroundColor:'#1C9AB7',
    borderRadius:"20px 20px 20px 20px",
    color:"#FFFFFF"
  },
  dropZoneArea:{
    paddingTop: '13%',
    minHeight:'363px',
    height: "402px",
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
