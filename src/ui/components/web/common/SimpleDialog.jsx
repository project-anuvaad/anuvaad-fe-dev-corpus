




import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';

export default class SimpleDialog extends React.Component {
    

    render() {

        var {value, name, message,value,  handleSubmit,handleClose, open,title, status} = this.props
        return (
            <div>
            
                <Dialog
                    open={open}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                    {title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(event) => { handleClose() }} color="primary">No</Button>
                        <Button onClick={(event) => { handleSubmit(value,status) }} color="primary">Yes</Button>
                    </DialogActions>
                </Dialog>
            
            </div>
        );
    }
}