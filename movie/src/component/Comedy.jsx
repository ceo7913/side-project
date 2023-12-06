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
import { MovieCard } from './MovieCard';

export const Comedy = () => {
  const [itemSelect, setItemSelect] = useState({});
  const [isClick, setIsClick] = useState(false); // MovieItem this 값 접근
  const [genres, setGenres] = useState({});
  const dispatch = useDispatch(); // useDispatch = 생성된 action의 state 의 접근
  
  useEffect(()=>{ // useEffect 를 사용하는 이유는 마운트 됐을때 한번만 실행되면 되기 때문
        dispatch(fetchComedyMovies())
  },[])
  // console.log(fetchActionMovies());

  // store 상태값을 변환
  const actionData = useSelector((state)=>state.comedy.movies, []) || []

  const overViewEvent = (el) =>{
    setIsClick(el);
  }
  const overViewClose =()=>{
    setIsClick(false);
  }

  useEffect(()=>{
    const fetchGenres = async()=>{
      try{
        const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=8454804e2a979f263913c7e893c28db8&language=ko-KR')
        const data = await res.json();
        const genreMap = data.genres.reduce((acc,genre)=>{
          acc[genre.id] = genre.name;
          return acc
        },{});
        setGenres(genreMap)
      }catch(error){
        console.error(error);
      }
    }
    fetchGenres();
  },[])

  const getGenreText = (genreId) =>{
    return genreId.map((el)=>genres[el]).join()
  }

  const movieClickEvent = (movie) =>{
    setItemSelect(movie)
    setIsClick(true)
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
                <SwiperSlide key={index}>
                    <MovieCard 
                      movie={el} 
                      genreText={getGenreText(el.genre_ids)}
                      onClick={movieClickEvent}
                    />
                </SwiperSlide>
              ))}
            </MovieWrapper>
          </Swiper>
      </MovieContainer>
      {isClick && (
        <OverViewWrapper isVisible={!!itemSelect}>
          <OverView {...itemSelect} setIsClick={()=>setIsClick(false)}/>
        </OverViewWrapper>
      )}
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
const OverViewWrapper = styled.div`
  /* isVisible 상태값에 따른 삼항연산자 */
  display: ${props => [props.isVisible ? 'block' : 'none']};
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`
