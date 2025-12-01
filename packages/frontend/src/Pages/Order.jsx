import useOrders from "../hooks/useOrders"
import "./order.css"
import { useParams } from "react-router-dom"
import ProductCard from "../components/cards/ProductCard"
import MainLoader from "../components/loaders/MainLoader"
import useUser from "../hooks/useUser"
import Select from "../components/forms/Select"
import useStatus from "../hooks/useStatus"

function AdminView ({user}) {
  return (
    <>
      <h3>{user.name} {user.lastName}</h3>
      <h3>
        Contacto: 
        <a href={`https://wa.me/${user.phone}?text=Buenas%20tardes%2C%20Te%20habla%20david%20de%20The%20Real%20Fat%2C%20te%20escrib%C3%ADa%20para%20notificarte%20las%20actualizaciones%20de%20tu%20pedido%21`}  target="_blank"  rel="noreferrer"  >
          {user.phone}
        </a>
      </h3>
    </>
  )
}

function Index () {
  const {orderId} = useParams()
  const {order,updateOrder} = useOrders({loadOrders: false, orderId})
  const {status} = useStatus()
  const {user} = useUser()

  if (!order) return <MainLoader/>

  const productPrice = order.products.reduce((acc,product)=> {
    const total = product.price * product.quantity
    return total + acc
  },0)

  const total = productPrice + order.shippingPrice

  const cb = ({target: {value}}) =>  {
    const statusId = status.find(res => res.status == value).statusId
    updateOrder({statusId,orderId: order.orderId})
  }

  return (
    <div className="orders">
      <div className="orders__container">
        <h2 className="orders__title">
          Orden No:{order.orderId}
        </h2>

        {user.type == "seller" && <AdminView user={order.user} />}
        <h3>Direccion: {order.province} {order.city} {order.street} {order.reference} </h3>


        {
          user.type == "seller"
          ? <Select autoUpdate={false} name="status" tags={status && status.map(res => res.status)} data={order.status} cb={cb}/>
          : <span className="order__target"> {order.status} </span>

        }
        
        
        <div className="or__container">
          {order.products && order.products.map(res => <ProductCard key={res.productId} {...res} imgUri={res.imgUris[0]} />)}
          {order.products && order.products.length < 1 && <h2>No tienes ordenes disponibles</h2>}
        </div>

      
        <h3>Sub total: ARG${productPrice} </h3>
        <h3>
          envio: ARG${order.shippingPrice}
        </h3>
        <h3 className="total" >
          total: ARG${total}
        </h3>


      </div>
    </div>
  )
}

export default Index