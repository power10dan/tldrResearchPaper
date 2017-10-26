import React from 'react';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 2,
    height: theme.spacing.unit * 4,
  },
});

const ErrSnack = (props) => {
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
