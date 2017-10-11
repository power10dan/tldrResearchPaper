import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

// TODO: Under Construction
const InnerCards = (props) => {
	return(
		<div>	
			<Card classNames={classes.card}>
				<Typography type="headline"> Summary </Typography>
				<Typography component="p"> Place holder text </Typography>
			</Card>

		</div>

	)
}