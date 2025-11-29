import Layout from "../components/elements/Layout"
import useOrders from "../hooks/useOrders"
import "./order.css"
import { Link } from "react-router-dom"

function Order ({orderId,creationDate,status}) {

  console.log(orderId)

  const time = new Date(creationDate).toLocaleTimeString()
  const date = new Date(creationDate).toLocaleDateString()

  return (
    <Link to={`/myorders/${orderId}`} className="order">
        <h3 className="order__title">{orderId}</h3>
        <h5 className="order__quantity">fecha: {date} {time} </h5>
        <span className="order__target">
          {status}
        </span>
    </Link>
  )
}

function Index () {
  const {orders} = useOrders()

  return (
  <Layout>
    <div className="orders">
      <div className="orders__container">
        <h2 className="orders__title">
          Ordenes
        </h2>
        <div className="or__container">
          {orders && orders.map(res => <Order key={res.orderId} {...res} />)}
          {(orders && orders.length < 1) && <h2>No tienes ordenes aun</h2>}
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Index