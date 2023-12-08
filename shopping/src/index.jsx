import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//css
import GlobalStyle from './styled/GlobalStyled';

// pages
import { MyCart, NotFound, ProductDetail, UpLoadProduct } from './pages';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// routes
const routes = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFound/>,
    children:[
      {path: '/cart', element: <MyCart/>},  
      {path: '/products/detail/:id', element: <ProductDetail/>},  
      {path: '/product/upload', element:<UpLoadProduct/>},
    ]
  }
])

root.render(
  <>
    <RouterProvider router={routes}/>
    {/* <GlobalStyle/> */}
  </>
);
