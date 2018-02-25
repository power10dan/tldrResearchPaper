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
	}
}


const SearchRecView = (props)=>{
	const { classes } = props;
	return(
		<div className={classes.divStyle} >
			<Typography className={classes.typeStyle}>
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

			<Typography className={classes.typeStyle} >
				Your Recommended Result 
			</Typography>

		</div>
	)
}

export default withStyles(styles)(SearchRecView)