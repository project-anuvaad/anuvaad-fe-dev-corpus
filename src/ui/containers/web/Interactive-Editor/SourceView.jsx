import React from "react";


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
        const { sentence, yAxis, width, height  } = this.props;
        return (
            <div>
                
                  <p style={{position:'aboslute',
                   top:yAxis,
                   left: sentence.x+'px',
                   width: '600px',
                   height:'2px' }}>{sentence.text}</p>
                
            </div>
        )
    }

}



export default(Preview);