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
    return (
      <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={props.openDialog}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{props.message}</span>}
          />
      </div>
    )

}


export default withStyles(styles)(ErrSnack);
