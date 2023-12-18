import React, { useState } from 'react'
import styled from 'styled-components';
import { addBoard } from '../api/firebase';
import { useLocation } from 'react-router-dom';

export const WritePage = () => {
   const state = useLocation().state;
   const { email } = state;
   const [boardTitle, setBoardTitle] = useState('');
   const [boardText, setBoardText] = useState('');

   const today = new Date();
   const date = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`

   const onSubmit = async (e) => {
      try {
         await addBoard(email, date, boardTitle, boardText);
      } catch (error) {
         console.error(error)
      }
   }
   return (
      <BoardContainer className='contaienr'>
         <h2>게시글 작성하기</h2>
         {/* 작성된 내용을 서버로 전송 */}
         <form onSubmit={onSubmit}>
            <div className='wirte-box'>
               <label htmlFor="boardTitle">제목</label>
               <input
                  type="text"
                  id='boardTitle'
                  required
                  value={boardTitle}
                  onChange={(e) => setBoardTitle(e.target.value)}
               />
            </div>
            <div className='write-box'>
               <label htmlFor="boardText">내용</label>
               <textarea
                  id='boardText'
                  required
                  value={boardText}
                  onChange={(e) => setBoardText(e.target.value)}
               />
            </div>
            <button className='submit-btn'>작성하기</button>
         </form>
      </BoardContainer>
   )
}

const BoardContainer = styled.div`
   
`