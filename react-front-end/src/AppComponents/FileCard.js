import React from 'react';
import {withStyles} from 'material-ui/styles';
import classnames from 'classnames';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui/Checkbox';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = theme => ({
	card: {
		marginTop: "30px",
		marginLeft: "35px",
		borderRadius: "15px",
		background: "#5C6BC0",
		/* height: 185,*/
	},

	title: {
		position: "left",
		marginBottom: "5px",
		marginRight: 15,
		fontSize:14,
		textAlign: 'left',
		color: "#E8EAF6"
	},

  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

  expandOpen: {
    transform: 'rotate(180deg)',
  },

  flexGrow: {
    flex: '1 1 auto',
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


class FileCardView extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };


  render () {
    const { classes } = this.props;
	  return (
		  <div>
			  <Card className={this.props.classes.card}>
          <CardHeader className={this.props.classes.title}
                      title={this.props.p_title}
          />

				  <CardContent>
				    <Typography paragraph className={this.props.classes.p_summary_txt}>
				      {"Intro Summary: " + this.props.p_summary_txt}
				    </Typography>
				  </CardContent>

			    <CardActions className={this.props.classes.cardAction}>
			      <Button color="primary"
                    className={this.props.classes.buttonStyle}
                    onClick={this.props.p_card_dialog}>
					    Add Summary
					  </Button>
            <div className={classes.flexGrow} />
            <IconButton
              className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            <CheckBox tabIndex={-1}
                      onChange={this.props.p_handleCheck}
            />
			    </CardActions>
          <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
            <CardContent>
              <Typography type="body2">
                A HEADER!
              </Typography>
              <Typography paragraph>
                Hi there, this is to demo that expanding actually works! This
                text is hardcoded in the FileCard.js file in the frontend 
                components. You should change this to be somethign that is
                passed in from props in the future.
              </Typography>
            </CardContent>
          </Collapse>
			  </Card>
		  </div>
	  );}
}

export default withStyles(styles)(FileCardView);
