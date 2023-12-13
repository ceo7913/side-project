import React, { useContext } from 'react'
import { CategoryContext } from '../context/CategoryContext'
import { Link } from 'react-router-dom';

export const MainMenu = () => {
   // useContext => createContext 가져오는 방식
   const { categoryList } = useContext(CategoryContext);
   return (
      <nav>
         <ul>
            {categoryList.map((el, index) => (
               <li key={index}>
                  <Link to={`/products/${el}`}>{el}</Link>
               </li>
            ))}
         </ul>
      </nav>
   )
}
