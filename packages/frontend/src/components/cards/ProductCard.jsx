import { CheckCheck, MinusIcon, ShoppingCart } from "lucide-react"
import "./productCard.css"
import useCart from "../../hooks/useCart"
import { useNavigate } from "react-router-dom"


function ProductCard ({imgUri,title,target,content,price,productId,quantity}){
  const {addToCart,isAdded} = useCart()
  const navigate = useNavigate()

  const handleView = () => navigate(`/products/${productId}`)

  const handleAdd = () => {
    addToCart({productId,title,imgUri,price,max: quantity})
  }

  const Added = () => (<> Anadido  <CheckCheck/></>)
  const ForAdd = () => (<> Anadir  <ShoppingCart/></>)  

  return (
    <article className="pc">
      <picture className="pc__imgbox">
        <span className="pc__target" >{target}</span>
        <img src={`/api/public/${imgUri}`} alt={title} />
      </picture>
      <div className="pc__textbox">
        <h4 className="pc__title">{title}</h4>
        <div className="pc__info">
          <span className="pc__price">ARG$ {price}</span>
          <span className="pc__price">{quantity} uds</span>
        </div>
        <p>{content}</p> 
        <div className="pc__actions">
          <button className="pc__action" onClick={handleAdd} >
            {
              isAdded(productId)
              ? <Added/>
              : <ForAdd/>
            }
          </button>
          <button className="pc__action disabled" onClick={handleView} >
            Ver detalles
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard