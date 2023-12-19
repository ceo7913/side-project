import React, { useEffect, useState } from 'react'
import { addReview, getReview } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';

export const ProductReview = ({ productId }) => {
   const [review, setReview] = useState([]);
   const [newReview, setNewReview] = useState('');

   const onSubmitReview = async () => {
      try {
         const user = 'user'
         await addReview(productId, user, newReview);
         setNewReview('');

         // 댓글 실시간 반영(리렌더링)
         getReview(productId)
            .then(setReview);
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      getReview(productId)
         .then((review) => {
            setReview(review)
         })
         .catch((error) => {
            console.error(error)
         })
   }, [productId])

   // const { data: reviews } = useQuery({
   //    queryKey: [`review/${productId}`],
   //    queryFn: () => getReview(productId),
   // })

   return (
      <div>
         <h3>후기</h3>
         <ul>
            {review && review.map((el, idx) => (
               <li>
                  <p>{el.text}</p>
               </li>
            ))}
         </ul>
         <input
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
         />
         <button onClick={onSubmitReview}>작성하기</button>
      </div>
   )
}
/*
firebase
   ㄴreview
      ㄴ1ce22d60-59d6-4f08-acc4-459b6c985b65
         ㄴ2327901a-5160-431b-bed9-1fa7cecb739f
            ㄴid: "2327901a-5160-431b-bed9-1fa7cecb739f"
            ㄴtext: "후기작성"
            ㄴuser: "user"
*/
