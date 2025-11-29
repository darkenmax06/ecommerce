import { Edit, Trash } from "lucide-react"
import "./targetCard.css"
import { useNavigate } from "react-router-dom"


function TargetCard ({target,targetId,deleteTags}){
  const navigate = useNavigate()
  const handleEdit = () => navigate(`/targets/edit/${targetId}`)

  return (
    <article className="tc">
      <h4 className="tc__title">{target}</h4>
      <div className="tc__actions">
        <button className="tc__action" onClick={handleEdit} >
          <Edit/>
        </button>
        <button className="tc__action disabled" onClick={()=> deleteTags(targetId)} >
          <Trash/>
        </button>
      </div>
    </article>
  )
}

export default TargetCard