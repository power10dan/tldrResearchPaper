import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
		ExpansionPanelDetails,
		ExpansionPanelSummary,
		ExpansionPanelActions
	} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import { AppStateActionCreator } from '../Redux/Actions/ActionCreators.js';
import {CURR_PAGE, PREF_CONFERENCE } from '../Redux/Actions/ActionConstants.js';
import { connect } from 'react-redux';
import Chip from 'material-ui/Chip';

export const styleOfExpansionPanel = theme =>({
	root: {
		width: "800px",
		marginLeft: "150px",
		marginTop: "-250px"
	},

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

	sectionLabel: {
		marginRight: "450px",
		fontFamily: 'Dosis, sans-serif',
		fontSize: "28px",
		marginBottom: "20px"
	},

	 buttonProps:{
	 	position: "absolute",
	    right: "0px",
	    width: "1px",
	    marginRight: "85px",
	    marginTop: "-5px"
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
	 	marginLeft: "700px",
	 	marginTop: "-90px",
	 },

	 divLabelDisplay:{
	 	display: "inline-block",
	 	marginBottom: "-155px"
	 }
});

class ConferenceExpansionPanel extends Component{
	constructor(props){
		super(props);
		this.state={
			expanded: null,
			isSelectedColor: "#000000",
			typeResearcher: props.typeOfResearcher,
			selectedConferences: []
		}
	}

	handlePanelExpand = panel =>(event, expanded) =>{
		this.setState({
			expanded: expanded ? panel : false
		});
	}

	onClickSelect = (event)=>{
		let confSelect = this.state.selectedConferences;
		if(this.state.selectedConferences.indexOf(this.state.expanded) === -1){
			confSelect.push(this.state.expanded);
			this.setState({selectedConferences: confSelect});
		}
	}

	onClickUnSelect = (event)=>{
		let confSelect = this.state.selectedConferences;
		if(confSelect.indexOf(this.state.expanded) > -1){
			delete confSelect[confSelect.indexOf(this.state.expanded)];
			this.setState({selectedConferences: confSelect});
		}
	}

	handleNext = (event)=>{
		let payLoadNextPage = 2;
		let payLoadConferences = this.state.selectedConferences;
		this.props.uploadPreference(payLoadConferences);
		this.props.updatePage(payLoadNextPage);
	}

	render (){
		const { classes } = this.props;
		const { expanded } = this.state;
		return(
				<div className={classes.root}>
					<div className={classes.divLabelDisplay}>
						<Typography className={classes.sectionLabel}>
							{this.props.data.conferenceLabel}
						</Typography>
						<Button
							raised
							color="accent"
							className={classes.buttonNext}
							onClick={this.handleNext}
						>
					   		 Next
					    </Button>
					</div>

					{
						this.props.data.conferences.map((elem, idx) =>(
							<ExpansionPanel
								expanded={expanded === elem}
								onChange={this.handlePanelExpand(elem)}
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
										{ this.props.data.conferenceType[idx] }
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography
										className={classes.expansionPanelDetail}
									>
										{this.props.data.description[idx]}
									</Typography>
								</ExpansionPanelDetails>
								<ExpansionPanelActions>
						            <Button
							          	size="small"
							          	color="primary"
							          	onClick={this.onClickUnSelect}
						            >
							         	 Unselect Conference
							        </Button>
							        <Button
								      	size="small"
								       	color="primary"
								       	onClick={this.onClickSelect}
							        >
							        	 Select Conference
							        </Button>
							    </ExpansionPanelActions>
							</ExpansionPanel>
						))
					}
					<div className={classes.groupChipStyle}>
						{
							this.state.selectedConferences.map(data=>{
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
				</div>
		)
	}
}

const mapStateToProps = (state)=>{
	const {
		typeOfResearcher
	} = state.ReducerAppState;

	return {
		typeOfResearcher
	};
}

const mapDispatchToProps = (dispatch)=>{
	return ({
		updatePage: (payLoad)=>{dispatch(AppStateActionCreator(CURR_PAGE, payLoad));},
		uploadPreference: (payLoad)=>{dispatch(AppStateActionCreator(PREF_CONFERENCE, payLoad));}
	});
}

let ConfExpansionPanel = connect(mapStateToProps, mapDispatchToProps)(ConferenceExpansionPanel);
export default withStyles(styleOfExpansionPanel)(ConfExpansionPanel);
