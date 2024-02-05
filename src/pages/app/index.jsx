import { useContext } from 'react'
import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom'
import {ShopCartProvider, initializeLocalStorage, ShopCartContext} from '../../Context'
import './App.css'
import Home from '../Home'
import MyAccount from '../myAccount'
import MyOrder from '../myOrder'
import MyOrders from '../myOrders'
import NotFound from '../notFound'
import SignIn from '../signIn'
import NavBar from '../../components/NavBar'
import CheckOutSideMenu from '../../components/CheckOutSideMenu'

const AppRoutes = () => {
  const context = useContext(ShopCartContext)

    //Sign Out
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut

     //Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  //Has account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAccount = !noAccountInLocalState || !noAccountInLocalStorage

  let routes = useRoutes([
    { path: '/',  element: hasUserAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/>  },
    { path: '/clothes',  element: hasUserAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/>  },
    { path: '/electronics', element: hasUserAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/>  },
    { path: '/furnitures',  element: hasUserAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/> },
    { path: '/toys', element: hasUserAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/>  },
    { path: '/others',  element: hasUserAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/*', element: <NotFound /> },
  ])
  return routes
}

const App = () => {
  initializeLocalStorage()
  return (
    <ShopCartProvider>
    <BrowserRouter>
      <AppRoutes />
      <NavBar />
      <CheckOutSideMenu />
    </BrowserRouter>
   </ShopCartProvider>
  )
}

export default App
