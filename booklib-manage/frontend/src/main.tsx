import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login/index.tsx'
import Register from './pages/Register/index.tsx'
import BookManage from './pages/BookManage/index.tsx'
import './global.css'
const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <BookManage />
  },
]

const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById('root')!)

root.render(<RouterProvider router={router}></RouterProvider>)