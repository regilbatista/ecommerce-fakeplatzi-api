import { useContext } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from "react-router-dom"
import Layout from "../../components/Layout"
import { ShopCartContext } from '../../Context'
import OrderCard from '../../components/OrderCard'

function MyOrder() {
  const context = useContext(ShopCartContext)
  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if (index === 'last') index = context.order?.length - 1

    return (
      <>
        <Layout>
        <div className='flex items-center relative justify-center w-80 mb-6'>
            <Link to='/my-orders' className='absolute left-0'>
              <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer ' />
            </Link>
            <h1>My Order</h1>
          </div>
            <div className=' flex flex-col w-80'>
                {
                    context.order?.[index]?.products.map( product => (
                    <OrderCard 
                            key={product.id}
                            id={product.id}
                            title={product.title} 
                            imageUrl={product.images}
                            price={product.price}
                            
                        />
                    ))
                }
            </div>
        </Layout>
      </>
    )
  }
  
  export default MyOrder