import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class AppCard extends React.Component {
    render() {
        let { header, body } = this.props
        return (
            <Card className='card' >
                <CardContent>
                    <Typography className='cardTitle' color="textSecondary" gutterBottom>
                        {header}
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
