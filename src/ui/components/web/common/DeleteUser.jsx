




import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
export default class UserDelete extends React.Component {
    

    render() {

        var {value, name, handleClickOpen, open, status} = this.props

        console.log("status,",status)
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
                    {status =="DELETE"? "Delete" : "Activate"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to {status =="DELETE"? "deactivate " : "activate " }{name}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">No</Button>
                        <Button onClick={(event) => { handleClickOpen(name, status) }} color="primary">Yes</Button>
                    </DialogActions>
                </Dialog>
            
            </div>
        );
    }
}