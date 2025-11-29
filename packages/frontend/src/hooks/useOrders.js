import { useEffect, useState } from "react";
import useUser from "./useUser";
import { buyItem, getAllorders, getByOrderId, getOrders, update } from "../services/ordersServices";

function useOrders ({loadOrders = true,orderId} ={}){
  const {user} = useUser()
  const [orders,setOrders] = useState(null)
  const [order,setOrder] = useState(null)
  const [error,setError] = useState(null)

  const clearError = () => setError(null)
  const showError = err => setError(err)

  useEffect(()=> {
    const load = async ()=> {
      const {token} = user
      if (loadOrders){
        try {
          let result = null
          if (user.type == "buyer") result = await getOrders({token})
          else  result = await getAllorders({token})
          setOrders(result)
        } catch (err ){
          console.log(err)
        }
      } else if (orderId){
        try{
          const order = await getByOrderId({orderId,token})
          setOrder(order)
        }catch (err){
          console.log(err)
        }
      }
    }

    load()
  },[user,orderId])

  const updateOrder = async ({orderId, statusId}) => {
    try {
      const {token} = user
      await update(statusId,token,orderId)
      alert("Orden actualizada")
    } catch (err){
      console.log(err)
    }
  }

  const createOrder = async (products) => {
    clearError()
    if (!products) return showError("Deben haber productos para realizar esta accion")

      console.log({products})

    try {
      const {token} = user
      const result = await buyItem({products, token})
      window.location.href = result.url;
    } catch (err) {
      showError(err)
    }
  }

  return {
    orders,
    order,
    updateOrder,
    createOrder,
    error
  }
}

export default useOrders