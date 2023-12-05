import axios from '../api/axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const MovieDetail = () => {
  // 경로를 구성하는 url 에서 값을 추출
  const {movieId} = useParams() // 특정한 값을 추출할떄 사용하는 메서드
  const [movie,setMovie] = useState({})

  useEffect(()=>{
    async function fetchData(){
      const request = await axios.get(`/movie/${movieId}`)
      setMovie(request.data);
    }
    fetchData()
  },[movieId]);
  return (
    <div>
        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt='영화 이미지'/>
    </div>
  )
}
