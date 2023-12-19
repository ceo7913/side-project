import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { addComments } from '../api/firebase';

export const BoardDetailPage = () => {
   const state = useLocation().state;
   const { id, user, date, title, text } = state;

   console.log(user)

   const [commentWrite, setCommentWrite] = useState('')

   const onCommentSubmit = async (e) => {
      e.preventDefault();

      try {
         await addComments(id, user, commentWrite);
         setCommentWrite('');
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <div className='container'>
         <div className='boardTextBox'>
            <strong>{title}</strong>
            <p>{text}</p>
            <p>{date}</p>
         </div>

         <div className='commentWrap'>
            <form onSubmit={onCommentSubmit}>
               <input
                  type='text'
                  value={commentWrite}
                  onChange={(e) => setCommentWrite(e.target.value)}
                  placeholder='댓글을 작성해주세요'
               />
               <button type='submit'>작성하기</button>
            </form>


         </div>
      </div>

   )
}