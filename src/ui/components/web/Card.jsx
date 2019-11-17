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
        let { header, body, bigsize, style, title, fontSize } = this.props
        return (
            <Card style={style} className={[bigsize || title ? '' : 'zoom', 'card'].join(' ')} onMouseLeave={this.props.handleHoverOut} onMouseOver={this.props.handleHover && body ? () => { this.props.handleHover(header, body) } : bigsize ? () => { } : (() => { this.props.handleHoverOut() })} style={bigsize ? { minHeight: window.innerHeight - window.innerHeight/7 } : (title ? { minWidth: '100%' } : {})}>
                <CardContent>
                    <Typography className='cardTitle' color="textSecondary" gutterBottom style={fontSize ? { fontSize: fontSize } : (bigsize ? { fontSize: '70px' } : {})}>
                        {header}
                    </Typography>
                    {body ?
                        <Typography color="textSecondary" gutterBottom style={bigsize ? { fontSize: '70px' } : {}}>
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
