import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShopCartContext } from '../../Context'
import './ProductDetail.css'

const ProductDetail = () => {
    const context = useContext(ShopCartContext)
   
     return (
        <aside className={`${context.IPDO ? 'flex' : 'hidden'} product-detail  flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className=' flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>Detail</h2>
                <div>
                    <XMarkIcon 
                    className='h-6 w-6 text-black cursor-pointer'
                    onClick={()=> context.closeProductDetail()}
                    ></XMarkIcon>
                </div>
            </div>
            <figure className='px-6'>
                <img className='w-full h-full rounded-lg'
                src={context.PTS.images} 
                alt={context.PTS.title} 
                />
            </figure>
            <p className='flex flex-col p-6'>
                <span className='font-medium text-2xl'>${context.PTS.price}</span>
                <span className='font-medium text-md mt-2'>{context.PTS.title}</span>
                <span className='font-light text-sm mt-1 text-justify' >{context.PTS.description}</span>
            </p>
        </aside>
     )
}

export default ProductDetail