import React from 'react'
import { DetailPageEvent } from './DetailPageEvent';
import styled from 'styled-components';

export const Products = ({ products }) => {
   return (
      <>
         <ProductList className='productList'>
            {products && products.map((product) => (
               <li key={product.id} >
                  <DetailPageEvent product={product} />
               </li>
            ))}
         </ProductList>
      </>
   )
}

const ProductList = styled.ul`
   display: flex;
   gap: 20px 5%;
   flex-wrap: wrap;
   li{
      flex-shrink: 0;
      flex-basis: 30%; // li 하나당 flex 영역의 30% 차지
   }
`
