import React from "react";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";

class MenuClass extends React.Component {
  render() {

    const { topValue, leftValue, isOpen, splitValue } = this.props;
    console.log(this.props.operation_type)
    return (
      <Popover
        id="menu-appbar"
        open={isOpen}
        
        anchorReference="anchorPosition"
        anchorPosition={{ top: topValue, left: leftValue }}
        onClose={() => this.props.handleClose()}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        
      >
        <div>
        { this.props.operation_type === "merge" && (
          <Button
            style={{ textTransform: "none", width: "100%", justifyContent: "left" }}
            onClick={() =>
               this.props.operation_type === "merge" ?this.props.handleDialog( "Merge", "Do you want to merge the sentence ?"):this.props.handleDialog( "Split", "Do you want to split the sentence ?")
            }
          >
            {" "}
            {this.props.operation_type === "merge" || this.props.operation_type === "merge-individual" ? "Merge Block" : "Split"}
          </Button>
          
        )}
          
          <div>
            <Button
            style={{ fontWeight: "bold", width: "100%", justifyContent: "left" }}
            onClick={() =>
               this.props.operation_type === "Merge Sentence" ?this.props.handleDialog( "Merge sentence", "Do you want to merge the sentence ?"):this.props.handleDialog( "Split sentence", "Do you want to split the sentence ?")
            }
          >
            {" "}
            {this.props.operation_type === "Merge Sentence" ? "Merge Sentence" : "Split sentence"}
          </Button>
            {/* <Button style={{ textTransform: "none", width: "100%", justifyContent: "left" }} onClick={() => this.props.handleDialog( "Create", "Do you want to add the sentence ?")}>
              {" "}
              Create Block
            </Button>
            <br />
          
           <Button style={{ textTransform: "none", width: "100%", justifyContent: "left" }} onClick={() => this.props.handleDialog( "Duplicate", "Do you want to duplicate the sentence ?")}>
           {" "}
           Duplicate Block
         </Button>
         <br />
         <Button style={{ textTransform: "none", width: "100%", justifyContent: "left" }} onClick={() => this.props.handleDialog( "Delete", "Do you want to delete the sentence ?")}>
           {" "}
           Delete Block
         </Button> */}
         <br />
       </div>
        

        </div>
        {splitValue}
      </Popover>
    );
  }
}

export default MenuClass;
