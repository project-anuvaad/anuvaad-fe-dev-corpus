import React from "react";

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      sentences: "",
      sourceSupScripts: "",
      targetSupScripts: "",
      header: ""
    };
  }

  render() {
    const { sentence, yAxis, width} = this.props;
    var a = {position: "absolute ", top: yAxis, left: sentence.x + "px", width:width}
    return <div style={a}>{sentence.text}</div>;
  }
}

export default Preview;
