import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { googleLogOut, googleLogin, onUserState } from '../api/firebase';
import { UserData } from './UserData';

export const Nav = () => {
  const [user, setUser] = useState()
  const loginOfGoogle = () =>{
    // firebase.jsx
    googleLogin().then(setUser);
  }
const logoutOfGoogle = () =>{
    googleLogOut().then(setUser);
}
  useEffect(()=>{
    onUserState((user)=>{
      // 마운트 할때마다 user 값을 넘겨줘서 새로고침해도 login 이 풀리지 않도록 한다.
      setUser(user);
    })
    
  },[])
  console.log(user)
  return (
    <HeaderContainer>
        <h1><Link to='/'>shop</Link></h1>
        <div className='userWrap'>
          <Link to='/product/upload'>업로드</Link>
          {user && <UserData user={user}/>}
          {!user ? 
            (<button className='loginBtn' onClick={loginOfGoogle}>LOGIN</button>):
            (<button className='logOutBtn'onClick={logoutOfGoogle}>LOGOUT</button>)
          }
        </div>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
    
`
