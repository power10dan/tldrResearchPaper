import React from 'react';
import { withStyles } from 'material-ui/styles';
import { GridList} from 'material-ui/GridList';
import FileCard from './FileCard.js';

const styles = theme =>({
	root: {
	     display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'space-around',
	    overflow: 'hidden',
	    marginLeft: "245px"
	},

	gridList: {
    	height: 1500,
      width: 'auto'
	 },

	title: {
	    color: theme.palette.primary[200],
	},
});

const GridCardView = (props)=>{
	const { classes } = props;
	return (
		<div className={classes.root} >
        {console.log("IN FILE VIEW", props.arrayOfData)}
			<GridList className={classes.gridList} cols={1} >
				{props.arrayOfData.map(card =>(
            <div>
					      <FileCard p_title          = {card.title}
					                p_card_dialog    = {props.cardDia}
					                p_close_dialog   = {props.closeDia}
                          p_handleCheck    = {props.p_handleCheck.bind(this, card.file_name)}
                          p_summary_data   = {card.section_summs}
                          open             = {props.isOpenSum}
                          closeDialog      = {props.closeDia}
			 	                  getSection       = {props.sectionFunc}
			 	                  getNewSummary    = {props.summaryFunc}
			 	                  submitNewSummary = {props.submitNewSummary.bind(this, card.file_name)}
						    />
            </div>
					))
				}
			</GridList>
		</div>
	); 
}

/* <AddSumDialog open             = {props.isOpenSum}
	 closeDialog      = {props.closeDia}
	 getSection       = {props.sectionFunc}
	 getNewSummary    = {props.summaryFunc}
	 submitNewSummary = {props.submitNewSummary.bind(this, card.file_name)}
 *               p_summary_data   = {card.section_summs}
	 />*/
export default withStyles(styles)(GridCardView);
