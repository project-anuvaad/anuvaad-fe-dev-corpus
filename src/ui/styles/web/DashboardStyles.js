

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
          fontWeight: '549', textAlign:'center',paddingBottom: "12px", paddingTop: "3%"
    

  },
  paper:{
    marginLeft: "23%",
          width: "50%",
          marginTop: "3%",
          marginBottom: "3%",
          padding: '3% 3% 3% 3%'
  },
  grid1:{
    marginLeft: "6.5%"
  },
  grid2:{
    marginLeft: "6.3%" 
  },
  divChip:
  {
    marginLeft: "8%", paddingTop: "3%"
  },
  divTextField:{
    marginLeft: "3.2%"
  },

  typography: {
    marginLeft: "4.5%",
     paddingTop: "9.5%",fontfamily: '"Source Sans Pro", sans-serif', 
    
  },
  select:{
    width: '92%',
    fullWidth: true,
    display: "flex",
    wrap: "nowrap",
    height: '40px',
    float: 'right'
  },
 
  grid:{
    marginLeft: "4%" 
  },
  textfield:{
    width: "96%"
    
  },
  button1: {
    width: "44%", marginBottom: "4%", marginTop: "5%", marginLeft:'1.3%'
  },
  button2:{
    width: "44%", marginTop:'5%', marginLeft:'5.6%'
  },
  dropZoneArea:{
    minHeight:'385px',
    height: "304px"

  }
  
 
  
});


export default DashboardStyles;
