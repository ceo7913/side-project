import {faEye, faEyeSlash, faScaleBalanced} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {motion} from "framer-motion";
import React, {useState} from "react";
import "./Login-style/Login.css";

const LoginType = () => {

    const [showPw, setShowPw] = useState("password");
    const [openEye, setOpenEye] = useState(faEyeSlash);
    // const [style, setStyle] = useState({})
    // const [hover,setHover]= useState(false);
    // const btnHover=()=>{
    //     setHover(true)
    // }
    
  
    // const [position,setPosition] = useState(0);
    
    // const test = () =>{
    //     setPosition(100)
    // }
 
    let position;
    const test = (e)=>{
         position ? (position=0):(position=100) 
        // position = (position=0) ? (position=100) : (position=0)
        // position = (position=100)? (position=-100):(position=0)
        console.log(position);
    // position = 100 ? -200 : 100
     e.target.style.transform = `translate(${position}px,0px)`  
     e.target.style.transition = "all 0.3s ease"
     return;
    }
    // const test2={
    //     start:{
    //         x:position = 0, // undefined
    //         scale:[1.1,1]
    //     },
    //     end:{
    //         x:position = 100  // undefined
    //     }

    // }

    // const test2 = {
    //     start: {
    //         position : position ? (position=0):(position=100),
    //         x: position,
    //         scale: [1.1, 1]
    //     },
    //     end:{
    //         x:position
    //     }
    // };
    // const test2 ={
    //     hover:{
    //         x:-100,
    //         scale:[1.1,1]
    //     },
    //     initial:{
    //         x:0
    //     }
    // }
    // let test3 = 100

    const clickPwBtn = (e) => {
        if (showPw === "password") {
            setShowPw("text");
            setOpenEye(faEye);
        } else if (showPw !== "password") {
            setShowPw("password");
            setOpenEye(faEyeSlash);
        }
        // showPw ==="password" ? setShowPw("text") : setShowPw("password")
        // const moveBtn = () => {   if (showPw !== "1234") {     setStyle({       left:
        // "500px"     })   } };
    };

    return (
        <div className="logInput">
            <input placeholder="Email Address"/>
            <div className="pwBox">
                <input placeholder="Password" type={showPw}/>
                <FontAwesomeIcon className="pwShow" icon={openEye} onClick={(e)=>clickPwBtn(e)}/> {/* <FontAwesomeIcon icon={faEyeSlash} /> */}
            </div>
            {/*  여기이슈 -> 지금 버튼에 호버 이벤트를 걸어놔서 버튼이 마우스 밖으로 벗어나는 순간 호버
이벤트가 풀림 밖에 div 를 감싸서 해당 d
 * iv 에  hover 이벤트를 만들어야 함

 */
            }
            <motion.div>
                <motion.button
                    onMouseEnter={(e)=>test(e)}
                    className="loginBtn"          
                    transition={{
                        delay: 0.1
                    }}>
                    Log in
                </motion.button>
            </motion.div>
            <div className="findPW">
                <a>Forgot Your Password?</a>
            </div>
        </div>
    );
};

export default LoginType;
