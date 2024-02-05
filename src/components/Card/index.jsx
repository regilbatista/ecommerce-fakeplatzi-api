import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { ShopCartContext } from '../../Context'
const Card = (data) => {
    const context = useContext(ShopCartContext)
    
    const ShowProduct = (ProductDetail) => {
        context.openProductDetail()
        context.setPTS(ProductDetail)
    }

    const addProductsToCart = (event, product) => {
        event.stopPropagation()
        context.setCount(context.count + 1)
        context.setcartProducts([...context.cartProducts, product])
        context.openCheckout()
        context.closeProductDetail()
    }

    const renderIcon =(id) => {
        // IIC = is in the cart
        const IIC = context.cartProducts.filter(product => product.id === id).length > 0
        
        if (IIC)
        {   return(
                <div className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 mt-1 me-1 rounded-full p-1'>
                    <CheckIcon className='h-6 w-6 text-black'></CheckIcon>
                </div>
            )
        } else {
            return(
                <div 
                    className='absolute top-0 right-0 flex justify-center items-center bg-neutral-100/50 w-6 h-6 mt-1 me-1 rounded-full p-1'
                    onClick={(event) =>  addProductsToCart(event, data.data)}>
                    <PlusIcon className='h-6 w-6 text-black'></PlusIcon>
                </div>
            )
        }
    }

    return(
        <div 
        className='bg-white cursor-pointer w-56 h-60 rounded-lg'
        onClick={()=> ShowProduct(data.data)}
        >
            <figure className="relative mb-2 w-full h-4/5">
                <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data.data.category.name}</span>
                <img className='w-full h-full object-cover rounded-lg' src={data.data.images[0]} alt={data.data.title}/>
                {
                    renderIcon(data.data.id)
                }
            </figure>
            <p className='flex justify-between items-center'>
                <span className='text-sm font-light'>{data.data.title}</span>
                <span className='text-lg font-medium'>${data.data.price}</span>
            </p>
        </div>
    )
}

export default Card