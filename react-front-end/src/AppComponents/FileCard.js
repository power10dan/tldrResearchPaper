import React from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = theme => ({
	card: {
		height: 175,
		width: 175,
		color: "#3F51B5"
	}

	title: {
		marginBottom: 16,
		fontSize:14,
		color: "#E8EAF6"
	}
});

const FileCardView =  (props) =>{
	return (
		<div>
			<Card className={props.classes.card} >
				<CardContent>
					<Typography type="h2" className={props.classes.title}>
			            {props.title}
			        </Typography>
				</CardContent>
			</Card>
		</div>
	);

}