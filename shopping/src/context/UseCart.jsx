// Cart 를 가져올때 어떠한 아이디가 어떤 내용이 있는지 검사
import { deleteCart, getCart, updateCart } from '../api/firebase';
import { useAuthContext } from './AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function useCart() {
   const { uid } = useAuthContext();

   // useQueryClient = 리액트에서 데이터를 가져오고 업데이트 하는 라이브러리
   const queryClient = useQueryClient()
   /* 
      issue #1
      Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call.
      인수 유형이 잘못되었습니다. v5부터는 쿼리 관련 함수 호출 시 "Object" 형식만 허용됩니다. 오류 스택을 사용하여 범인 호출을 찾으십시오.
         
      const cartInfo = useQuery(['cart', uid || ''], () => getCart(uid), {
         enabled: !!uid
      })
   */
   // issue #1 fix
   const cartInfo = useQuery({ // cart 의 데이터를 가져오는 비동기 쿼리 설정
      queryKey: ['cart', uid || ''], // 쿼리를 식별하는 키
      queryFn: () => getCart(uid), // 데이터를 가져오는 함수
      enabled: !!uid // 쿼리가 활성화 되어 있는지 여부 (!!uid는 uid가 있는 경우에만 활성화)
   })

   const addItemCart = useMutation({ // useMutation = 장바구니에 상품을 추가하는 업데이트 작업
      mutationFn: (product) => updateCart(uid, product), // 데이터를 업데이트 하는 함수
      onSuccess: () => { // onSuccess = 완료가 된 경우(이후) 실행
         // 최신 상태로 업데이트 (쿠키값을 무효화 시켜 상품의 정보를 최신으로 업데이트)
         queryClient.invalidateQueries(['cart'], uid) // (['cart'], uid) => 쿠키 값을 가지고 있음
      }
   })

   const removeCart = useMutation({
      mutationFn: (id) => deleteCart(uid, id), // deleteCart 함수에 uid 와 id 전달
      onSuccess: () => {
         queryClient.invalidateQueries(['cart', uid])
      }
   })

   return { cartInfo, addItemCart, removeCart } // [] => {} / 함수 내보냄 return
}