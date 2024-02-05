import { useContext, useState, useRef } from "react"
import { Link, Navigate } from "react-router-dom"
import Layout from "../../components/Layout"
import { ShopCartContext } from '../../Context'

function SignIn() {

  const context = useContext(ShopCartContext)
  const [view, setView] = useState('user-info')
  const form = useRef(null)

  //Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  //Has account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAccount = !noAccountInLocalState || !noAccountInLocalStorage

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(false)
    return <Navigate replace to={'/'} />
  }

  const createAnAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    context.setAccount(data)

    handleSignIn()
  }

  const renderLogin = () => {
    return(
      <div className='flex flex-col w-80'>
          <p>
            <span className='font-light text-sm'> Email: </span>
            <span>{parsedAccount?.email}</span>
          </p>
          <p>
            <span className='font-light text-sm'> Password: </span>
            <span>{parsedAccount?.password}</span>
          </p> 
        <Link 
          to='/'>
            <button
              className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2' 
              onClick={() => handleSignIn()}
              disabled={!hasUserAccount}
              >
                Log in
            </button>
          </Link>
          <div className='text-center'> 
            <a className='font-light text-xs underline underline-offset-4' href="/">
              I forgot my password
            </a>
          </div>
                <button
                  className='border border-black bg-white disabled:bg-white/40 text-black w-full rounded-lg py-3 mt-4 mb-2' 
                  onClick={() => setView('create-user-info')}
                  disabled={hasUserAccount}
                >
                    Sign up
                </button>
        </div>
    )
  }

  const renderCreateUserInfo = () => {
    return(
    <form ref={form} className="flex flex-col gap-4 w-80">
      <div className='flex flex-col gap-1'> 
        <label htmlFor="name" className="font-light text-sm"> Your name: </label>
        <input 
          type="text"
          id="name"
          name="name"
          defaultValue={parsedAccount?.name}
          placeholder="Jhon"
          className='rounded-lg border border-black placeholder:font-light placeholder:text-sm
          placeholder:text-black/60 focus:outline-none py-2 px-4'
        />
      </div>
      <div className='flex flex-col gap-1'> 
        <label htmlFor="email" className="font-light text-sm"> Your email: </label>
        <input 
          type="text"
          id="email"
          name="email"
          defaultValue={parsedAccount?.email}
          placeholder="jhon@example.com"
          className='rounded-lg border border-black placeholder:font-light placeholder:text-sm
          placeholder:text-black/60 focus:outline-none py-2 px-4'
        />
      </div>
      <div className='flex flex-col gap-1'> 
        <label htmlFor="password" className="font-light text-sm"> Your password: </label>
        <input 
          type="text"
          id="password"
          name="password"
          defaultValue={parsedAccount?.password}
          placeholder="********"
          className='rounded-lg border border-black placeholder:font-light placeholder:text-sm
          placeholder:text-black/60 focus:outline-none py-2 px-4'
        />
      </div>
      <Link to='/'>
        <button
        className='bg-black text-white w-full rounded-lg py-3'
        onClick={() => createAnAccount()}
        >
          Register
        </button>
      </Link>
    </form>
    )
  }

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogin()

    return (
        <Layout >
          <h1 className='font-medium text-xl text-center mb-6 w-80'>Bienvenido</h1>
        {renderView()}
        </Layout>
    )
  }
  
  export default SignIn