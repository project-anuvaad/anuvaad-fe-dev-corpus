import React from "react";
import { withRouter } from "react-router-dom";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";


class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            sentences: '',
            sourceSupScripts: '',
            targetSupScripts: '',
            header: ""
        };
    }


    render() {
        let a = 100;
        return (
            <div>
                {this.props.sentences.map(sentence=>{
                    a=parseInt(sentence.y_end)+((parseInt(sentence.page_no)-1)*parseInt(sentence.page_height))
                    console.log(sentence.y,a,parseInt(sentence.page_no)-1),parseInt(sentence.page_height)
                   return <p style={{position:'aboslute',
                   top:a+'px',
                   left: sentence.x+'px',
                   width: '600px',
                   height:'2px' }}>{sentence.text}</p>
                })}
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.login,
    apistatus: state.apistatus,
    fetchPdfSentence: state.fetchPdfSentence,
    downloaddoc: state.downloaddoc
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            APITransport,
        },
        dispatch
    );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Preview));