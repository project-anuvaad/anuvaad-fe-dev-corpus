

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
    fontfamily: '"Source Sans Pro", sans-serif',
          color: '#003366',
          fontWeight: '549', textAlign:'center',paddingBottom: "12px", paddingTop: "4%"
    

  },
  paper:{
    marginLeft: "24.5%",
          width: "50%",
          marginTop: "3%",
          marginBottom: "4%",
          padding: '2% 2% 2% 2%'
  },

  typography: {
    marginLeft: "11%",
     paddingTop: "9.5%",fontfamily: '"Source Sans Pro", sans-serif', 
    
  },
  select:{
    marginBottom: "5%", marginTop: "4%", width: "100%",marginLeft:'10%'  ,
    
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
