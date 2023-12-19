import { createContext, useContext, useEffect, useState } from "react";
import { onUserState, googleLogin, googleLogOut } from "../api/firebase";

const AuthContext = createContext()
/*
    context 컴포넌트 간에 어떠한 값들을 공유할 수 있게 해주는 hook
    변수에 새로운 context 를 생성해서 초기화
    createContext() = 컨텍스트를 사용하기 위해 생성
*/
export function AuthContextProvider({ children }) {
    const [user, setUser] = useState();
    const [unSubScribe, setUnSubScribe] = useState();
    const [isLoading, setIsLoading] = useState(true); // 현재 로딩 유무 확인

    useEffect(() => {
        // issue fix
        /*
            페이지를 새로고침하는 경우 페이지에서 사용자의 정보를 넘어오기 전에 사용자 인증을 
            끝내기 때문에 protectRouter 로 인해 홈으로 이동되는 경우가 생긴다.
            사용자 정보를 모두 받아오기 전까지 protectRouter 를 실행하지 못하게 지연시키는 방법으로 해결할 수 있다.
        */
        const storeUser = sessionStorage.getItem('user'); // 세션에 저장되어있는 user 의 값을 storeUser 변수에 담음
        if (storeUser) {
            setUser(JSON.parse(storeUser))
        }
        const userChange = (newUser) => {
            setUser(newUser);
            setIsLoading(false);
            if (newUser) {
                // 사용자가 로그인을 하면 세션스토리지 안에 정보를 저장
                sessionStorage.setItem('user', JSON.stringify(newUser));
            } else {
                // 사용자가 로그아웃 하면 세션 스토리지에 있는 모든 정보 삭제
                sessionStorage.removeItem('user');
            }
        };
        // 위에서 업데이트된 사용자를 onUserState 에 넘김
        const unSubScribeFunc = onUserState(userChange);
        setUnSubScribe(() => unSubScribeFunc);
        return () => {
            if (unSubScribeFunc) {
                unSubScribeFunc()
            }
        }
    }, [])
    console.log(isLoading);
    return (
        // user && user.uid => user 가 있으면 user 의 uid 값을 출력
        <AuthContext.Provider value={{ user, googleLogin, googleLogOut, uid: user && user.uid, isLoading }}>
            {/* 하위 모든 페이지에서 로그인 인증 정보를 넘겨주기 위해 */}
            {children}
        </AuthContext.Provider>
    )
}
export function useAuthContext() {
    return useContext(AuthContext);
}

// 위의 함수들을 단순화 시켜서 다른곳에서 참조할 수 있도록 context 를 export 함