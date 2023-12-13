import { createContext } from "react";

export const CategoryContext = createContext({
   // 참조(https://ko.legacy.reactjs.org/docs/context.html) TIL 작성
   categoryList: [
      'top',
      'bottom',
      'outer',
      'accessory',
      'etc'
   ]
});