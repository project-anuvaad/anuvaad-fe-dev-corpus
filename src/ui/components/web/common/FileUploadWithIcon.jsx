import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';

class FileUpload extends React.Component {

    handleFileChange = event => {
        this.props.handleChange(this.props.name, event);
    };

    handleClick = event => {
        this.props.handleClick();
    };


    render() {
        const { accept, icon, iconStyle, title, value } = this.props;
        return (
            
            <div style={{ display: 'inline-block' }}>
                {!value ?
                <label title={title}>
                    <IconButton title={title} style={iconStyle ? iconStyle : {}} color="primary" component="span">
                        <input
                            accept={accept}
                            style={{ display: 'none' }}
                            type="file"
                            onChange={event => {
                                this.handleFileChange(event);
                            }}

                           
                        />
                        {icon}
                    </IconButton>
                </label>
    :<IconButton title={title} style={iconStyle ? iconStyle : {}} color="primary" component="span" onClick={event => {
        this.handleClick();
    }}>{icon} </IconButton>}
            </div>
                        
        );
    }
}

export default FileUpload;
