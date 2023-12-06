import React from 'react'
import styled from 'styled-components';
import { IoIosPlay, IoIosArrowDown } from "react-icons/io";
import { LuPlus } from 'react-icons/lu';
import { SlLike } from 'react-icons/sl'

export const MovieCard = ({movie}) => {
  const {title, backdrop_path, genre_ids} = movie;
  /*
    console.log(genre_ids); // => {
      (3) [28, 12, 53]
      (3) [28, 80, 53]
      (3) [878, 28, 53]
      (3) [28, 12, 878]
      (3) [28, 18, 10749]
    }
  */
  return (
    <MovieItem> 
      {/* 선택된 객체에 따라 다른 데이터를 불러와야 함 */}
      <img src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt='영화 리스트 이미지'/>
        <Content className='addi-content'>
          <p>{title}</p>
          <div className='btn-wrapper'>
            <button className='btn1' name='play-button'><IoIosPlay/></button>
            <button className='btn2' name='plus-button'><LuPlus/></button>
            <button className='btn3' name='like-button'><SlLike/></button>
            <button className='btn4' name='download-button'><IoIosArrowDown/></button>
          </div>
          <div className='genres-wrapper'>
            {genre_ids.map((genreId)=>(
              // 받아온 장르의 id를 가지고 있는 요소
              <span key={genreId}>{genre_ids[genreId]}</span>
            ))}
          </div>
        </Content>
    </MovieItem>        
  )
}

const MovieItem = styled.div`
  flex-shrink: 0;
  position: relative;
  transition: 500ms;
  img{
    width: 100%;
    display: block;
  }
  &:hover{
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(1.3);
    .addi-content{
      opacity: 1;
      position: relative;
      z-index: 99;
    }
  }
`
const Content = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  background: gray;
  color: white;
  transition: 500ms;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  opacity: 0;
  p{
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-150%);
    font-size: 30px;
    opacity: 0;
    /* 1000ms(1초) 뒤에 실행 */
    transition: 300ms 1000ms;
  }
  .btn-wrapper{
    display: flex;
    gap: 20px;
    button{
      width: 40px;
      height: 40px;
      border-radius: 100%;
      background: white;
      path{
        color: black;
      }
      &.btn4{
        margin-left: auto;
      }
    }
  }
`