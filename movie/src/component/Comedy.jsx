import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { fetchComedyMovies } from '../store/reducer';
import styled from 'styled-components';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react'; // $ yarn add swiper
import {Navigation, Pagination} from 'swiper/modules' // swiper module import 
import 'swiper/css' // 스와이퍼에 기본 css 적용 import
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styled/swiperCustomCss.css'
import { OverView } from './OverView';

export const Comedy = () => {
  const [isClick, setIsClick] = useState(false); // MovieItem this 값 접근
  const dispatch = useDispatch(); // useDispatch = 생성된 action의 state 의 접근
  
  useEffect(()=>{ // useEffect 를 사용하는 이유는 마운트 됐을때 한번만 실행되면 되기 때문
        dispatch(fetchComedyMovies())
  },[])
  // console.log(fetchActionMovies());

  // store 상태값을 변환
  const actionData = useSelector((state)=>state.action.movies, []) || []
  console.log(actionData.results); // => action 영화에 대한 정보가 담김 / 20개가 기본값(한페이지)

  const overViewEvent = (el) =>{
    setIsClick(el);
  }
  const overViewClose =()=>{
    setIsClick(false);
  }

  return (
    <div>
      <MovieContainer>
        <MovieTitle>코미디</MovieTitle>
          <Swiper
            spaceBetween={10} // slide gap
            slidesPerView={5} // 한페이지당 몇개의 slide
            slidesPerGroup={5} // 한번 슬라이드 할때 이동할 item 갯수
            loop // 무한반복
            modules={[Navigation,Pagination]} // 모듈 가져옴
            navigation // 모듈 실제 적용
            pagination
          >
            <MovieWrapper>
              {actionData.results && actionData.results.map((el,index)=>(
                <SwiperSlide>
                  {/* 선택된 객체에 따라 다른 데이터를 불러와야 함 */}
                  <MovieItem onClick={()=>overViewEvent(el,index)}> 
                    <img src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`} alt='영화 리스트 이미지'/>
                  </MovieItem>        
                </SwiperSlide>
              ))}
            </MovieWrapper>
          </Swiper>
      </MovieContainer>
      {isClick && <OverView movie={isClick} setIsClick={overViewClose}/>}
    </div>
  )
}

const MovieContainer = styled.div`
  margin-bottom:50px ;
  position: relative;
  box-sizing: border-box;
  
`
const MovieTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: #ffffff;
`
const MovieWrapper = styled.div`  
 height: 200px;
`
const MovieItem = styled.div`
  img{
    display: block;
    max-width: 100%;
  }
`
