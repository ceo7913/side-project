import React, { useEffect, useRef, useState } from 'react'
import "./style/IssuePage.scss"
import"./style/CursorMenu.css"
import Main from './Main'
import { useMotionValue, useSpring,motion, useAnimationControls } from 'framer-motion';





 
const IssuePage = () => {
    const animate = useAnimationControls();
    useEffect(()=>{
        const listener = (e) =>{
            animate.start({
                x:e.clientX,
                y:e.clientY,
                transition:{
                    type:"spring",
                    stiffness:700,
                    damping:35,
                    mass:1
                }
            });
        };
        window.addEventListener("mousemove",listener);
        return()=>{
            window.removeEventListener("mousemove",listener);
        };
    },[animate]);
  return (
    <>
    <motion.div className='cube' animate={animate}>🖕</motion.div>
    <div className='IssuePageBody'> 
<div className="chest">
  <div className="chest__panel chest__panel--back"></div>
  <div className="chest__panel chest__panel--front">
    <div className="chest__panel chest__panel--front-frame"></div>
  </div>
  <div className="chest__panel chest__panel--top"></div>
  <div className="chest__panel chest__panel--bottom"></div>
  <div className="chest__panel chest__panel--left"></div>
  <div className="chest__panel chest__panel--right"></div>
  <div className="chest-drawer chest-drawer--top">
    <details>
      <summary></summary>
    </details>
    <div className="chest-drawer__structure">
      <div className="chest-drawer__panel chest-drawer__panel--left"></div>
      <div className="chest-drawer__panel chest-drawer__panel--right"></div>
      <div className="chest-drawer__panel chest-drawer__panel--bottom"></div>
      <div className="chest-drawer__panel chest-drawer__panel--back">GIT ISSUE</div>
    </div>
  </div>
  <div className="chest-drawer chest-drawer--middle">
    <details>
      <summary></summary>
    </details>
    <div className="chest-drawer__structure">
      <div className="chest-drawer__panel chest-drawer__panel--left"></div>
      <div className="chest-drawer__panel chest-drawer__panel--right"></div>
      <div className="chest-drawer__panel chest-drawer__panel--bottom"></div>
      <div className="chest-drawer__panel chest-drawer__panel--back">REACT ISSUE</div>
    </div>
  </div>
  <div className="chest-drawer chest-drawer--bottom">
    <details>
      <summary></summary>
    </details>
    <div className="chest-drawer__structure">
      <div className="chest-drawer__panel chest-drawer__panel--left"></div>
      <div className="chest-drawer__panel chest-drawer__panel--right"></div>
      <div className="chest-drawer__panel chest-drawer__panel--bottom"></div>
      <div className="chest-drawer__panel chest-drawer__panel--back">ABOUT</div>
    </div>
  </div>
</div>
<Main/>

    </div>
    </>
  )
}

export default IssuePage