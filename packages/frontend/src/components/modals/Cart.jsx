import ProductCart from "../cards/ProductCart"
import useCart from "../../hooks/useCart"
import useUser from "../../hooks/useUser"

function Cart (){
  const {cart,totalToPay,shippingPrice} = useCart()
  const {user} = useUser()
  const total = user ? totalToPay + shippingPrice : totalToPay

  return (
    <aside className="cart">
        <h2 className="cart__title">Carrito</h2>
        <div className="cart__items">
            {!cart && <h3>Aun no hay elementos añadidos al carrito</h3>}
            {cart && cart.map(res => <ProductCart key={res.productId} {...res} />)}
        </div>

        <div className="cart__info">
            <ul className="cart__column">
                <ul className="cart__rows">
                    <li>sub total</li>
                    <li>{totalToPay}</li>
                </ul>

                <ul className="cart__rows">
                    <li>envio</li>
                    <li>{shippingPrice}</li>
                </ul>

                <ul className="cart__rows">
                    <li>total</li>
                    <li>{total}</li>
                </ul>
            </ul>
        </div>

        <button className="cart__buy">
            Comprar
        </button>
    </aside>
  )
}

export default Cart