import React, { useEffect, useState } from 'react'
import { searchProducts } from '../api/firebase';
import { DetailPageEvent } from '../component/DetailPageEvent';

export const Search = () => {
   const [query, setQuery] = useState('');
   const [result, setResult] = useState([]);

   const onSearchEvent = (e) => {
      e.preventDefault(); // 기본 이벤트 제거
      setQuery(e.target.value); // 검색하는 value 받아옴
      // 파이어베이스에서 전체를 불러와서 검색하는 value 랑 비교
   }

   useEffect(() => {
      const fetchProducts = async () => {
         if (query.trim() === '') {
            setResult([])
         } else {
            try {
               const txt = await searchProducts(query);
               setResult(txt);
            } catch (error) {
               console.error(error)
            }
         }
      }
      fetchProducts()
   }, [query])

   return (
      <div className='container'>
         <input type="text" value={query} onChange={onSearchEvent} className='searchForm' />
         <ul className='productList'>
            {result.map((product) => (
               <li>
                  <DetailPageEvent key={product.id} product={product} />
               </li>
            ))}
         </ul>
      </div>
   )
}
