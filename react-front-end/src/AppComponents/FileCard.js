import React from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = theme => ({
	card: {
		borderRadius: "25px",
		height: 405,
		width: 200,
		color: "#3F51B5"
	},

	title: {
		marginBottom: 16,
		fontSize:16,
		color: "#E8EAF6"
	},

	summaryText:{
		marginBottom: 16,
		fontSize:11,
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
			        <Typography type="h2" className={props.classes.summaryText}>
			            {props.summaryText}
			        </Typography>
				</CardContent>
			</Card>
		</div>
	);
}

export default withStyles(styles)(FileCardView);