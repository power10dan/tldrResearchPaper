import React, { Fragment} from 'react';
import Drawer from 'material-ui/Drawer';
import List,  { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import classNames from 'classnames';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Face from 'material-ui-icons/Face';
import FindInPage from 'material-ui-icons/FindInPage';

const drawerWidth = 240;

const styleOfSideBar = theme => ({
	root: {
		width: '100%',
		height: "350px",
		marginTop: theme.spacing.unit * 3,
		zIndex: 1,
		marginTop: "0px",
	},
	appFrame: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		height: "350px",
	},

	appBar: {
		position: 'absolute',
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		
	},

	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},

	menuButton: {
		marginLeft: 20,
		marginRight: 36,
	},

	hide: {
		display: 'none',
	},

	drawerPaper: {
		position: 'relative',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		
	},

	drawerPaperClose: {
		width: 60,
		overflowX: "hidden",
		height: "800px",
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},

	drawerInner: {
	    // Make the items inside not wrap when transitioning:
	    width: drawerWidth,
	},

	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},

	iconButtonProps:{
		marginRight: "-95px",
		marginTop: "15px",
	},

	toolBarBackground:{
		backgroundColor: "#FF8F00"
	},

	buttonAttr: {
		verticalAlign: "text-top"
	},

	sizeIcon:{
		display: "inline-block"
	},

	subTitleStyle: {
		paddingTop: "10px",
		fontFamily: "Dosis, sans-serif",
		fontSize: "30px",
		paddingBottom: "12px",
		paddingTop: "15px",
		marginLeft: "-65px",
		marginBottom: "-72px"
	},
	titleBarStyle: {
    	flex: 1,
  	},
});

const DashboardAppBar = (props)=>{
	const {classes } = props;
	// we don't want to wrap app bar in another container, so we use React Fragment here
	return(
		<Fragment>
			<AppBar className={classNames(classes.appBar, props.open && classes.appBarShift)}>
	            <Toolbar disableGutters={!props.open} className={classes.toolBarBackground}>

		            <IconButton
		                color="contrast"
		                aria-label="open drawer"
		                onClick={props.handleDrawerOpen}
		                className={classNames(classes.menuButton, props.open && classes.hide)}
		             >
		            <MenuIcon />
		            </IconButton>
		              <Typography type="title" color="inherit" noWrap>
		                	{props.actionBarTitle}
		              </Typography>
		        </Toolbar>
	        </AppBar>
	    </Fragment>
	);
}

const SideDrawer = (props)=>{
	const { classes, theme} = props;
	return(
		<Fragment>
			 <Drawer
	            type="permanent"
	            classes={{
	              paper: classNames(classes.drawerPaper, !props.open && classes.drawerPaperClose),
	            }}
	            open={props.open}
	          >
	            <div className={classes.drawerInner}>
	            	   <div className={classes.sizeIcon}>
		             	   <Typography className={classes.subTitleStyle}>
			               		Tl;dr Plz?
			               </Typography>
			               <div className={classes.drawerHeader}>
			                <IconButton onClick={props.handleDrawerClose} className={classes.iconButtonProps}>
			                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
			                </IconButton>
			              </div>
			            </div>
		              
		              <Divider  />
		              <List className={classes.buttonAttr}>
			              {
			             	props.FilterData.map(elem=>(
			             		<ListItem button>
			             		  {
			             		  		elem === "Author" ? <Face /> : <FindInPage />
			             		  }
						          <ListItemText primary={elem} />
						        </ListItem>
			             	))
			             } 
				      </List>
	            </div>
	          </Drawer>
	    </Fragment>
	);
}

const DashBoardComp = (props)=>{
	const {classes} = props;
	return (
		<div className={classes.root}>
			<div className={classes.appFrame}>
				<DashboardAppBar
					{...props}
				/>

				<SideDrawer 
					{...props}
				/>
				 <Divider className={classes.dividerBottom} />
			</div>
		</div>
	);
}

const DashBoardComps = withStyles(styleOfSideBar, {withTheme:true})(DashBoardComp);
export default DashBoardComps;