import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { AppStateActionCreator } from '../Redux/Actions/ActionCreators.js';
import {CURR_PAGE, PREF_CONFERENCE } from '../Redux/Actions/ActionConstants.js';
import { connect } from 'react-redux';
import ExpansionPanelStudent from './ExpansionPanelStudents.js';
import CheckBoxConferences from './CheckBoxCard.js';

const styleOfExpansionPanel = theme =>({
	root: {
		width: "800px",
		marginLeft: "150px",
		marginTop: "-250px"
	},


	sectionLabel: {
		marginRight: "450px",
		fontFamily: 'Dosis, sans-serif',
		fontSize: "28px",
		marginBottom: "20px"
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
			selectedConferences: [],
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
		let payLoadNextPage = 3;
		let payLoadConferences = this.state.selectedConferences;
		this.props.uploadPreference(payLoadConferences);
		this.props.updatePage(payLoadNextPage);
	}

	render (){
		const { classes } = this.props;
		const { expanded } = this.state;
		let Selection = null;

		if(this.state.typeResearcher === "Professor" 
			|| this.state.typeResearcher === "Post-Doc"){
			
			Selection = <CheckBoxConferences 
							conferences = {this.props.data.conferences}
							conferenceImage = {this.props.data.conferenceImage}
						/>
		} else {
			Selection = <ExpansionPanelStudent
							data={this.props.data}
							expanded={this.state.expanded}
							handlePanelExpand = {this.handlePanelExpand}
							onClickSelect={this.onClickSelect}
							onClickUnSelect={this.onClickUnSelect}
							selectedConferences={this.state.selectedConferences}
							updatePage={this.handleNext}
						/>
		}
		
		return(
			<div className={classes.root}>
				<div className={classes.divLabelDisplay}>
					<Typography className={classes.sectionLabel}>
						{this.props.data.conferenceLabel}
					</Typography>
					{ Selection }
				</div>
			</div>
		);
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
