
import { NavLink } from "react-router-dom"
import { useContext } from 'react'
import { ShopCartContext } from '../../Context'
import SignIn from '../../pages/signIn'
import ShopCart from '../ShoppingCart'

const NavBar = () => {

    let activeStyle = 'underline underline-offset-4'
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

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(false)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(false)
  }

    const renderView = () => {
        if(hasUserAccount && !isUserSignOut) {
            

                return(
                    <>
                        <li>
                            {parsedAccount?.email}
                        </li>
                        <li>
                            <NavLink 
                            to= '/my-orders'
                            className={( {isActive }) =>
                            isActive ? activeStyle: undefined
                            }>
                                My Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                            to= '/my-account'
                            className={( {isActive }) =>
                            isActive ? activeStyle: undefined
                            }>
                                My Account
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                            to= '/sign-in'
                            onClick={()=> handleSignOut()}
                            className={( {isActive }) =>
                            isActive ? activeStyle: undefined
                            }>
                                Sign in
                            </NavLink>
                        </li>
                    </>

                
            )
        } else {
            return(
                <li> 
                    <NavLink
                    to='/sign-in'
                    className={( {isActive }) =>
                    isActive ? activeStyle: undefined }
                    onClick={() => handleSignOut()}
                    > 
                    Sign Out
                    </NavLink>
                </li>
            )
        }
    }

    return(
        <nav className=" flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-md font-light bg-white rounded-b-lg">
            <ul className="flex items-center gap-3">
                <li className="font-semibold text-lg">
                    <NavLink  to= {`${isUserSignOut ? 'sign-in' : '/' } `}
                    onClick={() => context.setSearchItemsByCategory()} >
                        StellarCartel
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to= '/' 
                    onClick={() => context.setSearchItemsByCategory()}
                    className={( {isActive }) =>
                    isActive ? activeStyle: undefined
                    }>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to= '/clothes' 
                    onClick={() => context.setSearchItemsByCategory('clothes')}
                    className={( {isActive }) =>
                    isActive ? activeStyle: undefined
                    }>
                        Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to= '/electronics'
                    onClick={() => context.setSearchItemsByCategory('electronics')}
                    className={( {isActive }) =>
                    isActive ? activeStyle: undefined
                    }>
                        ELectronics
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to= '/furnitures'
                    onClick={() => context.setSearchItemsByCategory('furnitures')}
                    className={( {isActive }) =>
                    isActive ? activeStyle: undefined
                    }>
                        Furnitures
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to= '/toys'
                    onClick={() => context.setSearchItemsByCategory('toys')}
                    className={( {isActive }) =>
                    isActive ? activeStyle: undefined
                    }>
                        Toys
                    </NavLink>
                </li>
                <li>
                    <NavLink to= '/others'
                    onClick={() => context.setSearchItemsByCategory('others')}
                    className={( {isActive }) =>
                    isActive ? activeStyle: undefined
                    }>
                        Others
                    </NavLink>
                </li>
            </ul>
            <ul className="flex items-center gap-3">
                {renderView()}
                <li className='flex items-center'>
                    <ShopCart />
                </li>
            </ul>
        </nav>
    )
}


export default NavBar