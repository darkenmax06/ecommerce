import { Edit, Trash2 } from "lucide-react"
import "./productCard.css"
import { useNavigate } from "react-router-dom"


function MyProductCard ({imgUri,title,target,content,price,productId,deleteProduct}){
  const navigate = useNavigate()

  const handleEdit = () => navigate(`/myproducts/edit/${productId}`)
  const handleDelete = () => deleteProduct({productId})

  return (
    <article className="pc">
      <picture className="pc__imgbox">
        <span className="pc__target" >{target}</span>
        <img src={`/api/public/${imgUri}`} alt={title} />
      </picture>
      <div className="pc__textbox">
        <h4 className="pc__title">{title}</h4>
        <span className="pc__price">ARG$ {price}</span>
        <p>{content}</p> 
        <div className="pc__actions">
          <button className="pc__action" onClick={handleEdit} >
              Editar <Edit/>
          </button>
          <button className="pc__action disabled" onClick={handleDelete} >
            Eliminar <Trash2/>
          </button>
        </div>
      </div>
    </article>
  )
}

export default MyProductCard