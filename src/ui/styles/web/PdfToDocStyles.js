

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
  