import React from 'react';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemText, ListSubheader, ListItemIcon} from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Favorite from 'material-ui-icons/Favorite';
import InsertDriveFile from 'material-ui-icons/InsertDriveFile';
import RemovedRedEye from 'material-ui-icons/RemoveRedEye';
import styleList from './AppComponentStyles/ListItemStyles.js'

const NestedList = (props) => {
	return (
			<div className={props.classes.root}>
				<List className={props.classes.root} >
				        <ListItem button >
					          <ListItemIcon>
					            <Favorite />
					          </ListItemIcon>
				          	  <ListItemText primary="Favorite"  />
				        </ListItem>
				       
				        <ListItem button onClick={this.handleClick} >
				        	  <ListItemIcon>
					            <InsertDriveFile />
					          </ListItemIcon>
				          <ListItemText primary="Papers"  />
	
				        </ListItem>
				        	<ListItem button onClick={this.handleClick} >
				        		<ListItemIcon>
					            	<RemovedRedEye />
					          	</ListItemIcon>			          
				          	<ListItemText primary="Reading List"  />
				        </ListItem>
		        	</List>
		    </div>
		
		);

}


export default withStyles(styleList)(NestedList)
