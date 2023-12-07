import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import styled from 'styled-components';
export const Search = () => {
    /*
        * issue
        1. 검색어를 지워도 결과창이 남아 있음 (해결)
        2. 스크롤이 이동된 상태에서 검색창이 생성될 경우 컨텐츠가 서로 겹치는 오류가 있음 (해결)
        3. 스크롤바가 2개가 생성됨(body,Search) (해결)
        4. 검색창에 검색어 입력후 엔터키를 치면 영역이 닫히는 오류 (해결)
        => 리액트는 enter 키를 누르면 자동으로 submit 이 기본값 설정 
        5. 텍스트가 없을때 검색창 외에 다른곳을 클릭하면 검색창이 닫히도록 수정
        (텍스트가 있을때에는 다른 곳을 클릭해도 검색창이 닫히지 않음)
    
    */
    const [text, setText] = useState(''); // 검색어의 텍스트를 받아올 state
    const [visible, setVisible] = useState(false); // 인풋창의 기본 속성값
    const [showClearBtn, setShowClearBtn] = useState(); // 검색어 입력 여부를 보기 위해 만든 상태변수

    const [list, setList] =useState(false) // 검색리스트 유무 체크
    const [movieList, setMovieList] = useState([]); // 검색 결과 배열 관리 (출력)
    const searchRef = useRef();

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

        // list 초기화
        setList(false);
        setMovieList([]);
    }

    const fetch = async () =>{
        // axios => server 에서 array 가 있는지 찾는 함수
        const res = await axios.get(BASE_URL);
        data = res.data.results || [];
        setMovieList(data)
    }

    const inputChange = (e) =>{
        setText(e.target.value);
        // trim() => 있는지 없는지 검사(문자열에서 공백을 제거해주는 메서드 => 제거할게 있으면 true 로 판단)
        setShowClearBtn(e.target.value.trim()!=='');
        // fetch(setMovieList());
        setList(true);
        if(e.target.value.trim()){
            fetch(setMovieList());
            setList(true);
        }else{
            setMovieList([]);
            setList(false);
        }
    }

    const enterPress = (e) =>{
        // console.log(e.key); => key value
        if(e.key ==='Enter'){
            // preventDefault = 브라우저가 적용하는 기본 동작을 방지하는 역할
            e.preventDefault();
        }
    }

    useEffect(()=>{
        if(!list){
            document.body.classList.remove('no-scroll')
        }else{
            document.body.classList.add('no-scroll')
        }
        return () =>{
            // 리셋 => 동작을 한다면 필수까지는 아니지만 구문이 남아있는 찝찝함을 해소해야함
            document.body.classList.remove('no-scroll')
        }
    },[list])

    useEffect(()=>{
        const clickSideCloseEvent = (e)=>{
            if(searchRef.current && !searchRef.current.contains(e.target) && !text){
                setVisible(false);
            }
        }
        document.addEventListener('mousedown',clickSideCloseEvent)
        return () =>{
            // 리셋
            document.removeEventListener('mousedown',clickSideCloseEvent)
        }
    },[text])
  return (
    <>
        <SearchForm visible={`${visible}`} className={visible ? 'on' : null} ref={searchRef}>
            <button className='search-btn' onClick={onToggleEvent}>
                <BiSearch/>
            </button>
            {visible &&(
                <input 
                type="text" 
                placeholder='검색어를 입력하세요'
                value={text}
                onChange={inputChange}
                /*
                키보드 이벤트 함수 onKeyDown/onKeyUp/onKeyPress
                onKeyDown키를 눌렀을 때 이벤트 발생즉, 키를 입력하면 이벤트 발생 후 문자가 입력된다.
                onKeyUp키를 눌렀다 놓았을 때 이벤트 발생즉, 키를 입력하면 문자 입력 후 이벤트가 발생된다.
                즉 onKeyPress 와 onKeyDown과 이벤트는 같다.
                */
                onKeyDown={enterPress}
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
    position: fixed;
    top: 15px;
    right: 32px;
    transition: 500ms;
    width: 30px;
    z-index: 11;
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
    max-height: 100vh;
    background: black;
    z-index: 10;
    padding: 100px;
    box-sizing: border-box;
    overflow: auto;
    display: none;
    &.on{
        display: block;
    }
    .searchMovie{
        width: 100%;
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