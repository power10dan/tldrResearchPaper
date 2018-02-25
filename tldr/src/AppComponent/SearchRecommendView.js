import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {
	divStyle: {
		marginLeft: "60px",
		marginTop: "-280px",
		textAlign: "left"
	},

	typeStyle: {
		fontFamily: 'Dosis, sans-serif',
		fontSize: "28px",
		marginBottom: "20px"
	},

	typeStyleTwo: {
		fontFamily: 'Dosis, sans-serif',
		fontSize: "28px",
		color: "#FF8F00",
		marginBottom: "20px"
	}
}


const SearchRecView = (props)=>{
	const { classes } = props;
	if(props.searchResult === undefined || props.searchRecommended === undefined){
		return null 
	}
	return(
		<div className={classes.divStyle} >
			<Typography className={classes.typeStyleTwo}>
				Your Searched Result
			</Typography>
			{
				props.searchResult.map((data, idx)=>{
					return(
						<Typography className={classes.typeStyle}>
							{data.p_title}
						</Typography>
					)
				})
			}

			<Typography className={classes.typeStyleTwo} >
				Your Recommended Result 
			</Typography>
			{
				props.searchRecommended.map((data, idx)=>{
					return(
						<Typography className={classes.typeStyle}>
							{data.title[0]}
						</Typography>
					)
				})
			}
			

		</div>
	)
}

export default withStyles(styles)(SearchRecView)