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

const conferencePanelStyle = theme=>({
	divProps:{
		marginTop: "-260px",
		width: "800px",
		marginLeft: "120px",
	},
	heading: {
		fontSize: theme.typography.pxToRem(25),
		fontFamily: 'Dosis, sans-serif',
		flexBasis: '10.33%',
		flexShrink: 0,
		textAlign: "left",
		marginBottom: "5px"
	},

	secondaryHeading:{
		fontSize: theme.typography.pxToRem(10),
		color: theme.palette.text.secondary
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

	cardProps:{
		marginBottom: "25px",
		
	},

	cardContentProps:{
		marginLeft: "55px",
	}

})

const ConferencePaperPanels = (props)=>{
	const {classes} = props;

    let newFileArray = [];
    props.data.map((elem)=>{
        let title = elem.title;
        if(title.split(' ').length > 5){
            let newTitle = title.split(' ').slice(0,3).join(" ") + "..."
            newFileArray.push(newTitle);
        }
    });

	return(
		<div className={classes.divProps} >
		{
			props.data.map((elem,idx)=>{
				return(
					<Fragment>
						<Typography className={classes.heading} >
							{elem.title}
						</Typography>

						<GraphControl
							data={newFileArray[idx]}
							type={"cited"}
						/>
					</Fragment>
				)
			})
		}
		</div>
	);
}

export default withStyles(conferencePanelStyle)(ConferencePaperPanels);
