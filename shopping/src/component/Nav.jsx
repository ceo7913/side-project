import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { googleLogOut, googleLogin, onUserState } from '../api/firebase';
import { UserData } from './UserData';

import { RiFileUploadLine } from "react-icons/ri";
import { MainMenu } from './MainMenu';

export const Nav = () => {
  const [user, setUser] = useState()
  const loginOfGoogle = () => {
    // firebase.jsx
    googleLogin().then(setUser);
  }
  const logoutOfGoogle = () => {
    googleLogOut().then(setUser);
  }
  useEffect(() => {
    onUserState((user) => {
      // 마운트 할때마다 user 값을 넘겨줘서 새로고침해도 login 이 풀리지 않도록 한다.
      setUser(user);
    })
  }, []);

  return (
    <HeaderContainer>
      <h1><Link to='/'>shop</Link></h1>
      <MainMenu />
      <div className='userWrap'>
        <Link to='/search'>검색</Link>
        {user && user.isAdmin && (
          /*
            user data 가 admin 일 때만 생성
            but 이렇다 하더라도 해당 경로를 직접적으로 알고 있으면 접근이 가능하다 따라서 추가 조건이 필요
            관리자 인증(조건에 하나라도 만족하지 못하면 페이지를 이동할 수 없게 홈으로 이동)(index.jsx 확인)
          */
          <Link to='/product/upload' className='uploadBtn'>업로드{RiFileUploadLine}</Link>
        )}
        {!user ?
          (<button className='loginBtn' onClick={loginOfGoogle}>LOGIN</button>) :
          (
            <>
              <UserData user={user} />
              <button className='logOutBtn' onClick={logoutOfGoogle}>LOGOUT</button>
            </>
          )
        }
      </div>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    padding: 12px;
    gap: 24px;
    border-bottom: solid 1px rgba(0,0,0,0.1);
    .userWrap{
      display: flex;
      margin-left: auto;
      align-items: center;
      gap: 12px;
      button{
        padding: 6px 12px;
        border-radius: 6px;
        color: white;
        &.loginBtn{
          background: pink;
        }
        &.logOutBtn{
          background: gray;
        }
      }
      .uploadBtn{

      }
    }
`
