import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { translate } from "../../../../assets/localisation";

export default class EditorDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            textValue: '',
            rows: 0,
            columns: 0
        }
    }

      handleTextChange(key, event) {
        if(key && event.target.value) {
            if (key === 'rows') {
                this.setState({ rows: event.target.value })
              } else if (key === 'columns') {
                this.setState({ columns: event.target.value })
              }
        }
    };

    handleOnClick() {
        this.props.handleAddTable(this.state.rows, this.state.columns)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.node !== this.props.node) {
            this.setState({
                textValue: this.props.node.data
            })
        }
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    // onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="standard-uncontrolled"
                >
                    <DialogTitle id="alert-dialog-title">{"Enter number of rows and columns"}</DialogTitle>
                    <DialogContent style={{ paddingBottom: '10px !important' }}>
                        <div style={{display: 'flex'}}>
                            {/* style={{ paddingRight: '40px', minWidth: '50px', maxWidth: '100px' }} */}
                            <TextField name="rows" style={{ paddingRight: '50px',maxWidth: '150px'}} id="standard-number" label={this.props.rowLabel} type="number" InputLabelProps={{ shrink: true }} onChange={event => {
                this.handleTextChange("rows", event);
              }}/>
                            <TextField name="columns" style={{ maxWidth: '150px'}} id="standard-number" label={this.props.columnLabel} type="number" InputLabelProps={{ shrink: true }} onChange={event => {
                this.handleTextChange("columns", event);
              }}/>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" autoFocus onClick={() => {
                            this.props.handleAddTable(this.state.rows, this.state.columns)
                        }}>
                            Ok
                           {/* {translate("")}  */}
                        </Button>
                        <Button color="primary" autoFocus onClick={() => {this.props.handleAddTableCancel() }}>
                            {translate("common.page.button.cancel")}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}