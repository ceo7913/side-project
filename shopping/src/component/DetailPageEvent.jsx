import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';

export const DetailPageEvent = ({ product }) => {
   // const colorItem = product.colors
   /*
      값을 변수에 담아서 사용했을 때와 아닐 때 차이
      가독성 차이, 재사용성에도 장점

      주의점: 변수에 담긴 값은 변수에 저장이 되버림, product.colors 의 값이 달라진다면,
      colorItem 의 값은 변동이 없다. (object 의 특징)
   */

   /*
       단순한 페이지의 이동이 목적이라면, Link 를 사용하면 되지만
       현재의 경우 페이지를 이동하면서 데이터의 이동도 포함해야 하기 때문에 
       useNavigate 를 사용한다. => ProductDetail.jsx
   */
   const navigate = useNavigate();
   const detailNavigate = () => {
      navigate(`/products/detail/${product.id}`, {
         // 여기서의 state 는 네이밍을 바꾸면 error 출력
         state: {
            title: product.title,
            id: product.id,
            image: product.image,
            price: product.price,
            option: product.option,
            category: product.category,
            colors: product.colors,
            description: product.description
         }
      })
   }
   return (
      <DetailItem onClick={detailNavigate}>
         <img src={product.image} alt={`${product.image}-img`} />
         <div className='textWrap'>
            <h3 className='itemTitle'>
               {product.title}
            </h3>
            <div className='itemFlex'>
               <p className='itemPrice'>
                  {product.price}
               </p>
               <p className='itemOpt'>
                  {product.option}
               </p>
            </div>
            <div className='itemColors'>
               {/* {colorItem && colorItem.map((color, index) => (
                  <div
                     key={index}
                     style={{ backgroundColor: color }} />     
               ))} */}
               {product.colors && product.colors.map((color, index) => (
                  <div
                     key={index}
                     style={{ backgroundColor: color }} />
               ))}
               {/* 컬러 배열로 출력 */}
            </div>
         </div>
      </DetailItem>

   )
}

const DetailItem = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;
   .textWrap{
      display: flex;
      flex-direction: column;
      gap: 10px;
      .itemTitle{
         font-size:20px;
         font-weight: normal;
         transition: 500ms;
         color: rgba(0,0,0,0.5);
         cursor: pointer;
         &:hover{
            color:rgba(0,0,0,1);
         }
      }
      .itemFlex{
         display: flex;
         justify-content: space-between;
      }
      .itemColors{
         display: flex;
         height: 20px;
         gap:2px;
         div{
            width: 20px;
            height: 20px;
         }
      }
   }
`
