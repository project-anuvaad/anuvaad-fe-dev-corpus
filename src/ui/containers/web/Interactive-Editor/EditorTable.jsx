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
              <div
                key={i}
                style={{ position: "absolute", top: textObj.text_top + "px", left: textObj.text_left + "px", width: textObj.text_width + "px" }}
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
              style={{
                 
                border: "1px solid black",
                borderCollapse: "collapse",
                position: 'absolute',
                top: tableData.text_top + "px",
                left: tableData.text_left + "px",
                width: tableData.text_width + "px",
                height: tableData.text_height + "px"
              }}
            >
              {tableData.text.map((textObj, i) => {
                return (
                    
                  <div
                    key={i}
                    
                    style={{paddingLeft:textObj.text_left-tableData.text_left +"px",fontSize:textObj.font_size + "px", fontWeight: textObj.font_family && textObj.font_family.includes("Bold") && 'bold',}}
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

  render() {
    const { table } = this.props;
    return (
      <div>
        <div
          style={{
            // border: "1px solid black",
            // borderCollapse: "collapse",
            // // position: "relative",
            // top: table.text_top + "px",
            // left: table.text_left + "px",
            // width: table.text_width + "px",
            // height: table.text_height + "px"
          }}
        >
          {/* <td style={{left: "100px", top: "50px", border: "1px solid black"}}>Test1</td>
                        <td>Test2</td> */}
          {this.fetchTableContent(table)}
        </div>
      </div>
    );
  }
}

export default EditorTable;
