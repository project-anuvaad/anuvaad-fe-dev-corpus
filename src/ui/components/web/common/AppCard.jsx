import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const styles = theme => ({
  card: {
    marginTop:'19px',
    marginRight:'4%'
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false};


  render() {

    let { header, body , style, expanded} = this.props
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
          
        <CardHeader style={style}
          action={
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: expanded
              })}

              
              onClick= {this.props.handleExpandClick && body ? () => { this.props.handleExpandClick(header, body) }:''}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />

             
            </IconButton>

          }

          
          titleTypographyProps={{variant:'h4' }}
          title={header}
        />

        

        
        <Collapse in={this.props.expanded}>
          <CardContent>
          {body &&
            <Typography color="#4c4c4c" style={{ fontSize: '35px', textAlign:'left' }}>
             {body}
            </Typography>
            
        }
          </CardContent>
          
        </Collapse>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
    
        


       
               

                    
                       
            