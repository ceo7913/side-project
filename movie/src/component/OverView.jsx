// over wrap 되는 영화의 데이터 컴포넌트
import React from 'react'
import styled from 'styled-components'
import { MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';

export const OverView = ({movie, setIsClick}) => {
  return (
    <HoverContainer className='overview'> 
        <HoverWrapper>
            <CloseBtn onClick={()=>setIsClick(false)}>
                <MdClose/>
            </CloseBtn>
            <Link to={`/movie/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt='영화 이미지'/>
            </Link>
            <HoverText>
                <h2>{movie.title}</h2>
            </HoverText>
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
    max-width: 50%;
    height: auto;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.1);
    position: relative;
    border-radius: 10px;
    overflow: hidden;
`

const CloseBtn = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background: black;
    position: absolute;
    top: 18px;
    right:18px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
        width: 30px;
        height: 30px;
        path{
            color: #fff;
        }
    }
`
const HoverText = styled.div`
    padding: 30px;
    box-sizing: border-box;
    height: auto;
    width: 100%;
    background: rgba(255,255,255,0.3);
`