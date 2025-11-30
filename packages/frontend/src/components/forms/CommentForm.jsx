import { useState } from "react"
import ErrorAlert from "../inputAlerts/ErrorAlert"


function CommentForm ({createComment,productId,error,clearError}) {
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
      <button>Enviar</button>
    </form>
  )
}

export default CommentForm