import { Nav } from "./component/Nav";
import { AuthContextProvider } from "./context/AuthContext";

// 상위경로에서 하위경로 요소 연결 즉 routes 에 children 요소를 사용하기 위해 필요함
import { Outlet, Route, Routes } from "react-router-dom";

// css
import GlobalStyle from "./styled/GlobalStyled";
import { AllProduct } from "./pages/AllProduct";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()
function App() {
  return (
    <>
      {/* 
      issue #1
      Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call.
      인수 유형이 잘못되었습니다. v5부터는 쿼리 관련 함수 호출 시 "Object" 형식만 허용됩니다. 오류 스택을 사용하여 범인 호출을 찾으십시오.
    */}
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <GlobalStyle />
          <Nav />
          <Routes>
            <Route path="/" element={<AllProduct />} />
          </Routes>
          <Outlet />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
