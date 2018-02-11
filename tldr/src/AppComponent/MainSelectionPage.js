import React, {Fragment} from 'react';
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

		
	}

})

const ConferencePaperPanels = (props)=>{
	const {classes} = props;
    let surNameArr = [];
    let shorterTitle = [];
    props.data.map((elem)=>{
    	if(elem.title[0].split('').length > 5){
    		shorterTitle.push(elem.title.slice(0,4));
    	}

    	if(elem.surname !== undefined){
	    	let surName = elem.surname;
	    	let newSurName = surName[0] + " " + "et al.";
	    	surNameArr.push(newSurName);
	    } else {
	    	let surNamePlaceHolder = "No Surname available";
	    	surNameArr.push(surNamePlaceHolder);
	    }
    });

	return(
		<div className={classes.divProps} >
			{
				props.data.map((elem,idx)=>{
					return(
						<Fragment>
							<ExpansionPanel>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
									<Typography className={classes.heading} >
										{shorterTitle[idx]}
									</Typography>
									<Typography className={classes.secondaryHeading} >
										{surNameArr[idx]}
									</Typography>
									<Chip label={elem.labels[0]} className={classes.chip} />
								</ExpansionPanelSummary>
								<Divider />
								<ExpansionPanelDetails className={classes.ExpansionPanelDetails}>
									<div className={classes.border}>
										<GraphControl 
											currPaper={elem}
											typeOfPaper={elem.labels[0]}
										 />
									</div>
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
