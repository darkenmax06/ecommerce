import { useCallback, useEffect, useMemo, useState } from "react"
import { roundDecimals } from "../utils/roundDecimals"
import useUser from "./useUser"
import { gerProvinceByName } from "../services/addressServices"
import useCartStorage from "./zustand/useCartStore"


function useCart (){
  const cart = useCartStorage((state) => state.cart)
  const addItem = useCartStorage((state) => state.addItem)
  const decreaseQuantity = useCartStorage((state) => state.decreaseQuantity)
  const increaseQuantity = useCartStorage((state) => state.increaseQuantity)

  const [shippingPrice,setShippingPrice] = useState(null)
  const {user} = useUser()

  const addToCart = useCallback(({productId,title,imgUri,price,max}) => {
    addItem({productId,title,imgUri,price,max})
  },[addItem])

  useEffect(()=> {
    if (user) {
      const load = async ()=> {
        const parsedProvince = user.province.split(" ").join("%20")
        gerProvinceByName({province: parsedProvince})
          .then(res => setShippingPrice(res.shippingPrice))
          .catch(err => console.log(err))
      }

      load()
    }
  },[user])

  const isAdded = useCallback(
    (id) => {
    if (!cart) return false
    else if (cart.length < 1) return false

    const findIndex = cart.findIndex(res => res.productId == id)
    return findIndex >= 0
  },[cart])

  const payPrices = useMemo(()=> {
    if (!cart) return 0
    const value = cart.reduce((acc,currentValue)=> {
      const {price,quantity} = currentValue
      const value = price * quantity
      return value + acc
    },0)

    const subTotal = roundDecimals({number: value})
    const total = user 
    ? roundDecimals({number:(subTotal + shippingPrice)}) 
    : subTotal


    return {
      subTotal,
      total
    }
  },[cart,user,shippingPrice])




  return {
    cart,
    addToCart,
    isAdded,
    payPrices,
    decreaseQuantity,
    increaseQuantity,
    shippingPrice
  }
}

export default useCart