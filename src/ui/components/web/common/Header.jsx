import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Grid from "@material-ui/core/Grid";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import history from "../../../../web.history";

import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import logo from '../../../../assets/logo.png';
import anuvaadLogo from '../../../../assets/AnuvaadLogo.svg';
import { translate } from '../../../../../src/assets/localisation';
import DownIcon from '@material-ui/icons/ArrowDropDown';
import PeopleIcon from '@material-ui/icons/Person';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
  },
  felxDemo: {
    flex: 1,
    marginLeft: "1%"
  },
  menuButton: {
    marginLeft: -12,
    // marginRight: 20,
    marginRight: "8px !important",
  },
  divider: {
    marginLeft: '12%',
    marginRight: '12%'
  }
};

class Header extends React.Component {
  state = {
    open: false,
    auth: true,
    anchorEl: null,
    heading: translate('header.page.heading.translation'),
    name: localStorage.getItem("userDetails"),
    userName: "",
    currentPage: 'dashboard'
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
      heading: translate('header.page.heading.translation')
    });
  };

  handleDrawerDoc = () => {
    this.setState({
      open: false,
      heading: translate('common.page.title.document')
    });
  };
  handleDrawerClose() {
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

  handleMenuOpenClose = event => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, title, drawer, forDemo, dontShowHeader } = this.props;

    const { auth, anchorEl, open } = this.state;
    const openEl = Boolean(anchorEl);
    var role = JSON.parse(localStorage.getItem("roles"));
    var useRole = [];
    role.map((item, value) => {
      useRole.push(item); value !== role.length - 1 && useRole.push(", ")
      return true;
    });

    return (
      <div  >
        <AppBar position="fixed" className={classNames(classes.appBar, open && classes.appBarShift)}>

          <Toolbar disableGutters={!open}>
            <IconButton onClick={this.handleMenuOpenClose} className={classes.menuButton} color="inherit" aria-label="Menu">
              {this.state.open ?
                <CloseIcon /> :
                <MenuIcon />
              }
            </IconButton>
            {forDemo &&
              <img src={logo}
                alt=""
                style={{
                  width: '2%',
                  display: 'block',
                  marginLeft: '1%'
                }} />
            }

            <Typography variant="title" color="inherit" className={forDemo ? classes.felxDemo : classes.flex}>
              {title}
            </Typography>
            
            <img src={anuvaadLogo}
              style={{
                position: 'absolute',
                marginLeft: '47%',
                height: '27px'
              }}
              alt="" />
            <div style={{position: 'absolute' , right: '20px', display: 'flex', flexDirection: 'row'}}>
              {!dontShowHeader &&
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <PeopleIcon style={{marginRight: '10px'}}></PeopleIcon>
               <Typography
                  variant="title"
                  color="inherit"
                  style={{
                    // position: "absolute",
                    textTransform: "capitalize",
                    // right: "60px"
                  }}
                >
                  {this.state.name}
                </Typography>
                </div>
              }
              {this.state.drawerClose}
              {!dontShowHeader && auth && (
                <div
                  style={{
                    paddingLeft: '10px',
                    // position: "absolute",
                    top: "20px",
                    // right: "21px"
                  }}
                >
                  {/* <Fab aria-owns={openEl ? "menu-appbar" : null} aria-haspopup="true" onClick={this.handleMenu} color="primary" size="medium">
                </Fab> */}
                  <DownIcon onClick={this.handleMenu.bind(this)}></DownIcon>
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
                      {translate('header.page.heading.MyProfile')}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        this.handleClose();
                        history.push(`${process.env.PUBLIC_URL}/logout`);
                      }}
                    >
                      {translate('header.page.heading.logout')}
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <div>
          {!drawer &&
            <Grid container spacing={24}>
              {/* <Grid container spacing={24} style={{ padding: 24 }}> */}
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
                          style={{ color: "#D6D6D6", paddingBottom: "2%", marginLeft: "6%" }}
                          variant="title"
                          color="inherit"
                          className={classes.flex}
                        >
                          {translate("common.page.label.menu")}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {role && Array.isArray(role) && role.includes("dev") && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "data-pipeline-tools" && '#1C9AB7', color: this.state.currentPage === "data-pipeline-tools" && '#FFFFFF' }}
                        button
                        onClick={event => {
                          this.handleDrawerClose();
                          history.push("/data-pipeline-tools");
                          this.setState({ currentPage: 'data-pipeline-tools' })
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "data-pipeline-tools" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('header.page.heading.dataPipeline')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}
                  {role && Array.isArray(role) && role.includes("user") && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "translate" && '#1C9AB7', color: this.state.currentPage === "translate" && '#FFFFFF' }}
                        button
                        onClick={() => {
                          this.handleDrawerClose();
                          history.push(`${process.env.PUBLIC_URL}/translate`);
                          this.setState({ currentPage: 'translate' })
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "translate" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('dashboard.page.heading.title')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}
                  {role && Array.isArray(role) && !role.includes("analyzer") && !role.includes("admin") && !role.includes("user") && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "dashboard" && '#1C9AB7', color: this.state.currentPage === "dashboard" && '#FFFFFF' }}
                        button
                        onClick={() => {
                          this.handleDrawerClose();
                          history.push(`${process.env.PUBLIC_URL}/dashboard`);
                          this.setState({ currentPage: 'dashboard' })
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "dashboard" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('dashboard.page.heading.title')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
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
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "benchmarktranslate" && '#1C9AB7', color: this.state.currentPage === "benchmarktranslate" && '#FFFFFF' }}
                        button
                        onClick={() => {
                          this.handleDrawerClose();
                          history.push(`${process.env.PUBLIC_URL}/benchmarktranslate`);
                          this.setState({ currentPage: 'benchmarktranslate' })
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "benchmarktranslate" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('header.page.heading.uploadFile')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}
                  {role && Array.isArray(role) && role.includes("dev") && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "newcorpus" && '#1C9AB7', color: this.state.currentPage === "newcorpus" && '#FFFFFF' }}
                        button
                        onClick={() => {
                          this.handleDrawerClose();
                          history.push(`${process.env.PUBLIC_URL}/newcorpus`);
                          this.setState({ currentPage: 'newcorpus' })
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "newcorpus" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('commonCorpus.page.button.corpus')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}
                  {role && Array.isArray(role) && role.includes("dev", "grader") && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "corpus" && '#1C9AB7', color: this.state.currentPage === "corpus" && '#FFFFFF' }}
                        button
                        onClick={() => {
                          this.handleDrawerClose();
                          history.push(`${process.env.PUBLIC_URL}/corpus`);
                          this.setState({ currentPage: 'corpus' })
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "corpus" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('webroutes.page.title.corpusList')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}
                  {role && Array.isArray(role) && (role.includes("dev") || role.includes("grader")) && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "benchmark" && '#1C9AB7', color: this.state.currentPage === "benchmark" && '#FFFFFF' }}
                        button
                        onClick={() => {
                          this.handleDrawerClose();
                          history.push(`${process.env.PUBLIC_URL}/benchmark`);
                          this.setState({ currentPage: 'benchmark' })
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "benchmark" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('header.page.heading.benchMark')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}

                  {role && Array.isArray(role) && (role.includes("dev") || role.includes("grader") || role.includes("interactive-editor")) && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "interactive-translate" && '#1C9AB7', color: this.state.currentPage === "interactive-translate" && '#FFFFFF' }}
                        button
                        onClick={() => {
                          this.handleDrawerClose();
                          history.push(`${process.env.PUBLIC_URL}/interactive-translate`);
                          this.setState({ currentPage: 'interactive-translate' })
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "interactive-translate" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate("intractive_translate.page.main.title")}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}
                  {role && Array.isArray(role) && (role.includes("editor") || role.includes("user") || role.includes("grader") || role.includes("interactive-editor")) && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "view-pdf" && '#1C9AB7', color: this.state.currentPage === "view-pdf" && '#FFFFFF' }}
                        button
                        onClick={event => {
                          this.handleDrawerClose();
                          history.push("/view-pdf");
                          this.setState({ currentPage: 'view-pdf' })
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "view-pdf" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('webroutes.page.title.pdfList')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}
                  {role && Array.isArray(role) && role.includes('admin') &&
                    <div>
                      <Divider className={classes.divider} />s
                    <ListItem style={{ paddingTop: '8%', paddingBottom: '8%', backgroundColor: this.state.currentPage === "graderreport" && '#1C9AB7', color: this.state.currentPage === "graderreport" && '#FFFFFF' }}
                        button
                        onClick={(event) => {
                          this.handleDrawerClose();
                          history.push(`${process.env.PUBLIC_URL}/graderreport`);
                          this.setState({ currentPage: 'graderreport' })
                        }}>
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          primary={(
                            <Typography type="body2" style={{ color: this.state.currentPage === "graderreport" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('webroutes.page.title.graderReport')}
                            </Typography>
                          )}
                        />
                      </ListItem>
                    </div>

                  }

                  {role && Array.isArray(role) && role.includes("admin") && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "comparison-report" && '#1C9AB7', color: this.state.currentPage === "comparison-report" && '#FFFFFF' }}
                        button
                        onClick={event => {
                          this.handleDrawerClose();
                          history.push(`${process.env.PUBLIC_URL}/comparison-report`);
                          this.setState({ currentPage: 'comparison-report'})
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "comparison-report" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('common.page.title.comparisonReport')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}

                  {role && Array.isArray(role) && (role.includes("editor") || role.includes("user")) && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "doctranslate" && '#1C9AB7', color: this.state.currentPage === "doctranslate" && '#FFFFFF' }}
                        button
                        onClick={event => {
                          this.handleDrawerClose();
                          history.push("/doctranslate");
                          this.setState({ currentPage: 'doctranslate'})
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "doctranslate" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('webroutes.page.title.translateFile')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}
                  {role && Array.isArray(role) && (role.includes("editor") || role.includes("user")) && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "pdf-to-doc" && '#1C9AB7', color: this.state.currentPage === "pdf-to-doc" && '#FFFFFF' }}
                        button
                        onClick={event => {
                          this.handleDrawerClose();
                          history.push("/pdf-to-doc");
                          this.setState({ currentPage: 'pdf-to-doc'})
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "pdf-to-doc" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('webroutes.page.title.pdfToDoc')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}
                  {role && Array.isArray(role) && (role.includes("editor") || role.includes("user")) && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "pdf-upload" && '#1C9AB7', color: this.state.currentPage === "pdf-upload" && '#FFFFFF' }}
                        button
                        onClick={event => {
                          this.handleDrawerClose();
                          history.push("/pdf-upload");
                          this.setState({ currentPage: 'pdf-upload'})
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "pdf-upload" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('webroutes.page.title.pdfSentences')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}
                  {role && Array.isArray(role) && (role.includes("editor") || role.includes("user")) && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "viewtranslate" && '#1C9AB7', color: this.state.currentPage === "viewtranslate" && '#FFFFFF' }}
                        button
                        onClick={event => {
                          this.handleDrawerClose();
                          history.push("/viewtranslate");
                          this.setState({ currentPage: 'viewtranslate'})
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "viewtranslate" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('common.page.title.document')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}

                  {role && Array.isArray(role) && role.includes("admin") && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "userdirectory" && '#1C9AB7', color: this.state.currentPage === "userdirectory" && '#FFFFFF' }}
                        button
                        onClick={event => {
                          this.handleDrawerClose();
                          history.push("/userdirectory");
                          this.setState({ currentPage: 'userdirectory'})
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "userdirectory" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('userDirectory.page.label.userManagement')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}

                  {/* {role && Array.isArray(role) && !role.includes("analyzer") && !role.includes("admin") && !role.includes("user") && (
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
                            {translate('header.page.heading.qnA')}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )} */}

                  {role && Array.isArray(role) && role.includes("admin") && (
                    <div>
                      <Divider className={classes.divider} />
                      <ListItem
                        style={{ paddingTop: "8%", paddingBottom: "8%", backgroundColor: this.state.currentPage === "feedback" && '#1C9AB7', color: this.state.currentPage === "feedback" && '#FFFFFF' }}
                        button
                        onClick={event => {
                          this.handleDrawerClose();
                          history.push(`${process.env.PUBLIC_URL}/feedback`);
                          this.setState({ currentPage: 'feedback'})
                        }}
                      >

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="body2" style={{ color: this.state.currentPage === "feedback" ? "#FFFFFF" : "#000000", marginLeft: '6%' }}>
                              {translate('header.page.heading.feedBack')}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  )}

                  {/* <ListItem
                    style={{ paddingTop: "17%", paddingBottom: "17%", marginTop: "43%", marginLeft: "82%", width: "18%" }}
                    button
                    onClick={event => {
                      this.handleDrawerClose();
                    }}
                  >
                    <ListItemIcon>
                      <ChevronLeftIcon style={{ color: "white" }} />
                    </ListItemIcon>
                  </ListItem> */}
                </List>
              </Drawer>

              {/* {!dontShowHeader &&
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
              } */}
            </Grid>
          }
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(Header);
