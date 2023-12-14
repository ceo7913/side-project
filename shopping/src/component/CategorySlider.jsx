import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// swiper 를 react 에서 사용할때 기본적으로 modules 와 css 는 import 해야 적용가능
import 'swiper/css'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css/effect-fade'

const slider = {
   width: '500px',
   height: '600px',
}
export const CategorySlider = ({ imgs }) => {
   // console.log(imgs);
   return (
      <>
         <Swiper
            style={slider}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 2000 }}
            speed={3000}
            modules={[Autoplay, EffectFade]}
            effect={'fade'}
         >
            {imgs.map((img, index) => (
               <SwiperSlide key={index}>
                  <img src={img} alt='상품 이미지' />
               </SwiperSlide>
            ))}
         </Swiper>
      </>
   )
}
