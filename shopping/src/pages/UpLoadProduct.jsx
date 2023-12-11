import React from 'react'

export const UpLoadProduct = () => {
  const uploadSubmit = async(e) =>{
    // async = 외부와 통신(가져오고 내보낼때)할때 사용
    e.preventDefault(); // 기본 이벤트 제거

  }
  return (
    <div className='container'>
      <div className='imgUploadWrap'>

      </div>
      <form onSubmit={uploadSubmit}>
        <input 
          type="file" 
          name='file'
          accept='image/*'
          onChange={imgUploadChange}
        />
      </form>
    </div>
  )
}
