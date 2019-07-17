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

import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { menuFolderListItems, otherMenuFolderListItems } from './tileData';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SearchIcon from '@material-ui/icons/AddToQueue';
import StarIcon from '@material-ui/icons/Star';
import SvgIcon from '@material-ui/icons/Accessibility';
import LaunchIcon from '@material-ui/icons/Launch';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import history from "../../../../web.history";


const styles = {
	root: {
		flexGrow: 1
	},
	flex: {
		flex: 1
	}
};

class Header extends React.Component {
	state = {
		open: false,
		auth: true,
		anchorEl: null
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
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

	render() {
		const { classes, theme } = this.props;
		const { auth, anchorEl, open } = this.state;
		const openEl = Boolean(anchorEl);

		return (
			<div>
				<AppBar position="fixed" className={classNames(classes.appBar, open && classes.appBarShift)}>
					<Toolbar disableGutters={!open}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerOpen}
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="inherit" className={classes.flex}>
						Aanuvada Demo
						</Typography>
						{auth && (
							<div>
								<IconButton
									aria-owns={openEl ? 'menu-appbar' : null}
									aria-haspopup="true"
									onClick={this.handleMenu}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
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
									<MenuItem onClick={()=>{this.handleClose();history.push(`${process.env.PUBLIC_URL}/`)}}>Logout</MenuItem>
								</Menu>
							</div>
						)}
					</Toolbar>
				</AppBar>
				<Drawer
					position="fixed"
					variant="permanent"
					classes={{
						paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
					}}
					open={open}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={this.handleDrawerClose} style={{ color: 'white' }}>
							{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</div>
					<Divider />
					<List>
						<ListItem button onClick={()=>{this.handleDrawerClose();history.push(`${process.env.PUBLIC_URL}/dashboard`)}}>
							<ListItemIcon>
								<SendIcon style={{ color: 'white' }} />
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
						<ListItem button onClick={()=>{this.handleDrawerClose();history.push(`${process.env.PUBLIC_URL}/dashboard-eng`)}}>
							<ListItemIcon>
								<SendIcon style={{ color: 'white' }} />
							</ListItemIcon>
							<ListItemText
								disableTypography
								primary={(
									<Typography type="body2" style={{ color: '#FFFFFF' }}>
										Translate(Eng to Hin)
          							</Typography>
								)}
							/>
						</ListItem>
						<ListItem button onClick={()=>{this.handleDrawerClose();history.push(`${process.env.PUBLIC_URL}/dashboard-tamil`)}}>
							<ListItemIcon>
								<SendIcon style={{ color: 'white' }} />
							</ListItemIcon>
							<ListItemText
								disableTypography
								primary={(
									<Typography type="body2" style={{ color: '#FFFFFF' }}>
										Translate(Eng to Tamil)
          							</Typography>
								)}
							/>
						</ListItem>
						
						<ListItem button onClick={()=>{this.handleDrawerClose();history.push(`${process.env.PUBLIC_URL}/translations`)}}>
							<ListItemIcon>
								<SearchIcon style={{ color: 'white' }} />
							</ListItemIcon>
							<ListItemText
								disableTypography
								primary={(
									<Typography type="body2" style={{ color: '#FFFFFF' }}>
										Translations
          							</Typography>
								)}
							/>
						</ListItem>
						<ListItem button onClick={()=>{this.handleDrawerClose();history.push(`${process.env.PUBLIC_URL}/corpus`)}}>
							<ListItemIcon>
								<LaunchIcon style={{ color: 'white' }} />
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

							<ListItem button onClick={()=>{this.handleDrawerClose();history.push(`${process.env.PUBLIC_URL}/qna`)}}>
							<ListItemIcon>
								<StarIcon style={{ color: 'white' }} />
							</ListItemIcon>
							<ListItemText
								disableTypography
								primary={(
									<Typography type="body2" style={{ color: '#FFFFFF' }}>
										QnA
          							</Typography>
								)}
							/>
						</ListItem>
						{/* <ListItem button onClick={()=>{this.handleDrawerClose();history.push(`${process.env.PUBLIC_URL}/benchmarking`)}}>
							<ListItemIcon>
								<InboxIcon style={{ color: 'white' }} />
							</ListItemIcon>
							<ListItemText
								disableTypography
								primary={(
									<Typography type="body2" style={{ color: '#FFFFFF' }}>
										Bench Marking
          							</Typography>
								)}
							/>
						</ListItem> */}
					</List>
				</Drawer>
			</div>
		);
	}
}

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Header);
