import React from 'react';
import Popover from 'react-text-selection-popover';
import Menu from '../../../containers/web/Interactive-Editor/Menu'
import Button from '@material-ui/core/MenuItem';
import TextareaAutosize from 'react-textarea-autosize';
import wfcodes from '../../../../configs/workflowcodes'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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
        if (prevProps.value !== this.props.value && this.props.value !== this.state.value) {
            this.setState({
                value: this.props.value
            })
        }
    }

    componentDidMount() {
        this.setState({
            value: this.props.value
        })
    }

    handleEnter = (event) => {
        let divdata = this.refs[this.props.refId].getBoundingClientRect()
        let x = divdata.x
        let y = divdata.y

        var elem = document.getElementById(this.props.aId)
        let caretVal = this.state.value.substring(0, elem.selectionStart)

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
            this.props.handleChangeEvent({ target: { value: this.state.value } })
            this.props.handleBlur(this.props.block_identifier_with_page, wfcodes.DP_WFLOW_S_C)
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
        this.setState({ caretVal: caretVal + suggestion })
        this.props.handleSuggestion(suggestion, this.state.caretVal, this.props.sourceText, this.props.tokenObject)
    }

    handleChangeEvent(event) {
        this.setState({
            value: event.target.value
        })
        // this.props.handleChangeEvent(event)
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
        const { value, aId, refId, style, tokenIndex, sentence } = this.props
        return (
            <ClickAwayListener id={tokenIndex} onClickAway={() => this.props.handleClickAway(sentence.block_identifier + "_" + this.props.page_no, this.state.value, wfcodes.DP_WFLOW_S_C)}>
                <div>
                    <TextareaAutosize
                        multiline={true}
                        autoFocus={true}
                        ref={refId}
                        id={aId}
                        value={this.state.value}
                        style={style}
                        onChange={this.handleChangeEvent.bind(this)}
                        onKeyDown={this.handleEnter}
                    >
                    </TextareaAutosize>
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
            </ClickAwayListener>
        );
    }
}

export default (AutoComplete);