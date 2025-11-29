import { createContext, useState } from "react"

export const cartContext = createContext()

function CartProvider ({children}){
  const [cart,setCart] = useState(()=> {
    const hasStorage = JSON.parse(localStorage.getItem("cart"))
    return hasStorage ?? []
  })

  const addItem = ({productId,title,imgUri,price,max}) => {
    let newCart = [...cart]
    const isAdded = newCart.findIndex(res => res.productId == productId)

    if (isAdded >= 0) {
      newCart[isAdded].quantity += 1
    } else {
      const quantity = 1
      const newItem = {
        productId,
        title,
        imgUri,
        quantity,
        price,
        max,
        total: price * quantity
      }

      newCart = [...newCart,newItem]
    }
    setCart(newCart)
    const cartToSave = JSON.stringify(newCart)
    localStorage.setItem("cart",cartToSave)
  }

  const increaseQuantity = ({productId}) => {
    let newCart = [...cart]
    const isAdded = newCart.findIndex(res => res.productId == productId)
    
    console.log(isAdded)

    if (newCart[isAdded].quantity >= newCart[isAdded].max) return null

    newCart[isAdded].quantity += 1

    setCart(newCart)
    const cartToSave = JSON.stringify(newCart)
    localStorage.setItem("cart",cartToSave)

  }

  const decreaseQuantity = ({productId})=> {
    let newCart = [...cart]
    const isAdded = newCart.findIndex(res => res.productId == productId)
    const {quantity} = newCart[isAdded]

    if (quantity <= 1) {
      newCart = newCart.filter(res => res.productId != productId)
    } else {
      newCart[isAdded].quantity -= 1
    }

    setCart(newCart)
    const cartToSave = JSON.stringify(newCart)
    localStorage.setItem("cart",cartToSave)
  }

  return (
    <cartContext.Provider value={{cart,addItem,decreaseQuantity,increaseQuantity}} >
      {children}      
    </cartContext.Provider>
  )
}


export default CartProvider