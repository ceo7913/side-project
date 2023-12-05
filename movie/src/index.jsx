import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { App } from './App';
import { MovieDetail, NotFound } from './pages';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFound/>,
    children:[
      /*
        children
        중첩 라우터를 children 으로 연결하게 되면 내부에 있는 파일은 부모 요소의 링크를
        기준으로 잡힌다. 내부에 children 으로 작성하게 되면 중첩되는 urel 은 생략할 수 있다.
      */
    ]
  },
  { 
    // movie/movieId => 정해진 경로 / movie/:movieId => 유동적인 값 / => movieId 매개변수 같은 느낌으로 봐도 된다.
    path: 'movie/:movieId',
    element: <MovieDetail/>,
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>  
    <RouterProvider router={router}/>
  </>
);
