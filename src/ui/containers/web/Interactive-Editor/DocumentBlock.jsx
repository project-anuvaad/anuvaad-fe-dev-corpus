import React from "react";

class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        const { sentence, yAxis } = this.props;

        var a = {
            position: "absolute ",
            top: sentence.text_top+"px",
            left: sentence.text_left + "px",
            fontSize: sentence.font_size+"px",
            
            width: sentence.text_width + "px"}
       console.log(yAxis)
        return (
            <div style={a}>
                {sentence.text}
            </div >
        );
    }
}

export default Preview;