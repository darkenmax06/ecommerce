import { useState } from "react"
import ErrorAlert from "../inputAlerts/ErrorAlert"
import useComments from "../../hooks/useComments"
import { ArrowRight } from "lucide-react"
import ButtonLoader from "../loaders/ButtonLoader"

function CommentForm ({productId}) {
  const {createComment,error,clearError,loading} = useComments({productId})
  const [comment,setComment] = useState("")

  const handleChange = e => setComment(e.target.value)
  const clearInput = () => setComment("")

  const handleSubmit = e => {
    e.preventDefault()
    createComment({comment,productId,clearInput})
  }

  return (
    <form className="comments__form" onSubmit={handleSubmit} >
      <textarea 
        onChange={handleChange} 
        value={comment} 
        name="comment" 
        maxLength={200} 
      ></textarea>
      {error && <ErrorAlert error={error} clearError={clearError} />}
      <button>Enviar { loading ? <ButtonLoader/> : <ArrowRight/>  } </button>
    </form>
  )
}

export default CommentForm