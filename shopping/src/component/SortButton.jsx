import React from 'react'
import PropTypes from 'prop-types'
// yarn add prop-types
export const SortButton = ({ sortName, sortPrice }) => {
   return (
      <>
         <button onClick={sortName}>이름순</button>
         <button onClick={sortPrice}>가격순</button>
      </>
   )
}

SortButton.propTypes = {
   sortName: PropTypes.func.isRequired,
   sortPrice: PropTypes.func.isRequired,
}

/*
   propTypes = 타입에 검증 라이브러리
   
*/