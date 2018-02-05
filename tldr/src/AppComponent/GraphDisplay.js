import React from 'react';
import ExpansionPanel, {
		ExpansionPanelDetails,
		ExpansionPanelSummary,
		ExpansionPanelActions
	} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PaperDependComp from './PaperDependComp.js';
import Button from "material-ui/Button";

export const styles = theme=>({
	panelLength: {
		width: "800px",
	},

	paperSectionStyle: {
		marginRight: "450px",
		fontFamily: 'Dosis, sans-serif',
		fontSize: "18px",
		marginBottom: "20px"
	}, 
});

export const PaperPanel = (props)=>{
	const {classes } = props;
	console.log("Paper panel graph");
	console.log(props.data);
	return(
		<div>
			<ExpansionPanel>
				<ExpansionPanelSummary>
					<Typography>
						{props.paperTitle}
					</Typography>
					<Typography>
						{props.paperAuxilliaryInfo}
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>

				</ExpansionPanelDetails>
				<ExpansionPanelActions>
					<Button>
						Download paper 
					</Button>
				</ExpansionPanelActions>
			</ExpansionPanel>
		</div>
	);
}


