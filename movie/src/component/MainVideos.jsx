import axios from '../api/axios'
import React, { useEffect, useState } from 'react'
import request from '../api/request'
import { styled } from 'styled-components';

export const MainVideos = () => {
    const [movie, setMovie] = useState(null) // 영화의 리스트가 있음을 반환 
    const [videoKey, setVideoKey] = useState(null) // 영화 동영상을 연결할 아이디를 반환
    const [showImg,setShowImg] = useState(true) // 맨처음 썸네일 이미지를 보여줄 이미지 상태값

    useEffect(()=>{ // 페이지를 읽을때 데이터도 같이 읽는다.
        fetchData();
    },[]) // [] = 마운트 될시에만

    useEffect(()=>{
        if(videoKey){
            changeVideo()
        }
    },[videoKey]);

    const fetchData = async () =>{
        // async = 비동기식으로 데이터에 접근하는 메서드 => 외부에 있는 데이터에 접근할 때에는 async 를 많이 쓰게 된다.
        try{ 
            // await 기다림 axios 에서 get
            const res = await axios.get(request.fetchNowPlayMoive)
            // console.log(res);
            const movieId = res.data.results[
                Math.floor(Math.random()* res.data.results.length)
            ].id
            // console.log(movieId); // => 새로고침할때 마다 새로운 동영상 출력 / 새로운 id 값 출력
            const {data: movieDetail} = await axios.get(`movie/${movieId}`, {
                params: {append_to_response : 'videos'},
            })

            if(movieDetail.videos && movieDetail.videos.results.length > 0){
                setMovie(movieDetail)
                setVideoKey(movieDetail.videos.results[0].key);
                // console.log(movieDetail.videos.results[0].key); // => sGrdYmju2Fs 
                // key 값이 없으면 안나올 수 있다. 예고편 key 값이 없음 => 따라서 조건문을 걸어서 항상 나올 수 있도록 해준다.

                setTimeout(()=>{
                    // 이미지 출력 2초뒤에 영상 노출
                    setShowImg(false)
                },2000)
            }

        }catch(error){
            console.error(error);
            // 오류의 경로를 파악 하기 위해
        }
    }

    const changeVideo = () =>{
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML='';

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&loop=1&mute=1&playlist=${videoKey}`;
        iframe.width = '100%';
        iframe.height = '100%';
        videoContainer.appendChild(iframe);
    }
  return (
    <>
        {showImg && movie &&(
            <MainVideoImg img={movie.backdrop_path}/>
        )}
        <MainVideoWrapper id='videoContainer'/>

    </>
  )
}

const MainVideoImg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 99;
    background: url(https://image.tmdb.org/t/p/original/${props=>props.img}) no-repeat center center / cover;
`
const MainVideoWrapper = styled.div`
    width: 100%;
    height: 100vh;
`