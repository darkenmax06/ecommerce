import { useState } from "react";
import { createComment } from "../services/commentServices";


function useContact (){
  const [error,setError] = useState(null)
  const [message,setMessage] = useState(null)

  const showError = err => setError(err)
  const clearError = () => setError(null)

  const sendMessage = async ({name,email,message,clearData})=> {
    clearError()


    const emailregex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
    
    if (!name || name.length <= 2) return showError("El nombre debe tener un minimo de 2 caracteres.")
    if (!name || name.length >= 100) return showError("El nombre debe tener un maximo de 100 caracteres.")
    else if (!email || email.length <= 5) return showError("El email es requerido")
    else if (!emailregex.test(email)) return showError("El email proporcionado no es valido")
    else if (!message || message.length <= 2) return showError("El comentario debe tener un minimo de 2 caracteres.")
    else if (message.length >= 500) return showError("El comentario debe tener un maximo de 500 caracteres.")

    try {
      const result = await createComment({name,email,message})
      setMessage(result)
      clearData()
    } catch (err){
      setError(err)
    }
  }

  return {
    sendMessage,
    error,
    message,
    clearError
  }
}

export default useContact