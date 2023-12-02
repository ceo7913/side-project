import React, { useRef, useState } from "react";
import "./Navmenu.css";
// import Logo from "./img/logo.png"

import anime from "animejs";
import Login from "../Login/Login";
import { useNavigate,Navigate,useLocation } from "react-router-dom";

const Navmenu = () => {
  const nav =useNavigate()
  // const location = useLocation(); 
  // const {id,job} = location.state;
  // const toProject = ()=>nav("/project", {
  //   state :{
  //     id: 1,
  //     job: '개발자'
  //   }
  // // })
  // const toProject = () => nav("/project")
  const toStudy = () => nav("HomePage-for-Fun/study")
  const toHompage = () => nav("HomePage-for-Fun/")
  const toProject = () => nav("HomePage-for-Fun/project")
  const toIssue = () => nav("HomePage-for-Fun/issue")

  const animeRef = useRef();
  const [openBox,setOpenBox] = useState(false);
  const clickEvent = () => {
    animeRef.current = anime({
      targets: [".LoginBox"],
      width: ["0px", "450px"],
      height: ["0px", "580px"],
      top: ["0%", "50%"],
      right: ["15%", "50%"],
      opacity: ["0%", "100%"],
      translateX: ["100%", "50%"],
      translateY: ["0%", "-50%"],
      easing: "easeInOutSine",
      duration: 800,
    });
    console.log("왜안먹니?");
    setOpenBox(true);
  };
  return (
    <>
      <div className="navBar">
        <div className="teamName" onClick={toHompage}>J.Code Story</div>
        {/* <img className='logoimg' src={Logo} alt="이미지를 찾을 수 없습니다"/> */}
        <div className="navMenu">
          <span onClick={toProject}>Project</span>
          <span onClick={toStudy}>Study</span>
          <span onClick={toIssue}>Issue Log</span>
          <span>About</span>
        </div>
        <div className="navMenuLast">
          <span className='logJoin' onClick={clickEvent}>Login</span>
          <span>
          <input className="searchBox"/>
          </span>
        </div>
      </div>

    {/* {openBox ? <Login setOpenBox={setOpenBox}/> : null} */}
    <Login setOpenBox={setOpenBox} openBox={openBox} />
    </>
  );
};

export default Navmenu;
