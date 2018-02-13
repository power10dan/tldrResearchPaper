import React from "react";
import GridList from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import Card, {CardContent, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import ConferenceExpansionPanel from './ExpansionPanelConferences.js';
import Button from 'material-ui/Button';
import { CURR_PAGE, TYPE_OF_RESEARCHER} from '../Redux/Actions/ActionConstants.js';
import { connect } from 'react-redux'; 
import { AppStateActionCreator } from '../Redux/Actions/ActionCreators.js';

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
		height: "260px",
	},

	tutorialTextStyle: {
		fontFamily: 'Dosis, sans-serif',
		fontSize: "28px",
		marginLeft: "-200px",
		marginBottom: "25px"
	},

	cardContent: {
		marginTop: "5px",
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
	    height: 165,
	    marginTop: "5px",
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
			cellHeight={285}  
			cols={2.5} 
			height={550} 
			className={classes.gridList}
		>
			{ 	
			 	props.element.selectionContent.map((content, idx)=> (
				   	<Grid 
				   		item 
				   		className={classes.gridList}
				   	>
				       	<Card 
				       		className={classes.cardProps}
				       	>      		
					      	<CardContent 
					      		className={classes.cardContent}
					        >
						        <CardMedia
							    	className={classes.mediaImg}
								    image={props.element.selectionImage[idx]}
								/>
						       
				    		</CardContent>
					    	<Button 
					    		color={"accent"}
							    className={classes.cardContent}
							    onClick={props.cardClickFunc}
							>
								{content}
							</Button> 
				       	</Card>
				    </Grid>
				))
			}
		</GridList>			
	)
}

class CustomizationListItems extends React.Component{
	onClickCard = ( event)=>{
		let target = event.target.innerHTML;
		if(target === "Professor" 
			|| target === "Post-Doc"
			|| target === "Undergraduate Student"
			|| target === "Graduate Student"){
			let payLoad = 2;
			
			this.props.updateResearcher(target);
			this.props.updatePage(payLoad);
		}

	}

	render(){
		const {classes} = this.props;
		return(
			<div className={classes.root} >
				{	
					this.props.data.map(elem=>(
						<div className={classes.divProp}>
						    <Typography className={classes.tutorialTextStyle}>
							 		{elem.sectionLabel}
							</Typography> 
							<Divider className={classes.dividerProps} />
								{
									this.props.dataSelect === "ConfSelect" ?
										<ConferenceExpansionPanel 
											{...this.props}  
										/> : <ResearcherSelection
												{...this.props}
												element={elem}
												cardClickFunc={this.onClickCard}
										/>
								}
						</div>
					))
				}			
			</div>
		)

	}
}

function mapDispatchToProps(dispatch){
	return({
		updatePage: (payLoad)=>{dispatch(AppStateActionCreator(CURR_PAGE,payLoad));},
		updateResearcher : (payLoad)=>{dispatch(AppStateActionCreator(TYPE_OF_RESEARCHER, payLoad))}
	});	
};

const CustomizationList = connect(null, mapDispatchToProps)(CustomizationListItems);
export { CustomizationList }