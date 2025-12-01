import { useRef, useState } from "react"
import useAddress from "../hooks/useAddress"
import { Edit2 } from "lucide-react"
import "./shipping.css"


function ShippingItem ({province,shippingPrice, updatePrice, provinceId}) {
  const initialValue = useRef(shippingPrice)
  const [value,setValue] = useState(shippingPrice)

  const handleChange = e => setValue(e.target.value)
  const handleSubmit = async e => {
    e.preventDefault()
    updatePrice({provinceId,shippingPrice: value})
    .then(res => {
      initialValue.current = res.shippingPrice
      setValue(res.shippingPrice)
    })
  }

  return (
    <article className="shipping-item">
      <h4 className="shipping-item__title">{province}</h4>
      <form className="shipping-item__form" onSubmit={handleSubmit} >
        <input min="1" type="number" className="shipping-item__input" onChange={handleChange} value={value} />
        <button className={initialValue.current == value ? "shipping-item__btn" : "shipping-item__btn modified" } >
          <Edit2/>
        </button>
      </form>
    </article>
  )
}

function Shipping () {
  const {provinces,updatePrice} = useAddress({province: null,city: null})

  return (
      <div className="shipping">
        <div className="shipping__container">
          <h2 className="shipping__title">
            Provincias y precios de envios
          </h2>

          <div className="shipping__box">
            {
              provinces && provinces.map(res => <ShippingItem key={res.provinceId} updatePrice={updatePrice} {...res} /> )
            }
          </div>
        </div>
      </div>
  )
}

export default Shipping