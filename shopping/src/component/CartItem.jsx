import React from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import useCart from '../context/UseCart';

export const CartItem = ({ product, index }) => {
   const { addItemCart, removeCart } = useCart();
   const plusItem = () => {
      addItemCart.mutate({ ...product, quantity: product.quantity + 1 })
   }
   const minusItem = () => {
      if (product.quantity < 2) {
         alert('상품갯수는 1 보다 작을 수 없습니다.');
         return
         // if 문에 조건으로 실행 시켜도 되지만 해당 조건에 걸리면 return 하도록 처리해도 
         // 실행문을 만나지 못하도록 처리할 수 있다.
      }
      addItemCart.mutate({
         ...product,
         quantity: product.quantity - 1
      })
   }
   const itemDelete = () => {
      // useMutation 을 사용하기 위해서는 해당 함수를 불러와서 mutate 로 실행한다.
      removeCart.mutate(product.id)
      /*
         mutation 과 dispatch 의 차이
         mutation = useMutation 에서 비동기 작업을 실행하며, 주로 데이터를 생성, 추가, 업데이트, 삭제 
         데이터를 '변경'하는 작업에서 사용
         
         dispatch 는 redux 에서 action 을 내보내는데 사용하는 함수
         action 은 type 을 포함한다.
         action 을 받아서 store 에 전달하는 역할
         
         reducer 에서도 action 을 받아서 현재 상태에서 새로운 상태로 변경 (테마변경, 로그인 상태 주로 사용)
         주로 테마 변경과 같은 ui의 상태 변경에 자주 쓰임

         차이점: 
         mutation 은 주로 외부에 있는 데이터의 이용에 사용되며, (외부 상태관리)
         dispatch 는 앱 내부에서 상태관리 할 때 사용 (내부 상태관리)
      */
   }
   return (
      <li>
         <p>{index}</p>
         <img src={product.image} alt={product.title} />
         <p>{product.title}</p>
         <p>{product.option}</p>
         <p>{product.price}</p>
         <div className='quantityWrap'>
            <p>수량 : {product.quantity}</p>
            <button onClick={plusItem}><IoMdArrowDropup /></button>
            <button onClick={minusItem}><IoMdArrowDropdown /></button>
         </div>
         <button onClick={() => itemDelete(product.id)}>삭제</button>
      </li>
   )
}
