import { useContext } from "react"
import { ShopCartContext } from '../../Context'
import Layout from "../../components/Layout"
import  OrdersCard  from '../../components/OrdersCard'
import { Link } from "react-router-dom"

function MyOrders() {

  const context = useContext(ShopCartContext)

    return (
      <>
        <Layout >
        <div className='flex items-center relative justify-center w-80 '>
            <h1 className='font-medium text-xl mb-3'>My Orders</h1>
          </div>
        {
          context.order.map((order, index) => (
            <Link key={index} to={`/my-orders/${index}`}>
              < OrdersCard  
                totalPrice={order.totalPrice} 
                totalProducts={order.totalProducts}  
              />
            </Link>

          ))
        }
        </Layout>
      </>
    )
  }
  
  export default MyOrders