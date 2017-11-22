import React from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
const styles = theme => ({
	card: {
		marginTop: "30px",
		marginLeft: "35px",
		borderRadius: "15px",
		background: "#5C6BC0",
		height: 185,
	},

	title: {
		position: "left",
		marginBottom: "5px",
		marginRight: 15,
		fontSize:14,
		textAlign: 'left',
		color: "#E8EAF6"
	},

	summaryText:{
		textAlign: "left",
		marginBottom: "5px",
		fontSize:14,
		color: "#E8EAF6",
		margingTop: "-10px"
	},

	cardAction:{
		marginTop: "-65px",
	},


  	buttonStyle:{
  		marginTop: "110px",
  		marginRight: "15px",
  		borderRadius: "5px",
  		marginLeft: "2px",
  		fontSize: 12,
  		color: "#FFFFFF"
  	},

  	contentMargin:{
  		marginRight: "20px",
  	}
});

const FileCardView =  (props) =>{
	return (
		<div>
			<Card className={props.classes.card} >
        <CardHeader className={props.classes.title}
                    title={props.p_title}
        />
				<CardContent>
					{/* <Typography type="h2"
              className={props.classes.p_title}>
			        {props.p_title}
			        </Typography> */}
				  <Typography type="body2"
                      className={props.classes.p_summary_txt}>
				    {"Intro Summary: " + props.p_summary_txt}
				  </Typography>
			    <CardActions className={props.classes.cardAction}>
			      <Button color="primary"
                    className={props.classes.buttonStyle}
                    onClick={props.p_card_dialog}>
					    Add Summary
					  </Button>

					  <Button color="primary"
                    className={props.classes.buttonStyle}
                    onClick={props.p_getPDF} >
					    Download Paper
					  </Button>
			    </CardActions>
				</CardContent>
			</Card>
		</div>
	);
}

export default withStyles(styles)(FileCardView);
