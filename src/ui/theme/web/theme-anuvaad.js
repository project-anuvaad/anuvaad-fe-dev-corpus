import { createMuiTheme } from '@material-ui/core/styles';


const themeAnuvaad = createMuiTheme({

  typography: {
    fontFamily: '"Source Sans Pro","Regular","Arial", sans-serif',
    fontSize: 14,
    color: "#000000",
  },
  palette: {
    primary: {
      light: '#09d6a1',
      main: 'rgb(24,154,183)',
      dark: '#FFFFFF',
      contrastText: '#FFFFFF',
      color: 'inherit',
      backgroundColor: "#1C9AB7 !important"

    },
    secondary: {
      light: '#09d6a1',
      main: '#FFFFFF',
      dark: '09d6a1',
      contrastText: '#233466'
    },
    background: {
      default: '#F5F9FA',
      color:"inherit"
    }
  },
  status: {
    danger: 'orange'
  },

  drawer: {
    default: '#1976d2',
    color:'inherit'
  },

  Link:
  {
    fontFamily: '"Source Sans Pro", "Arial", sans-serif',
    fontSize: 16,
    color: "#1C9AB7"
  },
  // overrides: {
  //   MuiButton: {
  //     root: {
  //       backgroundColor: "#1C9AB7 !important" , color: "#FFFFFF !important", borderRadius: "20px 20px 20px 20px", height: '45px'
  //     }
  //   },
  // }



});


export default themeAnuvaad;
