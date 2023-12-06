// api : 8454804e2a979f263913c7e893c28db8
/*
    # axios
    node.js 에서 백엔드와 통신하기 위해 만들어진 http 비동기 통신 라이브러리
    
    설치방법
    ```
    $ yarn add axios
    ```
*/
// import
import axios from 'axios'

// 변수형태로 api key 활용
const API_KEY = '8454804e2a979f263913c7e893c28db8'; // the movie 계정마다 발급받는 api 키 변수화
const BASE_URL = 'https://api.themoviedb.org/3'; // 영화의 정보를 받아올 url의 공통주소 변수화

const instance = axios.create({ // axios 초기화 후 새롭게 세팅 instance 변수에 담아 컨트롤함
    baseURL : BASE_URL,
    params:{
        api_key : API_KEY,
        language: 'ko-KR'
    }
});

export default instance;