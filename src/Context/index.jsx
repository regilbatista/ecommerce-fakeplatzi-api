import { createContext, useState , useEffect } from 'react'

export const ShopCartContext = createContext()

export const initializeLocalStorage = () => {
    const accountLocalStorage = localStorage.getItem('account')
    const signOutLocalStorage = localStorage.getItem('sign-out')
    let parsedAccount
    let parsedSignOut

    if(!accountLocalStorage){
        localStorage.setItem('account', JSON.stringify({}))
        parsedAccount = {}
    } else {
        parsedAccount = JSON.parse(accountLocalStorage)
    }

    if(!signOutLocalStorage){
        localStorage.setItem('sign-out', JSON.stringify({}))
        parsedSignOut = {}
    } else {
        parsedSignOut = JSON.parse(signOutLocalStorage)
    }
}

export const ShopCartProvider = ({children}) => {

    // Account
    const [account, setAccount] = useState({})

    // Shopping card - Increment quantity
    const [signOut, setSignOut] = useState(false)

    // Shopping card - Increment quantity
    const [count, setCount] = useState(0)

    //IsProductDetailOpen = IPDO
     //Products Detail - open/close
    const [IPDO, setIPDO] = useState(false)
    const openProductDetail = () => setIPDO(true)
    const closeProductDetail = () => setIPDO(false)

         //Checkout Side Menu - open/close  /Is Checkout Side Menu= COSM
         const [ICSM, setICSM] = useState(false)
         const openCheckout = () => setICSM(true)
         const closeCheckout = () => setICSM(false)
     

     //Products Detail -products to Show  = PTS
    const [ PTS, setPTS] = useState({})
    const [ cartProducts, setcartProducts] = useState([])
    
     //Shopping cart - order
    const [ order, setOrder] = useState([])     

    //Get products 
    const [items, setItems] = useState(null)
    const [filterItems, setFilterItems] = useState(null)
   
    //Get products by title
    const [searchItems, setSearchItems] = useState(null)

    //Get products by category
    const [searchItemsByCategory, setSearchItemsByCategory] = useState(null)
   

    useEffect(() => {
      fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setItems(data))
    }, [])

    const filterItemsByTitle = (items, searchItems) => {
        return items?.filter((item) => item.title.toLowerCase().includes(searchItems.toLowerCase()))
    }

    const filterItemsByCategory = (items, searchItemsByCategory) => {
        return items?.filter((item) => item.category.name.toLowerCase().includes(searchItemsByCategory.toLowerCase()))
    }
    

    const filterBy = (searchType, items, searchItems, searchItemsByCategory) => {
        
        if(searchType === 'BY_TITLE'){
            return filterItemsByTitle(items, searchItems)
        }

        if(searchType === 'BY_CATEGORY'){
            return filterItemsByCategory(items, searchItemsByCategory)
        }

        if(searchType === 'BY_TITLE_AND_CATEGORY'){
            return filterItemsByCategory(items, searchItemsByCategory).filter((item) => item.title.toLowerCase().includes(searchItems.toLowerCase()))
        }

        if(!searchType){
            return items
        }
    }

    useEffect (() => {
        if(searchItems && searchItemsByCategory) setFilterItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchItems, searchItemsByCategory))
        if(searchItems && !searchItemsByCategory) setFilterItems(filterBy('BY_TITLE', items, searchItems, searchItemsByCategory))
        if(searchItemsByCategory && !searchItems) setFilterItems(filterBy('BY_CATEGORY', items, searchItems, searchItemsByCategory))
        if(!searchItemsByCategory && !searchItems) setFilterItems(filterBy(null, items, searchItems, searchItemsByCategory))
    }, [items, searchItems, searchItemsByCategory])


    return(
        <ShopCartContext.Provider value={{
            count, 
            setCount,
            openProductDetail,
            closeProductDetail,
            IPDO,
            PTS,
            setPTS,
            cartProducts,
            setcartProducts,
            ICSM,
            setICSM,
            openCheckout,
            closeCheckout,
            order,
            setOrder, 
            items,
            setItems,
            searchItems,
            setSearchItems,
            filterItems,
            setFilterItems,
            filterItemsByTitle,
            searchItemsByCategory,
            setSearchItemsByCategory,
            account,
            setAccount,
            signOut,
            setSignOut
        }}>
            {children}
        </ShopCartContext.Provider>
        )
}