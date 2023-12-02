import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "../Hompage-style/Secondpage.css";

import CodeComputer from "../../../img/codecomputer.gif"
import CodeComputer2 from "../../../img/codecomputer2.png"

import ProjectPng from "../../../img/projectP.png"
import ProjectGif from "../../../img/projectG.gif"

import StudyNote from "../../../img/studynote.gif"
import StudyNote2 from "../../../img/studynote2.png"


const Secondpage = () => {

const [isHover,setIsHover] =useState(false);
function handleMouseEnter(){
  setIsHover(true);
}
function handleMouseLeave(){
  setIsHover(false);
}

  const boxVariants = {
    out: {
        y: 0
    },
    in: {
        y: 0,
        transition: {
            // first child 는 parent 가 나타나고 0.6s 후에 나타난다.
            duration: 0.5,
            // first child 의 sibling child 는 0.5s 의간격을 두고 나타난다.
            delayChildren: 0.4,
            // staggerChildren 이 없다면 모든 child 가 parent 가 나타나고 0.7s 후 동시에 나타난다.
            staggerChildren: 0.6
        }
    }
};

const iconVariants = {
    out: {
        x: -2000, // translateX(-600)
    }, 
    in: {
        x: 0
    }
};


  return (
    <div    
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
      <motion.div className="Sparent"   
      variants={boxVariants} animate={isHover?"in":"out"}      >
        <motion.div className="Sdiv1"
        role="img" aria-labelledby='magic wand'
        variants={iconVariants}
        >
          <div className="projectText">Project</div>
          <div className="pngImg">
            <img src={ProjectPng} alt="Project2.png" />
          </div>
          <img src={ProjectGif} alt="Project.gif"></img>
        </motion.div>
        <motion.div className="Sdiv2"
        role="img" aria-labelledby='sparkles' variants={iconVariants}
        >
        <div className="studyText">Study</div>
          <div className="Sdiv2Img">
            <img src={StudyNote2} alt="Project2.png" />
          </div>
          <img src={StudyNote} alt="Project.gif"></img>
          {/* <div className="Sdiv2In">
            <img src={StudyNote2} alt="sw2.png" />
          </div>
          <div className="Sw2Text">Study</div>
          <div className="studyText">
            <img src={StudyNote} alt="studynote2.png"></img>
          </div> */}
        </motion.div>
        <motion.div className="Sdiv3" variants={iconVariants}>
            <div className="issueText">Issue Log</div>
          <div className="pngImg3">
            <img
              src={CodeComputer2}
              alt="yellows2.png"
              style={{ objectFit: "fill" }}
            />
          </div>
          <img src={CodeComputer} alt="yellows.gif" style={{ objectFit: "fill" }} />
       
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Secondpage;
