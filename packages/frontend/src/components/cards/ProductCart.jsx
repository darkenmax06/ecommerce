import {  Minus, Plus} from "lucide-react"
import "./productCart.css"
import useCart from "../../hooks/useCart"
import { roundDecimals } from "../../utils/roundDecimals"

function ProductCart ({imgUri,title,target,price,quantity,productId}){
  const {decreaseQuantity,increaseQuantity} = useCart()

  const handleDecrease = () => decreaseQuantity({productId}) 
  const handleIncrease = () => increaseQuantity({productId}) 

  const total = roundDecimals({number: quantity*price})

  return (
    <article className="pc">
      <picture className="pc__imgbox">
        <span className="pc__target" >{target}</span>
        <img src={`/api/public/${imgUri}`} alt={title} />
      </picture>
      <div className="pc__textbox">
        <h4 className="pc__title">{title}</h4>
        <div className="pc__row">
          <span className="pc__price">Precio unitario:</span>
          <span className="pc__price">{price}</span>
        </div>
        <div className="pc__row">
          <span className="pc__price">Cantidad:</span>
          <span className="pc__price">{quantity}</span>
        </div>
        <div className="pc__row">
          <span className="pc__price">Total:</span>
          <span className="pc__price">{total}</span>
        </div>
        <div className="pc__actions">
          <button className="pc__action" onClick={handleIncrease} >
             <Plus/>
          </button>
          <button className="pc__action disabled" onClick={handleDecrease}  >
            <Minus/>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCart