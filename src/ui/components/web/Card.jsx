import React from 'react';
import Card from '@material-ui/core/Card';
import Zoom from '@material-ui/core/Zoom';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class AppCard extends React.Component {
    constructor(props) {
        super(props)
    }
    handleZoom() {

    }
    render() {
        let { header, body, bigsize, style, title, fontSize, showSmall, showZoomed } = this.props
        return (
            <Card style={style} className={[bigsize || title ? '' : 'zoom', 'card'].join(' ')} onMouseLeave={this.props.handleHoverOut} onMouseOver={this.props.handleHover && body ? () => { this.props.handleHover(header, body) } : bigsize ? () => { } : (() => { this.props.handleHoverOut() })} style={showSmall ? { minHeight: window.innerHeight / 12 } : (bigsize ? { minHeight: window.innerHeight - window.innerHeight / 6, minWidth: '95%' } : (title ? (showZoomed ? { minWidth: '100%',height: window.innerHeight  - window.innerHeight / 6 } : { paddingTop:'35%',minWidth: '100%' }) : {}))}>
                <CardContent>
                    <Typography  color="#4c4c4c" gutterBottom style={fontSize ? { fontSize: fontSize } : (bigsize ? { fontSize: '42px' } : {})}>
                        {header}
                    </Typography>
                    {body ?
                        <Typography  gutterBottom color="#4c4c4c" style={fontSize ? { fontSize: fontSize } : (bigsize ? { fontSize: '42px' } : {})}>
                            {body}
                        </Typography>
                        :
                        <div>
                            <span style={{ width: '70%', backgroundColor: '#d3d3d3', display: 'inline-block' }}>&nbsp;</span>
                            <br></br> <br></br>
                            <span style={{ width: '50%', backgroundColor: '#d3d3d3', display: 'inline-block' }}>&nbsp;</span>
                        </div>
                    }
                </CardContent>
            </Card>
        );
    }
}

export default AppCard;
