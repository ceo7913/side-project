import React, { useRef, useState } from 'react'
import { uploadImg } from '../api/imgUpload';
import { addProducts } from '../api/firebase';
import styled from 'styled-components';

export const UpLoadProduct = () => {
  const [file, setFile] = useState(null);

  // upload button state
  const [isLoding,setIsLoading] = useState(false); // 업로드 중인지 아닌지
  const [success, setSuccess] = useState(null); // 업로드가 잘 됐을 때
  const [error,setError] = useState(null) // 업로드가 안됐을 때

  // image 는 dom 에 직접적으로 작성되기 때문에 useRef 로 dom에 직접 접근해서 초기화 해야 한다.
  const fileRef = useRef();

  const [product, setProduct] = useState({
    title: '',
    price: '',
    option: '',
    category: '',
    description: '',
    // 제품업로드 완료시 기입했던 정보들을 초기화 시키기 위해 상태값을 빈값으로 정의
  })

  const productInfoChange = (e) =>{
    const {name, value, files} = e.target;
    if(name === 'file' && files && files[0]){
      setFile(files[0])
    }else{
      setProduct((prev)=>({...prev, [name]:value}))
    }
  }

  const uploadSubmit = async(e) =>{
    // async = 외부와 통신(가져오고 내보낼때)할때 사용
    e.preventDefault(); // 기본 이벤트 제거
    // async 와 try, catch 는 세트
    try{
      // firebase 에 url 등록
      const url = await uploadImg(file);
      // await 로 uploadImg(file); 에 저장해서 url 로 빼서 addProducts 에 넣는 과정
      await addProducts(product, url)
      /*
        fire base database > products
        ```
          2f9c4ec8-1709-495e-9b3e-3913a47cb1d5
            category: "free"
            description: "반팔티"
            id: "2f9c4ec8-1709-495e-9b3e-3913a47cb1d5"
            image: "http://res.cloudinary.com/dpuibr5sp/image/upload/v1702278877/i9n5jsbmn19jwqw3puv0.png"
            option:"asdf,,ㄹ"
            price: "350,550"
            title: "바지"
        ```
      */

      // 기존에 있던 setting 초기화
      setSuccess('업로드가 완료되었습니다.');
      setTimeout(()=>{
        setSuccess(null);
      },2000)
      // 업로드가 다 됐으면 빈값으로 처리
      setProduct({
        title: '',
        price: '',
        option: '',
        category: '',
        description: '',
      })
      setFile(null);
      // fileRef 에 current(값) 이 있으면 초기화
      if(fileRef.current){
        fileRef.current.value ='';
      }
    }catch(error){
      console.error(error);
      setError('업로드에 실패했습니다.')
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className='container'>
      <FormContainer>
        <div className='imgUploadWrap'>
          {file && (
            // createObjectURL = url 주소를 string 형태로 변환하는 역할을 한다.
            <img src={URL.createObjectURL(file)} alt="" />
          )}
        </div>
        <form onSubmit={uploadSubmit}>
          <input 
            //이미지 업로드
            type="file" 
            name='file'
            accept='image/*'
            onChange={productInfoChange}
            ref={fileRef}
          />
          <input 
            // 상품제목
            type="text" 
            name='title'
            placeholder='상품명을 입력하세요'
            value={product.title}
            onChange={productInfoChange}
          />
          <input 
            // 상품 가격
            type="text" 
            name='price'
            placeholder='상품 가격을 입력하세요'
            value={product.price}
            onChange={productInfoChange}
          />
          <input 
            // 상품 분류
            type="text" 
            name='category'
            placeholder='상품 분류를 입력하세요'
            value={product.category}
            onChange={productInfoChange}
          />
          <input 
            // 상품 설명
            type="text"
            name='description'
            placeholder='상품 설명을 입력하세요'
            value={product.description}
            onChange={productInfoChange}
          />
          <input 
            // 상품 사이즈
            type="text" 
            name='option'
            placeholder='상품 옵션을 ,로 구분해서 입력해주세요'
            value={product.option}
            onChange={productInfoChange}
          />

          <button disabled={isLoding}>
            {isLoding ? '업로드 중' : '제품 등록하기'}
          </button>
          {success && (
            // ? => 는 true/false 의 값이 동시에 나와야할때 => && 는 조건만 맞으면 하나 출력
            <p>{success}</p>
          )}
          {error &&(
            <p>{error}</p>
          )}
        </form>
      </FormContainer>
    </div>
  )
}

const FormContainer = styled.div`
  max-width: 1200px;
  padding: 30px 0px;
  margin: 0px auto;
  display: flex;
  gap: 40px;
  .imgUploadWrap{
    max-width: 500px;
    height: auto;
    img{
      display: block;
      height: 100%;
    }
  }
  form{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    input{
      width: 100%;
      box-sizing: border-box;
      height: 40px;
      border-radius: 4px;
      border-color: rgba(0,0,0,0.2);
      padding: 6px 12px;
    }
    button{
      margin-top: auto;
      height: 50px;
      border-radius: 4px;
      background: rgba(255,183,245,0.5);
      border: none;
      transition: 500ms;
      &:hover{
        background: rgba(255,183,245,1);
      }
    }
  }
`