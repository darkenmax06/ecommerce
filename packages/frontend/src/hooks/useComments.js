import { useEffect, useState } from "react";
import { create, getByProduct } from "../services/commentsServices";
import useUser from "./useUser";



function useComments ({loadComments = true,productId} = {}) {
  const [comments,setComments] = useState(null)
  const [error,setError] = useState(null)
  const {user} = useUser()

  const clearError = () => setError()
  const showError = err => setError(err)

  useEffect(()=> {
    if (loadComments){
      const load = async ()=> {
        try {
          const result = await getByProduct({productId})
          console.log(result)
          setComments(result)
        } catch(err){
          console.log(err)
        }
      }

      load()
    }

  },[loadComments,productId])


  const createComment = async ({comment,productId,clearInput}) => {
    clearError()

    try {
      const {token} = user
      const result = await create({comment,token,productId})
      setComments([...comments,result])
      clearInput()
    }catch(err){
      showError(err)
    }
  }


  return {
    comments,
    createComment,
    error,
    clearError
  }
}

export default useComments