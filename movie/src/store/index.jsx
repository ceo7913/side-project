// index.jsx 는 폴더 내부에 기본 경로로 추적된다.
import {combineReducers} from 'redux'
import {FETCH_ACTION_MOVIES} from './reducer'

const actionMovieReducer = (state = [], action)=>{
    // action = 상태를 변경하려는 객체
    // state = 상태값
    switch(action.type){
        case FETCH_ACTION_MOVIES:
        return{
            ...state,
            movies : action.data
        }
        default: return state
    }
}

const rootReducer = combineReducers({
    // 여기서의 action 과 actionMovieReducer 안에 있는 action 은 다름
    action : actionMovieReducer,
})
/*
combineReducers = 여러개의 reducer 를 하나의 store 에서 실행할 수 있도록 해주는 메서드
장르마다 불러올 reducer 가 다르기 때문에 한번에 관리할 수 있는 combineReducers 를 사용
*/

export default rootReducer;