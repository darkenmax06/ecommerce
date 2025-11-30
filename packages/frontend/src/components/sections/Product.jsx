import { DollarSign, ShoppingCart, CheckCheck } from "lucide-react"
import "./product.css"
import useCart from "../../hooks/useCart"
import useUser from "../../hooks/useUser"
import useOrders from "../../hooks/useOrders"
import CommentForm from "../forms/CommentForm"
import ImageCarrousel from "../elements/ImageCarrousel"
import Comment from "../elements/Comment"
import LoginMessage from "../messages/LoginMessage"
import useComments from "../../hooks/useComments"

function Product ({imgUris,title,description,price,productId,target,quantity}){
  const {comments,createComment,error,clearError} = useComments({productId})
  const {addToCart,isAdded} = useCart()
  const {createOrder} = useOrders({loadOrders: false})
  const {user,shippingPrice} = useUser()


  const handleAdd = () => {
    if (isAdded(productId)) return null
    addToCart({productId,title,imgUri: imgUris[0],price,max: quantity})
  }

  const Added = () => (<> Anadido  <CheckCheck/></>)
  const ForAdd = () => (<> Anadir  <ShoppingCart/></>) 

  const handleBuy = () =>  {
    const productToBuy = [{productId,quantity: 1}]
    createOrder(productToBuy)
  }
  

  return (
    <div className="modal__container">
      <div className="modal">
        <ImageCarrousel imgUris={imgUris} title={title} />
        <div className="modal__textbox">
          <h2 className="modal__title" >{title}</h2>
          <div className="modal__info">
            <span className="modal__price" >ARG$ {price}</span>
            <span className="modal__price" >{quantity} Ud disponibles</span>
          </div>
          <span className="modal__target" >{target}</span>
          <p>{description}</p>
          <div className="modal__actions">
            <button onClick={handleBuy} > Comprar ahora <DollarSign/> </button>
            <button onClick={handleAdd} >
              {
                isAdded(productId)
                ? <Added/>
                : <ForAdd/>
              }
            </button>
          </div>

          { shippingPrice ? <p>Envio: ${shippingPrice}</p> : <p>Esta compra esta sujeta a las tarfas de envio</p>}

          <div className="comments">
            <h3 className="comments__title">
              Comentarios
            </h3>

            {user
              ? <CommentForm error={error} createComment={createComment} productId={productId} clearError={clearError} />
              : <LoginMessage/>}

            <div className="comments__container">
              { (comments && comments.length > 0) && comments.map(res => <Comment key={res.commentId} {...res} />) }
              { !comments  && <h2>Cargando...</h2> }
              { (comments && comments.length < 1) && <h2 className="message" >Aun no hay comentarios</h2> }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product