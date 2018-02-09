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
	}

})

const ConferencePaperPanels = (props)=>{
	const {classes} = props;
    let surNameArr = [];
    props.data.uploadedFile.map((elem)=>{
    	let surName = elem.surname;
    	let newSurName = surName[0] + " " + "et al.";
    	surNameArr.push(newSurName);
    });

	return(
		<div className={classes.divProps} >
			{
				props.data.uploadedFile.map((elem,idx)=>{
					return(
						<Fragment>
							<ExpansionPanel>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
									<Typography className={classes.heading} >
										{elem.title}
									</Typography>
									<Typography className={classes.secondaryHeading} >
										{surNameArr[idx]}
									</Typography>
									<Chip label={elem.labels[0]} className={classes.chip} />
								</ExpansionPanelSummary>
								<Divider />

								<ExpansionPanelDetails className={classes.ExpansionPanelDetails}>
									{
										elem.labels[0] === "Original" ? <GraphControl
																			data={props.data.originalCitedSep[0][idx]}
																			type={elem.labels[0]}
																		/> : <GraphControl
																			data={props.data.originalCitedSep[1][idx]}
																			type={elem.labels[0]}
																		/>

									}
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
