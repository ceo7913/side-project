import React from 'react'
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <HeaderContainer>
        <h1><Link to='/'>shop</Link></h1>
        
        <div className='userWrap'>
          <button className='loginBtn'>LOGIN</button>
        </div>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
    
`
