
const drawerWidth = 240;

const GlobalStyles = theme => ({
  container: {
    margin: '5em 0em 1em 3em',
    width: '100%',
    background: theme.palette.background.default,
    fontFamily: theme.typography.fontFamily,
    minHeight: '-webkit-fill-available'
  },
  root: {
    background: theme.palette.background.default,
    flexGrow: 1,
    // height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    // backgroundColor: theme.palette.primary.dark,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {

    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth+43}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36

  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    backgroundColor: theme.drawer.default,
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  buttonLeft:{
                
    marginLeft:'230px',
    marginTop: "17%",
    height:'12%',
    position: "fixed",
    backgroundColor:'#335995'
    
  },
  buttonRight:{
        marginLeft:'-50px',
        marginTop: "19%",
        position: "fixed",
        height:'12%',
        backgroundColor:'#335995'
  },



  editButton:{
    width:"70%"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: '140px',
    flexShrink: 0
  },
  drawerPaper: {
    
    width: '282px',
    backgroundColor:'#335995'
    
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    // backgroundColor: '#171616',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  title: {
    color: 'white'
  },

  content: {
    background: theme.palette.background.default,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginTop: '3%'
  }
});


export default GlobalStyles;
