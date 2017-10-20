import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 2,
    height: theme.spacing.unit * 4,
  },
});

const ErrSnack = (props) => {
    const { classes } = props.classes;
    var op = props.openDialog;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={op}
          autoHideDuration={1000}
          onRequestClose = {()=>{op = false}}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{props.message}</span>}
        />
      </div>
    )

}


export default withStyles(styles)(ErrSnack);