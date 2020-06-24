import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { translate } from "../../../../assets/localisation";

export default class SimpleDialog extends React.Component {


    render() {

        var { value, message, handleSubmit, handleClose, open, title, status } = this.props
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
                        <Button onClick={(event) => { handleClose() }} color="primary">{translate("common.page.label.no")}</Button>
                        <Button onClick={(event) => { handleSubmit(value, status) }} color="primary">{translate("common.page.label.yes")}</Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}