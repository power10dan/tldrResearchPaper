import React from 'react';
import ExpansionPanel, {
		ExpansionPanelDetails,
		ExpansionPanelSummary,
		ExpansionPanelActions
	} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/style';
import PaperDependComp from './AppComponent/PaperDependComp.js';
import Button from "material-ui/Button";

export const style = theme=>({
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
	return(
		<div>
			<ExpansionPanel>
				<ExpansionPanelSummary>
					<Typography>

					</Typography>
					<Typography>


					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<PaperDependComp 



					/>
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


