import React, { useCallback, useRef, useState } from "react";
import "./Login-style/Login.css";
import Switch from "./Switch";

const Login = ({ setOpenBox, openBox }) => {
  const containerRef = useRef();

  const setOutBox = () => {
    setOpenBox(false);
  };
  // const clickXbox = ()=>{
  //   setOpenBox(false);
  // }
  return (
    <div ref={containerRef} className={`${!openBox && "off"} `}>
      <div className="LoginBox">
        <div className="outBox" onClick={setOutBox}>
          X
        </div>
        <div className="LogName">J.Code Story</div>
        <Switch />
      </div>
    </div>
  );
};

export default Login;
