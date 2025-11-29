import { useState } from "react"
import './ecommerce.css'
import useProducts from "../../hooks/useProducts"
import SearchBar from "../elements/SearchBar"
import MyProductCard from "../cards/MyProductCard"


function MyProducts () {
  const [filter,setFilter] = useState({category:"Todos",title: ""})
  const {products,deleteProducts} = useProducts(filter)

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
          Mis Productos
        </h2>
        <SearchBar filterCategory={filterCategory} filterTitle={filterTitle} filter={filter} />

        <div className="products__container">
          {products && products.map(res => <MyProductCard deleteProduct={deleteProducts} key={res.id} {...res} />)}
          {(products && products.length < 1 && filter.title != "") && <h3>Producto no encontrado</h3>}
          {(products && products.length < 1 && filter.title == "") && <h3>Aun no hay producto</h3>}
        </div>
      </div>
    </section>
  )
}

export default MyProducts