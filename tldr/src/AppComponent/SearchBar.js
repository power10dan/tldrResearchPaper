import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  searchBarPosition:{
    marginTop: "-270px",
    marginLeft: "60px",
    marginBottom: "290px", 
    display: 'flex',
    flexWrap: 'wrap',
  },

  textField: {
    width: 500,
  }
});

const SearchBar = (props)=>{
  const { classes } = props;
  return(
       <div className={classes.searchBarPosition}>
         <TextField
              id="search"
              label="Search for your papers here"
              type="search"
              className={classes.textField}
              onChange = { props.textInput}
          />
          <Button 
              className={classes.buttonStyle}
              onClick={props.onClickCallBack}
          >
            Search 
          </Button>
        </div>
  )
}

export default withStyles(styles)(SearchBar);
