import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//css
import GlobalStyle from './styled/GlobalStyled';

// pages
import { MyCart, NotFound, ProductDetail } from './pages';

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
    ]
  }
])

root.render(
  <>
    <RouterProvider router={routes}/>
    <GlobalStyle/>
  </>
);
