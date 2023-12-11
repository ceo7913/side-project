import React from 'react'
import styled from 'styled-components'

// 받아온 user 정보를 담는 컴포넌트
export const UserData = ({user}) => {
  return (
    <UserInfo>
        {/* user 정보에 담긴 정보들*/}
        <img src={user.photoURL} alt={user.displayName} />
        <span>{user.displayName}</span>
    </UserInfo>
  )
}

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  img{
    width: 36px;
    border-radius: 100%;
  }
`
