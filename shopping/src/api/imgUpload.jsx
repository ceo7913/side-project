/*
    cloudinary api
    
    무료 데이터 베이스 라고 보면 된다.
    이미지를 cloudinary 에 업로드하고 해당 이미지를 경로로 불러올 수 있게 해준다.
    이미지 용량에 제한을 두거나 변환시켜서 불러올수도 있다.

*/
export async function uploadImg(file){
    try{
        const formData = new FormData();
        formData.append('file',file);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
        
        const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL,{
            method: 'POST',
            body: formData
        });
        if(!res.ok){
            console.erorr(res.status);
        }
        const data = await res.json();
        return data.url
    }catch(error){
        console.error(error)
    }
}