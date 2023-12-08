// 필요한 SDK에서 필요한 기능을 가져옴
import { initializeApp } from "firebase/app";

// 파이어베이스에서 요구하는 변수명 조차도 따르는게 좋다.
const firebaseConfig = {
    // .env.local 에서 저장한 변수를 가져오는 방법
    apiKey : process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
}

/*
    process.env = 환경변수 node.js 에 전역객체
    환경변수 : 실행중인 프로세스에 사용할 수 있고, 애플리케이션을 구현하는 키-값
    으로 이루어진 변수, 외부에서 값을 받아와서 설정할 수 있게 코드를 직접 하드코딩하지 않고
    설정, 개인정보 매개변수로 분리해서 관리하는 용도로 사용
    process = 현재 nodejs 의 프로세스의 전역객체로 실행중인 프로세스에 접근해서 정보를 받아옴
    .env = process 에서 사용할 수 있는 모든 환경변수를 포함하는 객체
*/

// Firebase 초기화
const app = initializeApp(firebaseConfig);