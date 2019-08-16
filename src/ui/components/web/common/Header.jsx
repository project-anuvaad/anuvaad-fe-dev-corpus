

						import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SearchIcon from '@material-ui/icons/AddToQueue';
import StarIcon from '@material-ui/icons/FiberNew';
import SvgIcon from '@material-ui/icons/Accessibility';
import LaunchIcon from '@material-ui/icons/Launch';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import history from "../../../../web.history";
import { Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';


const styles = {
	root: {
		flexGrow: 1
	},
	flex: {
		flex: 1,
		marginLeft:'2%'
	}
};

class Header extends React.Component {
	state = {
		open: false,
		auth: true,
		anchorEl: null,
		heading: 'Translation',
		name:''
		
		

	};
	componentDidMount(){
			this.setState({name: localStorage.getItem('userDetails')})
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerTranslate = () => {
		
		this.setState({ 
			open: false,
			heading: 'Translation'
		 });
	};

	handleDrawerDoc = () => {
		
		this.setState({ 
			open: false,
			heading: 'Documents'
		 });
	};
	handleDrawerClose = () => {
		
		this.setState({ 
			open: false
		 });
	};

	handleChange = (event, checked) => {
		this.setState({ auth: checked });
	};

	handleMenu = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};
	handleClick=()=>{

	}

	render() {
		const { classes, theme } = this.props;
		const { auth, anchorEl, open } = this.state;
		const openEl = Boolean(anchorEl);
		console.log("name",this.state.name)
		return (
			<div>
				<AppBar position="fixed" className={classNames(classes.appBar, open && classes.appBarShift)}>
					<Toolbar disableGutters={!open}>
						{/* <IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerOpen}
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton> */}
						<Typography variant="title" color="inherit" className={classes.flex}>
						{this.state.heading}
						</Typography>
						{this.state.drawerClose}
						{auth && (
							<div style={{
								position: 'absolute',
								
								top:'10%',
								right:'50px'
							}}>
								<Fab
									aria-owns={openEl ? 'menu-appbar' : null}
									aria-haspopup="true"
									onClick={this.handleMenu}
									color="primary"
									size="medium">
									{this.state.name}	
								</Fab>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									open={openEl}
									onClose={this.handleClose}
								>
									<MenuItem onClick={()=>{this.handleClose();history.push(`${process.env.PUBLIC_URL}/logout`)}}>Logout</MenuItem>
								</Menu>
							</div>
						)}
					</Toolbar>
				</AppBar>
				<div>
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
		  marginTop="10%"
          
          classes={{
            paper: classes.drawerPaper
          }}
        >

				<List>
					<ListItem >
							
							<ListItemText
								disableTypography
								primary={(
									<Typography type="body2" style={{ color: '#FFFFFF', paddingBottom:'2%',marginLeft:'21%'}} variant="title" color="inherit" className={classes.flex}>
										Anuvaad
          							</Typography>
								)}
							/>
						</ListItem>
						<Divider />
						<ListItem style={{paddingTop:'8%',paddingBottom:'8%'}} button onClick={()=>{this.handleDrawerClose();history.push(`${process.env.PUBLIC_URL}/dashboard-tamil`)}}>
							<ListItemIcon>
							<SearchIcon style={{ color: 'white'}} />
							</ListItemIcon>
							<ListItemText
								disableTypography
								primary={(
									<Typography type="body2" style={{ color: '#FFFFFF'}}>
										Translator
          							</Typography>
								)}
							/>
						</ListItem>
						<ListItem style={{paddingTop:'8%',paddingBottom:'8%'}} button onClick={()=>{this.handleDrawerClose();history.push(`${process.env.PUBLIC_URL}/newcorpus`)}}>
							<ListItemIcon>
								<StarIcon style={{ color: 'white' }} />
							</ListItemIcon>
							<ListItemText
								disableTypography
								primary={(
									<Typography type="body2" style={{ color: '#FFFFFF' }}>
										Corpus
          							</Typography>
								)}
							/>
						</ListItem>
						<ListItem style={{paddingTop:'8%',paddingBottom:'8%'}} button onClick={()=>{this.handleDrawerClose();history.push(`${process.env.PUBLIC_URL}/corpus`)}}>
							<ListItemIcon>
								<SendIcon style={{ color: 'white' }} />
							</ListItemIcon>
							<ListItemText
								disableTypography
								primary={(
									<Typography type="body2" style={{ color: '#FFFFFF' }}>
										Corpus List
          							</Typography>
								)}
							/>
						</ListItem>

						

						<ListItem style={{paddingTop:'17%',paddingBottom:'17%',marginTop:'43%',marginLeft:'82%'}} button onClick={(event)=>{this.handleDrawerClose();}}>
							<ListItemIcon>
								<ChevronLeftIcon style={{ color: 'white'}} />
							</ListItemIcon>
						</ListItem>
						</List>
          {/* <List>
            {["Components"].map((text, index) => (
              <ListItem button >
                <ListItemText primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{text}</Typography>} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List >
            {["1.Header Image (NA)", "2.Header Text", "3.Title", "4.List Items", "5.Paragraph"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{text}</Typography>}/>
              </ListItem>
            ))}
		  </List> */}
		  

        </Drawer>
			
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          {this.state.open ? '' : (
            <Button
            color='primary'
            variant="contained"
            className={classes.buttonRight}
              
              
              
              onClick={this.handleDrawerOpen}
            >
                <ChevronRightIcon/>
              
            </Button>
          )}
          <div className={classes.drawerHeader} />

          
        </main>
      {/* </div> */}
      {/* </Grid> */}
      </Grid>
      </div>
    
			</div>
		);
	}
}

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Header);
