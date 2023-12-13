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

    useEffect(() => {
        const userChange = (newUser) => {
            setUser(newUser);
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

    return (
        // user && user.uid => user 가 있으면 user 의 uid 값을 출력
        <AuthContext.Provider value={{ user, googleLogin, googleLogOut, uid: user && user.uid, }}>
            {/* 하위 모든 페이지에서 로그인 인증 정보를 넘겨주기 위해 */}
            {children}
        </AuthContext.Provider>
    )
}
export function useAuthContext() {
    return useContext(AuthContext);
}

// 위의 함수들을 단순화 시켜서 다른곳에서 참조할 수 있도록 context 를 export 함