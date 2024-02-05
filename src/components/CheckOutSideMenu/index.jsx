import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import OrderCard from '../OrderCard'
import { totalPrice } from '../../Utils'
import './CheckOutSideMenu.css'
import { Link } from 'react-router-dom'
import { ShopCartContext } from '../../Context'
const CheckOutSideMenu = () => {
    const context = useContext(ShopCartContext)

    const deteteItem = (id) => {
        const fiterProducts = context.cartProducts.filter( product => product.id !== id )
        context.setcartProducts(fiterProducts)
    }

    const handleCheckout = () => {
    const fechaHoy = new Date();
    const dia = fechaHoy.getDate();
    const mes = fechaHoy.getMonth() + 1; // Los meses comienzan desde 0
    const año = fechaHoy.getFullYear();

  // Formatear la fecha como una cadena
    const fechaHoyString = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;

        const orderToAdd = {
            date: `${fechaHoyString}`,
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }

        context.setOrder([...context.order, orderToAdd])
        context.setcartProducts([])
        context.searchItems(null)
    }

    return (
        <aside className={`${context.ICSM ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className=' flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <div>
                    <XMarkIcon 
                    className='h-6 w-6 text-black cursor-pointer'
                    onClick={()=> context.closeCheckout()}
                    ></XMarkIcon>
                </div>
            </div>
            <div className='px-6 overflow-y-scroll flex-1'>
                {
                    context.cartProducts.map( product => (
                    <OrderCard 
                            key={product.id}
                            id={product.id}
                            title={product.title} 
                            imageUrl={product.images}
                            price={product.price}
                            deteteItem={deteteItem}
                        />
                    ))
                }
            </div>
            <div className='px-6'>
                <p className='flex justify-between items-center mb-3'> 
                    <span className='font-light'>Total:</span>
                    <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to='/my-orders/last'>
                    <button  className='w-full bg-black py-3 rounded text-white rad mb-6 ' onClick={() => handleCheckout()}>checkout</button>
                </Link>
            </div> 
        </aside>
    )
}

export default CheckOutSideMenu