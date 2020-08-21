import React from "react";

class EditorTable extends React.Component {
  constructor(props) {
    super(props);
  }

  fetchBlockData(data) {
    if (data && data.length > 0) {
      return (
        <div>
          {data.map((textObj, i) => {
            return (
            //      
              <div key={i}style={{position:'absolute',top: textObj.text_top + "px",
                left: textObj.text_left + "px",
                width: textObj.text_width + "px",}} >
                {textObj.text}
              </div>
            );
          })}
        </div>
      );
    }
  }

  fetchTableContent(sentences) {
    let tableRow = [];
    let index = 0;

    let col = [];

    if (sentences && sentences.children && Array.isArray(sentences.children) && sentences.children.length > 0) {
      sentences.children.map((tableData, i) => {
        sentences.children[i + 1]  && console.log("index", tableData.index[0], sentences.children[i + 1].index[0])
        if (
          ((sentences.children[i + 1]  &&
          tableData.index[0] == sentences.children[i + 1].index[0]) || sentences.children.length-1 ===i) &&
          tableData.text &&
          Array.isArray(tableData.text) &&
          tableData.text.length > 0
        ) {
          col.push(
            <td
              key={i}
             
              style={{
                overflow:"hidden",
                width: tableData.text_width + "px",
                border: "1px solid black",
                borderCollapse: "collapse"
              }}
            >
              {this.fetchBlockData(tableData.text)}
            </td>
          );
        } else if (sentences.children[i + 1] && tableData.index[0] != sentences.children[i + 1].index[0]) {
            
          let a = tableRow;
          let c = col;
          
          
          col.push(
            <td
              key={i}
              
              style={{
                overflow:"hidden",
                width: tableData.text_width + "px",
                border: "1px solid black",
                borderCollapse: "collapse"
              }}
            >
              {this.fetchBlockData(tableData.text)}
            </td>
          );

          
        if (col && col.length > 0) {
          tableRow.push(<tr key={index}>{col}</tr>);
          col=[]
        }
        index++;
        
        
        }
        
        
      });
      tableRow.push(<tr key={index}>{col}</tr>);
      return tableRow;
    }
  }

  render() {
    const { table } = this.props;
    return (
      <div>
        <table
          style={{
            
            
            border: "1px solid black",
            borderCollapse: "collapse",
            // position: "absolute",
            top: table.text_top + "px",
            left: table.text_left + "px",
            width: table.text_width + "px",
            height: table.text_height + "px"
          }}
        >
          {/* <td style={{left: "100px", top: "50px", border: "1px solid black"}}>Test1</td>
                        <td>Test2</td> */}
          {this.fetchTableContent(table)}
        </table>
      </div>
    );
  }
}

export default EditorTable;
