import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typogaphy from 'material-ui/Typography';

const styles = theme => ({
	card : {
		width: 145,
		height: 175,
		color: "#3F51B5"
	},

	title:{
		marginLeft: 15,
		fontSize: 18,
		color: theme.palette.text.primary
	},
});

const PaperCard = (props)=>{
	const {classes} = props;
	return(
		<div>
			<Card className={classes.card} >
				<CardHeader> 
				<Typography type="h3" className={classes.title} >
						{ props.titleOfPaper }
				</Typography>
				</CardHeader>
				<CardContent>
					<Typography type="body" className={classes.title} >
						Summary: { props.summary }
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
}

export default withStyles(styles)(PaperCard);