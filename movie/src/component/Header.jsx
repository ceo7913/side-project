import React from 'react'
import { RiNetflixFill } from "react-icons/ri";
import styled from 'styled-components';

export const Header = () => {
  return (
    <HeaderContainer>
      <h1 className='logo'><RiNetflixFill /></h1>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  padding: 16px 32px;
  box-sizing: border-box;
  .logo{
    font-size: 30px;
    a{
      display: flex;
      align-items: center;
    }
    // svg 에 색상을 주려면 a 태그 내부에 있는 path 에 style 을 줘야한다.
    path{
      color: red;
    }
  }
`