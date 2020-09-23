import React from 'react';
import Popover from 'react-text-selection-popover';
import placeRight from '../../../containers/web/Interactive-Editor/placeRight'
import Menu from '../../../containers/web/Interactive-Editor/Menu'
import Button from '@material-ui/core/MenuItem';

var getCaretCoordinates = require('textarea-caret');

class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            showSuggestions: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            let divdata = this.refs[this.props.refId].getBoundingClientRect()

            let x = divdata.x
            let y = divdata.y

            var elem = document.getElementById(this.props.aId)
            var coordinates = getCaretCoordinates(elem, elem.selectionEnd);

            let topValue = 0
            let leftValue = 0
            if (coordinates) {
                topValue = y + coordinates.top + this.props.heightToBeIncreased
                leftValue = x + coordinates.left + 5

                this.setState({ topValue, leftValue })
            }
        }
    }

    handleEnter = (event) => {
        let divdata = this.refs[this.props.refId].getBoundingClientRect()
        let x = divdata.x
        let y = divdata.y

        var elem = document.getElementById(this.props.aId)
        let caretVal = this.props.value.substring(0, elem.selectionStart)

        var coordinates = getCaretCoordinates(elem, elem.selectionEnd);
      
        let topValue = 0
        let leftValue = 0
        if (coordinates) {
            topValue = y + coordinates.top + this.props.heightToBeIncreased
            leftValue = x + coordinates.left + 5

            this.setState({ anchorEl: document.activeElement, topValue, leftValue, caretVal })
        }

        if (event.key === 'Escape') {
            this.setState({ showSuggestions: false })
            this.props.handleBlur()
        }

        if (event.key === 'Tab') {
            this.setState({ showSuggestions: true })
            // this.props.fetchSuggestions(this.props.sourceText, this.props.value)
            this.props.fetchSuggestions(this.props.sourceText, caretVal, this.props.tokenObject)

        }

        this.setState({
            previousKeyPressed: event.key,
            previousPressedKeyCode: event.keyCode
        })
    }

    handleSuggetionCLick(suggestion) {
        var elem = document.getElementById(this.props.aId)
        let caretVal = this.props.value.substring(0, elem.selectionStart)
        this.setState({ caretVal : caretVal + suggestion})
        this.props.handleSuggestion(suggestion, this.state.caretVal, this.props.sourceText, this.props.tokenObject)
    }

    getLoader() {
        return (<Popover
            // id={id}
            open={true}
            anchorReference="anchorPosition"
            anchorPosition={{ top: this.state.topValue, left: this.state.leftValue }}

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
        >
            <Button style={{ textTransform: 'none', width: '100%', justifyContent: 'left' }} disabled={true}>Loading...</Button>
        </Popover>)
    }

    render() {
        const { value, aId, refId, style, heightToBeIncreased } = this.props
        return (
            
            <div>
                <textarea
                    multiline={true}
                    autoFocus={true}
                    ref={refId}
                    id={aId}
                    value={value}
                    style={style}
                    onChange={this.props.handleChangeEvent}
                    onKeyDown={this.handleEnter}
                >
                </textarea>
                {
                    this.props.showSuggestions && 
                    <Menu
                        isOpen={true}
                        topValue={this.state.topValue}
                        leftValue={this.state.leftValue}
                        handleSuggetionClick={this.handleSuggetionCLick.bind(this)}
                        handlePopOverClose={this.props.handleSuggestionClose}
                        targetVal={this.state.caretVal}
                        options={this.props.autoCompleteText}
                    ></Menu>}

            </div >
        );
    }
}

export default (AutoComplete);