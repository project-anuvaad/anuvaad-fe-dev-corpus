import React from "react";
import ContextMenu from "react-context-menu";

class CustomTable extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            openContextMenu: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.scrollToId !== this.props.scrollToId) {
            let sid = this.props.scrollToId.split('_')[0]
            if (this.refs[sid + '_' + this.props.scrollToId.split('_')[1] + '_' + this.props.paperType] && this.props.paperType !== this.props.parent) {
                this.refs[sid + '_' + this.props.scrollToId.split('_')[1] + '_' + this.props.paperType].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
            }
            else if (this.refs[sid + '_' + this.props.paperType] && this.props.paperType !== this.props.parent) {
                this.refs[sid + '_' + this.props.paperType].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
            }
        } 
        else if (prevProps.scrollToPage !== this.props.scrollToPage) {
            if (this.refs[this.props.scrollToPage + '_' + this.props.paperType])
                this.refs[this.props.scrollToPage + '_' + this.props.paperType].scrollIntoView({
                    behavior: 'smooth',
                })
        }
    }

    fetchTable(id, sentences, prevSentence, tableIndex, pageNo) {
        let tableRow = []
        let index = 0
        let printPageNo = false
        let isFirst = false

        if (tableIndex === 0) {
            printPageNo = true
            isFirst = true
        } else if (prevSentence && sentences[0][0].page_no !== prevSentence.page_no) {
            printPageNo = true
        }

        for (let row in sentences) {
            let col = []
            let isHeightRequired = false
            for (let block in sentences[row]) {
                let blockData = this.props.paperType === 'source' ? sentences[row][block].text : sentences[row][block].target
                let blockId = id + '_' + sentences[row][block].sentence_index
                let bgColor = !this.props.isPreview ? ((this.props.hoveredTableId === blockId) ? "yellow" : this.props.selectedTableId === blockId ? '#4dffcf' : "") : ""

                if(!blockData) {
                    isHeightRequired = true
                }
                col.push(<td id={blockId} key={blockId}
                    onClick={() => this.props.handleTableCellClick(id, blockId, sentences[row][block], "true", this.props.paperType, pageNo)}
                    onMouseEnter={() => this.props.handleOnMouseEnter(id, blockId, pageNo)}
                    onMouseLeave={() => this.props.handleOnMouseLeave()}
                    style={{ backgroundColor: bgColor, padding: '8px', border: '1px solid black', borderCollapse: 'collapse', minWidth: '25px' }}
                    >
                    {blockData}</td>)
            }

            if(!isHeightRequired){
                tableRow.push(<tr key={index}>{col}</tr>)
            } else {
                tableRow.push(<tr style={{height:"36px", }} key={index}>{col}</tr>)
            }
            index++
        }
        return tableRow
    }

    handleMenu() {
        this.setState({ openContextMenu : true})
    }

    render() {
        let printPageNo = false
        let isFirst = false
        if (this.props.tableIndex === 0) {
            printPageNo = true
            isFirst = true
        } else if (this.props.prevSentence && this.props.tableItems[0][0].page_no !== this.props.prevSentence.page_no) {
            printPageNo = true
        }

        let sentence = this.props.sentence
        return (
            <div>{printPageNo ? <div ref={this.props.pageNo + '_' + this.props.paperType} style={{ textAlign: 'right', color: 'grey', fontSize: 'small' }}>{!this.props.isFirst ? <hr /> : ''}Page: {this.props.pageNo}/{this.props.noOfPage}<div>&nbsp;</div></div> : <div></div>}
                <table onContextMenu={this.handleMenu.bind(this)} key={this.props.id} ref={this.props.id + '_' + this.props.paperType} style={{ marginBottom: '20px', border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
                    <tbody>{this.fetchTable(this.props.id, this.props.tableItems, this.props.prevSentence, this.props.tableIndex, this.props.pageNo)}</tbody>
                </table>
                { this.state.openContextMenu && this.props.paperType === 'source' && <ContextMenu
                  contextId="popUp"
                  items={[
                    {
                      label: "Add new row",
                      onClick: ()=>{this.setState({openContextMenu: false}),this.props.handleAddCell(sentence, 'add-row')},
                      closeOnClick: true,
                      closeOnClickOut: true,
                    },
                    {
                      label: "Add new column",
                      onClick: ()=>{this.setState({openContextMenu: false}), this.props.handleAddCell(sentence, 'add-column')},
                      closeOnClick: true,
                      closeOnClickOut: true
                    }
                  ]}
                />}
            </div>
        )
    }
}

;


export default CustomTable;