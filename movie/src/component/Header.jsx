import React from 'react'
import { RiNetflixFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Navigation } from './Navigation';
import { Search } from './Search';

export const Header = () => {
  return (
    <HeaderContainer>
      <h1 className='logo'><Link to='/'><RiNetflixFill /></Link></h1>
      <Navigation/>
      <HeaderRight>
        <Search/>
      </HeaderRight>
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
  background: black;
  width: 100%;
  gap: 48px;
  .logo{
    font-size: 30px;
    a{
      display: flex;
      align-items: center;
      // svg 에 색상을 주려면 a 태그 내부에 있는 path 에 style 을 줘야한다.
      path{
        color: red;
      }
    }
  }
`
const HeaderRight = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`