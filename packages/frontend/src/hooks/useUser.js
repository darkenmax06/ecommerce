import { useState } from "react"
import {useNavigate} from "react-router-dom"
import {login} from "../services/loginServices.js"
import { Update,create } from "../services/userServices.js";
import { useEffect } from "react";
import {gerProvinceByName} from "../services/addressServices.js"
import useUserStore from "./zustand/useUserStore.js";

function cleanAndValidatePhoneNumber(rawNumber, showError) {
    const cleanedNumber = rawNumber.replace(/[()\-\s]/g, '');

    if (!/^\d+$/.test(cleanedNumber)) {
        showError("El número de teléfono solo debe contener dígitos (aparte de guiones o paréntesis opcionales).");
        return null;
    }

    if (cleanedNumber.length !== 10) {
        showError("El número de teléfono debe tener exactamente 10 dígitos.");
        return null;
    }

    return cleanedNumber;
}

function validateUser({ name, lastName, cityId, provinceId, street, password, phone, email, showError, confirmPassword }) {
    
    const validateText = (field, fieldName,MAX_LENGTH=50,MIN_LENGTH=2) => {
        const trimmed = field.trim();
        if (trimmed.length < MIN_LENGTH) {
            showError(`El campo ${fieldName} debe tener al menos ${MIN_LENGTH} caracteres.`);
            return false;
        }
        if (trimmed.length > MAX_LENGTH) {
            showError(`El campo ${fieldName} no debe exceder los ${MAX_LENGTH} caracteres.`);
            return false;
        }
        return true;
    };
    
    if (!validateText(name, "Nombre")) return false;
    if (!validateText(lastName, "Apellido")) return false;
    if (!provinceId) {
      showError(`El campo Provincia debe ser seleccionado.`);
      return false;
    }
     if (!cityId) {
      showError(`El campo localidad debe ser selecionado.`);
      return false;
    }
    if (!validateText(street, "Calle",100,2)) return false;


    const validatedNumber = cleanAndValidatePhoneNumber(phone, showError);
    if (validatedNumber === null) {
        return false;
    }
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        showError("El formato del email no es válido.");
        return false;
    }

    if (!validateText(password, "password",50,8)) return false;

    if (password !== confirmPassword) {
       showError(`las contraseñas no coinciden`);
       return false;
    }


    return true;
}

function validateLogin({  password, email, showError }) {
    
    const validateText = (field, fieldName,MAX_LENGTH=50,MIN_LENGTH=2) => {
        const trimmed = field.trim();
        if (trimmed.length < MIN_LENGTH) {
            showError(`El campo ${fieldName} debe tener al menos ${MIN_LENGTH} caracteres.`);
            return false;
        }
        if (trimmed.length > MAX_LENGTH) {
            showError(`El campo ${fieldName} no debe exceder los ${MAX_LENGTH} caracteres.`);
            return false;
        }
        return true;
    };
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        showError("El formato del email no es válido.");
        return false;
    }

    if (!validateText(password, "password",50,8)) return false;

    return true;
}

function useUser () {
  const user = useUserStore((state)=> state.user)
  const saveUser = useUserStore((state)=> state.saveUser)
  const logoutUser = useUserStore((state)=> state.logoutUser)
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
  },[])

  const showError = err => setError(err)
  const clearError = () => setError(null)

  const createUser = async (user) => {
    clearError()
    const isValidUser = validateUser({...user,showError})
    if (!isValidUser) return null

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
    }
  }

  const updateUser = async(user) => {
    setLoading(true)
    clearError()
    const isValidUser = validateUser({...user,showError})
    if (!isValidUser) return null

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

    // saveUser(u)
    // navigate("/me")
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
    clearError
  }
}

export default useUser