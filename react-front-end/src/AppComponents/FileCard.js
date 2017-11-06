import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import stylesFileCard from './AppComponentStyles/FileCardStyle.js';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';


// TODO: under construction
const PaperSheetWithCards = (props) => {
	return(
		<div>
			<Paper className = {props.classes.root} square={false} >
				<Typography type="headline" component="h3">
					Title 
				</Typography>
				
				<Button> Customize </Button> 
				
				<Divider light />
			</Paper>


		</div>
	)
};

export default withStyles(stylesFileCard)(PaperSheetWithCards);
