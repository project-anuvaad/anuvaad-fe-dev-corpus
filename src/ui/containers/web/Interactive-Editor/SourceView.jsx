import React from "react";

class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { key, sentence, yAxis, widthValue,leftPaddingValue, printPageNo, pageNo } = this.props;
        var a = {
            position: "absolute ",
            top: yAxis,
            left: sentence.x + "px",
            
            width: widthValue + "px",
            fontSize: this.props.sentence.class_style["font-size"],
            fontFamily: this.props.sentence.class_style["font-family"],
            fontWeight: this.props.sentence.class_style["font-family"].includes("Bold") && 'bold',
            textAlign: "justify",
            lineHeight:this.props.sentence.class_style["lineHeight"]? this.props.sentence.class_style["lineHeight"]:'17px',
            textDecorationLine: this.props.sentence.sentence.underline ? "underline" : ""
        };
        return (
            <div key={key}>
                {printPageNo ? <div style={{ position: "absolute ", top: yAxis + 70, width: "100%" }}><hr style={{ color: "white" }} /></div> : <div></div>}
                <div style={a}>{sentence.text}</div>
            </div>
        );
    }
}

export default Preview;
