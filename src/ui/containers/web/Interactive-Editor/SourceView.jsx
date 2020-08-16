import React from "react";

class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { key, sentence, yAxis, widthValue, leftPaddingValue, printPageNo, pageNo, isFirstPage, pageDividerHeight, paperWidth } = this.props;
        var a = {
            position: "absolute ",
            top: yAxis,
            left: sentence.x - leftPaddingValue + 20 + "px",

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
                {printPageNo&&pageNo != "1" ? <div>
                   <div style={{ position: "absolute ", top: pageDividerHeight - 85, width: paperWidth, color: "#A5A5A5" }}><hr/></div>
               
                    <div style={{ position: "absolute ", top: pageDividerHeight - 50, fontSize: "13px", fontFamily: "Times", left: "25px", color: "#A5A5A5" }}>Page No. {pageNo}</div>
                </div> : <div></div>
    }
                <div style={a}>{sentence.text}</div>
            </div >
        );
    }
}

export default Preview;
