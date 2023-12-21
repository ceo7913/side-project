// 필요한 SDK에서 필요한 기능을 가져옴
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { get, getDatabase, ref, remove, set } from 'firebase/database';

import { v4 as uuid } from 'uuid';
import { AllProduct } from './../pages/AllProduct';

// 파이어베이스에서 요구하는 변수명 조차도 따르는게 좋다.
const firebaseConfig = {
   // .env.local 에서 저장한 변수를 가져오는 방법
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
}
/*
    process.env = 환경변수 node.js 에 전역객체
    환경변수 : 실행중인 프로세스에 사용할 수 있고, 애플리케이션을 구현하는 키-값
    으로 이루어진 변수, 외부에서 값을 받아와서 설정할 수 있게 코드를 직접 하드코딩하지 않고
    설정, 개인정보 매개변수로 분리해서 관리하는 용도로 사용
    process = 현재 nodejs 의 프로세스의 전역객체로 실행중인 프로세스에 접근해서 정보를 받아옴
    .env = process 에서 사용할 수 있는 모든 환경변수를 포함하는 객체
*/

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// firebase 문서에 상세하게 사용방법이 기입되어 있다.
const provider = new GoogleAuthProvider(); // 구글 인증 제공자
const auth = getAuth(); // 인증에 대한 정보

const database = getDatabase(app);

// 구글 자동 로그인 방지
provider.setCustomParameters({
   prompt: 'select_account' // provider 가 들어올때 마다 구글폼 을 띄우겠다는 뜻
})

// google login function
export async function googleLogin() {
   try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      return user
   } catch (error) {
      console.error(error)
   }
}
// google logout function
export async function googleLogOut() {
   try {
      await signOut(auth); // signOut = 기존에 정보들을 초기화하는 훅
   } catch (error) {
      console.error(error)
   }
}

// 로그인 시 새로고침을 해도 로그인을 계속 유지
export function onUserState(callback) {
   onAuthStateChanged(auth, async (user) => {
      // onAuthStateChanged = 사용자 인증 상태 변화를 체크하는 hook(로그인, 로그아웃)
      if (user) {
         try {
            // callback(user);
            // admin or user 의 정보를 보냄
            const updateUser = await adminUser(user);
            callback(updateUser)
         } catch (error) {
            console.error(error);
         }
      } else {
         callback(null);
      };
   })
}

async function adminUser(user) {
   try {
      const snapshot = await get(ref(database, 'admin'));
      // snapshot = firebase 안에 database 안에 admin 폴더를 검색

      // snapshot.exists() => snapshot 안에 data 에 정보가 있는지 유무를 봄
      if (snapshot.exists()) {
         // snapshot 에 있는 정보의 값을 admins 에 담아 놓음
         const admins = snapshot.val();
         // 검색된 admins에 현재 로그인된 사용자의 이메일과 일치하는 이메일이 있는지 확인
         const isAdmin = admins.includes(user.email);
         return { ...user, isAdmin };
      }
      return user
   } catch (error) {
      console.error(error)
   }
}


/*
데이터 베이스에 데이터를 저장할때에는 원시형태의 값으로 유지 시켜서 저장하고, 출력할때 변환해준느 과정을 넣어주는 것이 일반적이고 가장 안전한 방법으로 본다.

우선적으로 변환해서 저장하게 되면 지역이 바뀌는 경우 재변환이 필요한 경우가 생긴다.
때문에 원시형태로 저장 후 필요할때마다 필요한 방법으로 변환하는 것이 재사용성과 유연성에 더 알맞다.
*/
// 상품 가격 변환 함수
export function formatCurrency(item) {
   // console.log(typeof(item)) => string
   const number = parseInt(item) // type 을 number 의 형태로 바꿔줘야함
   return number.toLocaleString('ko-KR'); // formatCurrency(product.price) => 이런식으로 사용
   // toLocaleString = 지역에 맞는 단위를 자동으로 구분해서 콤마를 찍어줌
   /*
      ko-KR : 한국
      en-US : 미국
      en-CA : 캐나다
      ja-JP : 일본
      zh-CN : 중국

      단위를 구분하는 방식이 틀림
      1,234,456
      1 234 456
      1.234.456
   */

}


// 상품을 database 에 업로드
export async function addProducts(product, image) {
   // uuid = 식별자를 만들어주는 라이브러리
   // 숫자와 영문으로 조합된 식별자 코드를 부여해서 고유값으로 사용한다.
   const id = uuid()
   // database 에 products 경로에 id 값으로 data 를 넣음
   return set(ref(database, `products/${id}`), {
      ...product,
      id,
      image,
   })
}

// database 에 있는 상품을 가져오기
// async 는 비동기 방식에 데이터 처리 방법(JS promise의 단점을 보완한 최신 비동기 처리 방식 코드)
export async function getProducts() { // 받아서 뿌려주는 부분이기 때문에 매개변수는 필요없음
   const snapShot = await get(ref(database, 'products')); // 참조할 주소는 업로드했던 주소와 동일해야 가져올 수 있다
   if (snapShot.exists()) {
      return Object.values(snapShot.val()) // object 로 value(값)을 받아옴
   } else {
      return [] // 아니면 빈값으로 return
   }
}

