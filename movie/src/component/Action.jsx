import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { fetchActionMovies } from '../store/reducer';
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

export const Action = () => {
  const [isClick, setIsClick] = useState(false); // MovieItem this 값 접근
  const [genres, setGenres] = useState({});
  const dispatch = useDispatch(); // useDispatch = 생성된 action의 state 의 접근
  
  useEffect(()=>{ // useEffect 를 사용하는 이유는 마운트 됐을때 한번만 실행되면 되기 때문
        dispatch(fetchActionMovies())
  },[])
  // console.log(fetchActionMovies());

  // store 상태값을 변환
  const actionData = useSelector((state)=>state.action.movies, []) || []
  // console.log(actionData.results); // => action 영화에 대한 정보가 담김 / 20개가 기본값(한페이지)

  const overViewEvent = (el) =>{
    setIsClick(el);
  }
  const overViewClose =()=>{
    setIsClick(false);
  }

  // 장르 추가
  useEffect(()=>{
    const fetchGenres = async()=>{
      try{
        const res = await fetch('https://api.themoviedb.org/3/genr/movie/list?api_key=8454804e2a979f263913c7e893c28db8&language=ko-KR')
        // https://api.themoviedb.org/3/genre/movie/list?language=en
        const data = await res.json();
        const genresMap = data.genres.reduce((acc,genre)=>{
          acc[genre.id] = genre.name;
          // console.log(acc);
          return acc
        },{});
        setGenres(genresMap)
        // error 캐치시 console
      }catch(error){
        console.error(error);
      }
    }
    // useEffect 는 랜더링 될때 마다 실행되는 hook 이기 때문에 선언 후 실행까지 해줘야 완성이다.
    fetchGenres();
  },[])

  // id 를 받아와서 map 으로 요소들을 만든 다음 하나로 합침
  const getGenreText = (genreId) =>{
    return genreId.map((el)=>genres[el]).join()
  }
  return (
    <div>
      <MovieContainer>
        <MovieTitle>액션</MovieTitle>
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
                    <MovieCard movie={el} genreText={getGenreText(el.genre_ids)}/>
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

