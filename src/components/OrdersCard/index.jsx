import { ChevronRightIcon } from '@heroicons/react/24/solid'

const OrdersCard = props => {
    const { totalPrice, totalProducts} = props

    return(
        <div className='flex justify-between items-center mb-3 border rounded-lg  border-black p-4 w-80'>
            <p className='flex justify-between w-full'>
                <p className=' flex flex-col'>
                    <span className='font-light'> 01.02.23 </span>
                    <span className='font-light'> { totalProducts } products</span>
                </p>
                <p className='flex items-center gap-2'> 
                    <span className='font-medium text-2xl right-0'> ${ totalPrice }</span>
                    <ChevronRightIcon className='h-6 w-6 text-black cursor-pointer' />
                </p>
            </p>
        </div>
    )
}

export default OrdersCard