import React from 'react';

import Countdown from 'react-countdown-now';
 
class Timer extends React.Component {

    state = {
        completed: 0,
        
      };
    
 
// Renderer callback with condition
renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    this.props.handleRefresh();
   return "Completed";
  } else {
    // Render a countdown
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};
 
render() {

    return (
  <Countdown
    date={ Date.now()+this.props.val}
    renderer={this.renderer}
  />
);
}
}




export default (Timer);