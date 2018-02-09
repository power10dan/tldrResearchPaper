import React, { Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
		ExpansionPanelDetails,
		ExpansionPanelSummary,
		ExpansionPanelActions
	} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';

const styles = theme =>({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '10.33%',
		flexShrink: 0,
		marginRight: "170px",
		textAlign: "left"
	},

	secondaryHeading:{
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary
	},

	expansionPanelProps:{
	 	background: "#FFA726"
	},

	expansionPanelDetail:{
	 	marginLeft: "40px",
	 	textAlign: "left"
	},

	chipProps: {
	    marginTop: "10px"
	},
	
	groupChipStyle: {
	 	marginLeft: "-520px",
	},

	buttonNext: {
		marginTop: "15px",
		marginLeft: "700px",
		width: "10px",
		height: "10px",
	}
})

const ExpansionPanelStudent = (props)=>{
	const{classes} = props;
	return(
		<Fragment>
			{
				props.data.conferences.map((elem, idx) =>(
					<ExpansionPanel 
						expanded={props.expanded === elem} 
						onChange={props.handlePanelExpand(elem)}
					>
						<ExpansionPanelSummary 
							key={elem}
							expandIcon={<ExpandMoreIcon />} 
								
						>
							<Typography 
								className={classes.heading} 
							>
								{elem}
							</Typography>
							<Typography className={classes.secondaryHeading} >
								{ props.data.conferenceType[idx] } 
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Typography 
								className={classes.expansionPanelDetail}
							>
								{props.data.description[idx]}
							</Typography>
						</ExpansionPanelDetails>
						<ExpansionPanelActions>
				            <Button 
					          	size="small" 
					          	color="primary"
					          	onClick={props.onClickUnSelect}
				            >
					         	 Unselect Conference  
					        </Button>
					        <Button 
						      	size="small" 
						       	color="primary"
						       	onClick={props.onClickSelect}
					        >
					        	Select Conference  
					        </Button>
					    </ExpansionPanelActions>
				    </ExpansionPanel>
				))
			}  
			<div className={classes.groupChipStyle}>
				{	
					props.selectedConferences.map(data=>{
				    	return(
				    		<Chip
				    			key={data}
				    			label={data}
				    			className={classes.chipProps}
				    		/>
				    	)
				    }) 
			    }  
			</div>

			<Button 
				raised 
				color="accent" 
				className={classes.buttonNext}
				onClick={props.updatePage}
			>
			   	Next
			</Button>

		</Fragment>
	)
}

export default withStyles(styles)(ExpansionPanelStudent);
