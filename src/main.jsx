import React from 'react'
import ReactDOM from 'react-dom/client'
import Movimientos from './pages/Movimientos'
import Login from './pages/Login'
import Registro from './pages/Registro'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/registro",
        element: <Registro />
      },
      {
        path: "/movimientos",
        element: <Movimientos />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);