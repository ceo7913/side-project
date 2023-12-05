import React from 'react';
import GlobalStyle from './styled/GlobalStyled';
import { Main } from './pages/Main';
import {MainVideos, MovieList} from './component'
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk'; // $ yarn add redux-thunk
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './store/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk))) 

export const App = () => {
  return (
    <>
      <GlobalStyle/>
      <MainVideos/>
      <Main/>
      <Provider store={store}>
        <MovieList/>
      </Provider>
    </>
  )
}
