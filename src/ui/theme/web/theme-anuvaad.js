import { createMuiTheme } from '@material-ui/core/styles';


const themeAnuvaad = createMuiTheme({

  typography: {
    fontFamily: '"Source Sans Pro","Regular","Arial", sans-serif',
    fontSize: 15,
    color: "#000000"
  },
  palette: {
    primary: {
      light: '#09d6a1',
      main: '#FFFFFF',
      dark: '#FFFFFF',
      contrastText: '#000000',
      color: 'inherit'

    },
    secondary: {
      light: '#09d6a1',
      main: '#09d6a1',
      dark: '09d6a1',
      contrastText: '#FFFFFF'
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
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: "#1C9AB7 !important" , color: "#FFFFFF !important", borderRadius: "20px 20px 20px 20px", height: '45px'
      }
    },
  }



});


export default themeAnuvaad;
