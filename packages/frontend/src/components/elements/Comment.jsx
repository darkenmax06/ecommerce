import {User} from "lucide-react"
import "./comment.css"

function Comment ({comment,name, lastName,createAt}) {
  const date = new Date(createAt).toLocaleDateString()

  return (
    <div className="comment">
      <div className="comment__imgbox">
        <User strokeWidth={1} />
      </div>
      <div className="comment__textbox">
        <h4 className="comment__title">{name.concat(" ").concat(lastName)}</h4>
        <p>{comment}</p>
        <span> {date} </span>
      </div>
    </div>
  )
}

export default Comment