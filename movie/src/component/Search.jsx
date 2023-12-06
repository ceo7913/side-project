import axios from 'axios';
import React, { useState } from 'react'
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import styled from 'styled-components';
export const Search = () => {
    const [text, setText] = useState(''); // 검색어의 텍스트를 받아올 state
    const [visible, setVisible] = useState(false); // 인풋창의 기본 속성값
    const [showClearBtn, setShowClearBtn] = useState(); // 검색어 입력 여부를 보기 위해 만든 상태변수

    const [list, setList] =useState(false) // 검색리스트 유무 체크
    const [movieList, setMovieList] = useState([]); // 검색 결과 배열 관리 (출력)

    let data = []; // 영화 리스트가 들어올 변수

    const API_KEY = '8454804e2a979f263913c7e893c28db8'; 
    // https://developer.themoviedb.org/reference/search-collection
    const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}&include_adult=false&language=ko-KR&page=1`; 

    const onToggleEvent =(e)=>{
        e.preventDefault(); // 기존 이벤트 제거 => focus 가 걸려있는 모든 요소는 항상 기존 이벤트를 제거해야한다.
        // 그렇지 않으면 알수 없는 경로로 이동시켜버림

        // prev => !prev / 이전값 참조해서 반대의 값을 출력
        setVisible(prev => !prev)
    }
    const onClear = (e) =>{
        e.preventDefault();
        setText('');

        // 텍스트를 클릭으로 제거했을 때 아이콘도 같이 없어지게 함
        setShowClearBtn(false);
    }

    const fetch = async () =>{
        // axios => server 에서 array 가 있는지 찾는 함수
        const res = await axios.get(BASE_URL);
        data = res.data.results || [];
        setMovieList(data)
    }
  return (
    <>
        <SearchForm visible={`${visible}`} className={visible ? 'on' : null}>
            <button className='search-btn' onClick={onToggleEvent}>
                <BiSearch/>
            </button>
            {visible &&(
                <input 
                type="text" 
                placeholder='검색어를 입력하세요'
                value={text}
                onChange={(e)=>{
                    setText(e.target.value);
                    // trim() => 문자열 좌우에서 공백 제거 
                    setShowClearBtn(e.target.value.trim()!=='');
                    fetch(setMovieList());
                    setList(true);
                }}
                />
            )}
            {showClearBtn &&(
                <button className='clear-btn' onClick={onClear}><MdClear/></button>
            )}
        </SearchForm>

        {/* 검색결과 */}
        <ResultContainer className={(list ? 'on' : '')}>
            <div className='searchMovie'>
                <h3>{text}로 검색한 결과 입니다.</h3>
                {list ? (
                    <div className='listContainer'>
                        {movieList && movieList.map((el)=>(
                            <List props={el} key={el.id}/>
                        ))}
                    </div>
                ):(<p>결과물을 불러오는 중입니다...</p>)}
            </div>
        </ResultContainer>
    </>
  )
}
const List = (props) =>{
    const {backdrop_path, title} = props.props;
    const imgUrl = backdrop_path;
    return(
        <div className='listItem'>
            <img src={`https://image.tmdb.org/t/p/original/${imgUrl}`} alt="" />
        </div>
    )
}
// yarn add --dev @babel/preset-react
const SearchForm = styled.form`
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    transition: 500ms;
    width: 30px;
    &.on{
        border: solid 1px #ffffff;
        transition: 500ms;
        width: 240px;
        border-radius: 4px;
    }
    .search-btn{
        color: #ffffff;
        font-size: 30px;
        display: flex;
        align-items: center;
    }
    input{
        width: ${({visible})=>(visible?'200px':'0px')};
        color: #ffffff;
        opacity: ${({visible})=>(visible ? 1 : 0)};
        transition: opacity 500ms;
    }
    .clear-btn{
        position: absolute;
        top: 0;
        right: 0;
        color: #ffffff;
        font-size: 24px;
        display: flex;
        align-items: center;
    }
`
const ResultContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: -1;
    padding: 100px;
    box-sizing: border-box;
    overflow: scroll;
    display: none;
    &.on{
        display: block;
    }
    .searchMovie{
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
        h3{
            color: #fff;
            font-weight: bold;
            font-size: 40px;
            text-align: center;
            margin-bottom: 24px;
        }
        .listContainer{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            .listItem{
                img{
                    width: 350px;
                }
            }
        }
    }
`