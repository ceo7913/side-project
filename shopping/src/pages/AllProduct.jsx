import React, { useEffect, useState } from 'react'
import { getProducts } from '../api/firebase';

// 모든 상품 보기
export const AllProduct = () => {
  const [isProduct, setIsProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setIsProduct(products)
      } catch (error) {
        console.error(error)
      }
    }
    fetchProducts()
  }, []);

  return (
    <div>
      {isProduct && isProduct.map((el) => (
        <div key={el.id}>
          {/* <img src={el.image} alt={`${el.id}-image`} /> */}
          <p>{el.title}</p>
        </div>
      ))}
    </div>
  )
}
