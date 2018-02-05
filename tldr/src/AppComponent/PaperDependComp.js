import React, {Fragment} from 'react';
import ExpansionPanel, {
		  ExpansionPanelSummary,
		  ExpansionPanelDetails,
		} from 'material-ui/ExpansionPanel';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import GraphComp from './PaperGraph.js';

const style = theme=>({
	 root: {
	    width: '100%',
	  },
	  heading: {
	    fontSize: theme.typography.pxToRem(15),
	  },
	  secondaryHeading: {
	    fontSize: theme.typography.pxToRem(15),
	    color: theme.palette.text.secondary,
	  },
	  icon: {
	    verticalAlign: 'bottom',
	    height: 20,
	    width: 20,
	  },
	  details: {
	    alignItems: 'center',
	  },
})

function PaperExpansionLabel(props){
	const{ classes } = props;
	return(
		<Fragment>
			<ExpansionPanel 
			    expanded={props.expanded === 'panel1'} 
			    onChange={this.handleChange('panel1')}
			>
		        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
			         <div className={classes.column}>
			            <Typography className={classes.heading}>
			            	props.paperTitle
			            </Typography>
			         </div>
			         <div className={classes.column}>
			            <Typography className={classes.secondaryHeading}>
			            	props.authorOfPaper
			            </Typography>
			         </div>
	       		</ExpansionPanelSummary>
	       		<ExpansionPanelDetails>
		            <GraphComp
		            	data = {props.data}
		            	configType = {props.configGraph}
		            />
		        </ExpansionPanelDetails>\
			</ExpansionPanel>
		</Fragment>
	);
}

function PaperExpansionPanel(props){
	const {classes} = props;
	return(
		<div className={classes.root}>
			{
				props.sections.map(elem => (
					<Fragment>
						<Typography className={classes.heading}>{props.sectionTitle}</Typography>
						<PaperExpansionLabel
							{...props}
						/>
					</Fragment>
				))
			}
		</div>
	);
}

export default withStyles(style)(PaperExpansionPanel);