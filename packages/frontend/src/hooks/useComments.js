import { useEffect, useState } from "react";
import { create, getByProduct } from "../services/commentsServices";
import useUser from "./useUser";
import useCommentStore from "./zustand/useCommentsStore";

function useComments ({loadComments = true,productId} = {}) {
  const comments = useCommentStore((state)=> state.comments)
  const updateComments = useCommentStore((state)=> state.updateComments)
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const {token} = useUser()

  const clearError = () => setError()
  const showError = err => setError(err)

  useEffect(()=> {
    const load = async ()=> {
      setLoading(true)
      try {
        const result = await getByProduct({productId})
        updateComments(result)
      } catch(err){
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    if (!loadComments) return null
    else load()
  },[loadComments,productId])


  const createComment = async ({comment,productId,clearInput}) => {
    clearError()
    setLoading(true)
    try {
      const result = await create({comment,token,productId})
      updateComments([...comments,result])
      clearInput()
    }catch(err){
      showError(err)
    } finally{
      setLoading(false)
    }
  }


  return {
    comments,
    createComment,
    error,
    clearError,
    loading
  }
}

export default useComments