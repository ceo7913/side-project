import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const BoardListItem = ({ post }) => {
   const navigate = useNavigate();
   const onDetailEvent = () => {
      navigate(`/board/qna/${post.id}`, {
         // 이동될때 넘겨줄 state 값
         state: {
            id: post.id,
            user: post.user,
            date: post.date,
            title: post.title,
            text: post.text,
         }
      });
   }
   return (
      <BoardItem onClick={onDetailEvent}>
         <p>{post.title}</p>
         <p>{post.date}</p>
      </BoardItem>
   )
}

const BoardItem = styled.li`
   
`