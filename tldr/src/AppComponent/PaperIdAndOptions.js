import React, { Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
	cardHeaderStyle:{
		width: "270px",
		backgroundColor: "#3F51B5"
	},

	titleStyle:{
		color: "#FFFFFF",
		backgroundColor: "#607D8B",
		height: "85px",
		fontFamily: 'Dosis, sans-serif',
		fontSize: "16px",
		textAlign: "left",
		paddingLeft: "10px",
		paddingTop:"25px"
	},

	authorStyle:{
		fontFamily: 'Dosis, sans-serif',
		fontSize: "18px",
		textAlign: "left",
		color: "#607D8B"
	},

	buttonTitleStyle:{
		fontFamily: 'Dosis, sans-serif',
		fontSize: "12px",
	},

	cardStyle:{
		width: "430px",
		height: "280px",
		marginLeft: "20px",
	},

	cardActionStyle:{
		marginTop: "50px",
		marginLeft: "-5px"
	}
}

const PaperIdAndOptionsPanelCard = ( props ) => {
	const { classes } = props;
	let authorStr = "Author:".concat(" ", props.authorTitles);
	return(
		<Fragment>
			<Card className={classes.cardStyle} >
				<Typography className={classes.titleStyle}>
						{props.titleOfPaper}
				</Typography>
				<CardContent>
					{
						props.typeOfPap === "Uploaded" ? <Typography className={classes.authorStyle}>
															{ authorStr }
														</Typography> : <Typography 
														 				  className={classes.authorStyle}>
																			No paper available. Please
																			upload this paper using the
																			upload button.
																		</Typography>


					}
				</CardContent>
				<CardActions className={classes.cardActionStyle}>
					{
						props.typeOfPap === "Uploaded" ? <Button 
														 	className={classes.buttonTitleStyle}
														 	color={"accent"}
														 	onClick={props.downloadPaper}
														>
															Download Paper 
														</Button> : null

					}
				</CardActions>
			</Card>
		</Fragment>
	)
}

const PaperPanel =  withStyles(styles)(PaperIdAndOptionsPanelCard);
export default PaperPanel