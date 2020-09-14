import React from "react";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import { translate } from "../../../../assets/localisation";

class MenuClass extends React.Component {
  render() {

    const { topValue, leftValue, isOpen } = this.props;
    console.log(this.props.sentenceOp)
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
          { this.props.operation_type === "split" && (
          <div>
            <Button
            style={{ textTransform: "none", width: "100%", justifyContent: "left" }}
            onClick={() =>
               this.props.sentenceOp === "merge" ?this.props.handleDialog( "Merge sentence", "Do you want to merge the sentence ?"):this.props.handleDialog( "Split sentence", "Do you want to split the sentence ?")
            }
          >
            {" "}
            {this.props.sentenceOp === "merge" ? "Merge Sentence" : "Split sentence"}
          </Button>
            <Button style={{ textTransform: "none", width: "100%", justifyContent: "left" }} onClick={() => this.props.handleDialog( "Create", "Do you want to add the sentence ?")}>
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
         </Button>
         <br />
       </div>
        )}

        </div>
      </Popover>
    );
  }
}

export default MenuClass;
