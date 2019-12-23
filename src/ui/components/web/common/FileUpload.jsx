import React from "react";
import Button from "@material-ui/core/Button";


class FileUpload extends React.Component {

  handleTextChange = event => {
    console.log(this.props.name)
    this.props.handleChange(this.props.name, event);
  };


  render() {
    const { accept, disabled, buttonStyle, divStyle, buttonName, value } = this.props;
    console.log(this.props.disabled)
    return (
      <div style={divStyle ? divStyle : { paddingTop: '24px' }}>

        <label >
          <Button variant="contained" component="span" disabled={disabled} color="primary" style={buttonStyle ? buttonStyle : { width: '70%', marginTop: "-7px", height: '56px' }}>

            {!disabled && <input

              style={{ display: "none" }}
              accept={accept}
              id="contained-button-file"
              multiple
              type="file"
              onChange={event => {
                this.handleTextChange(event);
              }}
            />
            }
            {buttonName}
          </Button>
        </label>
      </div>
    );
  }
}

export default FileUpload;
