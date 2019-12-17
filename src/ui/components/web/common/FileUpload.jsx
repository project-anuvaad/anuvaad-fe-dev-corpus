import React from "react";
import Button from "@material-ui/core/Button";


class FileUpload extends React.Component {

  handleTextChange = event => {
      console.log(this.props.name)
    this.props.handleChange(this.props.name,event);
  };


  render() {
    const { accept, buttonName, value } = this.props;
    return (
      <div style= {{paddingTop:'24px'}}>
        <label >
          <Button variant="contained" component="span" color="primary" style= {{ width:'70%',marginTop:"-7px",height:'56px'}}>
        <input
          
          style={{ display: "none" }}
          accept={accept}
          id="contained-button-file"
          multiple
          type="file"
          onChange={event => {
            this.handleTextChange(event);
          }}
        />
        
            {buttonName}
          </Button>
        </label>
      </div>
    );
  }
}

export default FileUpload;
