import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// 탑 버튼 컴포넌트
export const TopBtn = () => {
   const [isVisible, setIsVisible] = useState(false);

   const onScrollTop = () => {
      // scrollTo => 스크롤 값을 이동시키는 메서드
      window.scrollTo({
         top: 0,
         // behavior = 애니메이션 모션
         behavior: 'smooth',
      })
   };

   const toggleVisible = () => {
      // 스크롤 값이 200 보다 많으면 커서를 나오게 하고 200보다 작으면 버튼을 숨김 처리
      if (window.pageXOffset > 200) {
         setIsVisible(true);
      } else {
         setIsVisible(false)
      }
   };

   useEffect(() => {
      window.addEventListener('scroll', toggleVisible);

      // 실행 후 중첩 이벤트 방지
      return () => {
         window.removeEventListener('scroll', toggleVisible)
      }
   }, []);

   return (
      isVisible && (
         <Top onClick={onScrollTop}>
            top
         </Top>
      )
   )
}

const Top = styled.button`
   position: fixed;
   bottom: 30px;
   right: 30px;
   background: black;
   color: #fff;
`