import React from "react";
import Paper from "@material-ui/core/Paper";
import { white, grey900 } from "material-ui/styles/colors";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { typography } from "material-ui/styles";
import Typography from '@material-ui/core/Typography';
const NewOrders = props => {
  const { title, data } = props;
  const styles = {
    paper: {
      backgroundColor: grey900,
      // height: 150
    },
    div: {
      // height: 95,
      padding: "5px 15px 0 15px"
    },
    header: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      color: white,
      backgroundColor: grey900,
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
              return <Typography variant="subtitle2" gutterBottom style={{ color: 'white' }}>
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
