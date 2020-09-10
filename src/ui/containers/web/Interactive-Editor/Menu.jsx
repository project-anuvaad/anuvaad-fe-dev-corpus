import React from "react";
import Popover from '@material-ui/core/Popover';
import Button from "@material-ui/core/Button";
import { translate } from "../../../../assets/localisation";
import Typography from '@material-ui/core/Typography';

export default class Popovers extends React.Component {
    constructor(props) {
        super(props);
        this.setState = {
            anchorEl: null
        }
    }

    fetchOptions(options) {
        if (options && Array.isArray(options) && options.length > 0) {
            return (options.map((option, i) => {
                return <Button style={{ textTransform: 'none', width: '100%', justifyContent: 'left' }} onClick={() => this.props.handleOnClick(i)}>{option.substring(this.props.caretPos)}</Button>
            })
            )
        } else {
            return (<Typography>No Suggention available</Typography>)
        }
    }

    render() {
        const { id, isOpen, topValue, leftValue, options, caretPos } = this.props;
        return (
            <Popover
                id={id}
                open={isOpen}
                anchorReference="anchorPosition"
                anchorPosition={{ top: topValue, left: leftValue }}

                onClose={() => this.props.handlePopOverClose()}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div style={{maxWidth: "500px"}}>
                    {
                        this.fetchOptions(options)
                    }
                </div>
            </Popover>
        )
    }
}