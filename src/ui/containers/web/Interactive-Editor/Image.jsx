import React from "react";

class Image extends React.Component {
    constructor(props) {
        super(props);
      }

      render() {
          const {image, width, height, styles} = this.props;

          return(
            <div style={styles}>
                <img width={width} height={height} src={image}></img>
            </div>
          )
      }

}

export default Image;