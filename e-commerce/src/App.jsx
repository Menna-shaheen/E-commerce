import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import CheckOut from './components/CheckOut/CheckOut'
import Notfound from './components/Notfound/Notfound'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import UserContextProvider from './components/context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartContextProvider from './components/context/CartContext'
import { Toaster } from 'react-hot-toast';
import RecentProducts from './components/RecentProducts/RecentProducts'
import Allorders from './components/Allorders/Allorders'
import Wishlist from './components/Wishlist/Wishlist'
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import EnterNewPassword from './components/EnterNewPassword/EnterNewPassword'

let query = new QueryClient()
let x = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [

      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute> <Brands /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute> <Wishlist /></ProtectedRoute> },
      { path: 'productdetails/:id/:category', element: <ProtectedRoute> <ProductDetails /></ProtectedRoute> },
      { path: 'recentproducts/productdetails/:id/:category', element: <ProtectedRoute> <ProductDetails /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
      { path: 'allorders', element: <Allorders/> },
      { path: 'login', element: <Login /> },
      { path: 'notfound', element: <Notfound /> },
      { path: 'recentproducts', element: <ProtectedRoute> <Products/></ProtectedRoute> },
      { path: 'forgetpassword', element: <ForgetPassword/> },
      { path: 'resetpassword', element:  <ResetPassword/> },
      { path: 'enternewpassword', element:  <EnterNewPassword/>},
      { path: "productdetails/:id", element: (<ProtectedRoute><ProductDetails /></ProtectedRoute>),},
      { path: 'register', element: <Register /> },

      { path: '*', element: <Notfound /> },
      
    ]
  }
])
function App() {

  return (
    <>
      <UserContextProvider>
        < QueryClientProvider client={query}>
          < CartContextProvider>
            <RouterProvider router={x}></RouterProvider>
            <Toaster/>
          </CartContextProvider>
        </QueryClientProvider>
      </UserContextProvider>

    </>
  )
}

export default App
