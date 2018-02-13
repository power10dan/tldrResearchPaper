import React, {Fragment} from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import GridList from 'material-ui/GridList';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import { connect } from 'react-redux';
import { AppStateActionCreator } from '../Redux/Actions/ActionCreators.js';
import {CURR_PAGE, PREF_CONFERENCE} from '../Redux/Actions/ActionConstants.js';

const style = {
	cardProps: {
		marginBottom: "20px",
		width: "250px",
		height: "250px",
	},

	tutorialTextStyle: {
		fontFamily: 'Dosis, sans-serif',
		fontSize: "28px",
		marginLeft: "-200px",
		marginBottom: "25px"
	},

	cardContent: {
		marginTop: "-35px",
		fontFamily: 'Dosis, sans-serif',
		fontSize: "18px",
	},

	divProp:{
		marginBottom: "20px",
		marginLeft: "150px",
		display: 'inline'
	},

	 gridList: {
	    width: '750px',
	    overflowY: "hidden",
	    marginTop: "-12px",
	 },

	 dividerProps:{
	 	width: "560px",
	 	marginTop: "-20px",
	 	marginBottom: "20px"
	 },

	mediaImg: {
	    height: 210,
	    marginTop: "-25px",
	    marginBottom: "5px",
	   
	    transform: 'scale(0.60)'
	},

	groupChipStyle: {
	 	marginLeft: "-20px",
	},

	buttonNext: {
		marginTop: "-480px",
		marginLeft: "200px",
		width: "10px",
		height: "10px",
	}
}

class CheckBoxs extends React.Component{
	constructor(props){
		super(props);
		this.state={
			selectedConvs: props.selectedConfs,
			selectedConferences: props.conferences,
			selectedConfVar: "",
			selectedConfs: [],
		}
	}

	handleClickCard = (event)=>{
		let confs = this.state.selectedConfs;
		let clickedEvent = event.target.innerHTML;
		if(this.state.selectedConfs.indexOf(clickedEvent) === -1
			&& this.state.selectedConferences.indexOf(clickedEvent) !== -1){
			confs.push(event.target.innerHTML);
			this.setState({selectedConfs: confs});
		}
	}

	handleNext = ()=>{
		let payLoad = 3;
		this.props.updatePage(payLoad);
		this.props.uploadPreference(this.state.selectedConfs);
	}

	render(){
		const {classes} = this.props;
		return(
			<Fragment>
				<GridList 
					cellHeight={245}  
					cols={2.5} 
					height={205} 
					className={classes.gridList}
				>
					{ 	
					 	this.state.selectedConferences.map((content, idx)=> (
						   	<Grid 
						   		item 
						   		className={classes.gridList}
						   	>
						       	<Card 
						       		className={classes.cardProps}
						       	>      	
						       		<CardMedia 
							       		className={classes.mediaImg}
									   	image={this.props.conferenceImage[idx]}
							       	/>
							    	<Button 
							    		color={"accent"}
									    className={classes.cardContent}
									    onClick={this.handleClickCard}
									>
										{content}
									</Button> 
						       	</Card>
						    </Grid>
						))
					}
					<div className={classes.groupChipStyle}>
						{	
							this.state.selectedConfs.map(data=>{
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
				</GridList>	
				<Button 
					raised 
					color="accent" 
					className={classes.buttonNext}
					onClick={this.handleNext}
				>
				   	Next
				</Button>	
			</Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch)=>{
	return({
		updatePage: (payLoad)=>{dispatch(AppStateActionCreator(CURR_PAGE, payLoad))},
		uploadPreference: (payLoad)=>{dispatch(AppStateActionCreator(PREF_CONFERENCE, payLoad));}
	});
}

let CheckBoxConferences = withStyles(style)(CheckBoxs)
export default  connect(null, mapDispatchToProps)(CheckBoxConferences);
