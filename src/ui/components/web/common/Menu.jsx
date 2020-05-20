
import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";



class MenuClass extends React.Component {

    

    render() {
      
      const { anchorEl,openEl,onClose,handleClose, handleApiMerge, operation_type} = this.props;
        var val=[]
        return (
            <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            disableAutoFocusItem={false}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={openEl}
            onClose={onClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                handleApiMerge()
              }}
            >
              {operation_type === "merge" ? "Merge Sentence" : "Split Sentence"}
            </MenuItem>
          </Menu>
        );
      }
    }
    
export default (MenuClass);





