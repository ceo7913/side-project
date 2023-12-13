import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import useCart from './../context/UseCart';

// DetialPageEvent 에서 클릭한 정보값을 받아옴
export const ProductDetail = () => {
   const state = useLocation().state;
   const { title, id, image, price, option, category, colors, description } = state;

   const { addItemCart } = useCart();

   const [success, setSuccess] = useState(); // 장바구니 아이템 전송 여부 값

   let setOpt = option.split(',').map((option) => option.trim());
   const [selected, setSelected] = useState(setOpt && setOpt[0]); // => setOpt 배열이 있다면 setOpt 의 배열의 첫번째를 선택

   // useLocation = useNavigate 에서 받아온 정보를 state 에 연결 하겠다는 구문

   // console.log(state); // => {title: '텍스트 상품1', id: '94908969-2414-43d4-b8cb-1ed319ad0c00', image: 'http://res.cloudinary.com/dpuibr5sp/image/upload/v1702361179/f1idfn299l5cmfafmfr8.jpg', price: '216,600', option: 'free', …}


   console.log(option); // => option: 'S,M,L,XL' / 배열이 아니라 string 으로 담김
   // ',' 기준으로 trim 으로 잘라냄
   // console.log(setOpt); // => ['S', 'M', 'L', 'XL']

   const selectOpt = (e) => {
      setSelected(e.target.value) // 선택한 setOpt 에 value 를 담음
   };

   const cartItem = () => {
      // option: selected => 선택한 옵션 / quantity: 1 => 구매수량
      const product = { id, image, title, price, option: selected, quantity: 1 }
      addItemCart.mutate(product, {
         onSuccess: () => {
            setSuccess('장바구니에 상품이 추가되었습니다.');
         },
      });
   };

   return (
      <div className='container'>
         <DetailPage>
            <div className='detailImg'>
               <img src={image} alt={title} />
            </div>
            <div className='detailText'>
               <h3>{title}</h3>
               <p className='price'>가격 <span>{price}</span></p>
               <p className='description'>{description}</p>

               <div className='optSelect'>
                  {/* 리액트에서는 label 의 for 대신에 htmlFor 로 변경하여 사용 */}
                  <label className='labelText' htmlFor='optSelect'>옵션</label>
                  <select id='optSelect' onChange={selectOpt} value={selected}>
                     {setOpt && setOpt.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                     ))}
                  </select>
               </div>
               <div style={{ display: 'flex', gap: '5px' }}>
                  {colors && colors.map((color, idx) => (
                     <div key={idx} style={{ backgroundColor: color, width: '20px', height: '20px' }} />
                  ))}
               </div>
            </div>
            {/* shopping button */}
            <div className='ditailBtns'>
               <button className='cartBtn' onClick={cartItem}>장바구니 담기</button>
               <button className='buyBtn'>구매하기</button>
            </div>
            {success && <p>{success}</p>}
         </DetailPage>
      </div>
   )
}

const DetailPage = styled.div`
   width: 100%;
   display: flex;
   gap: 40px;
   .detailImg{
      max-width: 400px;
      img{
         width: 100%;
         display: block;
      }
   }
   .detailText{
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
      h3{
         font-size: 24px;
         width: 100%;
         font-weight: normal;
         border-bottom: solid 1px rgba(0,0,0,0.1);
         padding-bottom: 12px;
         padding-bottom: 20px;
      }
      .price{
         display: flex;
         align-items: center;
         gap: 30px;
      }
   }
`
