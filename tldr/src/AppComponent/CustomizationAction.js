import React, {Fragment} from "react";
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import Card, {CardContent, CardHeader, CardActions, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import ConferenceExpansionPanel from './ExpansionPanelConferences.js';

export const styles = theme =>({
	root: {
		width: '550px',
		height: "100px",
		marginTop: "-275px",
		marginLeft: "250px",
	},

	cardProps: {
		marginBottom: "20px",
		width: "260px",
		height: "240px",
	},

	tutorialTextStyle: {
		fontFamily: 'Dosis, sans-serif',
		fontSize: "28px",
		marginLeft: "-200px",
		marginBottom: "25px"
	},

	cardContent: {
		paddingTop: "25px",
		fontFamily: 'Dosis, sans-serif',
		fontSize: "20px",
	},

	divProp:{
		marginBottom: "20px",
		marginLeft: "150px",
		display: 'inline'
	},

	 gridList: {
	    width: '750px',
	    overflowY: "hidden"
	 },

	 dividerProps:{
	 	width: "560px",
	 	marginTop: "-20px",
	 	marginBottom: "20px"
	 },

	  mediaImg: {
	    height: 165,
	    marginTop: "-15px",
	    borderRadius: "50%",
	    backgroundPosition: "center 1px"
	  },
});
// TODO: Make Select your favorite confernece expansion panel,
// and make what type of researcher are you grid view
const ResearcherSelection = (props)=>{
	const {classes} = props;
	return(
		<GridList 
			cellHeight={240}  
			cols={2.5} 
			height={550} 
			className={classes.gridList}
		>
			{ 	
			 	props.element.selectionContent.map((content, idx)=> (
				   	<Grid item className={classes.gridList}>
				       	<Card className={classes.cardProps}>      		
					      	<CardContent className={classes.cardContent} >
					        	<CardMedia
						    		className={classes.mediaImg}
								    image={props.element.selectionImage[idx]}
								    title="Contemplative Reptile"
								/>
							        			 
					        	<Typography className={classes.cardContent}>
							 		{content}
								</Typography> 
				    		</CardContent>
				       	</Card>
				    </Grid>
				))
			}
		</GridList>			
	)
}

export const CustomizationList = (props)=>{
	const { classes } = props;
	return(
		<div className={classes.root} >
			{	
				props.data.map(elem=>(
					<div className={classes.divProp}>
					    <Typography className={classes.tutorialTextStyle}>
						 		{elem.sectionLabel}
						</Typography> 
						<Divider className={classes.dividerProps} />
						{
							props.dataSelect === "ConfSelect" ? <ConferenceExpansionPanel {...props}  /> : <ResearcherSelection
																												{...props}
																												element={elem}
																											/>
						}
					</div>
				))
			}			
		</div>
	);
}
