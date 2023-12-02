import React, { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SignupType = () => {
  const [showPw,setShowPw] = useState("password")  
  const [openEye,setOpenEye]= useState(faEyeSlash)
  const clickPwBtn = () =>{

    if(showPw ==="password"){
      setShowPw("text")
      setOpenEye(faEye);
    }else if(showPw !== "password"){
      setShowPw("password");
      setOpenEye(faEyeSlash);
    }
    // showPw ==="password" ? setShowPw("text") : setShowPw("password")  
  }
  return (
    <div className='signBox'>
        <input placeholder='Email Address'/>
        <input placeholder='Username'/>
        <div className='showPw1Div'>
        <input placeholder='Password' type={showPw}/>
        <FontAwesomeIcon  className='showPw1' icon= {openEye} onClick={clickPwBtn}/>
        </div>
        <div className='showPw2Div'>
        <input placeholder='Confirm your Password' type={showPw}/>
        <FontAwesomeIcon  className='showPw2' icon= {openEye} onClick={clickPwBtn}/>
        </div>
        <button className='signBtn'>Sign Up</button>
    </div>
  )
}

export default SignupType;