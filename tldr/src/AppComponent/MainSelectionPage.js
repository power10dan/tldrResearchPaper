import React, {Fragment} from 'react';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
	  ExpansionPanelSummary,
	  ExpansionPanelDetails,
	  ExpansionPanelActions
	} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';

const conferencePanelStyle = theme=>({
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

	buttonGetPaper: {
		marginTop: "15px",
		marginLeft: "700px",
		width: "10px",
		height: "10px",
	}
})

const ConferencePaperPanels = (props)=>{
	const {classes} = props;
	return(
		<Fragment>
		{
			props.data.conferenceData.map((elem,idx)=>{
				< ExpansionPanel 
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
						
					</ExpansionPanelDetails>
					<ExpansionPanelActions>
					    <Button 
					      	size="small" 
					       	color="primary"
					       	onClick={props.onClickDownload}
				        >
				        	Download Paper 
				        </Button>
				    </ExpansionPanelActions>
				</ExpansionPanel>
			})
		}
		</Fragment>
	);
}

export default withStyles(conferencePanelStyle)(ConferencePaperPanels);
