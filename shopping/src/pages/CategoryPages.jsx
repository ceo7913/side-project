import React from 'react'
import { useParams } from 'react-router-dom'
import { CategoryProductList } from '../component/CategoryProductList';

export const CategoryPages = () => {
   const { category } = useParams(); // useParams 는 선택한 요소의 정보를 가져온다.
   console.log(category);
   return (
      <div>
         <CategoryProductList category={category} />
      </div>
   )
}
