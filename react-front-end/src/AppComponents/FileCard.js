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
import SimpleSelect from './DropDown';
import AddSumDialog from '../AppComponents/InputPopup.js';
import SimpleMenu from '../AppComponents/RatingMenus.js';

const styles = theme => ({
	card: {
		marginTop: "30px",
		marginLeft: "35px",
		borderRadius: "15px",
		background: "#5C6BC0",
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
      duration: theme.transitions.duration.shortest
    }),
  },

  expandOpen: {
    transform: 'rotate(180deg)'
  },

  flexGrow: {
    flex: '1 1 auto'
  },

	summaryText:{
		textAlign: "left",
		marginBottom: "5px",
		fontSize:14,
		color: "#E8EAF6",
		margingTop: "-10px"
	},

	cardAction:{
		marginTop: "-65px"
	},


  	buttonStyle:{
  		  /* marginTop: "110px",
  		     marginRight: "15px",
  		     borderRadius: "5px",
  		     marginLeft: "2px",*/
  		fontSize: 12,
  		color: "#FFFFFF"
  	},

  	contentMargin:{
  		marginRight: "20px"
  	}
});


class FileCardView extends React.Component {
    state = { expanded: false,
              p_sect_index: 0,  // index for section and summary array
              // section header for current summary, needed to pass to input card
              p_header: this.props.p_summary_data[0].fields.header
    };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

    handleSelectChange = (event) => {
      this.setState({p_sect_index: event.target.value})
      this.setState({p_header: this.props.p_summary_data[event.target.value].fields.summary})
  };

  render () {
    const { classes } = this.props;
	  return (
		  <div>
          <AddSumDialog open = {this.props.open}
                        closeDialog = {this.props.closeDialog}
                        getSection = {this.props.getSection}
                        getNewSummary = {this.props.getNewSummary}
                        submitNewSummary = {this.props.submitNewSummary.bind(this, this.state.p_header)}
          />
			  <Card className={this.props.classes.card}>
          <CardHeader className = {this.props.classes.title}
                      title     = {this.props.p_title}
          />

				  <CardContent>
              <Typography type="body1">
                {this.props.p_summary_data[this.state.p_sect_index].fields.header}
              </Typography>
				    <Typography paragraph className={this.props.classes.p_summary_txt}>
                {this.props.p_summary_data[this.state.p_sect_index].fields.summary}
				    </Typography>
				  </CardContent>

			    <CardActions className={this.props.classes.cardAction}>
            <div className={classes.flexGrow} />

            <IconButton
                className     = {classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded
                })}
                onClick       = {this.handleExpandClick}
                aria-expanded = {this.state.expanded}
                aria-label    = "Show more"
            >
              <ExpandMoreIcon />
            </IconButton>

            <SimpleSelect p_handleChange  = {this.handleSelectChange}
                          p_curr_index    = {this.state.p_sect_index}
                          p_section_summs = {this.props.p_summary_data}
            />
            <CheckBox tabIndex = {-1}
                      onChange = {this.props.p_handleCheck}
            />
			      <Button color     = "primary"
                    dense
                    className = {this.props.classes.buttonStyle}
                    onClick   = {this.props.p_card_dialog}>
					    Add Summary
					  </Button>
           <SimpleMenu />
			    </CardActions>
          <Collapse in={this.state.expanded}
                    transitionDuration="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                {this.props.p_summary_data[this.state.p_sect_index].fields.summary}
              </Typography>
            </CardContent>
          </Collapse>
			  </Card>
		  </div>
	  );}
}

export default withStyles(styles)(FileCardView);
