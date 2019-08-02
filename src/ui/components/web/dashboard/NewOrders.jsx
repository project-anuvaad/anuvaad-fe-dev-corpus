import React from "react";
import Paper from "@material-ui/core/Paper";
import { white, blueGrey50,darkBlack } from "material-ui/styles/colors";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { typography } from "material-ui/styles";
import Typography from '@material-ui/core/Typography';
const NewOrders = props => {
  const { title, data } = props;
  const styles = {
    paper: {
      backgroundColor: blueGrey50,
      // height: 150
    },
    div: {
      // height: 95,
      padding: "5px 15px 0 15px",
      color: darkBlack
    },
    header: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      color: darkBlack,
      backgroundColor: blueGrey50,
      padding: 10
    }
  };

  return (
    <Paper style={styles.paper}>
      <div style={{ ...styles.header }}>{title}</div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <div>
            {data.map((text)=>{
              return <Typography variant="subtitle2" gutterBottom style={{ color: darkBlack}}>
              {text ? text : ' '}
      </Typography>
            })}
            
      {/* 
            <Typography variant="subtitle2" gutterBottom style={{ color: 'white' }}>
              Transaltion Output
      </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ color: 'white' }}>
              Transaltion Output
      </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ color: 'white' }}>
              Transaltion Output
      </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ color: 'white' }}>
              Transaltion Output
      </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ color: 'white' }}>
              Transaltion Output
      </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ color: 'white' }}>
              Transaltion Output
      </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ color: 'white' }}>
              Transaltion Output
      </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ color: 'white' }}>
              Transaltion Output
      </Typography> */}
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
