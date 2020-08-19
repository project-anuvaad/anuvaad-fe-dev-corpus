import React from "react";

class EditorTable extends React.Component {
    constructor(props) {
        super(props);
    }

    fetchBlockData(data) {

        if (data && data.length > 0) {
            return (
                <div>{
                    data.map((textObj, i) => {
                        return (
                            <div key={i} style={{ left: textObj.text_left + "px", top: textObj.text_top + "px", width: textObj.text_width + "px" }}>{textObj.text}</div>
                        )
                    })
                }</div>
            )

        }

    }

    fetchTableContent(sentences) {

        let tableRow = [];
        let index = 0;

        let col = [];

        if (sentences && sentences.children && Array.isArray(sentences.children) && sentences.children.length > 0) {
            sentences.children.map((tableData, i) => {
                if (tableData.text && Array.isArray(tableData.text) && tableData.text.length > 0) {
                    console.log(tableData.text_width)
                    debugger
                    col.push(
                        <td key={i}
                            style={{
                                // width: tableData.text_width + "px",
                                border: "1px solid black", borderCollapse: "collapse"
                            }}>{this.fetchBlockData(tableData.text)}</td>)
                    // tableData.text.map((data, index) => {

                    // col.push(
                    //     <td
                    //         style={{
                    //             fontSize: data.font_size + "px",
                    //             color: data.font_color,
                    //             // width: tableData.text_width + "px",
                    //             width: data.text_width + "px",
                    //             left: data.text_left + "px",
                    //             top: data.text_top + "px",
                    //             border: "1px solid black",
                    //             borderCollapse: "collapse",
                    //             fontWeight: data.font_family && data.font_family.includes("Bold") && 'bold',
                    //         }}
                    //     >{data.text}</td>
                    // )

                    // })
                }

            })
            if (col && col.length > 0) {
                tableRow.push(<tr key={index}>{col}</tr>)
            }
            index++;
        }



        return tableRow

    }

    render() {

        const { table } = this.props
        return (
            <div>
                <table style={{ border: "1px solid black", borderCollapse: "collapse", position: "absolute", top: table.text_top + "px", left: table.text_left + "px", width: table.text_width + "px" }}>
                    <tbody>{this.fetchTableContent(table)}</tbody>
                </table>
            </div>
        )
    }

}

export default EditorTable;