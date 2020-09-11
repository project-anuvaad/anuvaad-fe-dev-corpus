import React from "react";
// import Popover from '@material-ui/core/Popover';
// import Button from "@material-ui/core/Button";
import { translate } from "../../../../assets/localisation";
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Menu';
import Button from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
export default class Popovers extends React.Component {
    constructor(props) {
        super(props);
        this.setState = {
            anchorEl: null,
        }
    }


    fetchOptions(options) {
        let dataArr = []
        options && options.length>0 && options.map((option, i) => {
            let data = option.substring(this.props.caretPos)
            let arr = data.split(" ",3)
            dataArr.push(arr.join(" "))
        })
        if (dataArr && Array.isArray(dataArr) && dataArr.length > 0) {
            return (dataArr.map((option, i) => {
                if(option && option.length>0) {
                    return <Button style={{ textTransform: 'none', width: '100%', justifyContent: 'left' }} onClick={() => this.props.handleOnClick(option)}>{option}</Button>
                }
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
                keepMounted
                autoFocusItem={isOpen}
            >
                {/* <div style={{maxWidth: "500px"}}> */}
                    {
                        this.fetchOptions(options)
                    }
                {/* </div> */}
            </Popover>
        )
    }
}