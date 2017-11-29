const stylesAppTopBar = theme =>({
	 root: {
	    marginTop: theme.spacing.unit * 1,
	    width: '100%',
	    marginLeft: '225px',
	    position:'relative',

	  }, 
	  menuButton: {
	    marginLeft:  24,
	  },

	  input: {
	  	display: 'none',
	  },

	  progress: {
	    position: 'absolute',
	    marginTop: -10,
	    marginRight: "1225px",
  	  },

  	  wrapper: {
  	  	marginLeft: theme.spacing.unit*10,
    	position: 'relative',

  	  }
});

export default stylesAppTopBar;
