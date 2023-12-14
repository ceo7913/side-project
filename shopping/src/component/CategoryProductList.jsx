import React from 'react'
import { DetailPageEvent } from './DetailPageEvent';

export const CategoryProductList = ({ category, product }) => {
   // console.log(product);

   /*
      슬라이더 이미지 출력방식
      > 카테고리별로 상품을 다르게 출력하는 방식
      > 전체 페이지에 동일하게 출력해주는 방식
   */
   return (
      <div className='container'>
         <h2>{category}</h2>

         <ul className='productList'>
            {product.map((product) => (
               <li key={product.id}>
                  <DetailPageEvent product={product} />
               </li>
            ))}
         </ul>
      </div>
   )
}
