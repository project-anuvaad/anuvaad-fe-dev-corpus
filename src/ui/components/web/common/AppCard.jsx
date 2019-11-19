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
import { ScrollTo, ScrollArea } from "react-scroll-to";

const styles = theme => ({
  card: {
    
    
    marginTop:'20px',
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
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false,marginTop:"auto" };

  handleExpandClick = () => {

    
    this.setState(state => ({ expanded: !state.expanded }));
    if(this.state.expanded){
        
    }
    
     
  };

  render() {

    let { header, body , style} = this.props
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
          
        <CardHeader style={{ fontSize: '42px' }}
          action={
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}

              
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />

             
            </IconButton>

          }

          
          titleTypographyProps={{variant:'h4' }}
          title={header}
        />

        

        <CardActions className={classes.actions} disableActionSpacing />
        <Collapse in={this.state.expanded} style={{marginTop:this.state.marginTop}} timeout="auto" unmountOnExit>
          <CardContent>
          {body ?
            <Typography color="#4c4c4c" style={{ fontSize: '35px' }}>
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
          
        </Collapse>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
    
        


       
               

                    
                       
            