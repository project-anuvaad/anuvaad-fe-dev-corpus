import React from "react";
import PopOver from "./EditorPopover";

class EditorTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openContextMenu: false,
      anchorEl: null,
      selectedRow: "",
      selectedColumn: "",
      topValue: "",
      leftValue: "",
      selectedTable: ""
    };
  }

  fetchBlockData(data) {
    if (data && data.length > 0) {
      return (
        <div>
          {data.map((textObj, i) => {
            return (
              //
              <div
                key={i}
                style={{ top: textObj.text_top + "px", left: textObj.text_left + "px", width: textObj.text_width + "px" }}
              >
                {textObj.text}
              </div>
            );
          })}
        </div>
      );
    }
  }

  fetchTableContent(sentences) {
    let col = [];

    if (sentences && sentences.children && Array.isArray(sentences.children) && sentences.children.length > 0) {
      sentences.children.map((tableData, i) => {
        if (Array.isArray(tableData.text)) {
          col.push(
            <div
              key={i}
              id={this.props.tableId + "_" + tableData.index[0] + "_" + tableData.index[1] + this.props.pageNo}
              style={{
                 zIndex: 1,
                
                borderCollapse: "collapse",
                position: 'absolute',
                zIndex: 1,
                top: tableData.text_top + "px",
                left: tableData.text_left + "px",
                width: tableData.text_width + "px",
                height: tableData.text_height + "px",
                // lineHeight: tableData.children && parseInt(tableData.text_height / tableData.children.length) + 'px',
                backgroundColor: this.props.hoveredTableId === this.props.tableId + "_" + tableData.index[0] + "_" + tableData.index[1] + "_" + this.props.pageNo ? "yellow" : ""
              }}
              onMouseEnter={() => this.props.handleTableHover(this.props.tableId + "_" + tableData.index[0] + "_" + tableData.index[1] + "_" + this.props.pageNo)}
              onMouseLeave={() => this.props.handleTableHover("")}
              onContextMenu={e => {
                e.preventDefault();
                this.handleMenu(e, tableData.index, tableData.text_top, tableData.text_left);
                this.setState({ selectedTable: this.props.tableId + "_" + tableData.index[0] + "_" + tableData.index[1] + "_" + this.props.pageNo })
                return false;
              }}
            >
              {tableData.text.map((textObj, i) => {
                return (

                  <div
                    key={i}
                    
                    style={{fontSize:textObj.font_size + "px", fontWeight: textObj.font_family && textObj.font_family.includes("Bold") && 'bold'}}
                  >
                    {textObj.text}
                  </div>
                );
              })}
            </div>
          );
        }
      });

      return col;
    }
  }

  handleMenu(e, index, top, left) {
    this.props.handlePopUp()
    this.setState({
      openContextMenu: true,
      anchorEl: e.currentTarget,
      selectedRow: index[0],
      selectedColumn: index[1],
      topValue: e.clientY - 4,
      leftValue:e.clientX - 2
    });
  }

  handleOnClick(sentence, operationType) {

    if (this.state.openContextMenu && operationType === "delete-table") {
      this.props.handleDeleteTable(this.state.selectedTable, this.props.currentPage)
      // this.props.handleDeleteBlock(this.state.selectedTable, "",this.props.currentPage, "table")
    } else if (this.state.openContextMenu && (operationType === "add-column" || operationType === "add-row")) {
      this.props.handleDialog(sentence, "", operationType);
    } else if (
      this.state.openContextMenu &&
      (operationType === "delete-row" || operationType === "delete-column")
    ) {
      if (this.state.selectedRow && this.state.selectedColumn) {
        let cellData = sentence.table_items[this.state.selectedRow][this.state.selectedColumn];
        this.props.handleDialog(sentence, cellData, operationType);
      }
    }
    this.setState({ openContextMenu: false, anchorEl: null, leftValue: "", topValue: "" });
  }

  handlePopOverClose() {
    this.setState({ openContextMenu: false, anchorEl: null, leftValue: "", topValue: "" });
  }



  render() {
    const { table } = this.props;
    return (
      <div>
        <div>
          {this.fetchTableContent(table)}
        </div>
        {this.props.popOver && (
          <PopOver
            id={this.props.tableId}
            isOpen={this.state.openContextMenu}
            topValue={this.state.topValue}
            leftValue={this.state.leftValue}
            anchorEl={this.state.anchorEl}
            handleOnClick={this.handleOnClick.bind(this)}
            handlePopOverClose={this.handlePopOverClose.bind(this)}
            tableItems={this.state.tableItems}
            tableValues={this.state.tableTitles}
            handleAddNewTable={this.props.handleAddNewTable}
            handleAddTableCancel={this.props.handleAddTableCancel}
            handleAddNewSentence={this.props.handleAddNewSentence}
            handlePopUp={this.props.handlePopUp}
            handleDeleteTable={this.props.handleDeleteTable}
            handleDeleteBlock={this.props.handleDeleteBlock}

          ></PopOver>
        )}
      </div>
    );
  }
}

export default EditorTable;
