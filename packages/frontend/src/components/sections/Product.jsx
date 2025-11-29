import { ArrowLeft, ArrowRight, DollarSign, ShoppingCart, User, CheckCheck } from "lucide-react"
import "./product.css"
import { useRef, useState } from "react"
import useCart from "../../hooks/useCart"
import useUser from "../../hooks/useUser"
import { Link } from "react-router-dom"
import useOrders from "../../hooks/useOrders"

 const CommentForm = ({handleComments,comment,handleComment,error}) => (


    <form className="comments__form" onSubmit={handleComments} >
      <textarea onChange={e => handleComment(e.target.value)} value={comment} name="comment" maxLength={200} minLength={2} ></textarea>
      {error && <p>{error}</p>}
      <button>Enviar</button>
    </form>
  )

  const LoginForm = () => (
    <div className="comments__modal">
      <h2 className="message" >Inicia sesion para poder comentar los productos</h2>
      <Link to="/login" >Iniciar sesion </Link>
    </div>
  )

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

function Product ({imgUris,title,description,price,comments,productId,target,quantity,createComment,error}){
  const containerRef = useRef()
  const {addToCart,isAdded} = useCart()
  const [comment,setComment] = useState("")
  const {createOrder} = useOrders({loadOrders: false})
  const {user,shippingPrice} = useUser()

  const handleAdd = () => {
    if (isAdded(productId)) return null
    addToCart({productId,title,imgUri: imgUris[0],price,max: quantity})

  }

  const handleScroll = (dir) => {
    if (containerRef.current){
      const element = containerRef.current
      const {width} = element.getBoundingClientRect()
      const scrollWidth = width
      const currentScroll = element.scrollLeft

      return dir == "left" ? element.scrollTo(scrollWidth + currentScroll,0) : element.scrollTo(currentScroll - scrollWidth,0)
    }
  }

  const clearInput = () => setComment("")

  const handleComments = e => {
    e.preventDefault()

    createComment({comment,productId,clearInput})
  }

  const handleComment = comment => setComment(comment)

  const Added = () => (<> Anadido  <CheckCheck/></>)
  const ForAdd = () => (<> Anadir  <ShoppingCart/></>) 

  const handleBuy = () =>  {
    const productToBuy = [{productId,quantity: 1}]
    createOrder(productToBuy)
  }

  return (
    <div className="modal__container">
      <div className="modal">
        <div className="modal__imgbox"  >
          <div className="modal__imgs__container" ref={containerRef} >
            {imgUris.map(res => <img key={res} src={`/api/public/${res}`} alt={title} />)}
          </div>
          <div className="modal__imgs__actions">
            <button onClick={()=> handleScroll("right")} >
              <ArrowLeft/>
            </button>

            <button onClick={()=> handleScroll("left")} >
              <ArrowRight/>
            </button>
          </div>
        </div>
        <div className="modal__textbox">
          <h2 className="modal__title" >{title}</h2>
          <div className="modal__info">
            <span className="modal__price" >ARG$ {price}</span>
            <span className="modal__price" >{quantity} Ud disponibles</span>
          </div>
          <span className="modal__target" >{target}</span>
          <p>{description}</p>
          <div className="modal__actions">
            <button onClick={handleBuy} >Comprar ahora <DollarSign/> </button>
            <button onClick={handleAdd} >
              {
                isAdded(productId)
                ? <Added/>
                : <ForAdd/>
              }
            </button>
          </div>

          {
            shippingPrice
            ? <p>Envio: ${shippingPrice}</p>
            : <p>Esta compra esta sujeta a las tarfas de envio</p>
          }

          

          <div className="comments">
            <h3 className="comments__title">
              Comentarios
            </h3>

            {
              user
              ? <CommentForm error={error} handleComments={handleComments} handleComment={handleComment} comment={comment} />
              : <LoginForm/>
            }

            <div className="comments__container">
              { (comments && comments.length > 0) && comments.map(res => <Comment key={res.CommentId} {...res} />) }
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