import { useContext } from 'react'
import { ShopCartContext } from '../../Context'
import Layout from "../../components/Layout"
import Card from "../../components/Card"
import  ProductDetail  from '../../components/ProductDetail'

function Home() {
  const context = useContext(ShopCartContext)

  const renderView = () => {
   
      if( context.filterItems?.length > 0){
        return(
          context.filterItems?.map(item => 
            (<Card data={item} key={item.id}/>)
          )
        )
      } else {
        return(
          <div className='items-center justify-center'> <h1>Element no found 😿</h1> </div>
        )
      }
  } 

  return (
    <>
      <Layout>
        <div className='flex items-center relative justify-center w-80 '>
            <h1 className='font-medium text-xl mb-3'> Our products </h1>
          </div>
          <input 
            className='rounded-lg border border-black w-80 p-4 mb-5 focus:outline-none' 
            type="text"
            onChange={(e)=> context.setSearchItems(e.target.value) } 
            placeholder='Search a product'
          />
        <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg '>
        {renderView()}
        </div>
        <ProductDetail />
      </Layout>
    </>
  )
}

export default Home