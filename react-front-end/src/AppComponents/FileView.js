import React from 'react';
import { withStyles } from 'material-ui/styles';
import { GridList } from 'material-ui/GridList';
import FileCard from './FileCard.js';

const styles = theme =>({
	root: {
	    display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'space-around',
	    overflow: 'hidden',
	    background: theme.palette.background.paper,
	},

	gridList: {
	    flexWrap: 'nowrap',
	    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
	    transform: 'translateZ(0)',
	 },

	title: {
	    color: theme.palette.primary[200],
	},
});

const GridCardView = (props)=>{
	const { classes } = props;
	return (
		<div className={classes.root} >
			<GridList className={classes.gridList} col={2.5}>
				{props.arrayOfData.map(card =>(
					<FileCard title={card.title} summaryText = {card.summary} />
				))}
			</GridList>
		</div>
	);
}

export default withStyles(styles)(GridCardView);