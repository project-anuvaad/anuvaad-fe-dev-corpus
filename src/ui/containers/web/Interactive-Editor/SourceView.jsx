import React from "react";

class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    hoverOn(e, pageNo) {
        // if (!this.props.isPreview) {
            this.props.handleOnMouseEnter(e, this.props.paperType, pageNo);
        // }
    }

    hoverOff() {
        // if (!this.props.isPreview) {
            this.props.handleOnMouseEnter("");
        // }
    }

    fetchTokenizedSenetence(tokenText, id) {
        return (
            <span
                style={{ backgroundColor: this.props.hoveredSentence === id + "_" + tokenText.sentence_index ? "yellow" : "" }}
                onMouseEnter={() => this.hoverOn(id + "_" + tokenText.sentence_index)}
                onMouseLeave={() => this.hoverOff()}
            >
                {tokenText.src}
            </span>
        )
    }

    fetchSentence(block, styles) {

        // return (<div style={styles}>{block.text}</div>)

        return (<div style={styles}>{block && block.tokenized_sentences && Array.isArray(block.tokenized_sentences) && block.tokenized_sentences.length > 0 &&
            block.tokenized_sentences.map((tokenSentence, index) => {
                // return (<span>{tokenSentence.text}</span>)
                return this.fetchTokenizedSenetence(tokenSentence, block._id)
            })
        }</div>)

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
                {printPageNo ? <div>
                    {pageNo != "1" && <div style={{ position: "absolute ", top: pageDividerHeight - 65, width: paperWidth, color: "#A5A5A5" }}><hr /></div>}

                    <div style={{ position: "absolute ", top: pageDividerHeight - 50, fontSize: "13px", fontFamily: "Times", left: "25px", color: "#A5A5A5" }}>Page No. {pageNo}</div>
                </div> : <div></div>
                }
                {/* <div> */}
                {sentence.is_image ? <div
                    style={{
                        position: "absolute ",
                        top: yAxis,
                        left: sentence.x + "px",
                        overflow: "hidden"
                    }}><img width={sentence.width} height={sentence.height} src={sentence.img}></img></div> : this.fetchSentence(sentence, a)}

                {/* </div> */}
            </div >
        );
    }
}

export default Preview;
