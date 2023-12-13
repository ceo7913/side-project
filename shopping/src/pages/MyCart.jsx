import React from 'react'
import useCart from '../context/UseCart'
import { CartItem } from '../component/CartItem';
import styled from 'styled-components';

export const MyCart = () => {
   const { cartInfo: { data: products } } = useCart(); // 함수 내부 객체 가져옴
   const isItem = products && products.length > 0; // true
   return (
      <div className='container'>
         <h2 className='itemTitle'>장바구니 리스트</h2>
         {!isItem && <p>장바구니에 상품이 없습니다.</p>}
         {isItem && (
            <CartList className='cartList'>
               {products && products.map((el, index) => (
                  <CartItem Key={el.id} product={el} index={index} />
               ))}
            </CartList>
         )}
      </div>
   )
}

const CartList = styled.ul`
   display: flex;
   flex-direction: column;
   gap: 30px;
   border-top: solid 1px rgba(0,0,0,0.2) ;
   padding: 24px 0px;
   li{
      display: flex;
      align-items: center;
      border-bottom: solid 1px rgba(0,0,0,0.2);
      padding: 12px 0px;
      gap: 12px;
      img{
         width: 100px;
         display: block;
      }
      .quantityWrap{
         display: flex;
         gap: 10px;
      }
   }
`
