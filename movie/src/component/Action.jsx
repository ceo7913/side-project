import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { fetchActionMovies } from '../store/reducer';

export const Action = () => {
  const dispatch = useDispatch(); // useDispatch = 생성된 action의 state 의 접근
  
  useEffect(()=>{ // useEffect 를 사용하는 이유는 마운트 됐을때 한번만 실행되면 되기 때문
        dispatch(fetchActionMovies())
  },[])
  console.log(fetchActionMovies());

  // store 상태값을 변환
  const actionData = useSelector((state)=>state.action.movies, []) || []
  console.log(actionData.results); // => action 영화에 대한 정보가 담김 / 20개가 기본값(한페이지)

  return (
    <div>Action</div>
  )
}
