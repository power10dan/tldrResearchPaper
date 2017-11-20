import React from 'react';
import { withStyles } from 'material-ui/styles';
import { GridList} from 'material-ui/GridList';
import FileCard from './FileCard.js';
import AddSumDialog from '../AppComponents/InputPopup.js';

const styles = theme =>({
	root: {
	     display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'space-around',
	    overflow: 'hidden',
	    marginLeft: "245px"
	},

	gridList: {
	    width: 870,
    	height: 'auto',
	 },

	title: {
	    color: theme.palette.primary[200],
	},
});

const GridCardView = (props)=>{
	const { classes } = props;
	return (
		<div className={classes.root} >
			<GridList className={classes.gridList} cols={1} >
				{  props.arrayOfData.map(card =>(
					 <FileCard p_title        = {card.FILES.title}
						         p_summary_txt  = {card.FILES.Intro_summary}
					           p_card_dialog  = {props.cardDia}
					           p_close_dialog = {props.closeDia}
                     p_getPDF       = {props.p_getPDF.bind(this, card.FILES.fileName)}
						/>
					))
				}
			</GridList>
			<AddSumDialog open             = {props.isOpenSum}
			              closeDialog      = {props.closeDia}
			 	            getSection       = {props.sectionFunc}
			 	            getNewSummary    = {props.summaryFunc}
			 	            submitNewSummary = {props.submitNewSummary}
			/>
		</div>
	); 
}

export default withStyles(styles)(GridCardView);
