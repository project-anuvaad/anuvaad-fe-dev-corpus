import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class AppCard extends React.Component {
    render() {
        let { header, body , style} = this.props
        return (
            <Card     style={style} >
                <CardContent>
                    <Typography variant="h6" className='cardTitle' color="textSecondary" gutterBottom>
                        <b>{header}</b>
                    </Typography>

                    {body ?
                        <Typography color="textSecondary" gutterBottom>
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
