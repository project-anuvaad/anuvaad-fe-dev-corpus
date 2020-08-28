import React from "react";

class EditorTable extends React.Component {
  constructor(props) {
    super(props);
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
                 zIndex: 1,
                
                borderCollapse: "collapse",
                position: 'absolute',
                top: tableData.text_top + "px",
                left: tableData.text_left + "px",
                width: tableData.text_width + "px",
                height: tableData.text_height + "px",
                // lineHeight: tableData.children && parseInt(tableData.text_height / tableData.children.length) + 'px',
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

  render() {
    const { table } = this.props;
    return (
      <div>
        <div>
          {this.fetchTableContent(table)}
        </div>
      </div>
    );
  }
}

export default EditorTable;
