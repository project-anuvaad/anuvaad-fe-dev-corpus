import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class AppCard extends React.Component {
    render() {
        let { text } = this.props
        return (
            <Card className='card'>
                <CardContent>
                    <Typography className='cardTitle' color="textSecondary" gutterBottom>
                        {text}
            </Typography>
            <Typography  color="textSecondary" gutterBottom>
                       
            </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default AppCard;
