import { Nav } from "./component/Nav";

// 상위경로에서 하위경로 요소 연결 즉 routes 에 children 요소를 사용하기 위해 필요함
import { Outlet } from "react-router-dom"; 
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Nav/>
        <Outlet/>
      </AuthContextProvider>
    </>
  );
}

export default App;
