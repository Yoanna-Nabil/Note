import React from 'react'
import {createHashRouter,RouterProvider} from "react-router-dom";
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import {RecoilRoot} from 'recoil';
import InverseProtectedRout from './Components/InverseProtectedRout/InverseProtectedRout';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

export default function App() {
  let routes= createHashRouter([{
    path: '', element: <Layout/>, children: [
      {index: true, element: <InverseProtectedRout> <Register/> </InverseProtectedRout>},
      {path: 'home', element: <ProtectedRoute> <Home/> </ProtectedRoute> },
      {path: 'login', element:  <InverseProtectedRout> <Login/> </InverseProtectedRout> }
    ]
  }]);


  return (
    <>
    <RecoilRoot>
      <RouterProvider router={routes}></RouterProvider>
      </RecoilRoot>
    </>
  )
}
