import axios from 'axios'

const API_KEY = '8454804e2a979f263913c7e893c28db8'; // the movie 계정마다 발급받는 api 키 변수화
const BASE_URL = 'https://api.themoviedb.org/3' // 영화의 정보를 받아올 url의 공통주소 변수화

export const FETCH_ACTION_MOVIES = 'FETCH_ACTION_MOVIES';
export const FETCH_COMEDY_MOVIES = 'FETCH_COMEDY_MOVIES';


// action
export const fetchActionData = (data) =>{
    // reducer 에 정보 전달 ../index.jsx
    return {
        type: FETCH_ACTION_MOVIES,
        data
    }
}
export const fetchActionMovies = () =>{
    return(dispatch)=>{
        // dispatch = 외부에서 데이터를 가져올 때 사용하는 reducer 의 기능 useState 의 대체
        return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`)
        .then((res)=>{ // then = axios 에서 콜백함수를 대체하는 return 과 같은 구문
            dispatch(fetchActionData(res.data))
        })
    }
}

// comedy
export const fetchComedyData = (data) =>{
    // reducer 에 정보 전달 ../index.jsx
    return {
        type: FETCH_COMEDY_MOVIES,
        data
    }
}
export const fetchComedyMovies = () =>{
    return(dispatch)=>{
        // dispatch = 외부에서 데이터를 가져올 때 사용하는 reducer 의 기능 useState 의 대체
        return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`)
        .then((res)=>{ // then = axios 에서 콜백함수를 대체하는 return 과 같은 구문
            dispatch(fetchComedyData(res.data))
        })
    }
}