import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CategoryProductList } from '../component/CategoryProductList';
import { getCategoryProduct } from '../api/firebase';
import { CategorySlider } from '../component/CategorySlider';

export const CategoryPages = () => {
   const { category } = useParams(); // useParams 는 선택한 요소의 정보를 가져온다.
   const [products, setProducts] = useState([]);
   const [randomImages, setRandomImages] = useState([]);

   useEffect(() => {
      // 클릭해서 category 가 마운트 될때만 정보를 받아와야 하기 때문
      getCategoryProduct(category).then((product) => {
         setProducts(product);
      }).catch((error) => {
         console.error(error)
      })
   }, [category])

   // const slideItem = products.map((product) => product.image)
   // console.log(slideItem); // => products 의 image 가 배열로 담김
   useEffect(() => {
      if (products.length > 0) {
         const randomImg = [...products].sort(() => 0.5 - Math.random());
         const selectImg = randomImg.slice(0, 4).map((el) => el.image) // 0~4  
         setRandomImages(selectImg);
         console.log(randomImages);
         /*
            a, b
            함수가 0보다 작은 값을 출력하면, a가 앞으로 
            함수가 0보다 큰 값이면 b 가 앞으로
         */
      }
   }, [products])

   return (
      <div>
         <CategorySlider imgs={randomImages} />
         <CategoryProductList category={category} product={products} />
      </div>
   )
}
