import React from 'react'

// 받아온 user 정보를 담는 컴포넌트
export const UserData = ({user}) => {
  return (
    <div>
        {/* user 정보에 담긴 정보들*/}
        <img src={user.photoURL} alt={user.displayName} />
        <span>{user.displayName}</span>
    </div>
  )
}
