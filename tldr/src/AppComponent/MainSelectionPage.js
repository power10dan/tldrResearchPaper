import React, {Fragment} from 'react';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
	  ExpansionPanelSummary,
	  ExpansionPanelDetails,
	  ExpansionPanelActions
	} from 'material-ui/ExpansionPanel';
import Card, {CardContent, CardAction} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import GraphControl from '../AppBusinessLogic/GraphBusinessLogic.js';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import PaperPanel from './PaperIdAndOptions.js';

const conferencePanelStyle = theme=>({
	divProps:{
		marginTop: "-260px",
		width: "800px",
		marginLeft: "160px",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontFamily: 'Dosis, sans-serif',
		flexBasis: '35.33%',
		flexShrink: 0,
		textAlign: "left"
	},

	secondaryHeading:{
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
		fontFamily: 'Dosis, sans-serif',
		paddingLeft: "65px",
		paddingTop: "15px",
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
	},


	expandSummary:{
		width: "800px"
	},

	chip:{
		backgroundColor: "#90CAF9",
		color: "#FAFAFA",
		position: "absolute",
    	right: "95px",
    	top: "20px"
	},

	border:{
		background: '#ECEFF1',
	    padding: '20px',
	    width: '400px',
	    height: '350px',
	}

})

const ConferencePaperPanels = (props)=>{
	const {classes} = props;
	return(
		<div className={classes.divProps} >
		<TextField value={props.Search_value}
			placeHolder="Search paper Name"
			onChange={props.search_input_value}
			/>

			<br></br>
			<br></br>
			<br></br>
			{
				props.data.map((elem,idx)=>{
					return(
						<Fragment>
							<ExpansionPanel
								expanded={props.expanded === elem.title[0]}
								onChange={props.handleChange(elem.title[0])}
							>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
									<Typography className={classes.heading} >
										{props.shorterTitleArr[idx]}
									</Typography>
									<Typography className={classes.secondaryHeading} >
										{props.surNameArray[idx]}
									</Typography>
									<Chip label={elem.labels[0]} className={classes.chip} />
								</ExpansionPanelSummary>
								<Divider />
								<ExpansionPanelDetails className={classes.ExpansionPanelDetails}>
									<div className={classes.border}>
										<GraphControl
											currPaper={elem}
											typeOfPaper={elem.labels[0]}
											graphClick={props.nodeClick}
										 />
									</div>
									<PaperPanel
										titleOfPaper={props.selectedCardNodeTitle[0]}
										authorTitles={props.surName}
										typeOfPap={props.labelOfSelectedNode}
										downloadPaper={props.downloadPaper}
									/>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						</Fragment>
					)
				})
			}
		</div>
	);
}

export default withStyles(conferencePanelStyle)(ConferencePaperPanels);
