// Material-UI uses inline, so forgive me for the inconsistency in switching
// between pure css and inline JavaScript style
const styleList = theme => ({
  root: {
  	margin: theme.spacing.unit*2,
  	paddingTop: theme.spacing.unit*0.04,
    width:'236px',
    height:'50px',
    maxHeight: '60px',
    background: "#EEEEEEE",
    position: 'relative',
    right:'32px',
    top: '0px',
   
  },

  nested: {
  	paddingLeft: theme.spacing.unit*7
  }
});


export default styleList