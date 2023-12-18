// 필요한 SDK에서 필요한 기능을 가져옴
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
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

// 상품을 database 에 업로드
export async function addProducts(product, image) {
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