import React, { useState } from 'react'
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import styled from 'styled-components';
export const Search = () => {
    const [visible, setVisible] = useState(false) // 인풋창의 기본 속성값
    const [showClearBtn, setShowClearBtn] = useState('') // 검색어 입력 여부를 보기 위해 만든 상태변수
    const [text, setText] = useState('') // 검색어의 텍스트를 받아올 state
    console.log(text);
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
                    // trim() => 문자열 좌우에서 공백 제거 
                    setText(e.target.value);
                    setShowClearBtn(e.target.value.trim()!=='');
                }}
                />
            )}
            {showClearBtn &&(
                <button className='clear-btn' onClick={onClear}><MdClear/></button>
            )}
        </SearchForm>
    </>
  )
}
// yarn add --dev @babel/preset-react
const SearchForm = styled.form`
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    &.on{
        transition: 500ms;
        border-color: #ffffff;
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