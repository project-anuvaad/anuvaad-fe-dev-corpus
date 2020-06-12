import React from "react";
import Popover from '@material-ui/core/Popover';
import Button from "@material-ui/core/Button";
class MenuClass extends React.Component {
  render() {
    console.log("sajish", this.props.topValue, this.props.leftValue);
    const { anchorEl, topValue, leftValue, isOpen, handleApiMerge, operation_type } = this.props;
    var val = [];
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

<div><Button style={{textTransform: 'none', width: '100%', justifyContent: 'left'}}  onClick={() =>
            this.props.operation_type === "merge-individual" && this.props.addSentence ? this.props.handleDialog() : this.props.handleApiMerge()
          }> {this.props.operation_type === "merge" || this.props.operation_type === "merge-individual" ? "Merge Sentence" : "Split Sentence"}</Button><br/></div>
        
        {this.props.mergeSentence.length < 2 && this.props.operation_type === "split" &&
        <div><Button style={{textTransform: 'none', width: '100%', justifyContent: 'left'}} onClick={() => this.props.handleAddSentence()}> Add another sentence</Button><br/></div>
                
         }
        {this.props.startParagraph._id === this.props.endParagraph._id &&
         <Button style={{textTransform: 'none', width: '100%', justifyContent: 'left'}} onClick={() => this.props.handleDeleteSentence()}>  Delete sentence</Button>
        
        }
        
        </Popover>
    );
  }
}

export default MenuClass;
