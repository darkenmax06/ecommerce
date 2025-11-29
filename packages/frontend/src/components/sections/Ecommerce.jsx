import { useState } from "react"
import './ecommerce.css'
import useProducts from "../../hooks/useProducts"
import ProductCard from "../cards/ProductCard"
import SearchBar from "../elements/SearchBar"


function Ecommerce ({title = "Productos"}) {
  const [filter,setFilter] = useState({category:"Todos",title: ""})
  const {products} = useProducts(filter)

  const filterCategory = (category) => {
    setFilter(prev => ({...prev,category}))
  }

  const filterTitle = (title) => {
    setFilter(prev => ({...prev,title}))
  }

  return (
    <section className="ecommerce" id="products" >
      <div className="ecommerce__container">
        <h2 className="ecommerce__title subtitle">
          {title}
        </h2>
        <SearchBar filterCategory={filterCategory} filterTitle={filterTitle} filter={filter} />

        <div className="products__container">
          {products && products.map(res => <ProductCard key={res.productId} {...res} />)}
          {(products && products.length < 1 && filter.title != "") && <h3>Producto no encontrado</h3>}
          {(products && products.length < 1 && filter.title == "") && <h3>Aun no hay productos</h3>}
        </div>
      </div>
    </section>
  )
}

export default Ecommerce