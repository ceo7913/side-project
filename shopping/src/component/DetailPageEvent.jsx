import React from 'react'
import styled from 'styled-components'

export const DetailPageEvent = ({ product }) => {
   return (
      <DetailItem>
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
               {product.colors}
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
   }
`
