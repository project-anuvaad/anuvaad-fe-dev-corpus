import React from "react";

class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { key, sentence, yAxis, widthValue, leftPaddingValue, printPageNo, pageNo, isFirstPage } = this.props;
        var a = {
            position: "absolute ",
            top: yAxis,
            left: sentence.x-leftPaddingValue+20 + "px",
            
            width: widthValue + "px",
            fontSize: this.props.sentence.class_style["font-size"],
            fontFamily: this.props.sentence.class_style["font-family"],
            fontWeight: this.props.sentence.class_style["font-family"].includes("Bold") && 'bold',
            textAlign: "justify",
            lineHeight: this.props.sentence.class_style["lineHeight"] && this.props.sentence.class_style["lineHeight"],
            textDecorationLine: this.props.sentence.underline ? "underline" : ""
        };

        return (
            <div key={key}>
                {/* {printPageNo ? <div style={{ position: "absolute ", top: yAxis + 20, width: "100%" }}><hr style={{ color: "white" }} /></div> : <div></div>} */}
                {printPageNo ? <div>{!isFirstPage && <hr style={{ position: "absolute ", top: yAxis - 70, color: "black", width: "100%" }} />}
                    <div style={{ position: "absolute ", top: yAxis - 50, fontSize: "13px", fontFamily: "Times", right: "25px", color: "#A5A5A5" }}>Page No. {pageNo}</div>
                </div> : <div></div>}
                <div style={a}>{sentence.text}</div>
            </div>
        );
    }
}

export default Preview;
