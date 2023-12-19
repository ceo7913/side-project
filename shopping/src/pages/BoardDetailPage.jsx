import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { addComments, getComments, onUserState } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';

export const BoardDetailPage = () => {
   const state = useLocation().state;
   const { id, user, date, title, text } = state;
   const [loginUser, setLoginUser] = useState();

   console.log(user)

   // 조건부 댓글 작성 (로그인시에만 댓글 작성 가능)
   useEffect(() => {
      onUserState((user) => {
         setLoginUser(user)
      })
   }, []);
   console.log(loginUser); // => login 하면 user 정보가 {user} 에 담기고 logout 하면 null 값으로 출력됨

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

   const { data: comments } = useQuery({
      queryKey: [`/board/${id}/comments`],
      queryFn: () => getComments(id),
   })

   return (
      <div className='container'>
         <div className='boardTextBox'>
            <strong>{title}</strong>
            <p>{text}</p>
            <p>{date}</p>
         </div>

         <div className='commentWrap'>
            <form onSubmit={onCommentSubmit}>
               {loginUser == null ?
                  <input type='text' placeholder='로그인 후 작성 할 수 있습니다.'
                     disabled // input 작성 불가
                  />
                  :
                  <input
                     type='text'
                     value={commentWrite}
                     onChange={(e) => setCommentWrite(e.target.value)}
                     placeholder='댓글을 작성해주세요'
                  />
               }
               <button type='submit'>작성하기</button>
            </form>
            <ul className='commentList'>
               {comments && comments.map((el) => (
                  <li>{el.text}</li>
               ))}
            </ul>
         </div>
      </div>

   )
}