// 장바구니 리스트(업데이트, 상품정보 가져오기, 상품 삭제)
// 장바구니 리스트 불러오기
export async function getCart(userId) {
   try {
      const snapshot = await (get(ref(database, `cart/${userId}`))) // cart 경로에 userId 접근
      if (snapshot.exists()) { // 있는지 확인 
         const item = snapshot.val(); // 있으면 벨류에 접근
         return Object.values(item) // object 로 출력
      } else {
         return [] // 없으면 빈배열 출력
      }
   } catch (error) {
      console.error(error) // 에러
   }
}

// 장바구니 업데이트
export async function updateCart(userId, product) {
   try {
      // userId 객체가 가지고 있는 장바구니 리스트 하나하나의 id 값 (id 를 저장하는 이유는 거의 중복되지 않기 때문)
      const cartRef = ref(database, `cart/${userId}/${product.id}`);
      await set(cartRef, product);
   } catch (error) {
      console.error(error)
   }
}

// 장바구니 목록 삭제
export async function deleteCart(userId, productId) {
   // remove from firebase/database
   return remove(ref(database, `cart/${userId}/${productId}`)) // 해당 경로에 있는 productId remove
}

// 카테고리 상품 가져오기
export async function getCategoryProduct(category) {
   // async 서버에서 get 가져온다.ref(레퍼지토리) database 에서, products 라는 파일을 .then 있으면 snapshot 
   return get(ref(database, 'products')).then((snapshot) => {
      if (snapshot.exists()) {
         // 카테고리별로 아이템 나누는 방식은 전체 상품을 먼저 구한 뒤에 필터로 카테고리별로 구분
         const allProducts = Object.values(snapshot.val());
         const filterProducts = allProducts.filter((product) => product.category === category);
         return filterProducts
      }
      return []; // 상품이 없다면 빈배열을 출력
   })
}

// 상품 검색
export async function searchProducts(query) {
   try {
      // 같은 수행 다른 방법
      // return get(ref(database, 'products')).then((snapshot) => {
      const dbRef = ref(database, 'products');
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
         const data = snapshot.val();
         const allProducts = Object.values(data)
         if (allProducts.length === 0) {
            return []
         }
         const matchProducts = allProducts.filter((product) => {
            const itemTitle = product.title;
            return itemTitle.includes(query);
         });
         return matchProducts;
      } else {
         return []
      }
   } catch (error) {
      console.error(error);
   }
}

// 데이터베이스에 게시글 업로드
export async function addBoard(user, date, title, text) {
   const id = uuid();
   const postData = {
      id,
      user,
      date,
      title,
      text,
   }
   return set(ref(database, `/board/${id}`), postData)
}

// 등록된 게시글 가져오기
export async function getBoard() {
   return get(ref(database, 'board'))
      .then((snapshot) => {
         if (snapshot.exists()) {
            return Object.values(snapshot.val());
         }
         return []
      })
}

// 게시글에 댓글 저장
export async function addComments(boardId, user, text) {
   const id = uuid();
   console.log(boardId)
   return set(ref(database, `/board/${boardId}/comments/${id}`), {
      id,
      user,
      text,
   })
}

// 댓글 출력
export async function getComments(boardId) {
   return get(ref(database, `/board/${boardId}/comments`)) // get 으로 ref(레파지토리) 에서 가져오고 set 으로 레파지토리로 보냄
      .then((snapshot) => {
         if (snapshot.exists()) {
            return Object.values(snapshot.val());
         }
         return []
      })
}

// 리뷰 글 저장
export async function addReview(productId, user, text) {
   const reviewId = uuid();
   const reviewRef = ref(database, `review/${productId}/${reviewId}`);

   try {
      await set(reviewRef, {
         id: reviewId,
         user: user,
         text: text,
      })
      return reviewId
   } catch (error) {
      console.error(error)
   }
}

// 리뷰 글 출력
export async function getReview(productId) {
   const reviewRef = ref(database, `review/${productId}`);
   try {
      const snapshot = await get(reviewRef);
      if (snapshot.exists()) {
         return Object.values(snapshot.val());
      } else {
         return [];
      }
   } catch (error) {
      console.error(error);
   };
}

// 이메일 회원가입 저장
export async function joinEmail(email, password, name) {
   const auth = getAuth(); // 저장할 사용자 인증폼을 불러옴
   try {
      const userData = await createUserWithEmailAndPassword(auth, email, password)
      // createUserWithEmailAndPassword 사용자 정보 이메일 패스워드만 저장할 수 있으며
      // 추가로 정보를 저장할 때에는 우회하는 방법을 이용해야 한다.
      const user = userData.user;
      // console.log(user);

      // updateProfile = 사용자의 정보를 업데이트
      await updateProfile(user, {
         displayName: name
      })
      console.log(user);

      await signOut(auth);
      return { success: true };
   } catch (error) {
      console.log({ error: error.code }) // => auth/email-already-in-use 
      return { error: error.code } // 에러가 나는 경우 에러 코드를 반환
   }
}

// 로그인
export async function loginEmail(email, password) {
   try {
      const userData = await signInWithEmailAndPassword(auth, email, password)
      return userData.user
   } catch (error) {
      console.error(error);
   }
}