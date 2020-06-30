

const PdfToDocStyles = theme => ({
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
      textAlign: "center",
              minWidth: "10%",
              color: '#233466',marginTop:'4%'
    },
    paper:{
      width: "40%",
        minWidth: "20%",
        marginTop: "2%",
        padding: "5% 5% 3% 5%",
        marginLeft: "25%",
        marginBottom: '5.5%',
    },
    button:{
      marginTop: "6%",
            marginLeft: "9.5%",
            width: "80%",
            backgroundColor: "#1C9AB7",
            color: "#FFFFFF",
            borderRadius: "20px 20px 20px 20px",
            height: '45px'
    },
    
    dropZoneArea:{
      paddingTop: '80px',
      minHeight:'363px',
      height: "60px",
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
  
  
  export default PdfToDocStyles;
  