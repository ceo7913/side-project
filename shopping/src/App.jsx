import { Nav } from "./component/Nav";
import { AuthContextProvider } from "./context/AuthContext";

// 상위경로에서 하위경로 요소 연결 즉 routes 에 children 요소를 사용하기 위해 필요함
import { Outlet, Route, Routes } from "react-router-dom";

// css
import GlobalStyle from "./styled/GlobalStyled";
import { AllProduct } from "./pages/AllProduct";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TopBtn } from "./component/TopBtn";

const queryClient = new QueryClient()
function App() {
  return (
    <>

      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <GlobalStyle />
          <Nav />
          <Routes>
            <Route path="/" element={<AllProduct />} />
          </Routes>
          <TopBtn />
          <Outlet />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
