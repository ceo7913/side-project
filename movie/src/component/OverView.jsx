// over wrap 되는 영화의 데이터 컴포넌트
import React from 'react'
import styled from 'styled-components'
import { MdClose } from "react-icons/md";

export const OverView = ({movie, setIsClick}) => {
  return (
    <HoverContainer className='overview'> 
        <HoverWrapper>
            <button onClick={()=>setIsClick(false)}>
                <MdClose/>
            </button>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt='영화 이미지'/>
        </HoverWrapper>
    </HoverContainer>
  )
}

// 뒤에 깔릴 배경
const HoverContainer = styled.div`
    width: 100vw;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
`
// over wrap 되는 객체
const HoverWrapper = styled.div`
    padding: 50px;
    max-width: 50%;
    height: auto;
    background: rgba(255,255,255,0.1);
    position: relative;
    border-radius: 10px;
`
