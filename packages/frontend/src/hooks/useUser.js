import { useState } from "react"
import {useNavigate} from "react-router-dom"
import {login} from "../services/loginServices.js"
import { Update,create } from "../services/userServices.js";
import { useEffect } from "react";
import {gerProvinceByName} from "../services/addressServices.js"
import useUserStore from "./zustand/useUserStore.js";
import validateUser from "../utils/validateUser.js";
import validateLogin from "../utils/validateLogin.js";

function useUser () {
  const user = useUserStore((state)=> state.user)
  const saveUser = useUserStore((state)=> state.saveUser)
  const logoutUser = useUserStore((state)=> state.logoutUser)
  const token = useUserStore((state)=> state.token)

  const [loading,setLoading] = useState(false)
  const [shippingPrice,setShippingPrice] = useState(null)
  const [error,setError] = useState(null)

  const navigate = useNavigate()

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

  const showError = err => setError(err)
  const clearError = () => setError(null)

  const createUser = async (user) => {
    clearError()
    setLoading(true)
    const isValidUser = validateUser({...user,showError})

    if (!isValidUser) {
      setLoading(false)
      return null
    }

    const trimmedUser = Object.fromEntries(
      Object.entries(user)
        .map(res => 
            [res[0], typeof res[1] == "string" ? res[1].trim(): res[1]]
          )
    )

    const {confirmPassword,...u} = trimmedUser

    try {
      const result = await create(u)
      saveUser(result)
      navigate("/products")
    }catch(err){
      console.log(err)
      showError(err)
    } finally{
      setLoading(false)
    }
  }

  const updateUser = async(user) => {
    setLoading(true)
    clearError()
    const isValidUser = validateUser({...user,showError})
    if (!isValidUser) {
      setLoading(false)
       return null
    }

    const trimmedUser = Object.fromEntries(
      Object.entries(user)
        .map(res => 
            [res[0], typeof res[1] == "string" ? res[1].trim(): res[1]]
          )
    )

    try {
      
      const {token} = user 
      const updatedUser = await Update(trimmedUser,token)

      saveUser(updatedUser)
      navigate("/me")
    } catch (err){
      showError(err)
    } finally {
      setLoading(false)
    }
  }

  const loginUser = async ({email,password}) => {
    clearError()
    setLoading(true)
    const isValidData = validateLogin({email,password,showError})
    if (!isValidData) {
      setLoading(false)
      return null
    }

    try {
      const user = await login({email,password})
      saveUser(user)
      navigate("/products")
    } catch(err ){
      showError(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    error,
    createUser,
    updateUser,
    logoutUser,
    loginUser,
    login,
    loading,
    shippingPrice,
    clearError,
    token
  }
}

export default useUser