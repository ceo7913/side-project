import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';

// pages
import { BoardDetailPage, CategoryPages, MyCart, NotFound, ProductDetail, Qna, Search, UpLoadProduct, WritePage } from './pages';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

// 관리자 인증(조건에 하나라도 만족하지 못하면 페이지를 이동할 수 없게 홈으로 이동)
const ProtectRouter = ({ checkAdmin, children }) => {
  const { user } = useAuthContext();
  if (!user || (checkAdmin && !user.isAdmin)) {
    return <Navigate to='/' replace></Navigate>
  }
  return children
}

// routes
const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/cart', element: <MyCart /> },
      { path: '/board/write', element: <WritePage /> },
      { path: '/board/qna', element: <Qna /> },

      { path: '/board/qna:id', element: <BoardDetailPage /> },
      { path: '/products/detail/:id', element: <ProductDetail /> },
      // <Link to={`/products/${el}`}>{el}</Link> / 선택한 :category 경로 이동 
      { path: '/products/:category', element: <CategoryPages /> },
      { path: '/search', element: <Search /> },
      {
        path: '/product/upload',
        element:
          <ProtectRouter checkAdmin>
            <UpLoadProduct />
          </ProtectRouter>
      },
    ]
  }
])

root.render(
  <>
    <RouterProvider router={routes} />
  </>
);
