import React from "react";
import TranslateIcon from "@material-ui/icons/Translate";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountBox";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from "@material-ui/icons/AddToQueue";
import StarIcon from "@material-ui/icons/FiberNew";
import SendIcon from "@material-ui/icons/Send";
import InsertChart from "@material-ui/icons/InsertChart";
import Receipt from "@material-ui/icons/Receipt";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import history from "../../../../web.history";
import { Button } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ActionDelete from "@material-ui/icons/QuestionAnswer";
import GroupIcon from "@material-ui/icons/Group";
import logo from '../../../../assets/logo.png'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    marginLeft: "2%"
  },
  felxDemo: {
    flex: 1,
    marginLeft: "1%"
  }
};

class Header extends React.Component {
  state = {
    open: false,
    auth: true,
    anchorEl: null,
    heading: "Translation",
    name: localStorage.getItem("userDetails"),
    userName: ""
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  componentDidUpdate() {
    if (this.state.open && this.props.tocken) {
      this.setState({ open: false });

    }
    if (this.props.tocken) {
      this.props.handleTockenChange()
    }
  }

  handleDrawerTranslate = () => {
    this.setState({
      open: false,
      heading: "Translation"
    });
  };

  handleDrawerDoc = () => {
    this.setState({
      open: false,
      heading: "Documents"
    });
  };
  handleDrawerClose() {
    console.log()
    this.setState({
      open: false
    });
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleClick = () => { };

  render() {
    const { classes, title, drawer, forDemo } = this.props;

    const { auth, anchorEl, open } = this.state;
    const openEl = Boolean(anchorEl);
    var role = JSON.parse(localStorage.getItem("roles"));
    var useRole = new Array();
    role.map((item, value) => (useRole.push(item), value !== role.length - 1 ? useRole.push(", ") : null));
    return (
      <div  >
        <AppBar position="fixed" className={classNames(classes.appBar, open && classes.appBarShift)}>
          <Toolbar disableGutters={!open}>
            {forDemo &&
              <img src={logo} style={{
                width: '2%',
                display: 'block',
                marginLeft: '1%'
              }} />
            }
            <Typography variant="title" color="inherit" className={forDemo ? classes.felxDemo : classes.flex}>
              {title}
            </Typography>
            <Typography
              variant="title"
              color="inherit"
              style={{
                position: "absolute",
                textTransform: "capitalize",
                right: "130px"
              }}
            >
              Welcome {this.state.name} [{useRole}]
            </Typography>

            {this.state.drawerClose}
            {auth && (
              <div
                style={{
                  position: "absolute",
                  top: "10%",
                  right: "50px"
                }}
              >
                <Fab aria-owns={openEl ? "menu-appbar" : null} aria-haspopup="true" onClick={this.handleMenu} color="primary" size="medium">
                  <AccountCircle />
                </Fab>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={openEl}
                  onClose={this.handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      this.handleClose();
                      history.push(`${process.env.PUBLIC_URL}/profile`);
                    }}
                  >
                    My Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      this.handleClose();
                      history.push(`${process.env.PUBLIC_URL}/logout`);
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <div>
          {!drawer &&
            <Grid container spacing={24} style={{ padding: 24 }}>
              {/* <Grid item xs={12} sm={12} lg={12} xl={12}>
        <div style={{marginLeft:'-5%',marginTop:'-1%'}}>
        <AppBar />
        </div>
        </Grid> */}
              {/* <Grid item xs={12} sm={12} lg={12} xl={12}> */}
              {/* <div className={classes.root}>   */}
              <Drawer
                color="inherit"
                variant="persistent"
                anchor="left"
                open={open}

                onClick={() => {
                  this.handleDrawerClose();

                }}

                classes={{
                  paper: classes.drawerPaper
                }}
              >
                <List>
                  <ListItem>
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography
                          type="body2"
                          style={{ color: "#FFFFFF", paddingBottom: "2%", marginLeft: "21%" }}
                          variant="title"
                          color="inherit"
                          className={classes.flex}
                        >
                          ANUVAAD
                      </Typography>
                      }
                    />
                  </ListItem>
                  <Divider />
                  {role && Array.isArray(role) && role.includes("user") && (
                    <ListItem
                      style={{ paddingTop: "8%", paddingBottom: "8%" }}
                      button
                      onClick={() => {
                        this.handleDrawerClose();
                        history.push(`${process.env.PUBLIC_URL}/translate`);
                      }}
                    >
                      <ListItemIcon>
                        <SearchIcon style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography type="body2" style={{ color: "#FFFFFF" }}>
                            Translate
                        </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {role && Array.isArray(role) && !role.includes("analyzer") && !role.includes("admin") && !role.includes("user") && (
                    <ListItem
                      style={{ paddingTop: "8%", paddingBottom: "8%" }}
                      button
                      onClick={() => {
                        this.handleDrawerClose();
                        history.push(`${process.env.PUBLIC_URL}/dashboard`);
                      }}
                    >
                      <ListItemIcon>
                        <SearchIcon style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography type="body2" style={{ color: "#FFFFFF" }}>
                            Translate
                        </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {/* {role.includes('analyzer') &&
									<ListItem style={{ paddingTop: '8%', paddingBottom: '8%' }} button onClick={() => { this.handleDrawerClose(); history.push(`${process.env.PUBLIC_URL}/texttranslate`) }}>
										<ListItemIcon>
											<SearchIcon style={{ color: 'white' }} />
										</ListItemIcon>
										<ListItemText
											disableTypography
											primary={(
												<Typography type="body2" style={{ color: '#FFFFFF' }}>
													Translate
          							</Typography>
											)}
										/>
									</ListItem>
								} */}
                  {role && Array.isArray(role) && role.includes("analyzer") && (
                    <ListItem
                      style={{ paddingTop: "8%", paddingBottom: "8%" }}
                      button
                      onClick={() => {
                        this.handleDrawerClose();
                        history.push(`${process.env.PUBLIC_URL}/benchmarktranslate`);
                      }}
                    >
                      <ListItemIcon>
                        <SendIcon style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography type="body2" style={{ color: "#FFFFFF" }}>
                            Upload File
                        </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {role && Array.isArray(role) && role.includes("dev") && (
                    <ListItem
                      style={{ paddingTop: "8%", paddingBottom: "8%" }}
                      button
                      onClick={() => {
                        this.handleDrawerClose();
                        history.push(`${process.env.PUBLIC_URL}/newcorpus`);
                      }}
                    >
                      <ListItemIcon>
                        <StarIcon style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography type="body2" style={{ color: "#FFFFFF" }}>
                            Corpus
                        </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {role && Array.isArray(role) && role.includes("dev", "grader") && (
                    <ListItem
                      style={{ paddingTop: "8%", paddingBottom: "8%" }}
                      button
                      onClick={() => {
                        this.handleDrawerClose();
                        history.push(`${process.env.PUBLIC_URL}/corpus`);
                      }}
                    >
                      <ListItemIcon>
                        <SendIcon style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography type="body2" style={{ color: "#FFFFFF" }}>
                            Corpus List
                        </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {role && Array.isArray(role) && (role.includes("dev") || role.includes("grader")) && (
                    <ListItem
                      style={{ paddingTop: "8%", paddingBottom: "8%" }}
                      button
                      onClick={() => {
                        this.handleDrawerClose();
                        history.push(`${process.env.PUBLIC_URL}/benchmark`);
                      }}
                    >
                      <ListItemIcon>
                        <SendIcon style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography type="body2" style={{ color: "#FFFFFF" }}>
                            Benchmark
                        </Typography>
                        }
                      />
                    </ListItem>
                  )}

                  {role && Array.isArray(role) && role.includes('admin') &&
                    <ListItem style={{ paddingTop: '8%', paddingBottom: '8%' }} button onClick={(event) => { this.handleDrawerClose(); history.push(`${process.env.PUBLIC_URL}/graderreport`) }}>
                      <ListItemIcon>
                        <Receipt style={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={(
                          <Typography type="body2" style={{ color: '#FFFFFF' }}>
                            Grader Reports
          							</Typography>
                        )}
                      />
                    </ListItem>

                  }

                  {role && Array.isArray(role) && role.includes("admin") && (
                    <ListItem
                      style={{ paddingTop: "8%", paddingBottom: "8%" }}
                      button
                      onClick={event => {
                        this.handleDrawerClose();
                        history.push(`${process.env.PUBLIC_URL}/comparison-report`);
                      }}
                    >
                      <ListItemIcon>
                        <InsertChart style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography type="body2" style={{ color: "#FFFFFF" }}>
                            Comparison Reports
                        </Typography>
                        }
                      />
                    </ListItem>
                  )}

                  {role && Array.isArray(role) && (role.includes("editor") || role.includes("user")) && (
                    <ListItem
                      style={{ paddingTop: "8%", paddingBottom: "8%" }}
                      button
                      onClick={event => {
                        this.handleDrawerClose();
                        history.push("/pdftranslate");
                      }}
                    >
                      <ListItemIcon>
                        <TranslateIcon style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography type="body2" style={{ color: "#FFFFFF" }}>
                            Translate File
                        </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  {role && Array.isArray(role) && (role.includes("editor") || role.includes("user")) && (
                    <ListItem
                      style={{ paddingTop: "8%", paddingBottom: "8%" }}
                      button
                      onClick={event => {
                        this.handleDrawerClose();
                        history.push("/viewtranslate");
                      }}
                    >
                      <ListItemIcon>
                        <SendIcon style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography type="body2" style={{ color: "#FFFFFF" }}>
                            Documents
                        </Typography>
                        }
                      />
                    </ListItem>
                  )}

                  {role && Array.isArray(role) && role.includes("admin") && (
                    <ListItem
                      style={{ paddingTop: "8%", paddingBottom: "8%" }}
                      button
                      onClick={event => {
                        this.handleDrawerClose();
                        history.push("/userdirectory");
                      }}
                    >
                      <ListItemIcon>
                        <GroupIcon style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography type="body2" style={{ color: "#FFFFFF" }}>
                            User Management
                        </Typography>
                        }
                      />
                    </ListItem>
                  )}

                  {role && Array.isArray(role) && !role.includes("analyzer") && !role.includes("admin") && !role.includes("user") && (
                    <ListItem
                      style={{ paddingTop: "8%", paddingBottom: "8%" }}
                      button
                      onClick={() => {
                        this.handleDrawerClose();
                        history.push(`${process.env.PUBLIC_URL}/qna`);
                      }}
                    >
                      <ListItemIcon>
                        <ActionDelete style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography type="body2" style={{ color: "#FFFFFF" }}>
                            QnA
                        </Typography>
                        }
                      />
                    </ListItem>
                  )}

                  <ListItem
                    style={{ paddingTop: "17%", paddingBottom: "17%", marginTop: "43%", marginLeft: "82%", width: "18%" }}
                    button
                    onClick={event => {
                      this.handleDrawerClose();
                    }}
                  >
                    <ListItemIcon>
                      <ChevronLeftIcon style={{ color: "white" }} />
                    </ListItemIcon>
                  </ListItem>
                </List>
              </Drawer>


              <main
                className={classNames(classes.content, {
                  [classes.contentShift]: open
                })}
              >
                {this.state.open ? (
                  ""
                ) : (!drawer &&
                  <Button color="primary" variant="contained" className={classes.buttonRight} style={{ zIndex: 9999 }} onClick={this.handleDrawerOpen}>
                    <ChevronRightIcon />
                  </Button>
                  )}
                <div className={classes.drawerHeader} />
              </main>
            </Grid>
          }
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(Header);
