import React from "react";

class Preview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { key, sentence, yAxis, widthValue } = this.props;
    var a = {
      position: "absolute ",
      top: yAxis,
      left: sentence.x + "px",
      right: 70 + "px",
      width: widthValue + "px",
      fontSize: this.props.sentence.class_style["font-size"],
      fontFamily: this.props.sentence.class_style["font-family"],
      fontWeight: this.props.sentence.class_style["font-family"].includes("Bold") && 'bold',
      textAlign: "justify"
    };
    return (
      <div style={a} key={key}>
        {sentence.text}
      </div>
    );
  }
}

export default Preview;
