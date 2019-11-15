import React from 'react'
import ReactDOM from 'react-dom'
import { useSpring, animated } from 'react-spring'


import AppCard from "../Card";


const trans = (x, y, s) => `perspective(600px)  scale(${s})`

console.log()

function Card() {
       
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  return (
    <animated.div
       
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: [0,0,1] })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{marginLeft:'200px',marginTop:'500px', transform: props.xys.interpolate(trans) }}
    >
      <AppCard text={"sajish"}/>
    </animated.div>
  )
}


export default Card;
