import React from 'react';
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress';
import Popover from 'react-text-selection-popover';
import placeRight from '../../../containers/web/Interactive-Editor/placeRight'
import Menu from '../../../containers/web/Interactive-Editor/Menu'
import CustomLoader from './CustomLoader'

var getCaretCoordinates = require('textarea-caret');

class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            showLoader: false
        }
    }

    handleChange = (event) => {

        console.log('------change text----', event.target && event.target.value)
        // this.setState({value: event.target.value});
    }

    handleEnter = (event) => {
        // console.log(this.refs["textarea"].getBoundingClientRect())
        let divdata = this.refs["textarea"].getBoundingClientRect()
        let x = divdata.x
        let y = divdata.y
        var elem = document.getElementById("123")

        var coordinates = getCaretCoordinates(elem, elem.selectionEnd);
        console.log(coordinates)
        // var selObj = window.getSelection();
        // var range = selObj.getRangeAt(0)
        // var boundary = range.getBoundingClientRect();

        let topValue = 0
        let leftValue = 0
        if (coordinates) {
            topValue = y + coordinates.top
            leftValue = x + coordinates.left
            console.log(topValue, '-----------', leftValue)
            this.setState({ anchorEl: document.activeElement, topValue, leftValue })

        }

        if (((event.key === ' ' || event.key === 'Spacebar') && this.state.previousKeyPressed === 'Shift')) {
            this.setState({ showLoader: true })
        }
        this.setState({
            previousKeyPressed: event.key,
            previousPressedKeyCode: event.keyCode
        })
    }

    handlePopOverClose() {
        this.setState({ showLoader: false })
    }

    render() {

        const { text, showLoader, suggesstion } = this.props
        return (
            <div>
                <textarea value={text} multiline={true} autoFocus={true} variant="outlined"
                    ref="textarea"
                    id="123"
                    onChange={this.handleChange}
                    onKeyDown={this.handleEnter}
                >

                </textarea>
                {/* {
                    this.state.showLoader &&
                    <CustomLoader isOpen={true}
                        topValue={this.state.topValue}
                        leftValue={this.state.leftValue}
                        handleOnClick={this.handlePopOverClose.bind(this)}
                        handlePopOverClose={this.handlePopOverClose.bind(this)}
                    />
                        } */}
                        
                {
                            this.state.showLoader &&
                            <Menu
                                isOpen={true}
                                topValue={this.state.topValue}
                                leftValue={this.state.leftValue}
                                handleOnClick={this.handlePopOverClose.bind(this)}
                                handlePopOverClose={this.handlePopOverClose.bind(this)}
                                options={["z aaa", "z bbb", "zccc"]}
                                targetVal="z"
                            ></Menu>
                        }
                     
            </div >
        );
    }
}

export default (AutoComplete);