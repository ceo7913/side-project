// Cart 를 가져올때 어떠한 아이디가 어떤 내용이 있는지 검사
import { getCart, updateCart } from '../api/firebase';
import { useAuthContext } from './AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function useCart() {
   const { uid } = useAuthContext();
   // useQueryClient = 리액트에서 데이터를 가져오고 업데이트 하는 라이브러리
   const queryClient = useQueryClient()
   const cartInfo = useQuery(['cart', uid || ''], () => getCart(uid), {
      enabled: !!uid
   })
   const addItemCart = useMutation(
      // useMutation = 정보를 업데이트할때 사용하는 구문
      (product) => updateCart(uid, product), {
      onSuccess: () => {
         queryClient.invalidateQueries(['cart'], uid)
      }
   })

   return [cartInfo, addItemCart]
}