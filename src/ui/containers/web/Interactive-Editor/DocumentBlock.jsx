import React from "react";

class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sentence } = this.props;
        var styles = {
            position: "absolute ",
            top: sentence.text_top + "px",
            left: sentence.text_left + "px",
            fontSize: sentence.font_size + "px",
            color: sentence.font_color,
            width: sentence.text_width + "px",
            fontWeight: sentence.font_family && sentence.font_family.includes("Bold") && 'bold',
            textAlign: "justify",
            zIndex: 1
        }
        return (
            <div style={styles} key={sentence.block_id}>
                {sentence.text}
            </div >
        );
    }
}

export default Preview;