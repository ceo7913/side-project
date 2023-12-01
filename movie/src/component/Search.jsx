import React, { useState } from 'react'
import { BiSearch } from "react-icons/bi";
import styled from 'styled-components';
export const Search = () => {
    const [visible, setVisible] = useState(false) // 인풋창의 기본 속성값
    const onToggleEvent =(e)=>{
        e.preventDefault(); // 기존 이벤트 제거

        // prev => !prev / 이전값 참조해서 반대의 값을 출력
        setVisible(prev => !prev)
    }
  return (
    <>
        <SearchForm visible={`${visible}`} className={visible ? 'on' : null}>
            <button className='search-btn' onClick={onToggleEvent}>
                <BiSearch/>
            </button>
            {visible &&(
                <input type="text" placeholder='검색어를 입력하세요'/>
            )}
        </SearchForm>
    </>
  )
}
// yarn add @babel/core --dev

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
`