import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const AddSumDialog = ( props )=>{
  return (
      <div>
        <Dialog open={props.open} onRequestClose={props.closeDialog}>
          <DialogTitle>Add summary</DialogTitle>
          <DialogContent>
             <TextField
                autoFocus
                margin="dense"
                id="name"
                label="File Name "
                type="email"
                fullWidth
                onChange={props.getFileName}
            />

             <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Section to add summary"
                type="email"
                fullWidth
                onChange={props.getSection}
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="New Summary"
                type="email"
                fullWidth
                onChange={props.getNewSummary}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary" onClick={props.closeDialog}>
              Cancel
            </Button>
            <Button onClick={this.handleRequestClose} color="primary" onClick={props.submitNewSummary}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default AddSumDialog
