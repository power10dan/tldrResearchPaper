import React, { Fragment, Component } from 'react';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
		ExpansionPanelDetails,
		ExpansionPanelSummary
	} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styleOfExpansionPanel = theme =>({
	root: {
		width: "100%"
	},

	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0
	},

	secondaryHeading:{
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary
	}
});

class ConferenceExpansionPanel extends Component{
	constructor(props){
		super(props);
		this.state={
			expanded: null,
		}
	}

	handlePanelExpand = panel =>(event, expanded) =>{
		this.setState({
			expanded: expanded ? panel : false 
		})
	}

	render (){
		const { classes } = this.props;
		const { expanded } = this.state;
		return(
			<div className={classes.root}>
			   {
				this.props.conferences.map((elem) =>(
					<ExpansionPanel 
						expanded={expanded === {elem}} 
						sonChange={this.handleChange(elem)}
					>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
							<Typography className={classes.heading} >
								{this.props.conferenceTilte}
							</Typography>
							<Typography className={classes.secondaryHeading} >
								{ this.props.conferenceType } 
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Typography>
								{this.props.conferenceDesc}
							</Typography>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				))
			   }
			</div>
		)
	}
}

export default withStyles(styleOfExpansionPanel)(ConferenceExpansionPanel);