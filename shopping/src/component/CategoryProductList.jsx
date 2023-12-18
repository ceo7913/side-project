import React from 'react'
import { DetailPageEvent } from './DetailPageEvent';
import { SortButton } from './SortButton';
import { useState } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

/*
   슬라이더 이미지 출력방식
   > 카테고리별로 상품을 다르게 출력하는 방식
   > 전체 페이지에 동일하게 출력해주는 방식
*/
export const CategoryProductList = ({ category, product }) => {
   // console.log(product);

   // 정렬 요소들 가져옴
   const [sortProducts, setSortProducts] = useState(product)

   const sortName = () => {
      const sortList = [...product].sort((a, b) => {
         if (!a.name || !b.name) {
            // 둘 중에 하나라도 이름이 정의되지 않았다면 순서를 변경하지 말 것
            return 0
         }
         // localeCompare = 문자열과 문자열을 서로 비교하고 정렬순서에 따라 비교하는 함수
         // charAt(0) = 문자의 첫번째를 받아옴
         return a.name.charAt(0).localCompare(b.name.charAt(0))
      })
      setSortProducts(sortList)
   }

   const sortPrice = () => {
      const sortList = [...product].sort((a, b) => a.price - b.price);
      setSortProducts(sortList)
   }
   console.log(sortProducts); // => 클릭한 요소를 type 순으로 정렬

   useEffect(() => {
      // 마운트 할때 마다 정렬 요소 교체
      setSortProducts(product)
   }, [product])

   return (
      <div className='container'>
         <h2>{category}</h2>

         <SortButton sortName={sortName} sortPrice={sortPrice} />

         <ul className='productList'>
            {sortProducts.map((product) => (
               <li key={product.id}>
                  <DetailPageEvent product={product} />
               </li>
            ))}
         </ul>
      </div>
   )
}

CategoryProductList.propTypes = {
   category: PropTypes.string.isRequired,
   product: PropTypes.arrayOf(PropTypes.object).isRequired,
}