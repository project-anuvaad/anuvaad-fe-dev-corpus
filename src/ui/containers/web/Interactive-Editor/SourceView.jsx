import React from "react";

class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { key, sentence, yAxis, widthValue, leftPaddingValue, printPageNo, pageNo, isFirstPage, pageDividerHeight } = this.props;
        var a = {
            position: "absolute ",
            top: yAxis,
            left: sentence.x-leftPaddingValue + "px",
            
            width: widthValue + "px",
            fontSize: this.props.sentence.class_style["font-size"],
            fontFamily: this.props.sentence.class_style["font-family"],
            fontWeight: this.props.sentence.class_style["font-family"].includes("Bold") && 'bold',
            textAlign: "justify",
            lineHeight: this.props.sentence.class_style["lineHeight"] && this.props.sentence.class_style["lineHeight"],
            textDecorationLine: this.props.sentence.underline ? "underline" : "",
            height: sentence.height && sentence.height,
            overflow: "hidden"
        };

        return (
            <div key={key}>
                {/* {printPageNo ? <div style={{ position: "absolute ", top: yAxis + 20, width: "100%" }}><hr style={{ color: "white" }} /></div> : <div></div>} */}
                {printPageNo ? <div>
                    <div style={{ position: "absolute ", top: pageDividerHeight - 50, fontSize: "13px", fontFamily: "Times", right: "25px", color: "#A5A5A5" }}>Page No. {pageNo}</div>
                </div> : <div></div>}
                <div>
                    {sentence.is_image ? <div
                        style={{
                            position: "absolute ",
                            top: yAxis,
                            left: sentence.x + "px",
                            overflow: "hidden"
                        }}><img width={sentence.width} height={sentence.height} src={sentence.img}></img></div> : <div style={a}>{sentence.text}</div>}
                    {/* {!sentence.is_image && <div style={a}>{sentence.text}</div> } */}

                    {/* <div style={a}>{sentence.text}</div> */}
                </div>

            </div>
        );
    }
}

export default Preview;
