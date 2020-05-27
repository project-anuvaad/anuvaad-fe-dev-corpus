import React from "react";
import Paper from "@material-ui/core/Paper";
import { blueGrey50,darkBlack } from "material-ui/styles/colors";
import { ResponsiveContainer } from "recharts";
import { typography } from "material-ui/styles";
import Typography from '@material-ui/core/Typography';
import { translate } from "../../../../assets/localisation";
const NewOrders = props => {
  const { title, data, status,value } = props;
  const styles = {
    paper: {
      backgroundColor: blueGrey50,
      // height: 150
    },
    div: {
      // height: 95,
      padding: "5px 15px 15px 15px",
      color: darkBlack,

    },
    header: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      color: darkBlack,
      backgroundColor: blueGrey50,
      padding: 12,
      marginLeft:"55px"
    }
  };
  return (
    <Paper style={styles.paper}>
      <div style={{ ...styles.header}}>{title}</div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <div>
              {data ?
                data.map(item=>
                  <div key ={item.s_id}>
                    {data.length>1 &&
                     <Typography variant="h6" gutterBottom  style={{ color: darkBlack,marginLeft:"65px"}} >{item.s_id}</Typography>}
                     <Typography variant="h6" gutterBottom style={value ?{ color: darkBlack,marginLeft:"55px",marginRight:'12%'}:{ color: darkBlack,marginLeft:"65px"}} >{item.tgt}</Typography>
                     
                     {status && <div>
                     <Typography variant="subtitle2" gutterBottom style={{ color: darkBlack,marginLeft:"75px"}} >{translate('neworders.page.label.inputSubwords')}&nbsp; &nbsp; : {item.input_subwords? item.input_subwords: 'NA'}</Typography>
                     <Typography variant="subtitle2" gutterBottom style={{ color: darkBlack,marginLeft:"75px"}} >{translate('neworders.page.label.outputSubwords')}&nbsp;: {item.output_subwords? item.output_subwords : 'NA'}</Typography> </div>}
                  
                  <br/>
                
                  </div>
                
                ): [] }
          
          </div>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

// NewOrders.propTypes = {
//   data: PropTypes.array
// };

export default NewOrders;
