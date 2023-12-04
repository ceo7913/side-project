import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './styled/GlobalStyled';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import { MainVideos } from './component/MainVideos';
import { MovieList } from './component/MovieList';
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk'; // $ yarn add redux-thunk
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './store/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk))) 


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>,
    errorElement: <NotFound/>,
    children:[
      /*
        children
        중첩 라우터를 children 으로 연결하게 되면 내부에 있는 파일은 부모 요소의 링크를
        기준으로 잡힌다. 내부에 children 으로 작성하게 되면 중첩되는 urel 은 생략할 수 있다.
      */
     // path: 
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyle/>
    <MainVideos/>
    <Provider store={store}>
      <MovieList/>
    </Provider>

    <RouterProvider router={router}/>
  </>
);
