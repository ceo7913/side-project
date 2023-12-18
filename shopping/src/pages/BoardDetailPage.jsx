import React from 'react'
import { useLocation } from 'react-router-dom'

export const BoardDetailPage = () => {
   const state = useLocation().state;
   const { id, user, date, title, text } = state;
   return (
      <div className='container'>
         <div className='boardTextBox'>
            <strong>{title}</strong>
            <p>{text}</p>
            <p>{date}</p>
         </div>
      </div>
   )
}
