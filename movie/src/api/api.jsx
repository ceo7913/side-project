export const fetchGenres = async () =>{
    try{
        const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=8454804e2a979f263913c7e893c28db8&language=ko-KR');
        const data = await res.json();
        const genreMap = data.genres.reduce((acc,genre)=>{
            acc[genre.id] = genre.name;
            return acc
        },{});
        return genreMap;
    }catch(error){
        // error 캐치시 console
        console.error(error);
    }
}

// useEffect(()=>{
//     const fetchGenres = async()=>{
//       try{
//         const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=8454804e2a979f263913c7e893c28db8&language=ko-KR')
//         // https://api.themoviedb.org/3/genre/movie/list?language=en
//         const data = await res.json();
//         const genreMap = data.genres.reduce((acc,genre)=>{
//           acc[genre.id] = genre.name;
//           return acc
//         },{});
//         setGenres(genreMap)
//         // error 캐치시 console
//       }catch(error){
//         console.error(error);
//       }
//     }
//     // useEffect 는 랜더링 될때 마다 실행되는 hook 이기 때문에 선언 후 실행까지 해줘야 완성이다.
//     fetchGenres();
//   },[])

//   // id 를 받아와서 map 으로 요소들을 만든 다음 하나로 합침
//   const getGenreText = (genreId) =>{
//     return genreId.map((el)=>genres[el]).join()
//   }