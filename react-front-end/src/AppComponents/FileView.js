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
	    width: 870,
    	height: 'auto',
	    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
	 },

	title: {
	    color: theme.palette.primary[200],
	},
});

const GridCardView = (props)=>{
	const { classes } = props;
	return (
		<div className={classes.root} >
			<GridList className={classes.gridList} cols={2} >
				{props.arrayOfData.map(card =>(<FileCard title={card.FILES.title} summaryText = {card.FILES.Intro_summary} />))}
			</GridList>
		</div>
	);
}

export default withStyles(styles)(GridCardView);