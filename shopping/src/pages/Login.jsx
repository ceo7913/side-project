import React from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
   /*
      firebase 이메일, 비밀번호 로그인 생성
      firebase -> 해당 프로젝트 -> Authenication -> Sign-in method -> 새 제공업체 추가 -> 기본제공업체(이메일/비밀번호)선택
   */
   return (
      <div>
         <Link to='/join'>회원가입</Link>
      </div>
   )
}
