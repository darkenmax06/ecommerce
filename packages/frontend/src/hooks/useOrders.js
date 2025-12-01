import { useEffect, useState } from "react";
import useUser from "./useUser";
import { buyItem, getAllorders, getByOrderId, getOrders, update } from "../services/ordersServices";

function useOrders ({loadOrders = true,orderId} ={}){
  const {user} = useUser()
  const [orders,setOrders] = useState(null)
  const [order,setOrder] = useState(null)
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)

  const clearError = () => setError(null)
  const showError = err => setError(err)

  useEffect(()=> {
    const loadOrder = async () => {
      try {
        const {token} = user

        let result = null
        if (user.type == "buyer") result = await getOrders({token})
        else  result = await getAllorders({token})
        setOrders(result)
      } catch (err) {console.log(err)}
    }

    const loadByOrderId = async () => {
      const {token} = user

      try{
        const order = await getByOrderId({orderId,token})
        setOrder(order)
      }catch (err){console.log(err)}
    }


    if (loadOrders) loadOrder() 
    else if (orderId) loadByOrderId()

  },[user,orderId,loadOrders])

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
    setLoading(true)

    if (!user){
      return alert("Debes estar logueado para poder comprar.")
    }

    if (!products) {
      setLoading(true)
      return showError("Deben haber productos para realizar esta accion")
    }

    try {
      const {token} = user
      const result = await buyItem({products, token})
      setLoading(false)
      window.location.href = result.url;
    } catch (err) {
      showError(err)
      setLoading(false)
    }
  }

  return {
    orders,
    order,
    updateOrder,
    createOrder,
    error,
    loading
  }
}

export default useOrders