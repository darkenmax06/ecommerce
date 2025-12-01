import ProductCart from "../cards/ProductCart"
import useCart from "../../hooks/useCart"
import useOrders from "../../hooks/useOrders"
import { CreditCard } from "lucide-react"
import ButtonLoader from "../loaders/ButtonLoader"
import addCommas from "../../utils/addCommas"

function Cart (){
  const {cart,payPrices,shippingPrice} = useCart()
  const {createOrder,loading} = useOrders()

  const handlePay = () => {
    if (loading) return null

    const productsToPay = cart.map(res => ({productId: res.productId,quantity: res.quantity}))
    createOrder(productsToPay)
  }

  return (
    <aside className="cart">
        <h2 className="cart__title">Carrito</h2>
        <div className="cart__items">
            {!cart && <h3>Aun no hay elementos añadidos al carrito</h3>}
            {cart && cart.map(res => <ProductCart key={res.productId} {...res}  />)}
        </div>

        <div className="cart__info">
            <ul className="cart__column">
                <ul className="cart__rows">
                    <li>sub total</li>
                    <li>ARG$ {addCommas(payPrices.subTotal)}</li>
                </ul>

                <ul className="cart__rows">
                    <li>envio</li>
                    <li>ARG$ {addCommas(shippingPrice)}</li>
                </ul>

                <ul className="cart__rows">
                    <li>total</li>
                    <li>ARG$ {addCommas(payPrices.total)}</li>
                </ul>
            </ul>
        </div>

        <button className="cart__buy" onClick={handlePay} >
            Comprar { loading ? <ButtonLoader/> : <CreditCard/> }
        </button>
    </aside>
  )
}

export default Cart