import React, { useState } from 'react'
import styled from 'styled-components';
import { addBoard } from '../api/firebase';
import { useLocation, useNavigate } from 'react-router-dom';

export const WritePage = () => {
   const state = useLocation().state;
   const email = state;
   const [boardTitle, setBoardTitle] = useState('');
   const [boardText, setBoardText] = useState('');
   const navigate = useNavigate();

   const today = new Date();
   const date = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`

   const onSubmit = async (e) => {
      e.preventDefault(); // 기본 이벤트 제거
      try {
         await addBoard(email, date, boardTitle, boardText);
         // 작성 후 submit 하면 상단 페이지로 이동
         navigate('/board/qna');
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
            <button type='submit' className='submit-btn'>작성하기</button>
         </form>
      </BoardContainer>
   )
}

const BoardContainer = styled.div`
   
`